export interface IPostRequest {
  title: string;
  content: string;
  authorId: string;
  published: boolean;
}

export interface IUpdatePostRequest extends IPostRequest {
  id: string;
}
