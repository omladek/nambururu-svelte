import type { UserResult } from '../UserResult.type'

export type User = Omit<UserResult['data'], 'subreddit'>
