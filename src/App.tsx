import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from '@/components/layout/page-shell'
import { HomePage } from '@/pages/home'
import { DirectionPage } from '@/pages/direction'
import { CinematographyPage } from '@/pages/cinematography'
import { PhotographyPage } from '@/pages/photography'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/film" element={<DirectionPage />} />
          <Route path="/immersive" element={<CinematographyPage />} />
          <Route path="/stills" element={<PhotographyPage />} />
          <Route path="/direction" element={<Navigate to="/film" replace />} />
          <Route path="/cinematography" element={<Navigate to="/immersive" replace />} />
          <Route path="/photography" element={<Navigate to="/stills" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
