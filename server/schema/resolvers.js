const { User } = require('../models');

const resolver = {
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
    }

};

module.exports = resolvers;