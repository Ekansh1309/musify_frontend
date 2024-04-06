import {useState} from "react";
import TextInput from "../components/shared/Textinput"
import { makeAutenticatedPOSTRequest } from "../utils/serverHelpers";

const CreatePlaylistModal = ({closeModal}) => {

    const [formData,setFormData] = useState({
        playlistName:"",
        playlistThumbnail:""
    })

    const createPlaylist = async () => {
        const response = await makeAutenticatedPOSTRequest("/playlist/create",
            {name: formData.playlistName, thumbnail: formData.playlistThumbnail, songs: []}
        );
        if (response._id) {
            closeModal();
        }
    };
    
    function onChangeHandler(e){
        
        const { name, value } = e.target;
        setFormData(prev=>(
            {...prev, [name]:value}
        ))
    }

    async function onSubmitHandler(e){
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-1/3 rounded-md p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Create Playlist
                </div>
                <form className="space-y-4 flex flex-col justify-center items-center"
                onSubmit={onSubmitHandler}
                >

                <div className={`flex flex-col space-y-2 w-full mb-5 `}>
                    <label for="playlistName" className='font-semibold' >Name</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="text" 
                    placeholder="Playlist Name" 
                    id="playlistName" 
                    name="playlistName"
                    value={formData.playlistName}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>

                <div className={`flex flex-col space-y-2 w-full mb-5`}>
                    <label for="playlistThumbnail" className='font-semibold' >Thumbnail</label>
                    <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
                    type="text" 
                    placeholder="Playlist Thumbnail" 
                    id="playlistThumbnail" 
                    name="playlistThumbnail"
                    value={formData.playlistThumbnail}
                    onChange={onChangeHandler}
                    required
                    autoComplete='off'
                    />
                </div>

                    <button
                        className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                        onClick={createPlaylist}
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;