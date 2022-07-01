import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import NextNProgress from 'nextjs-progressbar'
import MainLayout from '../components/Layouts/MainLayout'
import { ConfigProvider } from 'antd'

ConfigProvider.config({
  theme: {
    primaryColor: '#722ed1',
  },
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <MainLayout>
          <NextNProgress color="#722ed1" height={2} showOnShallow={false} />
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </SessionProvider>
  )
}
