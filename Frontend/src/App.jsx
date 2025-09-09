import './css/App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import MyWatchList from './pages/MyWatchList'
import {Routes, Route, Link} from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <MovieProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<MyWatchList />} />
        </Routes>
      </main>
    </MovieProvider>

  )
}

export default App
