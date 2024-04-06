import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';

const Library = () => {
    
    const [myPlaylists, setMyPlaylists] = useState([]);

    const getData = async () => {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        setMyPlaylists(response.data);
    };

    useEffect(() => {
        getData();
    }, []);

  return (
    <div  className="h-full w-full bg-app-black">
        <div className='h-full w-full flex'>


        <Sidebar/>

        <div className="h-full w-4/5 bg-app-black overflow-auto" >
            <Navbar/>
            <div className="content p-8 pt-0 overflow-auto">
                <div className="text-white text-xl pt-8 font-semibold">
                    My Playlists
                </div>
                
                <div className="text-white mt-8">
                    <div className="text-2xl font-semibold mb-5"></div>
                        <div className="w-full flex space-x-4">
                            {
                            myPlaylists.map((item) => {
                            return (
                                <Card
                                    title={item.name}
                                    description=""
                                    imgUrl={item.thumbnail}
                                />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
        </div>
      
        </div>
    </div>
  )
}

export default Library
