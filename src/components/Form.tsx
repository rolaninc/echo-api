import Editor from './Editor'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      body: '{}',
    },
  })

  const onSubmit = async (input) => {
    console.log(input)
  }

  useEffect(() => {
    register('body', {
      required: true,
      validate: (body) => {
        try {
          JSON.parse(body)
          return true
        } catch (e) {}
        return false
      },
    })
  }, [register])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 py-4 h-full flex flex-col space-y-4"
    >
      <div className="grow">
        <Editor
          text="{}"
          placeholder="Input expected response from the api here..."
          onChange={async (t) => {
            setValue('body', t)
            await trigger('body')
          }}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          disabled={!isValid}
          className="
          px-3 py-1 rounded-lg border disabled:opacity-25
          text-lg font-semibold text-color border-color
          enabled:hover:bg-gray-100 enabled:dark:hover:bg-gray-800
          enabled:transition enabled:transform enabled:hover:scale-125
          "
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default Form
