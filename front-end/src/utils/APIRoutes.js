export const host = process.env.SERVER_URL ?? 'http://localhost:5001/api/v1';
// export const host = 'https://chat-app-be1.onrender.com/api/v1';

export const registerRoute = `${host}/user/register`;
export const firstStepRegisterationRoute = `${host}/auth/first-step-registeration`;
export const confirmOTPRoute = `${host}/auth/submitOTP`;
export const setInfoRoute = `${host}/auth/setInfo`;
export const loginRoute = `${host}/auth/login`;
export const refreshRoute = `${host}/auth/refresh_token`;
export const logoutRoute = `${host}/auth/logout`;

export const avatarRoute = `${host}/user/change-avatar`;
export const changeInfoRoute = `${host}/user/change-info`;

export const sendOTPRoute = `${host}/otp/send`;
export const resendOTPRoute = `${host}/otp/resend`;

export const searchUserByFullnameRoute = `${host}/search/fullname`;

export const sendRequestRoute = `${host}/invite/send`;
export const acceptRequestRoute = `${host}/invite/accept`;
export const cancelRequestRoute = `${host}/invite/cancel`;
export const recallRequestRoute = `${host}/invite/recall`;

export const getChatroomMessages = `${host}/chatroom`;
export const sendMessageRoute = `${host}/message/send`;

export const createChatroomRoute = `${host}/chatroom/create`;

export const getNotificationsRoute = `${host}/user/get-notifications`;

export const allUsersRoute = `${host}/user/allusers`;
export const getAllMessageRoute = `${host}/messages/getmsg`;
