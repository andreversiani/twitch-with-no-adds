import { TwitchPlayer, TwitchChat } from "react-twitch-embed"
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CentralizedFlexContainer, FlexContainer  } from "../styles/styles";

export default function Twitch() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const channelName = router.query.twitch;

  const handleSearch = () => {
    router.push(input)
  }

  return (
    <>
        <div style={{display: 'flex', alignItems: 'space-between', justifyContent: 'center'}}>
          <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <TwitchPlayer channel={channelName as string} />
          </div>
          <TwitchChat style={{height: '100vh'}} channel={channelName as string} />
        </div>
    </>
  )
}
