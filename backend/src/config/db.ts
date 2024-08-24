export const db = {
  port: process.env.PORT || 3000,
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    `mongodb://localhost:27017/neighbors-net`,
};
