import { z } from "zod";

const titleSchema = z.string().min(1).max(255);

const contentSchema = z.string().min(1);

const authorIdSchema = z.string();

const publishedSchema = z.boolean();

export const postIdSchema = z.string();

export const postSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  authorId: authorIdSchema,
  published: publishedSchema,
});

export const updatePostSchema = postSchema.extend({
  id: postIdSchema,
});
