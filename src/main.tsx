import { App as AntApp, ConfigProvider, theme } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#f5c518',
            colorBgBase: '#141414',
            colorText: '#f5f5f5',
            colorTextSecondary: '#d2d2d2',
            colorBorder: '#262626',
            colorBgContainer: '#1a1a1a',
            borderRadius: 10,
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          },
        }}
      >
        <AntApp>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
