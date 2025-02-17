import { User } from './User'

export type Invite = {
  id: string
  inviteType?: string
  groupName?: string
  invitee: User
  inviteeId?: string
  token: string
  user: User
  userId: string
  identityProviderType: string
  createdAt: string
  updatedAt: string
}

export const InviteSeed = {
  id: ''
}
