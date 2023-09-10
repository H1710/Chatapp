const User = require('../entities/user');
const { UserModel } = require('../models/user');
const { Token } = require('../utils/generateToken');
const FriendInvitation = require('../entities/friendInvitation');
const cloudinary = require('../utils/cloudinary');

class UserController {
  static async getNotifications(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).populate({
        path: 'friends',
        match: { $and: [{ receiverId: userId }] },
        populate: {
          path: 'senderId',
          model: 'User',
          select: '_id firstname lastname avatar',
        },
      });
      return res.status(200).send({ user });
    } catch (Err) {
      res
        .status(500)
        .send({ message: 'Something went wrong cannot get notifications' });
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    const result = await UserModel.login(email, password);
    if (result.getStatusCode() === 200) {
      const refresh_token = await Token.generateRefreshToken({
        id: result.data.data._id,
      });
      await res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
        // domain: 'https://chat-app-fe-ruddy.vercel.app/',
      });
    }
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async logout(req, res, next) {
    try {
      await res.clearCookie('refreshtoken', {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        // domain: 'https://chat-app-fe-ruddy.vercel.app/',
      });
      return res.json({ msg: 'Logged out' });
    } catch (err) {
      return res.status(500).json({ msg: 'Logout error' });
    }
  }

  static async register(req, res, next) {
    const { phone, email, fullname, username, password, confirmPassword } =
      req.body;
    if (!phone.match(/(0[3|5|7|8|9])+([0-9]{8})\b/g))
      return res.status(400).send({ message: 'Phone is invalid' });
    if (password.length < 8)
      return res
        .status(400)
        .send({ message: 'Password must have length at least of 8' });
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return res.status(400).send({ message: 'Email is invalid' });
    const result = await UserModel.register(
      phone,
      email,
      fullname,
      username,
      password,
      confirmPassword
    );
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async getAllUsers(req, res, next) {
    const result = await UserModel.getAllUsers();
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async changePassword(req, res, next) {
    const { email, password, newPassword, confirmNewPassword } = req.body;
    if (password.length < 8)
      return res
        .status(400)
        .send({ message: 'Password must have length at least of 8' });
    if (newPassword.length < 8)
      return res
        .status(400)
        .send({ message: 'New password must have length at least of 8' });
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return res.status(400).send({ message: 'Email is invalid' });
    if (newPassword != confirmNewPassword)
      return res.status(400).send({
        message: 'Password and confirm password are not the same',
      });
    const result = await UserModel.changePassword(email, password, newPassword);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async changeInfo(req, res, next) {
    if (!req.user)
      return res.status(400).json({ message: 'Invalid Authentication.' });
    const user = req.user;
    const { firstname, lastname, gender, birthday } = req.body;
    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;
    user.birthday = birthday;
    user.save();

    const info = { firstname, lastname, gender, birthday };

    // const result = await UserModel.changeInfo(fullname, username, id);
    return res.status(200).send({ message: 'Change info success', info: info });
  }

  static async changeAvatar(req, res, next) {
    try {
      if (!req.user)
        return res.status(400).json({ message: 'Invalid Authentication.' });
      const user = req.user;

      if (!req.file)
        return res.status(400).send({ message: 'Please upload a file' });
      const uploadFile = req.file;

      const result = await cloudinary.uploader.upload(uploadFile.path, {
        public_id: uploadFile.originalname,
        resource_type: 'auto',
        folder: 'chat-app',
        use_filename: true,
        unique_filename: false,
      });

      user.avatar = result.url;

      user.save();

      // const result = await UserModel.changeInfo(fullname, username, id);

      return res
        .status(200)
        .send({ message: 'Upload image successfully', avatar: result.url });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Something went wrong.Please Try again' });
    }
  }

  static async forgotPassword(req, res, next) {
    const { newPassword, confirmNewPassword, email } = req.body;
    if (newPassword.length < 8)
      return res
        .status(400)
        .send({ message: 'Password must have length at least of 8' });
    if (newPassword != confirmNewPassword)
      return res.status(400).send({
        message: 'Password and confirm password are not the same',
      });
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return res.status(400).send({ message: 'Email is invalid' });
    const result = await UserModel.forgotPassword(newPassword, email);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async getFriendsList(req, res, next) {
    try {
      const { userId } = req.params;
      const friends = await FriendInvitation.find({
        $or: [
          { senderId: userId, status: 3 },
          { receiverId: userId, status: 3 },
        ],
      });
      res.status(200).send({ friends: friends });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  }

  static async getAllContacts(req, res, next) {
    try {
      const { myId } = req.body;
      const myUser = await User.findById(myId).populate({
        path: 'chatroom',
        populate: {
          path: 'userIds',
          model: 'User',
          select: '_id firstname lastname',
        },
      });

      return res.status(200).send({ myUser });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  static async getUserById(req, res, next) {
    const { userId } = req.params;
    const result = await UserModel.getUserById(userId);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}
exports.UserController = UserController;
