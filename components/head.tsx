import Head from 'next/head'

export default function Header( { channelName, following } : { channelName: string | undefined, following: string | undefined} ) {
  return(
    <Head>
      <title>{`${channelName || following || 'gaules'} - Twitch`}</title>
      <link rel="icon" sizes="256x256" href="/twitch-fav.png" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    )
}