import { useState,useEffect } from 'react';
import {  useDispatch} from 'react-redux';
import {service} from './appWrite/auth'
import {Login,LogOut} from './store/authSlice'
import {Header,Footer, Loader} from './compounents'
import {Outlet} from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    service.CurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(Login(userData));
        } else {
          dispatch(LogOut());
        }
      })
      .catch((e) => {
        console.error('Session check failed:', e);
        dispatch(LogOut());
      })
      .finally(() => {
        setloading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className='h-screen bg-gray-500 flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-500 flex flex-wrap content-between'>
      <div className='w-full block'> {/* Changed w-min to w-full */}
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}


export default App
