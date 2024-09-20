export const db = {
  port: process.env.PORT || 3000,
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    `mongodb://root:123@mongodb:27017/neighbor-net?authSource=admin&directConnection=true&serverSelectionTimeoutMS=10000`,
};
