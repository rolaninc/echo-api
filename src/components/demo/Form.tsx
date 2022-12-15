import { useForm } from 'react-hook-form'
import Textarea from '../@ui/Textarea'
import Icon from '../@ui/Icon'
import Tooltip from '../@ui/Tooltip'
import { useCallback, useEffect } from 'react'

export type Input = {
  body: string
}

type Props = {
  template?: string
  onSubmit: (input: Input) => Promise<boolean>
  shouldReset?: boolean
}

const Form = (props: Props) => {
  const { shouldReset, onSubmit: submit } = props
  const template = props.template ?? ''

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<Input>({
    defaultValues: {
      body: template,
    },
  })

  const onSubmit = useCallback(
    async (input) => {
      const ret = await submit(input)
      if (ret && shouldReset) {
        reset()
      }
    },
    [reset, submit, shouldReset]
  )

  const validation = (body?: string) => {
    // Oops...Do I have to handle errors by myself??
    clearErrors('body')
    if (body) {
      try {
        JSON.parse(body)
        return true
      } catch (e) {
        setError('body', { type: 'format', message: e.message })
      }
    }
    return false
  }

  const body = watch('body')
  const format = useCallback(() => {
    try {
      const data = JSON.parse(body)
      setValue('body', JSON.stringify(data, undefined, 2))
    } catch (e) {}
  }, [body, setValue])

  const clearInput = useCallback(() => {
    reset()
  }, [reset])

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'f' && e.metaKey && e.shiftKey) {
        e.preventDefault()
        format()
      } else if (e.key === 'Dead' && e.metaKey && e.altKey) {
        e.preventDefault()
        clearInput()
      } else if (e.key === 'Enter' && e.altKey) {
        if (isValid) {
          e.preventDefault()
          handleSubmit(onSubmit)(e)
        }
      }
    },
    [format, clearInput, handleSubmit, onSubmit, isValid]
  )
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  useEffect(() => {
    reset({ body: template })
  }, [reset, template])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col space-y-4 px-6 py-4"
    >
      {/*Editor*/}
      <div
        className="secondary-background-color relative grow rounded-lg"
        tabIndex={0}
      >
        {/*Header*/}
        <div className="border-color flex h-[44px] w-full items-center justify-end border-b bg-transparent px-4">
          <div className="flex items-center space-x-2">
            <Tooltip
              title="New Template"
              description="cmd + opt + n"
              className="!bg-sky-500"
            >
              <button
                type="button"
                onClick={clearInput}
                disabled={!isDirty}
                className="
                rounded-lg p-1 enabled:hover:bg-gray-100
                disabled:opacity-25 enabled:dark:hover:bg-gray-700
                "
              >
                <Icon variant="codePlus" className="h-[20px] w-[20px]" />
              </button>
            </Tooltip>

            <Tooltip
              title="Format"
              description="cmd + shift + f"
              className="!bg-sky-500"
            >
              <button
                type="button"
                onClick={format}
                disabled={!isValid}
                className="
                rounded-lg p-1 enabled:hover:bg-gray-100
                disabled:opacity-25 enabled:dark:hover:bg-gray-700
                "
              >
                <Icon variant="code" className="h-[20px] w-[20px]" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/*Text Input*/}
        <Textarea
          {...register('body', {
            required: true,
            validate: validation,
          })}
          aria-invalid={errors.body ? 'true' : 'false'}
          placeholder="Create your request as JSON format"
          className="code h-[calc(100%-44px)] w-full resize-none rounded-b-lg bg-transparent px-4 pb-4 pt-2"
        />

        {/*Error message*/}
        {errors.body?.message && (
          <div
            className="
            absolute left-[8px] bottom-[8px] flex w-[calc(100%-16px)] items-center justify-center rounded-lg bg-destructive-500 px-3
            py-2 font-mono
            text-sm text-white dark:bg-destructive-dark-500
            "
          >
            <p>{errors.body.message}</p>
          </div>
        )}
      </div>

      {/*Submit Button*/}
      <div className="flex items-center justify-center">
        <Tooltip
          title="Send request"
          description="opt + return"
          className="!bg-sky-500"
        >
          <button
            type="submit"
            disabled={!isValid}
            className="
            text-color border-color {/*enabled:transition enabled:hover:scale-125*/} rounded-lg
            border px-3 py-1 text-sm
            font-semibold enabled:transform
            enabled:hover:bg-gray-100 disabled:opacity-25 enabled:dark:hover:bg-gray-700
            "
          >
            Send
          </button>
        </Tooltip>
      </div>
    </form>
  )
}

export default Form
