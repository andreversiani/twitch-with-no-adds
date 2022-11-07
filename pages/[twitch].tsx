import { TwitchEmbed } from "react-twitch-embed"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { CREDENTIAL } from '../credentials'
import axios from "axios"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

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
    console.log(token);
    if (token) {
      document.cookie = '';
      document.cookie = token
      //axios({
      //  method: 'post',
      //  url: 'https://id.twitch.tv/oauth2/token',
      //  headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //  data: data
      //}).then (response => {
      //  console.log(response)
      //})
    }
  }, [router.asPath])

  useEffect(() => {
    console.log(document.cookie)
    if (document.cookie) {
      axios({
        method: 'get',
        url: 'https://id.twitch.tv/oauth2/validate',
        headers: {
          'Authorization': 'OAuth' + document.cookie.split(';')[1]
        }
      }).then(response => {
        console.log(response)
      })
    }
  }, [])

  const handleFetch = () => {
    location.href = 'https://id.twitch.tv/oauth2/authorize?scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&response_type=token&client_id=hr749j5n096z7829cjqgr70z1w62b9&redirect_uri=http://localhost:3000'
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
