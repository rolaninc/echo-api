import Icon from './@ui/Icon'

const Footer = () => {
  return (
    <div className="h-full flex justify-between items-center">
      <div />
      <div className="px-6 py-1">
        <a
          href="https://github.com/tom-e-kid/echo-api"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <span className="flex items-center space-x-1 hover:scale-150 transition-transform font-medium text-xs">
            <Icon variant="github" />
            <p>GitHub</p>
          </span>
        </a>
      </div>
      <div />
    </div>
  )
}

export default Footer
