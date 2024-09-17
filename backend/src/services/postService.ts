import { Post } from "../models/Post";
interface postType extends Document {
  author: string;
  content: string;
  media: string[];
  likes: string[];
  comments: [
    {
      commenter: string;
      comment: string;
      timestamp: Date;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}
export const getAllPosts = async () => {
  return await Post.find();
};

export const getPostById = async (id: string) => {
  return await Post.findById(id);
};

export const createPost = async (postData: postType) => {
  const post = new Post(postData);
  return await post.save();
};

export const updatePost = async (id: string, updateData: postType) => {
  return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

export const deletePost = async (id: string) => {
  return await Post.findByIdAndDelete(id);
};
