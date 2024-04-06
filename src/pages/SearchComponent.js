import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SingleSongCard from '../components/SingleSongCard';

import {Howl, Howler} from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPaused, setSoundPlayed} from '../redux/slices/musicSlice';

import {Icon} from "@iconify/react";
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';

const SearchComponent = () => {

    const {music} = useSelector((state)=>state)
    const dispatch = useDispatch();

    const [songData,setSongData] = useState([])

    async function getSongs(){
        const response = await makeAuthenticatedGETRequest('/song/get/mysongs')
        setSongData(response.data)
      }
    
      useEffect(()=>{
          getSongs()
      },[])

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");

    const searchSong = async () => {
        const response = await makeAuthenticatedGETRequest(
            "/song/get/songname/" + searchText
        );
        setSongData(response.data);
        console.log(response.data)
    };

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
            <div className="content p-8 pt-0 overflow-auto">
                    
            <div className="w-full py-6">
                <div    
                    className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${
                        isInputFocused ? "border border-white" : ""
                    }`}
                >
                    <Icon icon="ic:outline-search" className="text-lg" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-gray-800 focus:outline-none"
                        onFocus={() => {
                            setIsInputFocused(true);
                        }}
                        onBlur={() => {
                            setIsInputFocused(false);
                        }}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchSong();
                            }
                        }}
                    />
                </div>
                {songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((song) => {
                            return (
                                <SingleSongCard
                                    song={song}
                                    key={JSON.stringify(song)}
                                    changeSound={changeSound}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-400 pt-10">
                        Nothing to show here.
                    </div>
                )}
            </div>

            </div>
        </div>
      
        </div>

    </div>
  )
}

export default SearchComponent
