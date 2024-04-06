import React from 'react'
import { Icon } from '@iconify/react';
import {useNavigate } from 'react-router-dom';

const IconText = ({iconName, displayText, active,path,onClick}) => {
    const navigate = useNavigate();
  return (
    <div
    className="flex items-center justify-start cursor-pointer"
    onClick={onClick}
>
    <div className="px-5 py-2">
        <Icon
            icon={iconName}
            color={active ? "white" : "gray"}
            fontSize={27}
        />
    </div>
        <div onClick={()=>{
            if(path){
                navigate(path)
            }
        }}
            className={`${
                active ? "text-white" : "text-gray-400"
            } text-sm font-semibold hover:text-white`}
        >
        {displayText}
        </div>
    </div>
  )
}

export default IconText
