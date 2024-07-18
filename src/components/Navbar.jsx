import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {

    const {user,logout} =UserAuth();
    const navigate=useNavigate();

    const handlelogout=async()=>{
        try{
            await logout();
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }


    


    return (
        <div className='z-20 absolute w-full p-2 flex items-center justify-between'>
            <Link to={"/"}>
                <h1 className='uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl '>netflix</h1>
            </Link>

            {user?.email ? (
                 <div>
                 <Link to={"/profile"}>
                     <button className='capitalize pr-2 font-nsans-medium'>Profile</button>
                 </Link>
                 
                     <button className='capitalize  bg-red-600 px-2 py-2 rounded cursor-pointer font-nsans-medium' onClick={handlelogout}>LogOut</button>
                 
             </div>

            ) :(
                <div>
                <Link to={"/login"}>
                    <button className='capitalize pr-4 font-nsans-bold'>LogIn</button>
                </Link>
                <Link to={"/signup"}>
                    <button className='capitalize  bg-red-600 px-2 py-2 rounded cursor-pointer font-nsans-medium'>SignUp</button>
                </Link>
            </div>
            )
        }

            

        </div>
    )
}

export default Navbar

