import Icon from './@ui/Icon'

const Footer = () => {
  return (
    <div className="flex h-full items-center justify-between text-xs font-medium">
      <div className="px-6 py-1">
        <p className="">
          Don&apos;t worry, I <span className="font-black">NEVER</span> collect
          any data 🙈
        </p>
      </div>
      <div className="px-6 py-1">
        <a
          href="https://github.com/tom-e-kid/echo-api"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <span className="flex items-center space-x-1 transition-transform hover:scale-150">
            <Icon variant="github" />
            <p>GitHub</p>
          </span>
        </a>
      </div>
    </div>
  )
}

export default Footer
