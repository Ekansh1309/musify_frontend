import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { Link , useNavigate } from 'react-router-dom';
import { makeUnautenticatedPOSTRequest } from '../utils/serverHelpers';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import {setIsLoggedIn} from "../redux/slices/musicSlice"
import logo from '../assets/musify-removebg-preview.png'
const LoginComponent = () => {
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const {music} = useSelector((state)=>state)
  const dispatch = useDispatch()

  const [cookie,setCookie] = useCookies(["token"])
  const navigate = useNavigate();

  function onChangeHandler(e){
    const { name, value } = e.target;
    setFormData(prev=>(
      {...prev,[name]:value}
    ))
  }

  async function onSubmitHandler(e){
    e.preventDefault()
    const response = await makeUnautenticatedPOSTRequest("/auth/login",formData);
    console.log(response)
    if(response  &&  !response.error){
      const token = response.token
      
      const date = new Date();
      date.setDate(date.getDate()+30);
      setCookie("token",token,{path:'/',expires:date})

      console.log(token)

      toast.success("Login Successfully")
      navigate("/home")

    }
    else{
        if(response.status === 402){
          toast.error("Email not registered")
          return ;
        }
        else if(response.status === 403){
          toast.error("Invalid Password")
          return ;
        }
        else{
          toast.error("Login failure")
          return ;
        }
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center" >
      <div className='logo p-5 border-b border-solid border-gray-200 w-full flex justify-center' >
          <img src={logo} width={150} />
      </div>

      <form className='inputRegion w-1/4 py-5 flex items-center justify-center flex-col'
      onSubmit={onSubmitHandler}
      >
        <div className='font-bold mb-12'>To Continue, login to Musify</div>
          
            <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="email" className='font-semibold' >Email</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="email" 
                    placeholder="Enter your email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
            </div>

            <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="password" className='font-semibold' >Password</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
            </div>
         <div className=" w-full flex items-center justify-end my-8">
            <button className='bg-blue-600 font-semibold p-3 px-10 rounded-full' >
              LOG IN
            </button>
         </div>
         <div className="w-full border border-solid border-gray-300"></div>
         <div className="my-6 font-semibold text-lg">
              Don't have an account?
          </div>
          <div className="border m-5 border-gray-500 bg-slate-800 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
              <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
          </div>
      </form>
    </div>
  )
}

export default LoginComponent
