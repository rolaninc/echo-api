import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import Toast from '../components/@ui/Toast'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toast>
        <Component {...pageProps} />
      </Toast>
      <Analytics />
    </>
  )
}

export default App
