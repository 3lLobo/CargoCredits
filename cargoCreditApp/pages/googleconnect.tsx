import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from "next/image";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Hyperspace } from "@/components/Chains";
import { formatEther } from "ethers/lib/utils";

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
  const etherBalance = useEtherBalance(account);
  console.log("chainId", etherBalance);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
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
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  useEffect(() => {
    if (profile) {
      // router.push('/cargodashboard');
    }
  }, [profile]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile({});
  };

  return (
    <div
      className=" h-[50vh] mt-[25vh] mx-6 p-6 rounded-xl shadow-2xl font-semibold text-slate-950 bg-white montserrat text-left grid grid-flow-col grid-cols-2 gap-4"
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
        {account &&
          <div>
            <div
              className="flex flex-row text-center text-lg h-full align-middle items-center justify-center"
            >
              <>Connected to {Hyperspace.chainName} </>
            </div>
            <p>Account: {account}</p>
            <p>Balance: {Number(etherBalance) || '❓'}</p>


          </div>
        }
      </div>

    </div>
  );
}