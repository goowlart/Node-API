const mongoose = require('mongoose');

const ProjectShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
      },
    tasks: [{
        "type": mongoose.Schema.Types.ObjectId,
        "ref":'Task',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});


mongoose.model('Project', ProjectShema);
