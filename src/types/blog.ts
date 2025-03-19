export interface Author {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
}

export interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  images?: string[];
  upvotes: number;
  downvotes: number;
  readTime?: string;
  isHidden?: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author;
  categories: { id: string; name: string }[];
  comments: Comment[];
  commentCount: number;
}

export interface BlogsResponse {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  readTime?: string;
  categoryIds?: string[];
  isHidden?: boolean;
}
