'use client'

import useTheme from '@modules/hooks/useTheme'
import { ConfigProvider, theme as themeConfig } from 'antd'
import { useMemo } from 'react'

export const ThemeProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [theme] = useTheme()

  const algorithm = useMemo(() => {
    return theme === 'dark'
      ? themeConfig.darkAlgorithm
      : themeConfig.defaultAlgorithm
  }, [theme])

  const token = themeConfig.getDesignToken({ algorithm })

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: '#722ed1',
          colorInfo: '#722ed1',
          fontSize: 16,
        },
        components: {
          Layout: {
            footerBg: token.colorBgContainer,
            headerBg: token.colorBgContainer,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

/**
 * @deprecated only for pages router and will be replaced in app router
 */
export const ThemeProvider_pages: React.FC<{
  children?: React.ReactNode
  pageProps?: { [x: string]: any }
}> = ({ children, pageProps }) => {
  const [theme] = useTheme()

  const algorithm = useMemo(() => {
    return theme === 'dark'
      ? themeConfig.darkAlgorithm
      : themeConfig.defaultAlgorithm
  }, [theme])

  const token = themeConfig.getDesignToken({ algorithm })

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: '#722ed1',
          colorInfo: '#722ed1',
          fontSize: 16,
        },
        components: {
          Layout: {
            footerBg: token.colorBgContainer,
            headerBg: token.colorBgContainer,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
