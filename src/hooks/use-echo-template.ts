import useSWR from 'swr'
import { client } from '../lib/http'

const useEchoTemplate = () => {
  const { data, error, mutate } = useSWR(`/api/echo`, (url) => client.get(url))
  return {
    data: data?.data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}

export { useEchoTemplate }
