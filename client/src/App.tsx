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
import { FriendsPage } from "./pages/FriendsPage";
import { NotFoundPage } from "./pages/NotFoundPage";


function App() {

  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {

    dispatch(setUser(user));

  }, [dispatch, user])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to='/feed' />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<AuthRequired />}>
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/user/:id' element={<ProfilePage />} />
          <Route path='/friends' element={<FriendsPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes >
    </>
  )

}

export default App;
