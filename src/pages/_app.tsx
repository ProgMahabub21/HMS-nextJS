import Sidenav from '@/components/Layout/sidenav'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {


  const router = useRouter();

  const hideSideBar = [
    '/admin',
    '/Patients',
  ]

  if (hideSideBar.includes(router.pathname)) {
    return <>  <Component {...pageProps} /></>;
  }

  return (
    <>
      <Sidenav>
        <Component {...pageProps} />
      </Sidenav>

    </>
  )
}


