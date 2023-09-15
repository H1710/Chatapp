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
}

exports.SearchController = SearchController;
