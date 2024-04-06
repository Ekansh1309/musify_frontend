import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';
import SingleSongCard from './SingleSongCard';
import {Howl, Howler} from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPaused, setSoundPlayed,setSongs } from '../redux/slices/musicSlice';

const MyMusic = () => {


    const {music} = useSelector((state)=>state)
    console.log(music)

    const dispatch = useDispatch();

    function changeSound(songsrc){
        if(music.soundPlayed){
            music.soundPlayed.stop()
        }
        let sound = new Howl({
            src: [songsrc],
            html5: true
          });
          dispatch(setSoundPlayed(sound))
          dispatch(setIsPaused(false))
        sound.play();
    }

    async function getSongs(){
        const response = await makeAuthenticatedGETRequest('/song/get/mysongs')
        dispatch(setSongs(response.data))
    }

    useEffect(()=>{
        getSongs()
    },[])

    const navigate = useNavigate();


  return (
    <div  className="h-full w-full flex">

        <Sidebar/>

        <div className="h-full w-4/5 bg-app-black overflow-auto" >
            <Navbar/>
            <div className="content p-8 pt-0 overflow-auto">
                <div className="text-2xl font-semibold mb-5 text-white mt-8">
                    My Music
                </div>

                <div className="space-y-3 overflow-auto" >
                    {
                        music.songs.map((song)=>(
                            <SingleSongCard song={song} changeSound={changeSound}/>
                        ))
                    }
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default MyMusic

