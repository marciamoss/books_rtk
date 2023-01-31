import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import jwt_decode from "jwt-decode";
const keys = require("../../keys.js");

const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
    baseUrl: '/'
    }),
    endpoints: (builder) => ({
        authChange: builder.mutation({
            queryFn({authChange, authDataInfo, initialRender =false}, {dispatch, getState}, extraOptions, baseQuery) {
                if(window.google) {
                    if (getState().authData.signedIn) {
                        if(!(getState().authData.showError)) {
                        window.google.accounts.id.revoke(getState().authData.authUserId, () => {
                            dispatch(authDataInfo({signedIn: false, authUserId: null, userName: null, showError: false, errorMessage: null}));
                        });
                        }
                    }
                    else {
                        const handleGoogleSignIn = (response) => {
                            const responsePayload = jwt_decode(response.credential);
                            dispatch(authDataInfo({signedIn: true, authUserId: responsePayload.sub, userName: responsePayload.name, showError: false, errorMessage: null}));
                        }
                        window.google.accounts.id.initialize({
                            client_id: keys.gAuth.clientId,
                            callback: handleGoogleSignIn,
                            auto_select: false
                        });
                        window.google.accounts.id.prompt(response => {
                            if(response.getDismissedReason() !== 'credential_returned') {
                                if (response.isNotDisplayed() || response.isSkippedMoment() || response.isDismissedMoment()) {
                                    document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                                    if(response.isNotDisplayed()) {
                                        if(response.getNotDisplayedReason() === "opt_out_or_no_session") {
                                            if(!initialRender) {
                                                const client = window.google.accounts.oauth2.initTokenClient({
                                                    client_id: keys.gAuth.clientId,
                                                    scope: "email",
                                                    callback: (()=>authChange({authDataInfo})),
                                                    error_callback: ((error) => dispatch(authDataInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: error.message})))
                                                });
                                                client.requestAccessToken();
                                            }
                                        } else {
                                            dispatch(authDataInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: response.getNotDisplayedReason()}));
                                        }
                                    } else if(response.isSkippedMoment()){
                                        if(response.getSkippedReason() !== "tap_outside") {
                                            dispatch(authDataInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: response.getSkippedReason()}));
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                return {}
            }
        }),  
    }),

});
export const {
    useAuthChangeMutation,
  } = authApi;
export { authApi };
