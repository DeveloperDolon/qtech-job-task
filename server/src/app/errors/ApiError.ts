class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    
    if (stack) {
      this.stack = stack;
    } else {
      Object.setPrototypeOf(this, this.constructor);
    }
  }
}

export default ApiError;