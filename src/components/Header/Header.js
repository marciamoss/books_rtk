import React from 'react';
import { useAuthChangeMutation } from '../../store';

import { useLocation, Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { authDataInfo } from '../../store';

// import PageNotFound from '../PageNotFound/PageNotFound';

const Header = () => {
    const [authChange] = useAuthChangeMutation();
    const {signedIn, userName, showError, errorMessage} = useSelector((state) => {
        return {
            signedIn: state.authData.signedIn,
            userName: state.authData.userName,
            showError: state.authData.showError,
            errorMessage: state.authData.errorMessage
        };
    });
    return (
        <nav className="py-6 px-10 w-full bg-black">
            <div className="flex justify-between items-center container mx-auto bg-black">
                <div><h1 className="text-xl text-zinc-50 font-bold"><Link to="/">1Stop</Link></h1></div>
                <>{showError ? <div><h1 className="text-xl text-red-600 font-bold ml-5 mr-5">Signin Failure: {errorMessage}, Try again</h1></div> : ''}</>
                <>{signedIn ? <div><h1 className="text-center text-xl text-zinc-50 font-bold">Hello {userName}</h1></div> : ''}</>
                <button onClick={()=>authChange({authChange,authDataInfo})} className="text-xl text-zinc-50 font-bold">
                    <div className="flex items-center"><span className="mr-1">{!signedIn ? 'Sign In' : 'Sign Out'}</span><FcGoogle/></div>
                </button> 
            </div>
        </nav>
    );
}

export default Header;
 