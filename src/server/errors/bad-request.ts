import { ApiError } from './api-error'

export class BadRequest extends ApiError {
  constructor(public message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }

  statusCode = 400
  serializeErrors() {
    return [{ message: this.message }]
  }
}
