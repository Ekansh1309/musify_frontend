import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PlayListView from '../components/PlayListView';
import { focusCardsData, spotifyPlaylistsCardData } from '../data';

const HomeComponent = () => {

  return (
    <div  className="h-full w-full bg-app-black">
        <div className='h-full w-full flex'>


        <Sidebar/>

        <div className="h-full w-4/5 bg-app-black overflow-auto" >
            <Navbar/>
            <div className="content p-8 pt-0 overflow-auto">
                    <PlayListView
                        titleText="Focus"
                        cardsData={focusCardsData}
                    />
                    <PlayListView
                        titleText="Spotify Playlists"
                        cardsData={spotifyPlaylistsCardData}
                        />
                    <PlayListView
                        titleText="Sound of India"
                        cardsData={focusCardsData}
                        />
            </div>
        </div>
      
        </div>

        

    </div>
  )
}

export default HomeComponent
