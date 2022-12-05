import { BadRequest } from '../errors/bad-request'
import { Types } from '../../utils/types'
import { transform, Transformer } from './transform/transform'
import { sanitizer } from './transform/sanitizer'
import { dateTransformer } from './transform/date-transformer'

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

const tools: Transformer[] = [dateTransformer, sanitizer]

const echo = (req: EchoRequest): EchoResponse => {
  // EchoRequest(api request's body) must contain JSON OBJECT {}.
  if (!Types.isObject(req)) {
    throw new BadRequest(`You must post JSON object starts with {}.`)
  }

  const statusCode = req.statusCode ?? 200
  const body = transform(req.body ?? req, tools)
  const headers = req.headers ? transform(req.headers, tools) : undefined
  const duration = req.options?.duration
  return { statusCode, body, headers, duration }
}

const example = {
  statusCode: 200,
  body: {
    message: 'Hello, Echo.API',
  },
  headers: {
    'x-echo': 'echo/api',
  },
  options: {
    duration: 0,
  },
}

export { echo, example }
