import React from 'react'

const NoFriends = (props) => {
  return (
    <div className='w-[100%] bg-primay/0  p-4 flex m-3 items-center justify-center flex-col gap-2'>
       {
        props.recommended ? <>
        
         <h1 className='font-semibold'>No Recommendations Available</h1>
        <p className='text-center '>Check back later for new language partners!</p>
        </> : <>
         <h1 className='font-semibold'>No Friends Yet</h1>
        <p className='text-center'>Connect with languages partners below to start practicing together!</p>
        </>
       }
    </div>
  )
}

export default NoFriends