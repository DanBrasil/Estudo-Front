import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/Home/HomePage'
import { ROUTES } from './routes'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
