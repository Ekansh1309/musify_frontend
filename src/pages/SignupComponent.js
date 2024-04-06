import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnautenticatedPOSTRequest } from '../utils/serverHelpers';
import toast from 'react-hot-toast';
import logo from '../assets/musify-removebg-preview.png'
const SignupComponent = () => {
    const [formData,setFormData] = useState({
        email:"",
        confirmEmail:"",
        username:"",
        password:"",
        firstName:"",
        lastName:""
    })

    const [cookie,setCookie] = useCookies(["token"])
    const navigate = useNavigate();

    function onChangeHandler(e){
        
        const { name, value } = e.target;
        setFormData(prev=>(
            {...prev, [name]:value}
        ))
    }

    // submit karne par signup kara do
    async function onSubmitHandler(e){
        e.preventDefault()
        if(formData.email !== formData.confirmEmail){
            alert("Email and Confirm Email not matched, check again")
            return;
        }

        const response = await makeUnautenticatedPOSTRequest("/auth/register",formData)
        console.log(response)
        if(response  &&  !response.error){
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path: '/',expires:date})
            toast.success("Signed Up Successfully")

            navigate("/home")
            console.log(response);
        }
        else{
            if(response.status === 403){
                toast.error("User already exist with the email")
            }
            else{
                toast.error("Sign Up Failure")
            }
        }
        
    }

  return (
    <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <img src={logo} width={150} />
            </div>

            <form className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col"
            onSubmit={onSubmitHandler}
            >
                {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
                <div className="font-bold mb-4 text-2xl">
                    Sign up for free to start listening.
                </div>

                <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="email" className='font-semibold' >Email address</label>
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
                    <label for="confirmEmail" className='font-semibold' >Confirm Email Address</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="email" 
                    placeholder="Enter your email again" 
                    id="confirmEmail" 
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>

                <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="username" className='font-semibold' >Username</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="text" 
                    placeholder="Enter your username" 
                    id="username" 
                    name="username"
                    value={formData.username}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>

                <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="password" className='font-semibold' >Create Password</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="password" 
                    placeholder="Enter a strong password here" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>

                <div className="w-full flex justify-between items-center space-x-8">

                <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="firstName" className='font-semibold' >First Name</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="text" 
                    placeholder="Enter Your First Name" 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>
                
                <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="lastName" className='font-semibold' >Last Name</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="text" 
                    placeholder="Enter Your Last Name" 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>

                </div> 
                <div className=" w-full flex items-center justify-center     my-8">
                    <button className="bg-blue-600 font-semibold p-3 px-10 rounded-full">
                        Sign Up
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Already have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link to="/login">LOG IN INSTEAD</Link>
                </div>
            </form>
        </div>
  )
}

export default SignupComponent
