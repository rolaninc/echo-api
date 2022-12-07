import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { client } from '../../lib/http'
import { Types } from '../../utils/types'
import { BadRequest } from '../../server/errors/bad-request'

const Page = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const {} = props
  return <></>
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ param: string[] }>
) => {
  const { res, params } = context
  try {
    const query = buildQuery(params!.param)
    const url = process.env.IMAGES_URL ?? 'http://localhost:4040'
    const serviceResponse = await client.get(url + '/api/v1/images', {
      responseType: 'arraybuffer',
      params: query,
    })
    const data = serviceResponse.data
    const type = serviceResponse.headers['content-type'] ?? 'images/unknown'
    res.setHeader('Content-Type', type)
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
    )
    res.end(data, 'binary')
    return {
      props: {},
    }
  } catch (e) {
    console.error(e)
  }
  return {
    notFound: true,
  }
}

type Query = {
  format?: string
  width?: number
  height?: number
  background_color?: string
  border_color?: string
  text_color?: string
  label?: string
}

const parseFormat = (s: string) => {
  const components = s.split('.')
  if (components.length > 1) {
    let f = components[components.length - 1]!.toLowerCase()
    if (f === 'jpg') {
      f = 'jpeg'
    }
    return f
  }
  return undefined
}

const parseSize = (s: string) => {
  const n = +s
  if (Types.isNumber(n) && n > 0 && n <= 2048) {
    return n
  }
  return undefined
}

const parseHexColors = (s: string) => {
  if (s.startsWith('hex_')) {
    return s.slice(4).split('_')
  }
  return []
}

const parseLabel = (s: string) => {
  if (s.length > 0) {
    return s.split('_').join(' ')
  }
  return undefined
}

const buildQuery = (params: string[]): Query => {
  // TODO: look for more efficient way...
  let ps = params
  if (!ps || !Types.isArray(ps) || ps.length === 0 || ps.length > 4) {
    throw new BadRequest(`unexpected parameters`)
  }

  // get format
  const format = parseFormat(ps[ps.length - 1]!)
  if (format) {
    // cut format from last param
    const p = ps[ps.length - 1]!
    ps[ps.length - 1] = p.replace(/\.[^/.]+$/, '')
  }

  let height: number | undefined = undefined
  let label: string | undefined = undefined
  let colors: string[] = []

  // get width
  const width = parseSize(ps[0]!)
  ps = ps.slice(1)

  // get height
  if (ps.length > 0) {
    height = parseSize(ps[0]!)
    if (height) {
      ps = ps.slice(1)
    }
  }

  // get color or label #1 ... these are unordered :(
  if (ps.length > 0) {
    colors = parseHexColors(ps[0]!)
    if (colors.length === 0) {
      label = parseLabel(ps[0]!)
    }
    if (colors.length > 0 || label) {
      ps = ps.slice(1)
    }
  }
  // get color or label #2
  if (ps.length > 0) {
    if (colors.length > 0) {
      label = parseLabel(ps[0]!)
    } else if (label) {
      colors = parseHexColors(ps[0]!)
    }
  }

  return {
    format,
    width,
    height,
    background_color: colors.length > 0 ? colors[0] : undefined,
    border_color: colors.length > 1 ? colors[1] : undefined,
    text_color: colors.length > 2 ? colors[2] : undefined,
    label,
  }
}

export default Page
