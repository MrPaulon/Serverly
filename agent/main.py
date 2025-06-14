from fastapi import FastAPI, Depends
from utils.executor import run_command
from utils.info import get_system_info
from middleware.auth import verify_token
from utils.console import router as console_router
from config import AGENT_PORT, AGENT_IP

app = FastAPI()

@app.post("/run")
async def run(cmd: dict, auth: bool = Depends(verify_token)):
    return await run_command(cmd["cmd"])

@app.get("/metrics")
async def run(auth: bool = Depends(verify_token)):
    return await get_system_info()

app.include_router(console_router, prefix="/console")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=AGENT_IP, port=AGENT_PORT)