import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const Login = () => {

  const [rememberLogin, setrememberLogin] = useState(true)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {user,login}=UserAuth();
  const navigate=useNavigate();

  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    try{
      await login(email,password)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/32c47234-8398-4a4f-a6b5-6803881d38bf/eed3a573-8db7-47ca-a2ce-b511e0350439/IN-en-20240122-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt='///' />
      <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />
      <div className='fixed w-full px-4 py-24 z-2'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-nsans-bold'>
              Log In
            </h1>
            <form className='w-full flex-col py-4' onSubmit={handleFormSubmit}>
              <input
                className='w-full p-3 my-2 bg-gray-700 rounded'
                type='email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={(e) => { setemail(e.target.value) }}
              ></input>

              <input
                className='w-full p-3 my-2 bg-gray-700 rounded' type='password'
                placeholder='Password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
              ></input>

              <button className='w-full bg-red-600 py-3 my-6 rounded font-nsans-bold'>Log In</button>
              <div className='flex justify-between items-center text-gray-600'>
                <p>
                  <input type='checkbox' className='mr-2' checked={rememberLogin} onChange={(e) => { setrememberLogin(!rememberLogin) }} />Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='my-4'>
                <span className='text-gray-600 mr-2'>New to Netflix ?</span>
                <Link to="/signup" >Sign Up</Link>
              </p>


            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login