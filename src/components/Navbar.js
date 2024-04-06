import React from 'react'
import TextWithHover from '../components/TextWithHover';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {

    const [cookie,setCookie] = useCookies(["token"])
    const navigate = useNavigate();

    const {music} = useSelector((state)=>state)
  const dispatch = useDispatch()

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    const handleLogout = () => {
        if (cookie.token) {
            deleteCookie('token');
            setCookie({ token: '' });
        }

        toast.success("Logged out successfully")
        navigate('/home')
    };

    function handleLogin(){
        navigate('/login')
    }



  return (
    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                            {
                                cookie.token &&
                                
                                    <TextWithHover path="/uploadSong" displayText={"Upload Song"} />
                                
                            }
                            {
                                !cookie.token &&
                                <TextWithHover path="/signup" displayText={"Sign up"} />
                            }
                        
                            {
                                cookie.token &&
                                <button className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer"
                                onClick={handleLogout}
                                >
                                    Log Out
                                </button>
                            }
                            {
                                !cookie.token &&
                                <button className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer"
                                onClick={handleLogin}
                                >
                                    Log In
                                </button>
                            }
                        </div>
                    </div>
                </div>
  )
}

export default Navbar
