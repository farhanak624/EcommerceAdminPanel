import React from 'react'
import { found404Page } from '../../../public/Assets/assets'

const NotFound = () => {
  return (
    <div>
        <div className='flex justify-center mt-32'>
            <div>
                <img src={found404Page} alt='404' className='w-96' />
            </div>
        </div>
    </div>
  )
}

export default NotFound
