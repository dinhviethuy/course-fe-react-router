export interface SuccessResponse<T> {
  message: string;
  data: T;
  statusCode: number;
};

type ErrorMessage = string | Array<{
  path: string;
  message: string;
  [key: string]: any;
}>;

export type ErrorResponse = {
  message: ErrorMessage;
  error: string;
  statusCode: number;
};