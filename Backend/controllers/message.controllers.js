import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Assuming you have user authentication and the sender's ID is available in req.user
        let conversation = await Conversation.findOne({ $all: [{ participants: senderId, receiverId }] });
        if (!conversation) {
            // Create a new conversation if it doesn't exist
            conversation = new Conversation({
                participants: [senderId, receiverId],
            });
        }
        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        // Save the message
        await newMessage.save();
        // Add the message to the conversation
        conversation.messages.push(newMessage._id);
        await conversation.save();
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    }
    catch (error) {
        console.log('Error during sending message:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};