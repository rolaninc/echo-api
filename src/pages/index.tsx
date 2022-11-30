import Head from 'next/head'

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Head>
        <title>Echo api</title>
        {/*TODO: replace favicon*/}
        <link
          rel="icon"
          href="/Volumes/dev/src/github.com/rolaninc/echo-api/public/favicon.ico"
        />
      </Head>
      <main className="grow">
        <section>
          <h1 className="text-3xl font-black">Echo api</h1>
        </section>
      </main>
      <footer className="">
        <a
          href="https://www.rolan.co.jp"
          target="_blank"
          rel="noopener noreferrer"
        >
          rolan, inc.
        </a>
      </footer>
    </div>
  )
}

export default Page
