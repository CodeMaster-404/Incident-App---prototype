export interface Payload<T> {
  data: T
}

export interface ApiResponse<T> {
  success: boolean,
  payload: Payload<T>,
  message: string,
  error_code: number
}
