import React from 'react'

const Textinput = ({label,placeholder,className,type, value,setFormData}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className} `}>
        <label for={label} className='font-semibold' >{label}</label>
        <input className='p-3 border border-gray-400 rounded placeholder-gray-500'
        type={type} placeholder={placeholder} id={label} 
        value={value}
        onChange={(e)=>{
          const {name,value} = e.target
          setFormData((prev)=> ({
            ...prev,[name]:value
          }))
        }}
        />
    </div>
  )
}

export default Textinput
