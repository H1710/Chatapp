export const getNameContact = (contact, auth) => {
  if (contact?.name) {
    return contact.name;
  }
  if (contact.userIds.length === 2) {
    if (contact.userIds[0]._id === auth._id) {
      return contact.userIds[1].firstname + ' ' + contact.userIds[1].lastname;
    } else {
      return contact.userIds[0].firstname + ' ' + contact.userIds[0].lastname;
    }
  }
};
export const getUserIdContact = (contact, auth) => {
  if (contact.userIds.length === 2) {
    if (contact.userIds[0]._id === auth._id) {
      return contact.userIds[1]._id;
    } else {
      return contact.userIds[0]._id;
    }
  }
};
export const getAvatarContact = (contact, auth) => {
  if (contact.userIds.length === 2) {
    if (contact.userIds[0]._id === auth._id) {
      return contact.userIds[1]?.avatar;
    } else {
      return contact.userIds[0]?.avatar;
    }
  }
};
