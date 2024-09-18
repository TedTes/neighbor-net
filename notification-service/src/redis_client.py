import redis
from src.config import Config

redis_client = redis.StricRedis(
    host=Config.REDIS_HOST,
    port=Config.REDIS_PORT,
    db = 0
)