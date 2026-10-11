"""
FastAPI dependency injection utilities.
"""

from .db import get_db

# Re-export db dependency
__all__ = ["get_db"]
