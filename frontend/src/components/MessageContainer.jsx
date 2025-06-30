// chat gpt 2nd one 27 may
// import {
// 	Flex,
// 	Text,
// 	useColorModeValue
//   } from "@chakra-ui/react";
//   import { useEffect, useRef, useState } from "react";
//   import { useRecoilValue, useSetRecoilState } from "recoil";
//   import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
//   import userAtom from "../atoms/userAtom";
//   import { useSocket } from "../context/SocketContext.jsx";
//   import Message from "./Message";
//   import MessageInput from "./MessageInput";
//   import useShowToast from "../hooks/useShowToast";
  
//   const MessageContainer = () => {
// 	const showToast = useShowToast();
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const [loadingMessages, setLoadingMessages] = useState(true);
// 	const [messages, setMessages] = useState([]);
// 	const currentUser = useRecoilValue(userAtom);
// 	const { socket } = useSocket();
// 	const setConversations = useSetRecoilState(conversationsAtom);
// 	const messageEndRef = useRef(null);
  
// 	// Listen for new incoming messages
// 	useEffect(() => {
// 	  if (!socket) return;
  
// 	  const handleNewMessage = (message) => {
// 		if (selectedConversation._id === message.conversationId) {
// 		  setMessages((prev) => [...prev, message]);
// 		}
// 		setConversations((prev) => {
// 		  return prev.map((conv) =>
// 			conv._id === message.conversationId
// 			  ? { ...conv, lastMessage: { text: message.text, sender: message.sender } }
// 			  : conv
// 		  );
// 		});
// 	  };
  
// 	  socket.on("newMessage", handleNewMessage);
  
// 	  return () => {
// 		socket.off("newMessage", handleNewMessage);
// 	  };
// 	}, [socket, selectedConversation, setConversations]);
  
// 	// Mark messages as seen when last message is from other user
// 	useEffect(() => {
// 	  if (messages.length === 0 || !socket) return;
  
// 	  const lastMessage = messages[messages.length - 1];
// 	  const lastFromOther = lastMessage.sender !== currentUser._id;
  
// 	  if (lastFromOther) {
// 		socket.emit("markMessagesAsSeen", {
// 		  conversationId: selectedConversation._id,
// 		  userId: selectedConversation.userId,
// 		});
// 	  }
  
// 	  const handleMessagesSeen = ({ conversationId }) => {
// 		if (selectedConversation._id === conversationId) {
// 		  setMessages((prev) =>
// 			prev.map((msg) => (msg.seen ? msg : { ...msg, seen: true }))
// 		  );
// 		}
// 	  };
  
// 	  socket.on("messagesSeen", handleMessagesSeen);
  
// 	  return () => {
// 		socket.off("messagesSeen", handleMessagesSeen);
// 	  };
// 	}, [socket, messages, currentUser._id, selectedConversation]);
  
// 	// Scroll to bottom when messages change
// 	useEffect(() => {
// 	  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);
  
// 	// Fetch messages on conversation change
// 	useEffect(() => {
// 	  const fetchMessages = async () => {
// 		setLoadingMessages(true);
// 		try {
// 		  if (selectedConversation.mock) return;
// 		  const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 		  const data = await res.json();
// 		  if (data.error) {
// 			showToast("Error", data.error, "error");
// 			return;
// 		  }
// 		  setMessages(data);
// 		} catch (error) {
// 		  showToast("Error", error.message, "error");
// 		} finally {
// 		  setLoadingMessages(false);
// 		}
// 	  };
  
// 	  fetchMessages();
// 	}, [selectedConversation.userId, selectedConversation.mock, showToast]);
// // 🔁 Poll every 5 seconds to fetch new messages
// useEffect(() => {
// 	const interval = setInterval(() => {
// 		const fetchMessages = async () => {
// 			try {
// 				if (selectedConversation.mock) return;
// 				const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 				const data = await res.json();
// 				if (!data.error) {
// 					setMessages(data);
// 				}
// 			} catch (err) {
// 				console.error("Auto refresh error:", err.message);
// 			}
// 		};
// 		fetchMessages();
// 	}, 1000);

// 	return () => clearInterval(interval);
// }, [selectedConversation.userId, selectedConversation.mock]);
  
// 	return (
// 	  <Flex
// 		flex="70"
// 		bg={useColorModeValue("gray.200", "gray.dark")}
// 		borderRadius={"md"}
// 		p={2}
// 		flexDirection={"column"}
// 	  >
// 		{/* Message header */}
// 		<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
// 		  <Text fontWeight="bold">{selectedConversation.username}</Text>
// 		</Flex>
  
// 		<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
// 		  {loadingMessages ? (
// 			<Text>Loading messages...</Text>
// 		  ) : (
// 			messages.map((message, i) => (
// 			  <Flex
// 				key={message._id}
// 				direction={"column"}
// 				ref={i === messages.length - 1 ? messageEndRef : null}
// 			  >
// 				<Message message={message} ownMessage={currentUser._id === message.sender} />
// 			  </Flex>
// 			))
// 		  )}
// 		</Flex>
  
// 		<MessageInput setMessages={setMessages} />
// 	  </Flex>
// 	);
//   };
  
//   export default MessageContainer;
  

















//chatgpt first one

// import {
// 	Avatar,
// 	Divider,
// 	Flex,
// 	Image,
// 	Skeleton,
// 	SkeletonCircle,
// 	Text,
// 	useColorModeValue
// } from "@chakra-ui/react";
// import Message from "./Message";
// import MessageInput from "./MessageInput";
// import { useEffect, useRef, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { useSocket } from "../context/SocketContext.jsx";
// import messageSound from "../assets/sounds/message.mp3";

// const MessageContainer = () => {
// 	const showToast = useShowToast();
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const [loadingMessages, setLoadingMessages] = useState(true);
// 	const [messages, setMessages] = useState([]);
// 	const currentUser = useRecoilValue(userAtom);
// 	const { socket } = useSocket();
// 	const setConversations = useSetRecoilState(conversationsAtom);
// 	const messageEndRef = useRef(null);

// 	useEffect(() => {
// 		socket.on("newMessage", (message) => {
// 			if (selectedConversation._id === message.conversationId) {
// 				setMessages((prev) => [...prev, message]);
// 			}

// 			if (!document.hasFocus()) {
// 				const sound = new Audio(messageSound);
// 				sound.play();
// 			}

// 			setConversations((prev) => {
// 				const updatedConversations = prev.map((conversation) => {
// 					if (conversation._id === message.conversationId) {
// 						return {
// 							...conversation,
// 							lastMessage: {
// 								text: message.text,
// 								sender: message.sender
// 							}
// 						};
// 					}
// 					return conversation;
// 				});
// 				return updatedConversations;
// 			});
// 		});

// 		return () => socket.off("newMessage");
// 	}, [socket, selectedConversation, setConversations]);

// 	useEffect(() => {
// 		const lastMessageIsFromOtherUser =
// 			messages.length && messages[messages.length - 1].sender !== currentUser._id;
// 		if (lastMessageIsFromOtherUser) {
// 			socket.emit("markMessagesAsSeen", {
// 				conversationId: selectedConversation._id,
// 				userId: selectedConversation.userId
// 			});
// 		}

// 		socket.on("messagesSeen", ({ conversationId }) => {
// 			if (selectedConversation._id === conversationId) {
// 				setMessages((prev) => {
// 					const updatedMessages = prev.map((message) => {
// 						if (!message.seen) {
// 							console.log("Marking message as seen:", message._id);
// 							return {
// 								...message,
// 								seen: true
// 							};
// 						}
// 						return message;
// 					});
// 					return updatedMessages;
// 				});
// 			}
// 		});
// 	}, [socket, currentUser._id, messages, selectedConversation]);

// 	useEffect(() => {
// 		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoadingMessages(true);
// 			setMessages([]);
// 			try {
// 				if (selectedConversation.mock) return;
// 				const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				setMessages(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setLoadingMessages(false);
// 			}
// 		};

// 		getMessages();
// 	}, [showToast, selectedConversation.userId, selectedConversation.mock]);

// 	// 🔁 Poll every 5 seconds to fetch new messages
// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			const fetchMessages = async () => {
// 				try {
// 					if (selectedConversation.mock) return;
// 					const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 					const data = await res.json();
// 					if (!data.error) {
// 						setMessages(data);
// 					}
// 				} catch (err) {
// 					console.error("Auto refresh error:", err.message);
// 				}
// 			};
// 			fetchMessages();
// 		}, 1000);

// 		return () => clearInterval(interval);
// 	}, [selectedConversation.userId, selectedConversation.mock]);


// 	return (
// 		<Flex
// 			flex='70'
// 			bg={useColorModeValue("gray.200", "gray.dark")}
// 			borderRadius={"md"}
// 			p={2}
// 			flexDirection={"column"}
// 		>
// 			{/* Message header */}
// 			<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
// 				<Avatar src={selectedConversation.userProfilePic} size={"sm"} />
// 				<Text display={"flex"} alignItems={"center"}>
// 					{selectedConversation.username} <Image src='/verified.png' w={4} h={4} ml={1} />
// 				</Text>
// 			</Flex>

// 			<Divider />

// 			<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
// 				{loadingMessages &&
// 					[...Array(5)].map((_, i) => (
// 						<Flex
// 							key={i}
// 							gap={2}
// 							alignItems={"center"}
// 							p={1}
// 							borderRadius={"md"}
// 							alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
// 						>
// 							{i % 2 === 0 && <SkeletonCircle size={7} />}
// 							<Flex flexDir={"column"} gap={2}>
// 								<Skeleton h='8px' w='250px' />
// 								<Skeleton h='8px' w='250px' />
// 								<Skeleton h='8px' w='250px' />
// 							</Flex>
// 							{i % 2 !== 0 && <SkeletonCircle size={7} />}
// 						</Flex>
// 					))}

// 				{!loadingMessages &&
// 					messages.map((message) => (
// 						<Flex
// 							key={message._id}
// 							direction={"column"}
// 							ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
// 						>
// 							<Message message={message} ownMessage={currentUser._id === message.sender} />
// 						</Flex>
// 					))}
// 			</Flex>

// 			<MessageInput setMessages={setMessages} />
// 		</Flex>
// 	);
// };

// export default MessageContainer;










//original copied with modification
// import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
// import Message from "./Message";
// import MessageInput from "./MessageInput";
// import { useEffect, useRef, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { useSocket } from "../context/SocketContext.jsx";
// import messageSound from "../assets/sounds/message.mp3";
// import { messageAudio } from "../App"; // 👈 import the shared audio
// // import meesageSound from "/message.mp3"
// const MessageContainer = () => {
// 	const showToast = useShowToast();
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const [loadingMessages, setLoadingMessages] = useState(true);
// 	const [messages, setMessages] = useState([]);
// 	const currentUser = useRecoilValue(userAtom);
// 	const { socket } = useSocket();
// 	const setConversations = useSetRecoilState(conversationsAtom);
// 	const messageEndRef = useRef(null);



// //gpt
// useEffect(() => {
// 	socket.on("newMessage", (message) => {
// 		console.log("🔔 New message received", message);

// 		if (selectedConversation._id === message.conversationId) {
// 			setMessages((prev) => [...prev, message]);
// 		}

// 		// Always try to play the sound
// 		const sound = new Audio("/message.mp3");
// 		sound.volume = 1.0;
// 		sound.play()
// 			.then(() => {
// 				console.log("✅ Sound played");
// 			})
// 			.catch((err) => {
// 				console.error("🔇 Sound play error:", err.message);
// 			});


// 			//mine

			

// // inside socket.on("newMessage", ...)
// // if (!document.hasFocus() && messageAudio) {
// // 	messageAudio.currentTime = 0; // reset to start
// // 	messageAudio.play().catch((err) => {
// // 		console.error("Failed to play sound:", err);
// // 	});
// // }


// 		// Update conversation preview
// 		setConversations((prev) => {
// 			const updatedConversations = prev.map((conversation) => {
// 				if (conversation._id === message.conversationId) {
// 					return {
// 						...conversation,
// 						lastMessage: {
// 							text: message.text,
// 							sender: message.sender,
// 						},
// 					};
// 				}
// 				return conversation;
// 			});
// 			return updatedConversations;
// 		});
// 	});

// 	return () => socket.off("newMessage");
// }, [socket, selectedConversation, setConversations]);






	//original

	// useEffect(() => {
	// 	socket.on("newMessage", (message) => {
	// 		if (selectedConversation._id === message.conversationId) {
	// 			setMessages((prev) => [...prev, message]);
	// 		}

	// 		// make a sound if the window is not focused
	// 		if (!document.hasFocus()) {
	// 			// const sound = new Audio(messageSound);
	// 			const sound=new Audio("/message.mp3")
	// 			sound.play();
	// 		}

	// 		setConversations((prev) => {
	// 			const updatedConversations = prev.map((conversation) => {
	// 				if (conversation._id === message.conversationId) {
	// 					return {
	// 						...conversation,
	// 						lastMessage: {
	// 							text: message.text,
	// 							sender: message.sender,
	// 						},
	// 					};
	// 				}
	// 				return conversation;
	// 			});
	// 			return updatedConversations;
	// 		});
	// 	});

	// 	return () => socket.off("newMessage");
	// }, [socket, selectedConversation, setConversations]);

// 	useEffect(() => {
// 		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== currentUser._id;
// 		if (lastMessageIsFromOtherUser) {
// 			socket.emit("markMessagesAsSeen", {
// 				conversationId: selectedConversation._id,
// 				userId: selectedConversation.userId,
// 			});
// 		}

// 		socket.on("messagesSeen", ({ conversationId }) => {
// 			if (selectedConversation._id === conversationId) {
// 				setMessages((prev) => {
// 					const updatedMessages = prev.map((message) => {
// 						if (!message.seen) {
// 							return {
// 								...message,
// 								seen: true,
// 							};
// 						}
// 						return message;
// 					});
// 					return updatedMessages;
// 				});
// 			}
// 		});
// 	}, [socket, currentUser._id, messages, selectedConversation]);

// 	useEffect(() => {
// 		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoadingMessages(true);
// 			setMessages([]);
// 			try {
// 				if (selectedConversation.mock) return;
// 				const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				setMessages(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setLoadingMessages(false);
// 			}
// 		};

// 		getMessages();
// 	}, [showToast, selectedConversation.userId, selectedConversation.mock]);

// // 🔁 Poll every 5 seconds to fetch new messages
// useEffect(() => {
// 	const interval = setInterval(() => {
// 		const fetchMessages = async () => {
// 			try {
// 				if (selectedConversation.mock) return;
// 				const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 				const data = await res.json();
// 				if (!data.error) {
// 					setMessages(data);
// 				}
// 			} catch (err) {
// 				console.error("Auto refresh error:", err.message);
// 			}
// 		};
// 		fetchMessages();
// 	}, 1000);

// 	return () => clearInterval(interval);
// }, [selectedConversation.userId, selectedConversation.mock]);

// 	return (
// 		<Flex
// 			flex='70'
// 			bg={useColorModeValue("gray.200", "gray.dark")}
// 			borderRadius={"md"}
// 			p={2}
// 			flexDirection={"column"}
// 		>
// 			{/* Message header */}
// 			<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
// 				<Avatar src={selectedConversation.userProfilePic} size={"sm"} />
// 				<Text display={"flex"} alignItems={"center"}>
// 					{selectedConversation.username} <Image src='/verified.png' w={4} h={4} ml={1} />
// 				</Text>
// 			</Flex>

// 			<Divider />

// 			<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
// 				{loadingMessages &&
// 					[...Array(5)].map((_, i) => (
// 						<Flex
// 							key={i}
// 							gap={2}
// 							alignItems={"center"}
// 							p={1}
// 							borderRadius={"md"}
// 							alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
// 						>
// 							{i % 2 === 0 && <SkeletonCircle size={7} />}
// 							<Flex flexDir={"column"} gap={2}>
// 								<Skeleton h='8px' w='250px' />
// 								<Skeleton h='8px' w='250px' />
// 								<Skeleton h='8px' w='250px' />
// 							</Flex>
// 							{i % 2 !== 0 && <SkeletonCircle size={7} />}
// 						</Flex>
// 					))}

// 				{!loadingMessages &&
// 					messages.map((message) => (
// 						<Flex
// 							key={message._id}
// 							direction={"column"}
// 							ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
// 						>
// 							<Message message={message} ownMessage={currentUser._id === message.sender} />
// 						</Flex>
// 					))}
// 			</Flex>

// 			<MessageInput setMessages={setMessages} />
// 		</Flex>
// 	);
// };

// export default MessageContainer;


//code gpt 27may 2 true very very good ----------------------------
// import {
// 	Avatar,
// 	Divider,
// 	Flex,
// 	Image,
// 	Skeleton,
// 	SkeletonCircle,
// 	Text,
// 	useColorModeValue,
//   } from "@chakra-ui/react";
//   import Message from "./Message";
//   import MessageInput from "./MessageInput";
//   import { useEffect, useRef, useState } from "react";
//   import useShowToast from "../hooks/useShowToast";
//   import {
// 	conversationsAtom,
// 	selectedConversationAtom,
//   } from "../atoms/messagesAtom";
//   import { useRecoilValue, useSetRecoilState } from "recoil";
//   import userAtom from "../atoms/userAtom";
//   import { useSocket } from "../context/SocketContext.jsx";
  
//   const MessageContainer = () => {
// 	const showToast = useShowToast();
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const [loadingMessages, setLoadingMessages] = useState(true);
// 	const [messages, setMessages] = useState([]);
// 	const currentUser = useRecoilValue(userAtom);
// 	const { socket } = useSocket();
// 	const setConversations = useSetRecoilState(conversationsAtom);
// 	const messageEndRef = useRef(null);
  
// 	// Audio ref to hold the sound object
// 	const messageAudioRef = useRef(null);
// 	const prevMessagesLengthRef = useRef(0);
  
// 	// Initialize audio once and unlock on user interaction
// 	useEffect(() => {
// 	  messageAudioRef.current = new Audio("/message.mp3");
// 	  messageAudioRef.current.load();
  
// 	  const unlockAudio = () => {
// 		messageAudioRef.current
// 		  .play()
// 		  .catch(() => {})
// 		  .finally(() => {
// 			messageAudioRef.current.pause();
// 			messageAudioRef.current.currentTime = 0;
// 		  });
// 		document.removeEventListener("click", unlockAudio);
// 	  };
  
// 	  document.addEventListener("click", unlockAudio);
  
// 	  return () => {
// 		document.removeEventListener("click", unlockAudio);
// 	  };
// 	}, []);
  
// 	// Listen for new messages and play sound if window not focused
// 	useEffect(() => {
// 	  if (!socket) return;
  
// 	  const handleNewMessage = (message) => {
// 		if (selectedConversation._id === message.conversationId) {
// 		  setMessages((prev) => [...prev, message]);
// 		}
  
// 		if (!document.hasFocus() && messageAudioRef.current) {
// 		  messageAudioRef.current.pause();
// 		  messageAudioRef.current.currentTime = 0;
// 		  messageAudioRef.current.play().catch(() => {});
// 		}
  
// 		setConversations((prev) =>
// 		  prev.map((conversation) => {
// 			if (conversation._id === message.conversationId) {
// 			  return {
// 				...conversation,
// 				lastMessage: {
// 				  text: message.text,
// 				  sender: message.sender,
// 				},
// 			  };
// 			}
// 			return conversation;
// 		  })
// 		);
// 	  };
  
// 	  socket.on("newMessage", handleNewMessage);
  
// 	  return () => socket.off("newMessage", handleNewMessage);
// 	}, [socket, selectedConversation, setConversations]);
  
// 	// Mark messages as seen
// 	useEffect(() => {
// 	  if (!socket) return;
  
// 	  const lastMessageIsFromOtherUser =
// 		messages.length && messages[messages.length - 1].sender !== currentUser._id;
  
// 	  if (lastMessageIsFromOtherUser) {
// 		socket.emit("markMessagesAsSeen", {
// 		  conversationId: selectedConversation._id,
// 		  userId: selectedConversation.userId,
// 		});
// 	  }
  
// 	  const handleMessagesSeen = ({ conversationId }) => {
// 		if (selectedConversation._id === conversationId) {
// 		  setMessages((prev) =>
// 			prev.map((message) => {
// 			  if (!message.seen) {
// 				return {
// 				  ...message,
// 				  seen: true,
// 				};
// 			  }
// 			  return message;
// 			})
// 		  );
// 		}
// 	  };
  
// 	  socket.on("messagesSeen", handleMessagesSeen);
  
// 	  return () => socket.off("messagesSeen", handleMessagesSeen);
// 	}, [socket, currentUser._id, messages, selectedConversation]);
  
// 	// Scroll to bottom on new message
// 	useEffect(() => {
// 	  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);
  
// 	// Fetch messages when conversation changes
// 	useEffect(() => {
// 	  const getMessages = async () => {
// 		setLoadingMessages(true);
// 		setMessages([]);
// 		try {
// 		  if (selectedConversation.mock) return;
// 		  const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 		  const data = await res.json();
// 		  if (data.error) {
// 			showToast("Error", data.error, "error");
// 			return;
// 		  }
// 		  setMessages(data);
// 		} catch (error) {
// 		  showToast("Error", error.message, "error");
// 		} finally {
// 		  setLoadingMessages(false);
// 		}
// 	  };
  
// 	  getMessages();
// 	}, [showToast, selectedConversation.userId, selectedConversation.mock]);
  
// 	// Poll every 1 second to fetch new messages
// 	useEffect(() => {
// 	  if (!selectedConversation.userId || selectedConversation.mock) return;
  
// 	  const interval = setInterval(() => {
// 		const fetchMessages = async () => {
// 		  try {
// 			const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 			const data = await res.json();
// 			if (!data.error) {
// 			  setMessages(data);
// 			}
// 		  } catch (err) {
// 			console.error("Auto refresh error:", err.message);
// 		  }
// 		};
// 		fetchMessages();
// 	  }, 1000);
  
// 	  return () => clearInterval(interval);
// 	}, [selectedConversation.userId, selectedConversation.mock]);
  

// 	useEffect(() => {
// 		const prevLength = prevMessagesLengthRef.current;
// 		const currentLength = messages.length;
	  
// 		// Only play sound if a new message was added
// 		if (currentLength > prevLength) {
// 		  const lastMessage = messages[messages.length - 1];
	  
// 		  // Don't play sound if the last message was sent by current user
// 		  if (lastMessage?.sender !== currentUser._id && messageAudioRef.current) {
// 			messageAudioRef.current.pause();
// 			messageAudioRef.current.currentTime = 0;
// 			messageAudioRef.current.play().catch(() => {});
// 		  }
// 		}
	  
// 		prevMessagesLengthRef.current = currentLength;
// 		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	  }, [messages, currentUser._id]);
	  

	  
	
// 	return (
// 	  <Flex
// 		flex="70"
// 		bg={useColorModeValue("gray.200", "gray.dark")}
// 		borderRadius={"md"}
// 		p={2}
// 		flexDirection={"column"}
// 	  >
// 		{/* Message header */}
// 		<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
// 		  <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
// 		  <Text display={"flex"} alignItems={"center"}>
// 			{selectedConversation.username}{" "}
// 			<Image src="/verified.png" w={4} h={4} ml={1} />
// 		  </Text>
// 		</Flex>
  
// 		<Divider />
  
// 		<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
// 		  {loadingMessages &&
// 			[...Array(5)].map((_, i) => (
// 			  <Flex
// 				key={i}
// 				gap={2}
// 				alignItems={"center"}
// 				p={1}
// 				borderRadius={"md"}
// 				alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
// 			  >
// 				{i % 2 === 0 && <SkeletonCircle size={7} />}
// 				<Flex flexDir={"column"} gap={2}>
// 				  <Skeleton h="8px" w="250px" />
// 				  <Skeleton h="8px" w="250px" />
// 				  <Skeleton h="8px" w="250px" />
// 				</Flex>
// 				{i % 2 !== 0 && <SkeletonCircle size={7} />}
// 			  </Flex>
// 			))}
  
// 		  {!loadingMessages &&
// 			messages.map((message) => (
// 			  <Flex
// 				key={message._id}
// 				direction={"column"}
// 				ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
// 			  >
// 				<Message message={message} ownMessage={currentUser._id === message.sender} />
// 			  </Flex>
// 			))}
// 		</Flex>
  
// 		<MessageInput setMessages={setMessages} />
// 	  </Flex>
// 	);
//   };
  
//   export default MessageContainer;
  








//very true code copy
import {
	Avatar,
	Divider,
	Flex,
	Image,
	Skeleton,
	SkeletonCircle,
	Text,
	useColorModeValue,
  } from "@chakra-ui/react";
  import Message from "./Message";
  import MessageInput from "./MessageInput";
  import { useEffect, useRef, useState } from "react";
  import useShowToast from "../hooks/useShowToast";
  import {
	conversationsAtom,
	selectedConversationAtom,
  } from "../atoms/messagesAtom";
  import { useRecoilValue, useSetRecoilState } from "recoil";
  import userAtom from "../atoms/userAtom";
  import { useSocket } from "../context/SocketContext.jsx";
  
  const MessageContainer = () => {
	const showToast = useShowToast();
	const selectedConversation = useRecoilValue(selectedConversationAtom);
	const [loadingMessages, setLoadingMessages] = useState(true);
	const [messages, setMessages] = useState([]);
	const currentUser = useRecoilValue(userAtom);
	const { socket } = useSocket();
	const setConversations = useSetRecoilState(conversationsAtom);
	const messageEndRef = useRef(null);
  
	// Audio ref to hold the sound object
	const messageAudioRef = useRef(null);
	const prevMessagesLengthRef = useRef(0);
  
	// Initialize audio once and unlock on user interaction
	useEffect(() => {
	  messageAudioRef.current = new Audio("/message.mp3");
	  messageAudioRef.current.load();
  
	  const unlockAudio = () => {
		messageAudioRef.current
		  .play()
		  .catch(() => {})
		  .finally(() => {
			messageAudioRef.current.pause();
			messageAudioRef.current.currentTime = 0;
		  });
		document.removeEventListener("click", unlockAudio);
	  };
  
	  document.addEventListener("click", unlockAudio);
  
	  return () => {
		document.removeEventListener("click", unlockAudio);
	  };
	}, []);
  
	// Listen for new messages and play sound if window not focused
	useEffect(() => {
	  if (!socket) return;
  
	  const handleNewMessage = (message) => {
		if (selectedConversation._id === message.conversationId) {
		  setMessages((prev) => [...prev, message]);
		}
  
		if (!document.hasFocus() && messageAudioRef.current) {
		  messageAudioRef.current.pause();
		  messageAudioRef.current.currentTime = 0;
		  messageAudioRef.current.play().catch(() => {});
		}
  
		setConversations((prev) =>
		  prev.map((conversation) => {
			if (conversation._id === message.conversationId) {
			  return {
				...conversation,
				lastMessage: {
				  text: message.text,
				  sender: message.sender,
				},
			  };
			}
			return conversation;
		  })
		);
	  };
  
	  socket.on("newMessage", handleNewMessage);
  
	  return () => socket.off("newMessage", handleNewMessage);
	}, [socket, selectedConversation, setConversations]);
  
	// Mark messages as seen
	// useEffect(() => {
	//   if (!socket) return;
  
	//   const lastMessageIsFromOtherUser =
	// 	messages.length && messages[messages.length - 1].sender !== currentUser._id;
  
	//   if (lastMessageIsFromOtherUser) {
	// 	socket.emit("markMessagesAsSeen", {
	// 	  conversationId: selectedConversation._id,
	// 	  userId: selectedConversation.userId,
	// 	});
	//   }
  
	//   const handleMessagesSeen = ({ conversationId }) => {
	// 	if (selectedConversation._id === conversationId) {
	// 	  setMessages((prev) =>
	// 		prev.map((message) => {
	// 		  if (!message.seen) {
	// 			return {
	// 			  ...message,
	// 			  seen: true,
	// 			};
	// 		  }
	// 		  return message;
	// 		})
	// 	  );
	// 	}
	//   };
  
	//   socket.on("messagesSeen", handleMessagesSeen);
  
	//   return () => socket.off("messagesSeen", handleMessagesSeen);
	// }, [socket, currentUser._id, messages, selectedConversation]);


	useEffect(() => {
		if (!socket) return;
	  
		const lastMessageIsFromOtherUser =
		  messages.length && messages[messages.length - 1].sender !== currentUser._id;
	  
		if (lastMessageIsFromOtherUser) {
		  socket.emit("markMessagesAsSeen", {
			conversationId: selectedConversation._id,
			userId: selectedConversation.userId,
		  });
		}
	  
		const handleMessagesSeen = ({ conversationId }) => {
		  if (selectedConversation._id === conversationId) {
			setMessages((prev) =>
			  prev.map((message) => {
				if (!message.seen) {
				  return {
					...message,
					seen: true,
				  };
				}
				return message;
			  })
			);
		  }
		};
	  
		socket.on("messagesSeen", handleMessagesSeen);
	  
		return () => socket.off("messagesSeen", handleMessagesSeen);
	  }, [socket, currentUser._id, messages, selectedConversation]);
	  
  
	// Scroll to bottom on new message
	useEffect(() => {
	  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
  
	// Fetch messages when conversation changes
	useEffect(() => {
	  const getMessages = async () => {
		setLoadingMessages(true);
		setMessages([]);
		try {
		  if (selectedConversation.mock) return;
		  const res = await fetch(`/api/messages/${selectedConversation.userId}`);
		  const data = await res.json();
		  if (data.error) {
			showToast("Error", data.error, "error");
			return;
		  }
		  setMessages(data);
		} catch (error) {
		  showToast("Error", error.message, "error");
		} finally {
		  setLoadingMessages(false);
		}
	  };
  
	  getMessages();
	}, [showToast, selectedConversation.userId, selectedConversation.mock]);
  
	// Poll every 1 second to fetch new messages
	useEffect(() => {
	  if (!selectedConversation.userId || selectedConversation.mock) return;
  
	  const interval = setInterval(() => {
		const fetchMessages = async () => {
		  try {
			const res = await fetch(`/api/messages/${selectedConversation.userId}`);
			const data = await res.json();
			if (!data.error) {
			  setMessages(data);
			}
		  } catch (err) {
			console.error("Auto refresh error:", err.message);
		  }
		};
		fetchMessages();
	  }, 1000);
  
	  return () => clearInterval(interval);
	}, [selectedConversation.userId, selectedConversation.mock]);
  

	useEffect(() => {
		const prevLength = prevMessagesLengthRef.current;
		const currentLength = messages.length;
	  
		// Only play sound if a new message was added
		if (currentLength > prevLength) {
		  const lastMessage = messages[messages.length - 1];
	  
		  // Don't play sound if the last message was sent by current user
		  if (lastMessage?.sender !== currentUser._id && messageAudioRef.current) {
			messageAudioRef.current.pause();
			messageAudioRef.current.currentTime = 0;
			messageAudioRef.current.play().catch(() => {});
		  }
		}
	  
		prevMessagesLengthRef.current = currentLength;
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	  }, [messages, currentUser._id]);
	  

	  
	
	return (
	  <Flex
		flex="70"
		bg={useColorModeValue("gray.200", "gray.dark")}
		borderRadius={"md"}
		p={2}
		flexDirection={"column"}
	  >
		{/* Message header */}
		<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
		  <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
		  <Text display={"flex"} alignItems={"center"}>
			{selectedConversation.username}{" "}
			<Image src="/verified.png" w={4} h={4} ml={1} />
		  </Text>
		</Flex>
  
		<Divider />
  
		<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
		  {loadingMessages &&
			[...Array(5)].map((_, i) => (
			  <Flex
				key={i}
				gap={2}
				alignItems={"center"}
				p={1}
				borderRadius={"md"}
				alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
			  >
				{i % 2 === 0 && <SkeletonCircle size={7} />}
				<Flex flexDir={"column"} gap={2}>
				  <Skeleton h="8px" w="250px" />
				  <Skeleton h="8px" w="250px" />
				  <Skeleton h="8px" w="250px" />
				</Flex>
				{i % 2 !== 0 && <SkeletonCircle size={7} />}
			  </Flex>
			))}
  
		  {!loadingMessages &&
			messages.map((message) => (
			  <Flex
				key={message._id}
				direction={"column"}
				ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
			  >
				<Message message={message} ownMessage={currentUser._id === message.sender} />
			  </Flex>
			))}
		</Flex>
  
		<MessageInput setMessages={setMessages} />
	  </Flex>
	);
  };
  
  export default MessageContainer;









// may 27 33
// import { useEffect, useRef } from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
// import {
//   selectedConversationAtom,
//   conversationsAtom,
// } from "../atoms/messagesAtom";
// import userAtom from "../atoms/userAtom";
// import Message from "./Message";

// const MessageContainer = ({ socket }) => {
//   const selectedConversation = useRecoilValue(selectedConversationAtom);
//   const [messages, setMessages] = useRecoilState(messagesAtom);
//   const [conversations, setConversations] = useRecoilState(conversationsAtom);
//   const currentUser = useRecoilValue(userAtom);

//   const messageAudioRef = useRef(null);

//   // MARK MESSAGES AS SEEN whenever user opens a conversation or socket/selection changes
//   useEffect(() => {
//     if (!socket || !selectedConversation) return;

//     // Emit markMessagesAsSeen with conversationId and senderId (the other user)
//     socket.emit("markMessagesAsSeen", {
//       conversationId: selectedConversation._id,
//       senderId: selectedConversation.userId, // ID of the other participant
//     });
//   }, [socket, selectedConversation]);

//   // HANDLE NEW MESSAGES coming through socket
//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (message) => {
//       // Mark own messages as seen immediately for blue ticks
//       if (message.sender === currentUser._id) {
//         message.seen = true;
//       }

//       // Add message only if it belongs to current selected conversation
//       if (selectedConversation?._id === message.conversationId) {
//         setMessages((prev) => [...prev, message]);
//       }

//       // Play notification sound if tab is not focused
//       if (!document.hasFocus() && messageAudioRef.current) {
//         messageAudioRef.current.pause();
//         messageAudioRef.current.currentTime = 0;
//         messageAudioRef.current.play().catch(() => {});
//       }

//       // Update lastMessage in conversations list for preview
//       setConversations((prev) =>
//         prev.map((conversation) => {
//           if (conversation._id === message.conversationId) {
//             return {
//               ...conversation,
//               lastMessage: {
//                 text: message.text,
//                 sender: message.sender,
//                 seen: message.seen || false,
//               },
//             };
//           }
//           return conversation;
//         })
//       );
//     };

//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket, selectedConversation, currentUser._id, setMessages, setConversations]);

//   // HANDLE messagesSeen event to update seen flag of all messages in conversation
//   useEffect(() => {
//     if (!socket) return;

//     const handleMessagesSeen = ({ conversationId }) => {
//       if (conversationId === selectedConversation?._id) {
//         // Set all messages' seen=true in current conversation
//         setMessages((prev) =>
//           prev.map((msg) =>
//             msg.conversationId === conversationId
//               ? { ...msg, seen: true }
//               : msg
//           )
//         );

//         // Update last message seen state in conversations list preview
//         setConversations((prev) =>
//           prev.map((conv) =>
//             conv._id === conversationId
//               ? {
//                   ...conv,
//                   lastMessage: { ...conv.lastMessage, seen: true },
//                 }
//               : conv
//           )
//         );
//       }
//     };

//     socket.on("messagesSeen", handleMessagesSeen);

//     return () => {
//       socket.off("messagesSeen", handleMessagesSeen);
//     };
//   }, [socket, selectedConversation, setMessages, setConversations]);

//   if (!selectedConversation) {
//     return <div>Select a conversation</div>;
//   }

//   return (
//     <>
//       <audio ref={messageAudioRef} src="/message-sound.mp3" preload="auto" />
//       <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//         {messages
//           .filter((msg) => msg.conversationId === selectedConversation._id)
//           .map((msg) => (
//             <Message
//               key={msg._id}
//               ownMessage={msg.sender === currentUser._id}
//               message={msg}
//             />
//           ))}
//       </div>
//     </>
//   );
// };

// export default MessageContainer;


  
  
  
  
  









  //gpt may27 3

//   import {
// 	Avatar,
// 	Divider,
// 	Flex,
// 	Image,
// 	Skeleton,
// 	SkeletonCircle,
// 	Text,
// 	useColorModeValue,
//   } from "@chakra-ui/react";
//   import Message from "./Message";
//   import MessageInput from "./MessageInput";
//   import { useEffect, useRef, useState } from "react";
//   import useShowToast from "../hooks/useShowToast";
//   import {
// 	conversationsAtom,
// 	selectedConversationAtom,
//   } from "../atoms/messagesAtom";
//   import { useRecoilValue, useSetRecoilState } from "recoil";
//   import userAtom from "../atoms/userAtom";
//   import { useSocket } from "../context/SocketContext.jsx";
// //   import { useRef } from "react";

  
//   const MessageContainer = () => {
// 	const showToast = useShowToast();
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const [loadingMessages, setLoadingMessages] = useState(true);
// 	const [messages, setMessages] = useState([]);
// 	const currentUser = useRecoilValue(userAtom);
// 	const { socket } = useSocket();
// 	const setConversations = useSetRecoilState(conversationsAtom);
// 	const messageEndRef = useRef(null);
	
  
// 	// Audio ref to hold the sound object
// 	const messageAudioRef = useRef(null);
// 	// Flag to indicate if audio is unlocked (user interacted)
// 	const audioUnlockedRef = useRef(false);
  
// 	// Initialize audio and unlock on user interaction
// 	useEffect(() => {
// 	  messageAudioRef.current = new Audio("/message.mp3");
// 	  messageAudioRef.current.load();
  
// 	  const unlockAudio = () => {
// 		if (audioUnlockedRef.current) return; // Already unlocked
  
// 		audioUnlockedRef.current = true;
// 		// Play and pause to unlock audio autoplay restrictions
// 		messageAudioRef.current
// 		  .play()
// 		  .catch(() => {})
// 		  .finally(() => {
// 			messageAudioRef.current.pause();
// 			messageAudioRef.current.currentTime = 0;
// 		  });
// 		document.removeEventListener("click", unlockAudio);
// 	  };
  
// 	  document.addEventListener("click", unlockAudio);
  
// 	  return () => {
// 		document.removeEventListener("click", unlockAudio);
// 	  };
// 	}, []);
  
// 	// Play sound helper
// 	const playSound = () => {
// 	  if (!audioUnlockedRef.current || !messageAudioRef.current) return;
  
// 	  messageAudioRef.current.pause();
// 	  messageAudioRef.current.currentTime = 0;
// 	  messageAudioRef.current.play().catch(() => {});
// 	};
  
// 	// Listen for new messages from socket
// 	useEffect(() => {
// 	  if (!socket) return;
  
// 	  const handleNewMessage = (message) => {
// 		// Add message if it belongs to current conversation
// 		if (selectedConversation._id === message.conversationId) {
// 		  setMessages((prev) => [...prev, message]);
// 		}
  
// 		// Update conversations last message
// 		setConversations((prev) =>
// 		  prev.map((conv) => {
// 			if (conv._id === message.conversationId) {
// 			  return {
// 				...conv,
// 				lastMessage: {
// 				  text: message.text,
// 				  sender: message.sender,
// 				},
// 			  };
// 			}
// 			return conv;
// 		  })
// 		);
  
// 		// Play sound for any new message (whether window focused or not)
// 		playSound();
// 	  };
  
// 	  socket.on("newMessage", handleNewMessage);
  
// 	  return () => socket.off("newMessage", handleNewMessage);
// 	}, [socket, selectedConversation, setConversations]);
  
// 	// Mark messages as seen
// 	useEffect(() => {
// 	  if (!socket) return;
  
// 	  const lastMessageIsFromOtherUser =
// 		messages.length && messages[messages.length - 1].sender !== currentUser._id;
  
// 	  if (lastMessageIsFromOtherUser) {
// 		socket.emit("markMessagesAsSeen", {
// 		  conversationId: selectedConversation._id,
// 		  userId: selectedConversation.userId,
// 		});
// 	  }
  
// 	  const handleMessagesSeen = ({ conversationId }) => {
// 		if (selectedConversation._id === conversationId) {
// 		  setMessages((prev) =>
// 			prev.map((msg) => {
// 			  if (!msg.seen) {
// 				return { ...msg, seen: true };
// 			  }
// 			  return msg;
// 			})
// 		  );
// 		}
// 	  };
  
// 	  socket.on("messagesSeen", handleMessagesSeen);
  
// 	  return () => socket.off("messagesSeen", handleMessagesSeen);
// 	}, [socket, currentUser._id, messages, selectedConversation]);
  
// 	// Scroll to bottom on new messages
// 	useEffect(() => {
// 	  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);
  
// 	// Fetch messages when conversation changes
// 	useEffect(() => {
// 	  const getMessages = async () => {
// 		setLoadingMessages(true);
// 		try {
// 		  if (selectedConversation.mock) return;
// 		  const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 		  const data = await res.json();
// 		  if (data.error) {
// 			showToast("Error", data.error, "error");
// 			return;
// 		  }
// 		  setMessages(data);
// 		} catch (error) {
// 		  showToast("Error", error.message, "error");
// 		} finally {
// 		  setLoadingMessages(false);
// 		}
// 	  };
  
// 	  getMessages();
// 	}, [showToast, selectedConversation.userId, selectedConversation.mock]);
  
// 	// Poll for new messages every 1 second (optional)
// 	useEffect(() => {
// 	  if (!selectedConversation.userId || selectedConversation.mock) return;
  
// 	  const interval = setInterval(() => {
// 		const fetchMessages = async () => {
// 		  try {
// 			const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 			const data = await res.json();
// 			if (!data.error) {
// 			  // If new messages are received, play sound if audio unlocked
// 			  if (data.length > messages.length) {
// 				playSound();
// 			  }
// 			  setMessages(data);
// 			}
// 		  } catch (err) {
// 			console.error("Auto refresh error:", err.message);
// 		  }
// 		};
// 		fetchMessages();
// 	  }, 1000);
  
// 	  return () => clearInterval(interval);
// 	}, [selectedConversation.userId, selectedConversation.mock, messages.length]);
  

// 	useEffect(() => {
// 		// Play sound only if messages length increased
// 		if (messages.length > prevMessagesCountRef.current) {
// 		  // Play only if audio unlocked
// 		  playSound();
// 		}
// 		prevMessagesCountRef.current = messages.length;
// 	  }, [messages]);
// 	// Play sound when sending a new message
// 	// Pass setMessages to MessageInput, so update there triggers sound
// 	// Alternatively, monitor messages length increase here:
// 	useEffect(() => {
// 	  // Play sound on local message sent
// 	  // But don't double play if last message was received from socket, so only on new own messages
// 	  const lastMessage = messages[messages.length - 1];
// 	  if (!lastMessage) return;
  
// 	  if (lastMessage.sender === currentUser._id) {
// 		playSound();
// 	  }
// 	}, [messages, currentUser._id]);
  
// 	return (
// 	  <Flex
// 		flex="70"
// 		bg={useColorModeValue("gray.200", "gray.dark")}
// 		borderRadius={"md"}
// 		p={2}
// 		flexDirection={"column"}
// 	  >
// 		{/* Message header */}
// 		<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
// 		  <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
// 		  <Text display={"flex"} alignItems={"center"}>
// 			{selectedConversation.username}{" "}
// 			<Image src="/verified.png" w={4} h={4} ml={1} />
// 		  </Text>
// 		</Flex>
  
// 		<Divider />
  
// 		<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
// 		  {loadingMessages &&
// 			[...Array(5)].map((_, i) => (
// 			  <Flex
// 				key={i}
// 				gap={2}
// 				alignItems={"center"}
// 				p={1}
// 				borderRadius={"md"}
// 				alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
// 			  >
// 				{i % 2 === 0 && <SkeletonCircle size={7} />}
// 				<Flex flexDir={"column"} gap={2}>
// 				  <Skeleton h="8px" w="250px" />
// 				  <Skeleton h="8px" w="250px" />
// 				  <Skeleton h="8px" w="250px" />
// 				</Flex>
// 				{i % 2 !== 0 && <SkeletonCircle size={7} />}
// 			  </Flex>
// 			))}
  
// 		  {!loadingMessages &&
// 			messages.map((message) => (
// 			  <Flex
// 				key={message._id}
// 				direction={"column"}
// 				ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
// 			  >
// 				<Message message={message} ownMessage={currentUser._id === message.sender} />
// 			  </Flex>
// 			))}
// 		</Flex>
  
// 		<MessageInput setMessages={setMessages} />
// 	  </Flex>
// 	);
//   };
  
//   export default MessageContainer;
  
  
  





//original
// import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
// import Message from "./Message";
// import MessageInput from "./MessageInput";
// import { useEffect, useRef, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { useSocket } from "../context/SocketContext.jsx";
// import messageSound from "../assets/sounds/message.mp3";
// const MessageContainer = () => {
// 	const showToast = useShowToast();
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const [loadingMessages, setLoadingMessages] = useState(true);
// 	const [messages, setMessages] = useState([]);
// 	const currentUser = useRecoilValue(userAtom);
// 	const { socket } = useSocket();
// 	const setConversations = useSetRecoilState(conversationsAtom);
// 	const messageEndRef = useRef(null);

// 	useEffect(() => {
// 		socket.on("newMessage", (message) => {
// 			if (selectedConversation._id === message.conversationId) {
// 				setMessages((prev) => [...prev, message]);
// 			}

// 			// make a sound if the window is not focused
// 			if (!document.hasFocus()) {
// 				const sound = new Audio(messageSound);
// 				sound.play();
// 			}

// 			setConversations((prev) => {
// 				const updatedConversations = prev.map((conversation) => {
// 					if (conversation._id === message.conversationId) {
// 						return {
// 							...conversation,
// 							lastMessage: {
// 								text: message.text,
// 								sender: message.sender,
// 							},
// 						};
// 					}
// 					return conversation;
// 				});
// 				return updatedConversations;
// 			});
// 		});

// 		return () => socket.off("newMessage");
// 	}, [socket, selectedConversation, setConversations]);

// 	useEffect(() => {
// 		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== currentUser._id;
// 		if (lastMessageIsFromOtherUser) {
// 			socket.emit("markMessagesAsSeen", {
// 				conversationId: selectedConversation._id,
// 				userId: selectedConversation.userId,
// 			});
// 		}

// 		socket.on("messagesSeen", ({ conversationId }) => {
// 			if (selectedConversation._id === conversationId) {
// 				setMessages((prev) => {
// 					const updatedMessages = prev.map((message) => {
// 						if (!message.seen) {
// 							return {
// 								...message,
// 								seen: true,
// 							};
// 						}
// 						return message;
// 					});
// 					return updatedMessages;
// 				});
// 			}
// 		});
// 	}, [socket, currentUser._id, messages, selectedConversation]);

// 	useEffect(() => {
// 		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoadingMessages(true);
// 			setMessages([]);
// 			try {
// 				if (selectedConversation.mock) return;
// 				const res = await fetch(`/api/messages/${selectedConversation.userId}`);
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				setMessages(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setLoadingMessages(false);
// 			}
// 		};

// 		getMessages();
// 	}, [showToast, selectedConversation.userId, selectedConversation.mock]);

// 	return (
// 		<Flex
// 			flex='70'
// 			bg={useColorModeValue("gray.200", "gray.dark")}
// 			borderRadius={"md"}
// 			p={2}
// 			flexDirection={"column"}
// 		>
// 			{/* Message header */}
// 			<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
// 				<Avatar src={selectedConversation.userProfilePic} size={"sm"} />
// 				<Text display={"flex"} alignItems={"center"}>
// 					{selectedConversation.username} <Image src='/verified.png' w={4} h={4} ml={1} />
// 				</Text>
// 			</Flex>

// 			<Divider />

// 			<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
// 				{loadingMessages &&
// 					[...Array(5)].map((_, i) => (
// 						<Flex
// 							key={i}
// 							gap={2}
// 							alignItems={"center"}
// 							p={1}
// 							borderRadius={"md"}
// 							alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
// 						>
// 							{i % 2 === 0 && <SkeletonCircle size={7} />}
// 							<Flex flexDir={"column"} gap={2}>
// 								<Skeleton h='8px' w='250px' />
// 								<Skeleton h='8px' w='250px' />
// 								<Skeleton h='8px' w='250px' />
// 							</Flex>
// 							{i % 2 !== 0 && <SkeletonCircle size={7} />}
// 						</Flex>
// 					))}

// 				{!loadingMessages &&
// 					messages.map((message) => (
// 						<Flex
// 							key={message._id}
// 							direction={"column"}
// 							ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
// 						>
// 							<Message message={message} ownMessage={currentUser._id === message.sender} />
// 						</Flex>
// 					))}
// 			</Flex>

// 			<MessageInput setMessages={setMessages} />
// 		</Flex>
// 	);
// };

// export default MessageContainer;
