const mongoose = require('mongoose');

const translationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Translated Title is Required'],
        unique: true,
    },
    summary: {
        type: String,
        required: [true, 'Translated Summary is Required'],
    },
    content: {
        type: String,
        required: [true, 'Translated Content is Required'],
    },
    ministry: {
        type: String,
        required: [true, 'Translated Ministry is Required'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in_progress'],
        default: 'pending',
    },
    video: {
        type: String,
        required: [true, 'Translated Video is Required'],
    }
});

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
    },
    translations: {
        type: Object, // Using Map allows for flexible keys (e.g., language codes)
        default: {
            english: translationsSchema,
            hindi: translationsSchema,
            urdu: translationsSchema,
            punjabi: translationsSchema,
            gujarati: translationsSchema,
            marathi: translationsSchema,
            telugu: translationsSchema,
            kannada: translationsSchema,
            malayalam: translationsSchema,
            tamil: translationsSchema,
            odia: translationsSchema,
            bengali: translationsSchema,
            assamese: translationsSchema,
            manipuri_meitei: translationsSchema,
        }
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const PressRelease = mongoose.models.press_release || mongoose.model('press_release', pressReleaseSchema);

export default PressRelease;
