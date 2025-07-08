import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ShortenPage from '../pages/ShortenPage'
import StatsPage from '../pages/StatsPage'
import RedirectHandler from '../pages/RedirectHandler'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShortenPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  )
}

export default AppRoutes
