import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Demo from '../components/demo/Demo'

const Page = () => {
  return (
    <div className="background-color text-color h-screen w-screen">
      <Head>
        <title>Echo.api</title>
        {/*TODO: replace favicon*/}
      </Head>
      <header className="h-[64px]">
        <Header />
      </header>
      <main className="h-[calc(100%-108px)]">
        <div className="h-full">
          <Demo />
        </div>
      </main>
      <footer className="h-[44px]">
        <Footer />
      </footer>
    </div>
  )
}

export default Page
