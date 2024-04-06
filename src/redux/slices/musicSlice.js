import { createSlice } from "@reduxjs/toolkit";

export const MusicSlice= createSlice({
    name:"music",
    initialState:{
        songs:[],
        currentSong: null,
        // setCurrentSong: (currentSong) => {},
        soundPlayed: null,
        // setSoundPlayed: () => {},
        isPaused: true,
        createPlaylistModalOpen:false,
        addToPlaylistModalOpen:false,
        // setIsPaused: () => {},
    },
    reducers:{
        setCurrentSong:(state,action)=>{
            const {song} = action.payload
            // console.log("set Current song")
            // console.log(song)
            return {
                ...state,
                currentSong:song
            }
        },
        setSoundPlayed:(state,action)=>{
            const sound = action.payload

            // console.log("Inside set Sound")
            // console.log(sound)
            return{
                ...state,
                soundPlayed:sound
            }
        },
        setIsPaused:(state,action)=>{
            return{
                ...state,
                isPaused:action.payload
            }
        },
        setSongs:(state,action)=>{
            console.log(action.payload)
            return{
                ...state,
                songs:action.payload
            }
        },
        setCreatePlaylistModalOpen:(state,action)=>{
            return{
                ...state,
                createPlaylistModalOpen:action.payload
            }
        },
        setAddToPlaylistModalOpen:(state,action)=>{
            return{
                ...state,
                addToPlaylistModalOpen:action.payload
            }
        }

    }
})

export const {setCurrentSong,setIsPaused,setSoundPlayed,setSongs,
    setCreatePlaylistModalOpen,setAddToPlaylistModalOpen}
    =MusicSlice.actions;
export default MusicSlice.reducer