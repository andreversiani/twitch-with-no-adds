import axios from 'axios';
import { StreamingChannel, UserInfo } from '../../types/types';

export class API {
  validateToken(accessToken: string): Promise<{ data: UserInfo }> {
    return axios({
      method: 'get',
      url: 'https://id.twitch.tv/oauth2/validate',
      headers: {
        'Authorization': 'OAuth ' + accessToken
      }
    })
  }

  getStreamers(userInfo: UserInfo): Promise<{data: {data: StreamingChannel[]}}> {
    return axios({
      method: 'get',
      url: `https://api.twitch.tv/helix/streams/followed?user_id=${userInfo.user_id}`,
      headers: {
        'Authorization': 'Bearer ' + userInfo.access_token,
        'Client-Id': userInfo.client_id
      }
    })
  }

}