const mongoose = require('mongoose');

const pressReleaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post Title is Required'],
    },
    content: {
        type: String,
        required: [true, 'Post Content is Required'],
    },
    date_posted: {
        type: String,
        required: [true, 'Posted date is Required'],
    },
    images: {
        type: [String],
        default: null,
    },
    ministry: {
        type: String,
        required: [true, 'Ministry is Required'],
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const PressRelease = mongoose.models.press_release || mongoose.model('press_release', pressReleaseSchema);

export default PressRelease;
