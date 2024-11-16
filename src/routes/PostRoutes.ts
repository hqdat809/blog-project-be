import HttpStatusCodes from "@src/common/HttpStatusCodes";
import {
  postIdSchema,
  postSchema,
  updatePostSchema,
} from "@src/schema/post.schema";
import PostService from "@src/services/PostService";
import catchErrors from "@src/util/catchErrors";
import { IReq, IRes } from "./common/types";

const add = catchErrors(async (req: IReq, res: IRes) => {
  const request = postSchema.parse({
    ...req.body,
  });

  const { post } = await PostService.add(request);

  res.status(HttpStatusCodes.OK).json(post);
});

const getAll = catchErrors(async (req: IReq, res: IRes) => {
  const { posts } = await PostService.getAll();

  res.status(HttpStatusCodes.OK).json(posts);
});

const update = catchErrors(async (req: IReq, res: IRes) => {
  const request = updatePostSchema.parse({
    ...req.body,
  });
  const { post } = await PostService.update(request);

  res.status(HttpStatusCodes.OK).json(post);
});

const _delete = catchErrors(async (req: IReq, res: IRes) => {
  const request = postIdSchema.parse(req.params.postId);
  await PostService.delete(request);

  res.status(HttpStatusCodes.OK).json("success");
});

export default {
  add,
  getAll,
  update,
  delete: _delete,
} as const;
