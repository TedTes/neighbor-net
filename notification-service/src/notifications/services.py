from src.redis_client import redis_client
from src.notifications.models import Notification
import json


def send_notification(notification:Notification):
    notification_data = json.dumps(notification.dict())
    redis_client.publish('notifications', notification_data)
def get_notification():
    pass