declare module "news-feed-service-type-extension" {
  interface Socket {
    currentChannel?: string;
  }
}

declare namespace Express {
  interface Request {
    user: { userId: string };
  }
}
interface IPost {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  likes: string[];
  comments: {
    userId: string;
    content: string;
    createdAt: Date;
  }[];
}

interface IUser {
  id: string;
  username: string;
}

interface UserState {
  requestCount: number;
}
