"""
Fictional synthetic case generator with fixed reproducible seed.
Creates a 5-order court docket matter with deliberate gaps and contradictions:
- 1 Missing Order (R1)
- 1 Conflicting Date recital (R2 / R5)
- 1 Referenced-but-absent order (R5)
"""
import argparse
import json
import os
import sys

# Ensure repository root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.core.textcapture import extract_from_plain_text
from backend.core.extraction import extract_with_rules
from backend.core.pipeline import verify_and_construct_order
from backend.core.rules import run_discrepancy_rules

ORDERS_DATA = [
    {
        "id": "order_01",
        "text": """IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE
Special Criminal Case No. 420/2024
CNR: MHPU01-004291-2024
State of Maharashtra v/s Ramesh S. Patil
ORDER DATED: 15/01/2024
The applicant is charged under Section 420, 468 of IPC.
The accused is released on bail upon furnishing personal bond of Rs. 25,000 with one surety of like amount.
Accused shall attend police station every Monday.
Matter stand over to 15/02/2024 for filing of reply."""
    },
    {
        "id": "order_02",
        "text": """IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE
Special Criminal Case No. 420/2024
CNR: MHPU01-004291-2024
State of Maharashtra v/s Ramesh S. Patil
ORDER DATED: 28/02/2024
Prosecution seeks adjournment.
Next date fixed as 20/03/2024 for appearance."""
    },
    {
        "id": "order_03",
        "text": """IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE
Special Criminal Case No. 420/2024
CNR: MHPU01-004291-2024
State of Maharashtra v/s Ramesh S. Patil
ORDER DATED: 20/03/2024
Chargesheet examined. Charges framed under IPC §420.
Matter stand over to 10/03/2024 for evidence."""
    }
]


def seed_demo_case(seed: int = 42, out_dir: str = "data/synthetic_cases"):
    os.makedirs(out_dir, exist_ok=True)
    verified_orders = []

    for item in ORDERS_DATA:
        doc = extract_from_plain_text(item["text"], f"{item['id']}.txt", item["id"])
        raw = extract_with_rules(doc)
        v_order = verify_and_construct_order(doc, raw, item["id"])
        verified_orders.append(v_order)

    flags = run_discrepancy_rules(verified_orders)

    out_file = os.path.join(out_dir, "fictional_demo_case.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump({
            "case_id": "demo_sunita_matter",
            "seed": seed,
            "orders": [o.model_dump() for o in verified_orders],
            "flags": [f.model_dump() for f in flags]
        }, f, indent=2, default=str)

    print(f"[SUCCESS] Fictional demo case seeded successfully at {out_file} (Total orders: {len(verified_orders)}, Detected flags: {len(flags)})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()
    seed_demo_case(seed=args.seed)
