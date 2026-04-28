import logging
import time
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("firewall-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Cloud-Native Firewall API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/policies")
def get_policies():
    return [
        {"id": 1, "name": "Global-Egress-Policy", "platform": "Azure", "status": "Deployed", "rules": 45},
        {"id": 2, "name": "K8s-Microsegmentation", "platform": "Kubernetes", "status": "Draft", "rules": 12},
        {"id": 3, "name": "Perimeter-Defense", "platform": "AWS", "status": "Drift-Detected", "rules": 89}
    ]

@app.get("/threats")
def get_threats():
    return [
        {"id": "TH-99", "source": "CrowdStrike", "type": "Botnet IP", "value": "185.122.1.4", "severity": "High"},
        {"id": "TH-100", "source": "Cisco Talos", "type": "Malware C2", "value": "malicious-domain.com", "severity": "Critical"}
    ]

@app.get("/compliance/summary")
def get_compliance_summary():
    return {
        "pci_dss": "94%",
        "soc2": "100%",
        "hipaa": "88%",
        "last_audit": "2026-04-27T12:00:00Z"
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_active_rules": 1450,
        "blocked_threats_24h": 12400,
        "drift_incidents": 2,
        "policy_sync_health": "Healthy"
    }
