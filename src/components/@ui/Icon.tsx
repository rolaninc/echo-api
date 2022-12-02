import { TbCopy, TbX } from 'react-icons/tb'

const _VARIANTS = {
  close: (css?: string) => <TbX className={css} />,
  copy: (css?: string) => <TbCopy className={css} />,
}
export type IconVariant = keyof typeof _VARIANTS

export const icon = (variant: IconVariant, css?: string) =>
  _VARIANTS[variant](css)

type Props = {
  variant: IconVariant
  className?: string
}

const Icon = (props: Props) => {
  const { variant, className } = props
  return <>{icon(variant, className)}</>
}

export default Icon
