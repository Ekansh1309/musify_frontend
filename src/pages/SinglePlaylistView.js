import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SingleSongCard from '../components/SingleSongCard';
import { useParams } from 'react-router-dom';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import {Howl, Howler} from "howler";
import { useDispatch, useSelector } from 'react-redux';
import {setIsPaused, setSoundPlayed } from '../redux/slices/musicSlice';


const SinglePlaylistView = () => {
    const {music} = useSelector((state)=>state)
    const dispatch= useDispatch()

    const [playlistDetails, setPlaylistDetails] = useState({});
    const {playlistId} = useParams();

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist/" + playlistId
            );
            setPlaylistDetails(response);
            console.log("singleplaylist")
            console.log(response);
        };
        getData();
    }, []);
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
  return (
    <div  className="h-full w-full bg-app-black">
        <div className='h-full w-full flex'>


        <Sidebar/>

        <div className="h-full w-4/5 bg-app-black overflow-auto" >
            <Navbar/>
            <div className="content p-8 pt-0 overflow-auto text-white">
                    
            {playlistDetails._id && (
                <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        {playlistDetails.name}
                    </div>
                    <div className="pt-10 space-y-3">
                        {playlistDetails.songs.map((song) => {
                            return (
                                <SingleSongCard
                                    song={song}
                                    key={JSON.stringify(song)}
                                    changeSound={changeSound}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
            {/* {playlistId} */}

            </div>
        </div>
      
        </div>

        

    </div>
  )
}

export default SinglePlaylistView
