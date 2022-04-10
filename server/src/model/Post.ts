export { };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = {
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
};

module.exports = mongoose.model('post', PostSchema);