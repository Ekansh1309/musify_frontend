import React from 'react'
import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconText';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatePlaylistModalOpen } from '../redux/slices/musicSlice';
import logo from '../assets/musify-removebg-preview.png'

const Sidebar = () => {
    const [cookie,setCookie] = useCookies(["token"])
    const {music} = useSelector((state)=>state)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    function homeHandler(){
        navigate('/home')
    }
  return (
    <div className="h-full w-1/5 bg-black flex flex-col justify-between  pb-10" >
            <div>

            
            <div className="logoDiv p-6">
                <img src={logo} width={150} />
            </div>

            <div className="py-5">
                <IconText
                    iconName={"material-symbols:home"}
                    displayText={"Home"}
                    active
                    path="/home"
                />
                <IconText
                    iconName={"material-symbols:search-rounded"}
                    displayText={"Search"}
                    path="/search"
                />
                
                <IconText
                    iconName={"icomoon-free:books"}
                    displayText={"Library"}
                    path="/library"
                />
                {
                    cookie.token &&
                    <IconText
                        iconName={"material-symbols:library-music-sharp"}
                        displayText={"My Music"}
                        path="/myMusic"
                    />
                }

            </div>

            

            <div className="pt-5">
                {
                    cookie.token &&
                    <IconText
                    iconName={"material-symbols:add-box"}
                    displayText={"Create Playlist"}
                    onClick={()=>{dispatch(setCreatePlaylistModalOpen(true))}}
                    />
                }
                <IconText
                    iconName={"mdi:cards-heart"}
                    displayText={"Liked Songs"}
                />
            </div>

            </div>

            <div className="px-5">
                <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                </div>
            </div>

        </div>
  )
}

export default Sidebar
