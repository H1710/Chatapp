import { UserDto } from './user.model';

export interface FriendInvitaion {
  createdAt?: Date;
  receiverId: string;
  senderId: string;
  status: number;
  updatedAt?: Date;
}

export type FriendInvitaionOperation = Pick<
  FriendInvitaion,
  'receiverId' | 'senderId'
>;
export interface NotificationVM extends Pick<FriendInvitaion, 'status'> {
  senderId: UserDto;
}

export interface Friend extends Pick<FriendInvitaion, 'status'> {
  senderId: UserDto;
  receiverId: UserDto;
}
