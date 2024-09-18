from fastapi import FastAPI 
from src.notifications.routes import router as notifications_router

app = FastAPI()

app.include_router(notifications_router)

@app.get("/")
async def root():
    return {"message", "welcome to the Notification Service"}