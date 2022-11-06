import { TwitchPlayer, TwitchChat } from "react-twitch-embed"
import { useRouter } from 'next/router'
import Twitch from "./[twitch]";

export default function Home() {
  return (
    <Twitch />
  )
}
