export class AuthServiceError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);

    this.name = this.constructor.name;

    this.statusCode = statusCode;

    // Capture the stack trace to maintain the location of the error
    Error.captureStackTrace(this, this.constructor);
  }

  public static unauthorized(
    message: string = "Unauthorized"
  ): AuthServiceError {
    return new AuthServiceError(message, 401);
  }

  public static badRequest(message: string = "Bad Request"): AuthServiceError {
    return new AuthServiceError(message, 400);
  }

  public static internal(
    message: string = "Internal Server Error"
  ): AuthServiceError {
    return new AuthServiceError(message, 500);
  }
}
