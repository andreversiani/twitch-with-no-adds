import { TwitchEmbed } from "react-twitch-embed"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from "axios"
import { CREDENTIAL } from "../credentials"

const getCookie = (cookie: string, parameter: string) => {
  return cookie.split(parameter + '=')[1].split(';')[0]
}

interface UserInfo {
  client_id: string
  login: string
  user_id: string
  expires_in: number
  access_token: string
}

interface Following {
  user_login: string
}

export default function Twitch() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [following, setFollowing] = useState<Following[]>([])
  const channelName = router?.query?.twitch;

  const handleSearch = () => {
    router.push(input)
  }

  useEffect(() => {
    if (router.asPath.includes('access_token=')) {
      const token  = router.asPath.split('access_token=')[1]?.split('&')[0]
      if (token) {
        document.cookie = 'access_token=' + token + ';'
      }
    }
  }, [router.asPath])

  useEffect(() => {
    if (getCookie(document.cookie, 'access_token')) {
      const access_token = getCookie(document.cookie, 'access_token')
      axios({
        method: 'get',
        url: 'https://id.twitch.tv/oauth2/validate',
        headers: {
          'Authorization': 'OAuth ' +  access_token
        }
      }).then(({ data }) => {
        setUserInfo({
          access_token: access_token,
          client_id: data.client_id,
          login: data.login,
          user_id: data.user_id,
          expires_in: data.expires_in
        })
      })
    }
  }, [])

  useEffect(() => {
    if (userInfo?.access_token) {
      axios({
        method: 'get',
        url: `https://api.twitch.tv/helix/streams/followed?user_id=${userInfo.user_id}`,
        headers: {
          'Authorization': 'Bearer ' + userInfo.access_token,
          'Client-Id': userInfo.client_id
        }
      }).then((response) => {
        const { data } = response.data
        setFollowing(data);
      })
    }
  }, [userInfo])

  const handleFetch = () => {
    location.href = `https://id.twitch.tv/oauth2/authorize?scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls+user%3Aread%3Afollows&response_type=token&client_id=${CREDENTIAL.client_id}&redirect_uri=${CREDENTIAL.redirect_uri}`
  }   

  console.log(following)

  return (
    <>  
    {
      channelName ?
        <div style={{height: '100vh'}}>
          <TwitchEmbed width={'100%'} height={'100%'} channel={channelName as string} />
        </div>
        :
        <div>
          <button onClick={handleFetch}>CLICK</button>
        </div>
        }
      {
        following &&
        following.map(person => {
          return <div onClick={() => router.push(person.user_login)} key={person.user_login}>{person.user_login}</div>
        })
      }
    </>
  )
}
