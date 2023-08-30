const { SearchModel } = require('../models/search');
const User = require('../entities/user');

class SearchController {
  static async findByFullname(req, res, next) {
    try {
      const { userId, fullname } = req.params;
      const users = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ['$firstname', ' ', '$lastname'] },
            regex: fullname,
            options: 'i',
          },
        },
      }).populate({
        path: 'friends',
        match: { $or: [{ senderId: userId }, { receiverId: userId }] },
      });

      return res.status(200).send({ users });
    } catch (err) {
      return res.status(500).send({ message: 'Somthing went wrong' });
    }
  }

  static async findByPhone(req, res, next) {
    const { phone } = req.body;
    const result = await SearchModel.findByPhone(phone);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async findByEmail(req, res, next) {
    const { email } = req.body;
    const result = await SearchModel.findByEmail(email);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.SearchController = SearchController;
