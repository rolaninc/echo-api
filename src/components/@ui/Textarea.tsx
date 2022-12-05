import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from 'react'

type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type Props = {} & TextareaProps //Omit<TextareaProps, 'onKeyDown'>

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  // convert tab key to 2 spaces
  const modified = {
    ...props,
    onKeyDown: (e) => {
      if (e.key === 'Tab' && e.keyCode !== 229) {
        e.preventDefault()
        const target = e.target
        const spaces = '  '
        const { selectionStart, selectionEnd, value } = target
        target.value =
          value.substring(0, selectionStart) +
          spaces +
          value.substring(selectionEnd, value.length)
        target.setSelectionRange(
          selectionStart + spaces.length,
          selectionStart + spaces.length
        )
      } else {
        if (props.onKeyDown) {
          props.onKeyDown(e)
        }
      }
    },
  }
  return <textarea ref={ref} {...modified} />
})

Textarea.displayName = 'Textarea'

export default Textarea
