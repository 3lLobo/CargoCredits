import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from "next/image";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Hyperspace } from "@/components/Chains";
import { formatEther } from "ethers/lib/utils";
import { motion } from "framer-motion";
import { selectIsLoggedIn, selectProfileData, selectUserData, setProfileData, setUserData } from "@/redux/GoogleSlice";
import { useSelector, useDispatch } from "react-redux";

interface User {
  access_token?: string;
  expires_in?: number;
  id_token?: string;
  scope?: string;
  token_type?: string;
}

interface Profile {
  id?: string;
  email?: string;
  verified_email?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

export default function GoogleConnectPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({});
  const [profile, setProfile] = useState<Profile>({});
  const { account, chainId } = useEthers();
  console.log("Acc", account);
  const etherBalance = useEtherBalance(account, Hyperspace);
  console.log("ballance", etherBalance);

  const dispatch = useDispatch();
  const rootState = useSelector((state: any) => state);
  const isLoggedIn = selectIsLoggedIn(rootState as any);


  function handleLogin(userData: any) {
    setUser(userData);
    dispatch(setUserData(userData));
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleLogin(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user.access_token) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            console.log(res.data);
            setProfile(res.data);
            dispatch(
              setProfileData(res.data)
            );
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // if profile still in store, then sync.
  const storeProfile = selectProfileData(rootState as any);
  useEffect(() => {
    if (isLoggedIn) {
      console.log("Syncing profile from store", storeProfile);
      setProfile(storeProfile);
    }
  }, [profile]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile({});
  };

  return (
    <div
      className="flex flex-col-reverse justify-center items-center w-full px-6"
    >
      <div
        className=" h-[50vh] mt-24 mx-6 p-6 rounded-xl shadow-2xl font-semibold text-slate-950 bg-white font-montserrat text-left grid grid-flow-col grid-cols-2 gap-4 w-full"
      >
        <div
          className="flex flex-col w-full outline outline-2 outline-ipfsgreen-muted outline-offset-2 outline-offset-ipfsgreen-muted rounded-2xl p-3 justify-center items-center"
        >
          {profile.id ? (
            <>
              <div
              >
                <Image
                  className="flex rounded-full w-20 h-20 aspect-1 mb-6 "
                  src={profile.picture}
                  alt="user image"
                  width={240}
                  height={240}
                />
              </div>

              {/* <h3>User Logged in</h3> */}
              <p>{profile.name}</p>
              <p>{profile.email}</p>
              <br />
              <button
                className="rounded-full bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 w-fit self-center"
                onClick={logOut}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded-full bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 w-fit self-center flex flex-row"
              onClick={() => login()}
            >
              <div
                className="flex flex-row text-center text-lg h-full align-middle items-center justify-center"
              >
                Sign in with
              </div>
              <Image
                className=" rounded-full w-11 h-11 aspect-1 ml-2"
                src="https://wallpapercave.com/wp/wp2860517.jpg"
                alt="googleLogo"
                width={100}
                height={100}
              />
            </button>
          )}
        </div>
        <div
          className="flex flex-col w-full outline outline-2 outline-ipfsgreen-muted outline-offset-2 outline-offset-ipfsgreen-muted rounded-2xl p-3 justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: account ? 1 : 0 }}
            transition={{ duration: '0.5' }}
            className="flex flex-col w-full rounded-2xl p-3 mt-11 justify-center items-center"
          >
            <div
              className="flex flex-col text-center text-lg h-full align-middle items-center justify-center"
            >
              <span
                className="mb-1 "
              >
                Connected to
              </span>
              <span
                className="text-3xl text-cyan-400 mb-6"
              >{Hyperspace.chainName} </span>
            </div>
            <span>Account:</span>
            <span
              className="text-lg text-cyan-400 mb-3"
            >{account}</span>
            <span
            >Balance:</span>
            <span
              className="text-lg text-cyan-600 mb-3"
            > {Number(etherBalance) || '❓'}</span>


          </motion.div>
        </div>
        {/* If both connected and logged in, show button to continue to dashboard */}
      </div >


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: (profile.id && account) ? 1 : 0 }}
        transition={{ duration: '0.5' }}
        className="flex flex-col w-full rounded-2xl p-3 mt-11 justify-center items-center"
      >
        <button
          type="button"
          className="rounded-full bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 w-fit self-center flex flex-row"
          onClick={() => router.push('/cargodashboard')}
        >
          <div
            className="flex flex-row text-center text-lg h-full align-middle items-center justify-center"
          >
            Continue to Dashboard
          </div>
        </button>
      </motion.div>

    </div >
  );
}