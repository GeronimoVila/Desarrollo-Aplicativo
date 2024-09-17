export class ConflictError extends Error {
  constructor(paramName) {
    super(`${paramName}`);

    this.paramName = paramName;
  }
}