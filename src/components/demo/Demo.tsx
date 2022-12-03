import Form, { Input } from './Form'
import { useToast } from '../@ui/Toast'
import { useEchoTemplate } from '../../hooks/use-echo-template'
import { client } from '../../lib/http'

const Demo = () => {
  const { data } = useEchoTemplate()
  const toast = useToast()

  const onSubmit = async (input: Input) => {
    try {
      const data = JSON.parse(input.body)
      const ret = await client.post('/api/echo', data)
      console.log(JSON.stringify(ret.headers, undefined, 2))
      console.log(JSON.stringify(ret.data, undefined, 2))
      toast({
        title: 'Echo 🚀',
        status: 'success',
      })
      return true
    } catch (e) {
      toast({
        title: 'Echo 💣',
        description: e.message,
        status: 'error',
      })
    }
    return false
  }

  const template = data ? JSON.stringify(data, undefined, 2) : '{}'

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Form template={template} onSubmit={onSubmit} />
      </div>
      <div className="bg-blue-200">Output</div>
    </div>
  )
}

export default Demo
