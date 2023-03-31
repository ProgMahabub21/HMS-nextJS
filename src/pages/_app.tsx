import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      {/* <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 text-center bg-green-400 lg:col-span-3 rounded-2xl dark:bg-dark-500 dark:shadow-custom-dark ">
          <h1 className="bg-dark-500">SideBar</h1>
        </div>
        <div className="col-span-12 text-center bg-green-400 lg:col-span-9 rounded-2xl dark:bg-dark-500 dark:shadow-custom-dark ">
          <h1 className="bg-dark-500">Main Body</h1>
        </div>

      </div> */}


      <Component {...pageProps} />

    </>
  )
}
