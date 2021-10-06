import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

// o _app RODA TODA VEZ QUE ALGUÉM CLICA NUMA ROTA
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
