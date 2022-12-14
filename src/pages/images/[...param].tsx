import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { client } from '../../lib/http'
import { buildQuery } from '../../server/images/query'

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
    const url = process.env.IMAGES_URL ?? 'http://localhost:4040'
    const serviceResponse = await client.get(url + '/api/v1/images', {
      responseType: 'arraybuffer',
      params: buildQuery(params!.param),
    })
    const data = serviceResponse.data
    const type = serviceResponse.headers['content-type'] ?? 'images/unknown'
    res.setHeader('Content-Type', type)

    // a year = 31536000
    // a month(30 days) = 2592000
    // a week = 604800
    // a day = 86400
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=604800, max-age=604800'
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

export default Page
