import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { ApiError } from '../../server/errors/api-error'
import { sleep } from '../../utils/timer'
import { echo, example } from '../../server/echo/echo'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .get((req, res) => {
    res.json(example)
  })
  .post(async (req, res) => {
    //TODO: I should validate to incoming contents ...maybe
    const { statusCode, body, headers, duration } = echo(req.body)
    if (headers) {
      Object.entries(headers).forEach(([k, v]) => {
        res.setHeader(k, v)
      })
    }
    if (duration) {
      await sleep(duration)
    }
    res.status(statusCode).json(body)
  })

export default router.handler({
  onError: (err, req, res) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ errors: err.serializeErrors() })
    }
    return res.status(500).json({
      errors: [{ message: 'Something went wrong 🤖' }],
    })
  },
  onNoMatch: (req, res) => {
    return res.status(404).json({
      errors: [{ message: 'Not Found 🍐' }],
    })
  },
})
