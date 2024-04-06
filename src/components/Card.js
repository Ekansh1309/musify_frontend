import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({title, description, imgUrl,playlistId}) => {
  const navigate = useNavigate()
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg cursor-pointer"
    onClick={()=>{
      navigate("/playlist/"+playlistId)
    }}
    >
        <div className="pb-4 pt-2">
            <img className="w-full rounded-md" src={imgUrl} alt="label" />
        </div>
        <div className="text-white font-semibold py-3">{title}</div>
        <div className="text-gray-500 text-sm">{description || ""}</div>
    </div>
  )
}

export default Card
