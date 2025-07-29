export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const createError = (status: number, message: string) => {
  return new ApiError(status, message);
};
