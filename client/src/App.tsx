import { Routes, Route, Navigate } from "react-router-dom";
import { FeedPage } from "./pages/FeedPage";
import { AuthPage } from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import { setUser } from "./store/auth/authSlice";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthRequired } from "./components/AuthRequired";


function App() {

  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  useEffect(() => {

    dispatch(setUser(user));

  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/feed' />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/feed' element={<AuthRequired token={user.token}><FeedPage /></AuthRequired>} />
        <Route path='/:id' element={<AuthRequired token={user.token}><ProfilePage /></AuthRequired>} />
      </Routes>
      <ToastContainer />
    </>
  )

}

export default App;
