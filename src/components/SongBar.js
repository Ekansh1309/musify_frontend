import React, { useEffect, useState } from 'react'
import {Icon} from "@iconify/react";
import {Howl, Howler} from "howler";
import IconText from "../components/shared/IconText";
import { useDispatch, useSelector } from 'react-redux';
import { setAddToPlaylistModalOpen, setCurrentSong, setIsPaused, setSoundPlayed } from '../redux/slices/musicSlice';

const SongBar = () => {
    const {music} = useSelector((state)=>state)
    const dispatch= useDispatch()

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

    function playSound(){
        music.soundPlayed.play()
    }

    function pauseSound(){
        music.soundPlayed.pause()
    }

    const togglePlayPause = () => {
        if (music.isPaused) {
            playSound();
            dispatch(setIsPaused(false))
        } else {
            dispatch(setIsPaused(true))
            pauseSound();
        }
    };

    function nextHandler(){
        const currentObject = music.currentSong;

        let currentIndex = music.songs.findIndex(obj => obj._id === currentObject._id);
        console.log("currentIndex  ",currentIndex)

        let nextIndex = currentIndex + 1;

        if (nextIndex < music.songs.length) {
            const song = music.songs[nextIndex];
            dispatch(setCurrentSong({song}))
            changeSound(song.track)
            
        } else {
            nextIndex=0;
            const song = music.songs[nextIndex];
            dispatch(setCurrentSong({song}))
            changeSound(song.track)
        }
    }

    function previousHandler(){
        const currentObject = music.currentSong;

        
        let currentIndex = music.songs.findIndex(obj => obj._id === currentObject._id);
        console.log("currentIndex  ",currentIndex)

        let nextIndex = currentIndex - 1;

        if (nextIndex < 0) {
            nextIndex=music.songs.length - 1;
            const song = music.songs[nextIndex];
            dispatch(setCurrentSong({song}))
            changeSound(song.track)
            
        } else {
            const song = music.songs[nextIndex];
            dispatch(setCurrentSong({song}))
            changeSound(song.track)
        }
    }


  return (
    <div>

        {/* {currentSong && ( */}
        <div className="w-full absolute bottom-0 h-1/10 bg-black text-white flex items-center px-4">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={music.currentSong.thumbnail}
                            alt="currentSongThumbail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {music.currentSong.name}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                    Ed Sheeran
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={previousHandler}
                            />
                            <Icon
                                icon={
                                    music.isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={nextHandler}
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                        
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                dispatch(setAddToPlaylistModalOpen(true))
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                    </div>
                </div>
            {/* )} */}

    </div>
  )
}

export default SongBar