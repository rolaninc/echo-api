import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Toast from '../components/@ui/Toast'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Toast>
      <Component {...pageProps} />
    </Toast>
  )
}

export default App
