export interface ApiResponse<T> {
  responseData: T;
  message?: string;
  success?: boolean;
}
