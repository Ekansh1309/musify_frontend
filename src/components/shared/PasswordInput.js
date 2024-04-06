import React from 'react'

const PasswordInput = ({label,placeholder,value,setFormData}) => {
  return (
    <div className='flex flex-col space-y-2 w-full'>
        <label for={label} className='font-semibold' >{label}</label>
        <input className='p-2 border border-gray-400 rounded placeholder-gray-500'
        type='password' placeholder={placeholder} id={label}
        value={value}
        onChange={(e)=>{
          const {name,value} = e.target
          setFormData((prev)=>{
            return {...prev,[name]:value}
          })
        }}
        />
    </div>
  )
}

export default PasswordInput
