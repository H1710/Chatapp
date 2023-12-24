import { IChatroom } from '../models/chatroom.model';

export const getNameContact = (chatroom: IChatroom, auth: any): string => {
  if (chatroom?.name) {
    return chatroom.name;
  }
  if (chatroom.userIds.length === 2) {
    if (chatroom.userIds[0]._id === auth._id) {
      return chatroom.userIds[1].firstname + ' ' + chatroom.userIds[1].lastname;
    } else {
      return chatroom.userIds[0].firstname + ' ' + chatroom.userIds[0].lastname;
    }
  }
  return '';
};
export const getUserIdContact = (chatroom: IChatroom, auth: any): string => {
  if (chatroom.userIds.length === 2) {
    if (chatroom.userIds[0]._id === auth._id) {
      return chatroom.userIds[1]._id;
    } else {
      return chatroom.userIds[0]._id;
    }
  }
  return '';
};
export const getAvatarContact = (chatroom: IChatroom, auth: any): string => {
  if (chatroom.userIds.length === 2) {
    if (chatroom.userIds[0]._id === auth._id) {
      return chatroom.userIds[1]?.avatar || '';
    } else {
      return chatroom.userIds[0]?.avatar || '';
    }
  } else {
    return chatroom?.avatar || '';
  }
};
