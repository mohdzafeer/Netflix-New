import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
import { UserAuth } from '../context/AuthContext'
import { db } from '../services/firebase'
import { createImageUrl } from '../services/movieServices'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'



const Profile = () => {

  const [movies, setmovies] = useState([])
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) setmovies(doc.data().favshows)
      })
    }
  }, [user?.email])

  const slide = (offset) => {
    const slider = document.getElementById('slidebar')
    slider.scrollLeft = slider.scrollLeft + offset
  }

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, 'users', user.email)
    await updateDoc(userDoc, {
      favshows: arrayRemove(movie),
    })
  }

  if (!user) {
    return (
      <>
        <p>Fetching Shows....</p>
      </>
    )
  }



  return (
    <>
      <div>
        <div>
          <img
            className='block w-full h-[500px] object-cover '
            src='https://assets.nflxext.com/ffe/siteui/vlv3/32c47234-8398-4a4f-a6b5-6803881d38bf/eed3a573-8db7-47ca-a2ce-b511e0350439/IN-en-20240122-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt='//' />
          <div className='bg-black/80 fixed top-0 left-0 w-full h-[500px]' />
          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-nsans-bold'>
              My Fav Shows
            </h1>
            <p className='font-nsans-light text-gray-400 text-lg mt-2'>
              {user.email}
            </p>
          </div>
        </div>

        {/* Movie Row */}
        <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Fav Shows</h2>
        <div className='relative flex items-center group'>
          <MdChevronLeft
            onClick={() => slide(-500)}
            className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' size={40} />
          <div id={`slidebar`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {movies.map((movie) => (





              <div key={movie.id} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
                <img
                  className='w-full h-40 block'
                  src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} alt={movie.title}></img>
                <div className='absolute top-0 left-0 w-full h-40 bg-black/50 opacity-0 hover:opacity-100'>
                  <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie.title}</p>


                  <p>
                    <AiOutlineClose
                      onClick={() => handleUnlikeShow(movie)}
                      size={30}
                      className='absolute top-2 right-2'
                    />
                  </p>


                </div>
              </div>





            ))}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' size={40} />
        </div>

      </div>
    </>
  )
}

export default Profile