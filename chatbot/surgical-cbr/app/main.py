"""FastAPI application main entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import DB_DIR
from app.db import case_store
from app.api import routes_cases, routes_query, routes_synthetic, routes_admin

# Initialize database on startup
case_store.init_sqlite()
case_store.init_qdrant()

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
    from app.config import DB_PATH, QDRANT_HOST, QDRANT_PORT
    print("Surgical CBR API started")
    print(f"Database: {DB_PATH}")
    print(f"Qdrant: {QDRANT_HOST}:{QDRANT_PORT}")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Surgical CBR API",
        "version": "1.0.0",
        "docs": "/docs"
    }

