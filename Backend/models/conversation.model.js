import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }

}, // will save the sending n receiving time by mongoDB itself
    { timestamps: true });

    const Convarsation = mongoose.Model("Convarsation",conversationSchema);

    export default Convarsation;