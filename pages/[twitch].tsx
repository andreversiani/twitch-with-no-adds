import { TwitchEmbed } from "react-twitch-embed"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import PrimarySearchAppBar from '../components/navbar'
import Card from '../components/card'
import { Skeleton, Typography } from "@mui/material"
import { AlignFlexContainer, FlexColumn } from "../components/styles"
import Header from "../components/head"
import { UserInfo, StreamingChannel } from '../types/types'
import { API } from "./api/api"

const getCookie = (cookie: string, parameter: string) => {
  return cookie?.split(parameter + '=')[1]?.split(';')[0]
}

export default function Twitch() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [following, setFollowing] = useState<StreamingChannel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const api = new API()
  const router = useRouter();
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
      const access_token = getCookie(document.cookie, 'access_token');
      setLoading(true);
      api.validateToken(access_token)
        .then(({ data }) => {
          setUserInfo({...data, access_token: access_token})
          document.cookie = `client_id=${data.client_id}`
          document.cookie = `login=${data.login}`
          document.cookie = `client_id=${data.user_id}`
          document.cookie = `client_id=${data.expires_in}`
          setLoading(false);
        })
    }
  }, [document.cookie])

  useEffect(() => {
    if (userInfo?.access_token) {
      setLoading(true);
      api.getStreamers(userInfo).then((response) => {
        const { data } = response.data
        setFollowing(data);
        setLoading(false);
      })
    }
  }, [userInfo])

  return (
    <div style={{ height: '92.3354vh'}}>
      <Header channelName={channelName as string} following={following[0]?.user_name}/>
      <PrimarySearchAppBar loading={loading} username={userInfo?.login}/>
      <div style={{display: 'flex', height: '100%'}}>
      {    
        following.length ?
          <div style={{height: '100%', display: 'flex', maxWidth: '12vw'}}>
            <FlexColumn style={{height: '100%', overflow: 'auto'}}>
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
              { loading ?
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(index => {
                  return <Skeleton key={index} width={250} height={50} animation='wave' />
                }) 
                :
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
            </FlexColumn>
        </div>
        :
        null
      }
      <TwitchEmbed 
        width={'100%'} 
        height={'100%'} 
        channel={channelName as string || following[0]?.user_name || 'gaules'} 
      />
      </div>
    </div>
  )
}
