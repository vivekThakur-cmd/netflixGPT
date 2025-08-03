import React, { useMemo, useRef, useState } from 'react'
import Header from './Header'
import { validateCredentials } from '../utils/validation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'

const Login = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const fullNameRef = useRef(null)
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState('')
    const toggleState = () => {
        setIsSignUp(!isSignUp)
    }
    const formType = useMemo(() => isSignUp ? 'Sign Up' : 'Sign In', [isSignUp])

    const signUp = (email, password, fullName) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: fullName, photoURL: "https://www.vhv.rs/dpng/d/409-4090121_transparent-background-user-icon-hd-png-download.png"
                }).then(() => {


                }).catch((error) => {
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(`${errorCode}:${errorMessage}`)
            });
    }

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(`${errorCode}:${errorMessage}`)
            });
    }

    const formSubmit = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value
        const fullName = fullNameRef.current?.value
        const message = validateCredentials(email, password)
        if (message) {
            setError(message)
            return
        }
        if (isSignUp) {
            signUp(email, password, fullName)
        } else {
            signIn(email, password)
        }


    }

    return (
        <div>
            <Header loggedIn={false} />
            <div className='absolute'>
                <img className='' src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg" alt="" />

            </div>

            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-10 py-14 bg-black mx-auto left-0 right-0 my-36 bg-opacity-80'>
                <div className='flex flex-col gap-6 text-white'>
                    <h1 className=' font-bold text-3xl'>{formType}</h1>
                    {isSignUp && <input ref={fullNameRef} type="text" placeholder='Full name' className='py-2 px-6 bg-zinc-800 rounded-md' />}
                    <input ref={emailRef} type="email" placeholder='Username' className='py-2 px-6 bg-zinc-800 rounded-md' />
                    <input ref={passwordRef} type="password" placeholder='Password' className='py-2 px-6 bg-zinc-800 rounded-md' />
                    {error && <span className='text-red-700'>{error}</span>}
                    <button onClick={formSubmit} className='bg-red-700 py-2 my-4 rounded-sm'>{formType}</button>

                </div>
                <span onClick={toggleState} className=' text-white cursor-pointer'>{`${isSignUp ? 'Having account' : 'Not having account.'} ${isSignUp ? 'Sign In' : 'Sign Up'}`}</span>


            </form>
        </div>
    )
}

export default Login