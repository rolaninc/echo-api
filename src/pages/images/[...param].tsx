import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { generate, parseParams } from '../../server/images/generator'

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
    const input = parseParams(params!.param)
    const b = await generate(input)
    res.setHeader('Content-Type', `image/${input.format}`)
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
    )
    res.end(b, 'binary')
    return {
      props: {},
    }
  } catch (e) {}
  return {
    notFound: true,
  }
}

export default Page
