export interface UserInfo {
  client_id: string
  login: string
  user_id: string
  expires_in: number
  access_token: string
}

export interface StreamingChannel {
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