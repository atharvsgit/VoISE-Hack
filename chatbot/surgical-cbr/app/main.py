"""FastAPI application main entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import DB_DIR
from app.db import case_store
from app.api import routes_cases, routes_query, routes_synthetic, routes_admin

app = FastAPI(
    title="Surgical CBR API",
    description="Case-Based Reasoning API for Surgical Pre-planning",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routes_cases.router, prefix="/api/v1")
app.include_router(routes_query.router, prefix="/api/v1")
app.include_router(routes_synthetic.router, prefix="/api/v1")
app.include_router(routes_admin.router, prefix="/api/v1")


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup."""
    from app.config import DB_PATH, QDRANT_HOST, QDRANT_PORT, QDRANT_PATH
    case_store.init_sqlite()
    case_store.init_qdrant()
    print("Surgical CBR API started")
    print(f"Database: {DB_PATH}")
    if QDRANT_HOST:
        print(f"Qdrant: {QDRANT_HOST}:{QDRANT_PORT}")
    else:
        print(f"Qdrant (embedded): {QDRANT_PATH}")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Surgical CBR API",
        "version": "1.0.0",
        "docs": "/docs"
    }

