"""Utilities for creating a shared Qdrant client."""
from functools import lru_cache
from pathlib import Path
from typing import Optional
from qdrant_client import QdrantClient
from app.config import QDRANT_PATH, QDRANT_HOST, QDRANT_PORT


def _ensure_qdrant_path():
    """Make sure the embedded Qdrant directory exists."""
    qdrant_dir = Path(QDRANT_PATH)
    qdrant_dir.mkdir(parents=True, exist_ok=True)


def _try_remote_client() -> Optional[QdrantClient]:
    """Attempt to connect to a remote Qdrant instance if host info is provided."""
    if not QDRANT_HOST:
        return None

    client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    try:
        # Cheap health check; if it fails we will fall back to embedded mode.
        client.get_collections()
        return client
    except Exception as exc:  # pragma: no cover - defensive logging
        print(f"Remote Qdrant unavailable ({exc}); falling back to embedded storage.")
        return None


@lru_cache(maxsize=1)
def get_qdrant_client() -> QdrantClient:
    """
    Return a cached QdrantClient instance.

    Prefers embedded/local storage but will connect to a remote host when available.
    """
    remote = _try_remote_client()
    if remote:
        return remote

    _ensure_qdrant_path()
    return QdrantClient(path=QDRANT_PATH)

