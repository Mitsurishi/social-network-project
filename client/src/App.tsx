import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { AuthPage } from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to='/feed' />} />
        <Route path='/feed' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/favourites' element={<FavouritesPage />} />
      </Routes>
    </>
  )
}

export default App;
