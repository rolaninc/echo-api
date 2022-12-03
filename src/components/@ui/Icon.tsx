import {
  TbAlertCircle,
  TbAlertTriangle,
  TbCircleCheck,
  TbCode,
  TbCodePlus,
  TbCopy,
  TbInfoCircle,
  TbX,
} from 'react-icons/tb'

const _VARIANTS = {
  close: (css?: string) => <TbX className={css} />,
  code: (css?: string) => <TbCode className={css} />,
  codePlus: (css?: string) => <TbCodePlus className={css} />,
  copy: (css?: string) => <TbCopy className={css} />,

  success: (css?: string) => <TbCircleCheck className={css} />,
  error: (css?: string) => <TbAlertCircle className={css} />,
  warning: (css?: string) => <TbAlertTriangle className={css} />,
  info: (css?: string) => <TbInfoCircle className={css} />,
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
