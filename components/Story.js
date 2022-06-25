import React from 'react'

const Story = ({img, username}) => {
  return (
    <div className=''>
        <img className='rounded-full h-14 w-14 p-[1.5px] border-red-500 border-2 object-contain cursor-pointer transition transform duration-200 ease-out hover:scale-110' src={img} alt='profile-pic' />
        <p className='text-sm w-14 truncate text-center'>{username}</p>
    </div>
  )
}

export default Story