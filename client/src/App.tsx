import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { AuthPage } from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import { setUser } from "./store/auth/authSlice";


function App() {

  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  useEffect(() => {

    dispatch(setUser(user));

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/feed' />} />
        <Route path='/feed' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/favourites' element={<FavouritesPage />} />
      </Routes>
      <ToastContainer />
    </>
  )

}

export default App;
