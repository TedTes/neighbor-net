from pydantic import BaseModel
class Notification(BaseModel):
    recipient_id:str
    message: str