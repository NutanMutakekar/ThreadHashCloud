import { useEffect, useRef, useState } from "react";
import { VStack } from "@chakra-ui/react";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { socket } from "../socket"; // Adjust if your socket import is different
import userAtom from "../atoms/userAtom";
import axios from "axios";

const EntireMessage = () => {
	const selectedConversation = useRecoilValue(selectedConversationAtom);
	const user = useRecoilValue(userAtom);
	const [messages, setMessages] = useState([]);
	const bottomRef = useRef(null);

	// Fetch messages when a conversation is selected
	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(`/api/messages/${selectedConversation._id}`);
				setMessages(res.data);
			} catch (err) {
				console.error("Error fetching messages:", err);
			}
		};

		if (selectedConversation?._id) {
			getMessages();
		}
	}, [selectedConversation]);

	// Scroll to bottom on new message
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Listen for messages seen by recipient
	useEffect(() => {
		socket.on("messagesSeen", ({ conversationId }) => {
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.conversationId === conversationId ? { ...msg, seen: true } : msg
				)
			);
		});

		return () => {
			socket.off("messagesSeen");
		};
	}, []);

	// Mark messages as seen when you open a conversation
	useEffect(() => {
		if (selectedConversation?._id) {
			socket.emit("markMessagesAsSeen", {
				conversationId: selectedConversation._id,
				userId: user._id,
			});
		}
	}, [selectedConversation, user]);

	return (
		<VStack
			p={2}
			spacing={3}
			align='stretch'
			overflowY='auto'
			maxH='80vh'
			scrollBehavior='smooth'
		>
			{messages.map((message) => (
				<Message key={message._id} message={message} ownMessage={message.sender === user._id} />
			))}
			<div ref={bottomRef}></div>
		</VStack>
	);
};

export default EntireMessage;
