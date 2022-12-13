import { BadRequest } from '../errors/bad-request'
import { transform, Transformer } from './transform/transform'
import { dateTransformer } from './transform/date'
import { emailTransformer } from './transform/email'
import { idTransformer } from './transform/id'
import { imageTransformer } from './transform/image'
import { loremTransformer } from './transform/lorem'
import { metaTransformer } from './transform/meta'
import { nameTransformer } from './transform/name'
import { sanitizer } from './transform/sanitizer'
import { isObject } from '../../utils/types'

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

const tools: Transformer[] = [
  dateTransformer,
  emailTransformer,
  idTransformer,
  imageTransformer,
  loremTransformer,
  metaTransformer,
  nameTransformer,
  sanitizer,
]

const echo = (req: EchoRequest): EchoResponse => {
  // EchoRequest(api request's body) must contain JSON OBJECT {}.
  if (!isObject(req)) {
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
    __meta__: {
      users: {
        l: {
          count: 10,
        },
      },
    },
    users: {
      id: '--id',
      email: '--email@@name',
      name: '--name',
      thumb: '--img@@/256/hex_00f_f00_0f0.png',
      created: '--unix@@-604800',
      updated: '--iso@@-86400',
    },
  },
  headers: {
    'x-echo': 'echo/api',
  },
  options: {
    duration: 0,
  },
}

export { echo, example }
