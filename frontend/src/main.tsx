import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx'
import MyRoutes from './router/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0ProviderWithNavigate>
      <MyRoutes />
    </Auth0ProviderWithNavigate>
  </StrictMode>,
)
