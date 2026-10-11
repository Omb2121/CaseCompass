import io
import hashlib
from typing import List, Dict, Any, Tuple
from PIL import Image, ImageEnhance, ImageFilter
from pypdf import PdfReader

try:
    import pytesseract
except ImportError:
    pytesseract = None

from backend.core.schemas import DocumentContent, PageText
from backend.core.config import settings


def compute_sha256(file_bytes: bytes) -> str:
    """Computes SHA-256 digest of input file for cryptographic custody."""
    hasher = hashlib.sha256()
    hasher.update(file_bytes)
    return hasher.hexdigest()


def preprocess_image_for_ocr(image: Image.Image) -> Image.Image:
    """Preprocess scanned or photographed page: grayscale, contrast enhance, sharpen."""
    # Convert to grayscale
    gray = image.convert("L")
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(gray)
    contrasted = enhancer.enhance(1.8)
    # Apply subtle sharpening
    sharpened = contrasted.filter(ImageFilter.SHARPEN)
    return sharpened


def build_line_offsets(text: str) -> List[Dict[str, Any]]:
    """Breaks page text into line offsets for XAI citation mapping."""
    line_offsets = []
    lines = text.split("\n")
    current_char = 0
    for idx, line in enumerate(lines, start=1):
        line_len = len(line)
        line_offsets.append({
            "line_number": idx,
            "char_start": current_char,
            "char_end": current_char + line_len,
            "text": line
        })
        current_char += line_len + 1  # accounts for newline
    return line_offsets


def extract_from_pdf(file_bytes: bytes, filename: str, doc_id: str) -> DocumentContent:
    """Extracts text from PDF. Detects digital text layer or falls back to OCR."""
    sha256 = compute_sha256(file_bytes)
    reader = PdfReader(io.BytesIO(file_bytes))
    num_pages = min(len(reader.pages), settings.MAX_OCR_PAGES)
    
    pages: List[PageText] = []
    has_digital_text = False

    for page_idx in range(num_pages):
        page = reader.pages[page_idx]
        extracted_text = page.extract_text() or ""
        
        # Check if native digital text exists and is meaningful
        if len(extracted_text.strip()) > 30:
            has_digital_text = True
            raw_text = extracted_text
        else:
            # Fallback to OCR if page has images and pytesseract is available
            raw_text = extracted_text
            if pytesseract and len(page.images) > 0:
                ocr_texts = []
                for img_file in page.images:
                    try:
                        img = Image.open(io.BytesIO(img_file.data))
                        preprocessed = preprocess_image_for_ocr(img)
                        text_ocr = pytesseract.image_to_string(
                            preprocessed,
                            lang=settings.OCR_LANGUAGE_PACKS
                        )
                        ocr_texts.append(text_ocr)
                    except Exception:
                        pass
                if ocr_texts:
                    raw_text = "\n".join(ocr_texts)

        line_offsets = build_line_offsets(raw_text)
        pages.append(PageText(
            page_num=page_idx + 1,
            raw_text=raw_text,
            line_offsets=line_offsets
        ))

    return DocumentContent(
        doc_id=doc_id,
        filename=filename,
        sha256=sha256,
        page_count=num_pages,
        pages=pages,
        is_digital_text=has_digital_text
    )


def extract_from_image(image_bytes: bytes, filename: str, doc_id: str) -> DocumentContent:
    """Ingests scanned images (PNG, JPEG, etc.) via OCR preprocessing."""
    sha256 = compute_sha256(image_bytes)
    img = Image.open(io.BytesIO(image_bytes))
    preprocessed = preprocess_image_for_ocr(img)

    raw_text = ""
    if pytesseract:
        try:
            raw_text = pytesseract.image_to_string(
                preprocessed,
                lang=settings.OCR_LANGUAGE_PACKS
            )
        except Exception:
            raw_text = ""

    line_offsets = build_line_offsets(raw_text)
    pages = [PageText(page_num=1, raw_text=raw_text, line_offsets=line_offsets)]

    return DocumentContent(
        doc_id=doc_id,
        filename=filename,
        sha256=sha256,
        page_count=1,
        pages=pages,
        is_digital_text=False
    )


def extract_from_plain_text(text: str, filename: str, doc_id: str) -> DocumentContent:
    """Ingests raw pasted text."""
    sha256 = compute_sha256(text.encode("utf-8"))
    line_offsets = build_line_offsets(text)
    pages = [PageText(page_num=1, raw_text=text, line_offsets=line_offsets)]

    return DocumentContent(
        doc_id=doc_id,
        filename=filename,
        sha256=sha256,
        page_count=1,
        pages=pages,
        is_digital_text=True
    )
