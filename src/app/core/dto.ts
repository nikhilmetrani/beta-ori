export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export interface PageRequest {
  page: number;
  size: number;
}

export interface NewUserParams {
  email?: string;
  password?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
}
