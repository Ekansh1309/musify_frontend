import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginComponent from "./pages/LoginComponent";
import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import SignupComponent from "./pages/SignupComponent";
import HomeComponent from "./pages/HomeComponent";
import { useDispatch, useSelector } from 'react-redux';
import UploadSong from "./pages/UploadSong";
import MyMusic from "./components/MyMusic";
import SongBar from "./components/SongBar";
import SearchComponent from "./pages/SearchComponent";
import { setAddToPlaylistModalOpen, setCreatePlaylistModalOpen, setSongs } from "./redux/slices/musicSlice";
import { makeAutenticatedPOSTRequest, makeAuthenticatedGETRequest } from "./utils/serverHelpers";
import CreatePlaylistModal from "./modals/CreatePlaylistModal";
import Library from "./pages/Library";
import AddToPlaylistModal from "./modals/AddToPlaylistModal";
import SinglePlaylistView from "./pages/SinglePlaylistView";


function App() {
  const [cookie,setCookie] = useCookies(["token"])

  const {music} = useSelector((state)=>state)

    const dispatch = useDispatch();

  async function getSongs(){
    const response = await makeAuthenticatedGETRequest('/song/get/mysongs')
    dispatch(setSongs(response.data))
  }

  useEffect(()=>{
      getSongs()
  },[])


  const addSongToPlaylist = async (playlistId) => {
    const songId = music.currentSong._id;

    const payload = {playlistId, songId};
    const response = await makeAutenticatedPOSTRequest(
        "/playlist/add/song",
        payload
    );
    console.log(response)
    if(response._id){
        dispatch(setAddToPlaylistModalOpen(false))
    }
};

  return (
  <div className="w-screen h-screen font-poppins ">
    {
      music.createPlaylistModalOpen && <CreatePlaylistModal 
      closeModal={() => {
        dispatch(setCreatePlaylistModalOpen(false))
    }}
      />
    }
    {
      music.addToPlaylistModalOpen && <AddToPlaylistModal
      closeModal={() => {
        dispatch(setAddToPlaylistModalOpen(false))
    }}
    addSongToPlaylist={addSongToPlaylist}
      />
    }
    <div className="w-full h-full">
      
    {
      cookie.token ? 
      (
        // Login Routes
        <Routes>
          <Route path="/" element={<HomeComponent />}/>
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/uploadSong" element={ <UploadSong/> } />
          <Route path="/search" element={ <SearchComponent/> } />
          <Route path="/myMusic" element={ <MyMusic/> } />
          <Route path="/library" element={ <Library/> } />
          <Route path="/playlist/:playlistId" element={ <SinglePlaylistView/> } />
          <Route path="*" element={ <Navigate to="/home"/> } />
        </Routes>
      ) : 
      (
        // Not Login Routes
        <Routes>
          <Route path="/search" element={ <SearchComponent/> } />
          <Route path="*"  element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/home" element={<HomeComponent />} />
        </Routes>
      )
    }

    </div>

    {
      music.currentSong &&
      <SongBar/>
    }

  </div>
  )
}

export default App;
