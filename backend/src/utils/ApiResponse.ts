export class ApiResponse<T = any> {
  public success: boolean;
  public message: string;
  public data: T;
  public meta?: any;

  constructor(statusCode: number, data: T, message = 'Success', meta?: any) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (meta) {
      this.meta = meta;
    }
  }
}
