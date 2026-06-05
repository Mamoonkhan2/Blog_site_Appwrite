import React from 'react'
import  { useDispatch } from 'react-redux';
import { LogOut  } from '../../store/authSlice';
import { service } from '../../appWrite/auth'
function Lagout() {
    const dispatch = useDispatch()
    const HandleClick = ()=>{
        service.LogoutUser()
        .then(()=>{
            dispatch(LogOut());
        })
        .catch((e)=>{
            console.log('error in LagOut.jsx',e)
        })
    }
  return (
    <button
     onClick = {HandleClick}
     className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
        Log Out
    </button>
  )
}

export default Lagout