import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { client } from '../../lib/http'
import { genUIKey } from '../../generators/gen-id'
import { useEchoTemplate } from '../../hooks/use-echo-template'
import { useToast } from '../@ui/Toast'
import Form, { Input } from './Form'
import History, { Item } from './History'

const Demo = () => {
  const { data } = useEchoTemplate()
  const toast = useToast()

  const [items, setItems] = useState<Item[]>([])

  const onSubmit = async (input: Input) => {
    let item = { id: genUIKey(), status: 'pending' } as Item
    setItems((p) => [item, ...p])

    try {
      const data = JSON.parse(input.body)
      const res = await client.post('/api/echo', data)

      setItems((p) =>
        p.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              code: res.status,
              body: JSON.stringify(res.data, undefined, 2),
              headers: JSON.stringify(res.headers, undefined, 2),
              status: 'success',
            }
          }
          return i
        })
      )
      toast({
        title: 'Echo 🚀',
        status: 'success',
      })
      return true
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status
        const body = e.response?.data
        const headers = e.response?.headers
        setItems((p) =>
          p.map((i) => {
            if (i.id === item.id) {
              return {
                ...i,
                code,
                body: body ? JSON.stringify(body, undefined, 2) : undefined,
                headers: headers
                  ? JSON.stringify(headers, undefined, 2)
                  : undefined,
                message: e.message,
                status: 'error',
              }
            }
            return i
          })
        )
      }
      toast({
        title: 'Echo 💣',
        description: e.message,
        status: 'error',
      })
    }
    return false
  }

  // keep only last 20 api call's results right now
  useEffect(() => {
    const maxItemCount = 20
    if (items.length > maxItemCount) {
      setItems(items.slice(0, maxItemCount))
    }
  }, [items])

  const template = data ? JSON.stringify(data, undefined, 2) : ''
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-0">
      <div className="min-h-[480px]">
        <Form template={template} onSubmit={onSubmit} />
      </div>
      <div className="overflow-auto">
        <History items={items} />
      </div>
    </div>
  )
}

export default Demo
