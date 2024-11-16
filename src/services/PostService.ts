import PostRepo from "@src/repos/PostRepo";
import { IPostRequest, IUpdatePostRequest } from "@src/types/Post";

const add = async (post: IPostRequest) => {
  const newPost = await PostRepo.createPost(post);

  return {
    post: newPost,
  };
};

const getAll = async () => {
  const posts = await PostRepo.getAll();

  return {
    posts: posts,
  };
};

const update = async (post: IUpdatePostRequest) => {
  const newPost = await PostRepo.updatePost(post);

  return {
    post: newPost,
  };
};

const delete_ = async (postId: string) => {
  await PostRepo.deletePost(postId);

  return "deleted post";
};

export default {
  add,
  getAll,
  update,
  delete: delete_,
} as const;
