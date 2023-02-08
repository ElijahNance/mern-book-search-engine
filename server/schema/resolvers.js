const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        async getSingleUser(_parent, args, context) {
            const { user } = context;
            const foundUser = await User.findOne({
                $or: [
                    { _id: user ? user._id : args.id },
                    { username: args.username }],
            });
            return foundUser;
        },
    },

    Mutation: {
        async addUser(_parent, { username, email, password }) {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        async login(_parent, { username, email }) {
            const user = await User.findOne({
                $or: [
                    { username },
                    { email }]
            });
            const correctPw = await user.isCorrectPassword(args.password);
            const token = signToken(user);
            return ({ token, user });
        },

        async saveBook(_parent, { input }, context) {
            const { user } = context;
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
              );
              return updatedUser;
        },

        async removeBook(_parent, { bookId }, context) {
            const { user } = context;
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: bookId  } },
                { new: true }
              );
              return updatedUser;
        }
    }

};

module.exports = resolvers;