import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { makeAutenticatedPOSTRequest } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UploadSong = () => {

    const [formData,setFormData] = useState({
        name:"",
        thumbnail:"",
        track:"",
        duration:null
    })

    const [trackName,setTrackName] = useState("")
    const navigate = useNavigate();

    function onChangeHandler(e){
        
        const { name, value } = e.target;
        setFormData(prev=>(
            {...prev, [name]:value}
        ))
    }

    async function submitSong(e){
        e.preventDefault();
        const response = await makeAutenticatedPOSTRequest('/song/create',formData)
        console.log(response)
        if(response  &&  !response.error){
            console.log(response);
            toast.success("Song created successfully")
            navigate('/home')
        }
        else{
            if(response.status === 301){
                toast.error("Insufficient details to create song")
            }
            else{
                toast.error("Failure in song creation")
            }
        }
    }

    function clearHandler(e){
        setFormData({
            name:"",
            thumbnail:"",
            track:"",
            duration:null
        })
        setTrackName("")
    }

  return (
    <div  className="h-full w-full flex">

        <Sidebar/>

        <div className="h-full w-4/5 bg-app-black overflow-auto" >
            <Navbar/>
            <div className="content p-8 pt-0 overflow-auto">
                <div className="text-2xl font-semibold mb-5 text-white mt-8">
                    Upload Your Music
                </div>
                <form className="w-1/3 flex   space-x-3">
                    <div className={`flex flex-col space-y-2 w-full mb-5`}>
                        <label for="email" className='font-semibold  text-white' >Name of song</label>
                        <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                        type="text" 
                        placeholder="Enter song name" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={onChangeHandler}
                        required
                        autoComplete='off'
                        />
                    </div>
                    <div className={`flex flex-col space-y-2 w-full mb-5`}>
                        <label for="email" className='font-semibold  text-white' >Give Thumbnail</label>
                        <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                        type="text" 
                        placeholder="Thumbnail" 
                        id="thumbnail" 
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={onChangeHandler}
                        required
                        autoComplete='off'
                        />
                    </div>
                        
                </form>

                <div>
                    {trackName ? (
                            <div className="bg-white rounded-full p-3 w-1/3">
                                {trackName.substring(0, 35)}...
                            </div>
                        ) : (
                            <CloudinaryUpload setTrackName={setTrackName}
                             formData={formData} setFormData={setFormData} />
                        )}
                    
                </div>
                <button
                    className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
                    onClick={submitSong}>
                        Submit Song
                    </button>
                <div
                    className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
                    onClick={clearHandler}>
                        Clear all
                    </div>
            </div>
        </div>
      
    </div>
  )
}

export default UploadSong
