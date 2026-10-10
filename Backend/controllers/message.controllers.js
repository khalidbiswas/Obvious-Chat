import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { io } from '../socket/socket.js'; // Import the io instance from socket.js
// Send a message from one user to another
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Assuming you have user authentication and the sender's ID is available in req.user
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        if (!conversation) {
            // Create a new conversation if it doesn't exist
            conversation = new Conversation({
                participants: [senderId, receiverId],
                messages: [],
            });
        }
        // Create a new message
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });
        // Add the message to the conversation

        // Socket.io integration for real-time messaging will go here.
        // Real-time: push the saved message to every open tab/device of the receiver
        io.to(String(receiverId)).emit('newMessage', newMessage);
        conversation.messages.push(newMessage._id);
        // save message and conversation
        await Promise.all([newMessage.save(), conversation.save()]);
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    }
    catch (error) {
        console.log('Error during sending message:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get messages between two users
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({ participants: { $all: [senderId, userToChatId] } }).populate('messages');
        res.status(200).json({ messages: conversation ? conversation.messages : [] });
    }
    catch (error) {
        console.log('Error during fetching messages:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}