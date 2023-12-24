import { UserDto } from './user.model';

export interface IChatroom {
  _id: string;
  name: string;
  userIds: UserDto[];
  avatar?: string;
  messages: any[];
}

export type CreateChatroom = Pick<IChatroom, 'name'> & {
  userIds: string[];
  avatar?: File;
};
