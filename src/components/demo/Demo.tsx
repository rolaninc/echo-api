import Form, { Input } from './Form'
import { client } from '../../lib/http'

const Demo = () => {
  const onSubmit = async (input: Input) => {
    try {
      const data = JSON.parse(input.body)
      const ret = await client.post('/api/echo', data)
      console.log(JSON.stringify(ret.headers, undefined, 2))
      console.log(JSON.stringify(ret.data, undefined, 2))
      return true
    } catch (e) {
      console.error(e)
    }
    return false
  }

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Form onSubmit={onSubmit} />
      </div>
      <div className="bg-blue-200">Output</div>
    </div>
  )
}

export default Demo
