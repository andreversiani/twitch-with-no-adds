import { TwitchEmbed } from "react-twitch-embed"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from "axios"
import cookieParser from "cookie-parser"
import { access } from "fs"
import { CREDENTIAL } from "../credentials"

const getCookie = (cookie: string, parameter: string) => {
  return cookie.split(parameter + '=')[1].split(';')[0]
}

export default function Twitch() {
  const qs = require('qs');
  const router = useRouter();
  const [input, setInput] = useState('');
  const channelName = router?.query?.twitch;

  const handleSearch = () => {
    router.push(input)
  }

  useEffect(() => {
    const token  = router.asPath.split('#')[1]?.split('=')[1].split('&')[0];
    if (token) {
      document.cookie = 'access_token='+token
    } 
  }, [router.asPath])


  const handleFetch = () => {
    location.href = `https://id.twitch.tv/oauth2/authorize?scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls+user%3Aread%3Afollows&response_type=token&client_id=${CREDENTIAL.client_id}&redirect_uri=${CREDENTIAL.redirect_uri}`
  }   

  return (
    <>  {channelName ?
        <div style={{height: '100vh'}}>
          <TwitchEmbed width={'100%'} height={'100%'} channel={channelName as string} />
        </div>
        :
        <button onClick={handleFetch}>CLICK</button>
        }
    </>
  )
}
