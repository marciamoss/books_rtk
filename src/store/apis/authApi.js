import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwt_decode from "jwt-decode";
const keys = require("../../keys.js");
let initial = {
  signedIn: false,
  authUserId: null,
  userName: null,
  showError: false,
  errorMessage: null,
  token: null,
};
const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    gInit: builder.mutation({
      queryFn: async ({ authDataInfo }, { dispatch }) => {
        const handleGoogleSignIn = (response) => {
          const responsePayload = jwt_decode(response.credential);
          dispatch(
            authDataInfo({
              ...initial,
              ...{
                signedIn: true,
                authUserId: responsePayload.sub,
                userName: responsePayload.name,
              },
            })
          );
        };
        await window.google.accounts.id.initialize({
          client_id: keys.gAuth.clientId,
          callback: handleGoogleSignIn,
          auto_select: false,
        });
        return {};
      },
    }),
    logIn: builder.mutation({
      queryFn: async (
        { authDataInfo, initialRender = false },
        { dispatch, getState }
      ) => {
        if (window.google) {
          await dispatch(authApi.endpoints.gInit.initiate({ authDataInfo }));
          await window.google.accounts.id.prompt(async (response) => {
            await dispatch(
              authApi.endpoints.oneStepLoginFail.initiate({
                authDataInfo,
                response,
                initialRender,
              })
            );
          });
          return {};
        }
      },
    }),
    oneStepLoginFail: builder.mutation({
      queryFn: async (
        { authDataInfo, response, initialRender },
        { dispatch }
      ) => {
        if (response.getDismissedReason() !== "credential_returned") {
          if (
            response.isNotDisplayed() ||
            response.isSkippedMoment() ||
            response.isDismissedMoment()
          ) {
            document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            const oneStepFailReason =
              response.getNotDisplayedReason() || response.getSkippedReason();
            if (response.isNotDisplayed()) {
              if (oneStepFailReason === "opt_out_or_no_session") {
                if (!initialRender) {
                  await dispatch(
                    authApi.endpoints.authByTokenInit.initiate({ authDataInfo })
                  );
                }
              } else {
                dispatch(
                  authDataInfo({
                    ...initial,
                    ...{
                      showError: true,
                      errorMessage: oneStepFailReason,
                    },
                  })
                );
              }
            } else if (response.isSkippedMoment()) {
              if (oneStepFailReason !== "tap_outside") {
                dispatch(
                  authDataInfo({
                    ...initial,
                    ...{
                      showError: true,
                      errorMessage: oneStepFailReason,
                    },
                  })
                );
              }
            }
          }
        }
        return {};
      },
    }),
    authByTokenInit: builder.mutation({
      queryFn: async ({ authDataInfo }, { dispatch }) => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: keys.gAuth.clientId,
          scope: "https://www.googleapis.com/auth/userinfo.profile",
          callback: ({ access_token }) =>
            dispatch(
              authApi.endpoints.authByToken.initiate({
                access_token,
                authDataInfo,
              })
            ),
          error_callback: (error) =>
            dispatch(
              authDataInfo({
                ...initial,
                ...{
                  showError: true,
                  errorMessage: error.message,
                },
              })
            ),
        });
        client.requestAccessToken();
        return {};
      },
    }),
    authByToken: builder.mutation({
      queryFn: async ({ access_token, authDataInfo }, { dispatch }) => {
        try {
          const profile = await fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          const profileData = await profile.json();
          dispatch(
            authDataInfo({
              ...initial,
              ...{
                signedIn: true,
                token: access_token,
                authUserId: profileData.id,
                userName: profileData.name,
              },
            })
          );
        } catch (error) {
          dispatch(
            authDataInfo({
              ...initial,
              ...{
                showError: true,
                errorMessage: error.message,
              },
            })
          );
        }
        return {};
      },
    }),
    logOut: builder.mutation({
      queryFn: async ({ authDataInfo }, { dispatch, getState }) => {
        const revokeFn = getState().authData.token
          ? window.google.accounts.oauth2.revoke
          : window.google.accounts.id.revoke;
        const revokeId = getState().authData.token
          ? getState().authData.token
          : getState().authData.authUserId;
        revokeFn(revokeId, () => {
          dispatch(authDataInfo(initial));
        });
        return {};
      },
    }),
  }),
});
export const { useLogInMutation, useLogOutMutation } = authApi;
export { authApi };
