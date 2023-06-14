import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { Navbar } from "./components/Navbar";
import { AuthPage } from "./pages/AuthPage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/favourites' element={<FavouritesPage />} />
      </Routes>
    </>
  )
}

export default App;
