import { IChatroom } from './chatroom.model';
import { FriendInvitaion } from './friendInvitation.model';

export interface User {
  _id: string;
  access_token?: string;
  chatroom: IChatroom[];
  email: string;
  firstname: string;
  friends: FriendInvitaion[];
  lastname: string;
  gender?: string;
  birthday?: string;
  avatar?: string;
  offlineAt?: Date;
}

export type UserDto = Pick<User, '_id' | 'firstname' | 'lastname' | 'avatar'>;

export type UserUpdate = Pick<
  User,
  '_id' | 'birthday' | 'firstname' | 'lastname' | 'gender'
>;
