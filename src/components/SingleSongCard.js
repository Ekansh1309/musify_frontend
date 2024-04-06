
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from '../redux/slices/musicSlice';


const SingleSongCard = ({song,changeSound}) => {

    const totalSeconds = song.duration;
    const min = Math.floor(totalSeconds / 60);
    const sec = Math.round(totalSeconds % 60);

    const input = `${min}:${sec}`; // Your input number
    const parts = input.split(":"); // Split the input into hours and minutes
    const minutes = parts[0]; // Get the minutes part
    let seconds = parts[1]; // Get the seconds part

    // Add leading zero if seconds is a single digit
    if (seconds.length === 1) {
        seconds = "0" + seconds;
    }

    const formattedTime = `${minutes}:${seconds}`;

    const dispatch= useDispatch();
    const {music} = useSelector((state)=>state)

  return (
    <div
            className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
            onClick={() => {
                changeSound(song.track)
                dispatch(setCurrentSong({song}))
            }}
        >
            <div
                className="w-12 h-12 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${song.thumbnail})`,
                }}
            ></div>
            <div className="flex w-full">
                <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
                    <div className="cursor-pointer hover:underline">
                        {song.name}
                    </div>
                    
                </div>

                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>{formattedTime}</div>
                </div>
            </div>
        </div>
  )
}

export default SingleSongCard
