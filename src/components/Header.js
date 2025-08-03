import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = ({ loggedIn = true }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loggedOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email, photoURL } = user
                dispatch(addUser({ uid, displayName, email, photoURL }))
                navigate('/browse')
            } else {
                dispatch(removeUser())
                navigate('/')
            }
        });
        return () => unSubscribe()
    }, [])


    return (
        <div className='flex justify-between items-center  w-full absolute py-2 px-8 bg-gradient-to-b from-black z-10' >
            <img className='w-44' src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="" />
            {loggedIn && <div>
                <button onClick={loggedOut} className=' text-white bg-red-700 py-2 px-6 rounded-sm'>Sign out</button>
            </div>}
        </div>
    )
}

export default Header