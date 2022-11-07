import { TwitchEmbed } from "react-twitch-embed"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from "axios"
import PrimarySearchAppBar from '../components/navbar'
import Card from '../components/card'
import { Typography } from "@mui/material"
import { AlignFlexContainer } from "../components/styles"
import Header from "../components/head"


const getCookie = (cookie: string, parameter: string) => {
  return cookie?.split(parameter + '=')[1]?.split(';')[0]
}

interface UserInfo {
  client_id: string
  login: string
  user_id: string
  expires_in: number
  access_token: string
}

interface Following {
  game_id: string
  game_name: string
  id: string
  is_mature: boolean
  language: string
  started_at: string
  tag_ids: string[]
  thumbnail_url: string
  title: string
  type: string
  user_id: string
  user_login: string
  user_name: string
  viewer_count: number
}

export default function Twitch() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [following, setFollowing] = useState<Following[]>([])
  const channelName = router?.query?.twitch;

  useEffect(() => {
    if (router.asPath.includes('access_token=')) {
      const token  = router.asPath?.split('access_token=')[1]?.split('&')[0]
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

  return (
    <div style={{ height: '95vh'}}>
      <Header channelName={channelName as string} following={following[0]?.user_name}/>
      <PrimarySearchAppBar username={userInfo?.login}/>
      <div style={{display: 'flex', height: '100%'}}>
      {    
        following.length ?
          <div style={{height: '100%', display: 'flex'}}>
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '12vw', height: '100%', overflow: 'auto'}}>
              <AlignFlexContainer>
                <Typography
                  variant='h2'
                  noWrap
                  fontSize='13px'
                  fontWeight='bold'
                  style={{padding: '1rem 0 0.5rem 0.75rem'}}
                > 
                  Following
                  </Typography>
              </AlignFlexContainer>
              {
                following.map(person => {
                  return (
                  <Card 
                    streamerName={person.user_name} 
                    viewerCount={person.viewer_count} 
                    gameName={person.game_name} 
                    key={person.id} 
                    />
                    )
                })
              }
          </div>
        </div>
        :
        null
      }
      <TwitchEmbed width={'100%'} height={'100%'} channel={channelName as string || following[0]?.user_name || 'gaules'} />
      </div>
    </div>
  )
}
