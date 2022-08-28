export class AppError {
  statusCode: number;
  message: string;
  image: string;

  constructor(message: string, statusCode: number = 400, image: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.image = image;
  }
}
