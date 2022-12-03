import { convert } from './converter'
import { dateConverter } from './date-converter'

export type EchoRequest = {
  statusCode?: number
  body: {
    [key: string]: any
  }
  headers?: {
    [key: string]: string
  }
  options?: {
    duration?: number
  }
}

type EchoResponse = {
  statusCode: number
  body: {
    [key: string]: any
  }
  headers?: {
    [key: string]: string
  }
  duration?: number
}

const echo = (req: EchoRequest): EchoResponse => {
  const statusCode = req.statusCode ?? 200
  const body = convert(req.body ?? req, [dateConverter])
  const headers = req.headers
  const duration = req.options?.duration
  return { statusCode, body, headers, duration }
}

const example = {
  statusCode: 200,
  body: {
    message: 'the body object will return back from the api as a response body',
  },
  headers: {
    'x-custom': 'echo/custom-header-value',
  },
  options: {
    duration: 500,
  },
}

export { echo, example }
