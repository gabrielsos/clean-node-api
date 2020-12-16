import { httpResponse } from '../protocols/http'

export const badRequest = (error): httpResponse => ({
  statusCode: 400,
  body: error
})
