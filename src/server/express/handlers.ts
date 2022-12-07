import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from '../errors/api-error'

export const onError = (
  err: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() })
  }
  return res.status(500).json({
    errors: [{ message: 'Something went wrong 🤖' }],
  })
}

export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(404).json({
    errors: [{ message: 'Not Found 🍐' }],
  })
}
