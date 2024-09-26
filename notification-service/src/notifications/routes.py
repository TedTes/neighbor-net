from fastapi import APIRouter , HTTPException
from src.notifications.models import Notification
from src.notifications.services import send_notification

router = APIRouter(prefix="/api/v1")

@router.post("/notify")
async def notify(notification:Notification):
     try:
          send_notification(notification)
          return {"message":"Notification sent!"}
     except Exception as e:
          raise HTTPException(status_code=500, detail=str(e))
    