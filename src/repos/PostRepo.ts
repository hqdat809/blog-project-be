import { prisma } from "@src/config/db";
import { IPostRequest, IUpdatePostRequest } from "@src/types/Post";

const createPost = async (postDetails: IPostRequest) => {
  return await prisma.post.create({
    data: {
      title: postDetails.title,
      content: postDetails.content,
      authorId: postDetails.authorId,
      published: postDetails.published,
    },
  });
};

const getAll = async () => {
  return await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
    },
  });
};

const updatePost = async (postDetails: IUpdatePostRequest) => {
  return await prisma.post.update({
    where: {
      id: postDetails.id,
    },
    data: {
      title: postDetails.title,
      content: postDetails.content,
      authorId: postDetails.authorId,
      published: postDetails.published,
    },
  });
};

const delete_ = async (postId: string) => {
  return await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

export default {
  createPost,
  getAll,
  updatePost,
  deletePost: delete_,
} as const;
