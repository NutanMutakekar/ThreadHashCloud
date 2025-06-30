//chatgpt
// import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
// import { selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { BsCheck2All, BsCheck } from "react-icons/bs"; // Added BsCheck for single tick
// import { useState } from "react";

// const Message = ({ ownMessage, message }) => {
//   const selectedConversation = useRecoilValue(selectedConversationAtom);
//   const user = useRecoilValue(userAtom);
//   const [imgLoaded, setImgLoaded] = useState(false);

//   return (
//     <>
//       {ownMessage ? (
//         <Flex gap={2} alignSelf={"flex-end"}>
//           {message.text && (
//             <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
//               <Text color={"white"}>{message.text}</Text>
//               <Box
//                 alignSelf={"flex-end"}
//                 ml={1}
//                 color={message.seen ? "blue.400" : "gray.400"} // blue if seen else gray
//                 fontWeight={"bold"}
//               >
//                 {message.seen ? (
//                   <BsCheck2All size={16} />
//                 ) : (
//                   <BsCheck size={16} />
//                 )}
//               </Box>
//             </Flex>
//           )}
//           {message.img && !imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image
//                 src={message.img}
//                 hidden
//                 onLoad={() => setImgLoaded(true)}
//                 alt="Message image"
//                 borderRadius={4}
//               />
//               <Skeleton w={"200px"} h={"200px"} />
//             </Flex>
//           )}

//           {message.img && imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image src={message.img} alt="Message image" borderRadius={4} />
//               <Box
//                 alignSelf={"flex-end"}
//                 ml={1}
//                 color={message.seen ? "blue.400" : "gray.400"} // blue if seen else gray
//                 fontWeight={"bold"}
//               >
//                 {message.seen ? (
//                   <BsCheck2All size={16} />
//                 ) : (
//                   <BsCheck size={16} />
//                 )}
//               </Box>
//             </Flex>
//           )}

//           <Avatar src={user.profilePic} w="7" h={7} />
//         </Flex>
//       ) : (
//         <Flex gap={2}>
//           <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />

//           {message.text && (
//             <Text
//               maxW={"350px"}
//               bg={"gray.400"}
//               p={1}
//               borderRadius={"md"}
//               color={"black"}
//             >
//               {message.text}
//             </Text>
//           )}
//           {message.img && !imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image
//                 src={message.img}
//                 hidden
//                 onLoad={() => setImgLoaded(true)}
//                 alt="Message image"
//                 borderRadius={4}
//               />
//               <Skeleton w={"200px"} h={"200px"} />
//             </Flex>
//           )}

//           {message.img && imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image src={message.img} alt="Message image" borderRadius={4} />
//             </Flex>
//           )}
//         </Flex>
//       )}
//     </>
//   );
// };

// export default Message;

//chatgpt22
// import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
// import { selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { BsCheck2All, BsCheck } from "react-icons/bs"; // Import single and double tick icons
// import { useState } from "react";

// const Message = ({ ownMessage, message }) => {
//   const selectedConversation = useRecoilValue(selectedConversationAtom);
//   const user = useRecoilValue(userAtom);
//   const [imgLoaded, setImgLoaded] = useState(false);

//   return (
//     <>
//       {ownMessage ? (
//         <Flex gap={2} alignSelf={"flex-end"}>
//           {message.text && (
//             <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
//               <Text color={"white"}>{message.text}</Text>
//               <Box
//                 alignSelf={"flex-end"}
//                 ml={1}
//                 color={message.seen ? "blue.400" : "gray.400"} // blue or gray
//                 fontWeight={"bold"}
//               >
//                 {message.seen ? (
//                   <BsCheck2All size={16} />
//                 ) : (
//                   <BsCheck size={16} />
//                 )}
//               </Box>
//             </Flex>
//           )}
//           {message.img && !imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image
//                 src={message.img}
//                 hidden
//                 onLoad={() => setImgLoaded(true)}
//                 alt="Message image"
//                 borderRadius={4}
//               />
//               <Skeleton w={"200px"} h={"200px"} />
//             </Flex>
//           )}

//           {message.img && imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image src={message.img} alt="Message image" borderRadius={4} />
//               <Box
//                 alignSelf={"flex-end"}
//                 ml={1}
//                 color={message.seen ? "blue.400" : "gray.400"} // blue or gray
//                 fontWeight={"bold"}
//               >
//                 {message.seen ? (
//                   <BsCheck2All size={16} />
//                 ) : (
//                   <BsCheck size={16} />
//                 )}
//               </Box>
//             </Flex>
//           )}

//           <Avatar src={user.profilePic} w="7" h={7} />
//         </Flex>
//       ) : (
//         <Flex gap={2}>
//           <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />

//           {message.text && (
//             <Text
//               maxW={"350px"}
//               bg={"gray.400"}
//               p={1}
//               borderRadius={"md"}
//               color={"black"}
//             >
//               {message.text}
//             </Text>
//           )}
//           {message.img && !imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image
//                 src={message.img}
//                 hidden
//                 onLoad={() => setImgLoaded(true)}
//                 alt="Message image"
//                 borderRadius={4}
//               />
//               <Skeleton w={"200px"} h={"200px"} />
//             </Flex>
//           )}

//           {message.img && imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image src={message.img} alt="Message image" borderRadius={4} />
//             </Flex>
//           )}
//         </Flex>
//       )}
//     </>
//   );
// };

// export default Message;




//gpt may 27 code trial 11


// import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
// import { selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { BsCheck2All } from "react-icons/bs";
// import { useState } from "react";

// const Message = ({ ownMessage, message }) => {
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const user = useRecoilValue(userAtom);
// 	const [imgLoaded, setImgLoaded] = useState(false);

// 	// Decide tick color
// 	const tickColor = message.seen ? "blue.400" : "gray.300";

// 	return (
// 		<Flex gap={2} alignSelf={ownMessage ? "flex-end" : "flex-start"}>
// 			{/* Left Avatar for received messages */}
// 			{!ownMessage && (
// 				<Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
// 			)}

// 			<Flex direction="column" alignItems={ownMessage ? "flex-end" : "flex-start"}>
// 				{/* Text Message */}
// 				{message.text && (
// 					<Flex
// 						bg={ownMessage ? "green.800" : "gray.400"}
// 						maxW={"350px"}
// 						p={2}
// 						borderRadius={"md"}
// 						color={ownMessage ? "white" : "black"}
// 						position="relative"
// 					>
// 						<Text>{message.text}</Text>

// 						{/* Seen Tick for own messages only */}
// 						{ownMessage && (
// 							<Box ml={2} alignSelf="flex-end" color={tickColor}>
// 								<BsCheck2All size={16} />
// 							</Box>
// 						)}
// 					</Flex>
// 				)}

// 				{/* Image Message */}
// 				{message.img && (
// 					<Flex mt={2} w="200px" position="relative">
// 						<Image
// 							src={message.img}
// 							alt="Message image"
// 							borderRadius={4}
// 							onLoad={() => setImgLoaded(true)}
// 							hidden={!imgLoaded}
// 						/>
// 						{!imgLoaded && <Skeleton w="200px" h="200px" />}
// 						{imgLoaded && ownMessage && (
// 							<Box
// 								position="absolute"
// 								bottom={1}
// 								right={1}
// 								color={tickColor}
// 								bg="rgba(0,0,0,0.4)"
// 								borderRadius="full"
// 								p={0.5}
// 							>
// 								<BsCheck2All size={16} />
// 							</Box>
// 						)}
// 					</Flex>
// 				)}
// 			</Flex>

// 			{/* Right Avatar for own messages */}
// 			{ownMessage && <Avatar src={user.profilePic} w={7} h={7} />}
// 		</Flex>
// 	);
// };

// export default Message;




//gpt trail 22

// import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
// import { selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { BsCheck2All } from "react-icons/bs";
// import { useState } from "react";
// import { useEffect } from "react";

// const Message = ({ ownMessage, message }) => {
//   const selectedConversation = useRecoilValue(selectedConversationAtom);
//   const user = useRecoilValue(userAtom);
//   const [imgLoaded, setImgLoaded] = useState(false);

//   // Correct tick color: blue if seen, gray if not
 
//   const tickColor = message.seen ? "blue.400" : "blue.300";
//   useEffect(() => {
//     if (ownMessage) {
//       const timeout = setTimeout(() => {
//         setShowTick(true);
//       }, 100);
//       return () => clearTimeout(timeout); // cleanup
//     }
//   }, [ownMessage]);

//   return (
//     <Flex gap={2} alignSelf={ownMessage ? "flex-end" : "flex-start"}>
//       {/* Left Avatar for received messages */}
//       {!ownMessage && (
//         <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
//       )}

//       <Flex direction="column" alignItems={ownMessage ? "flex-end" : "flex-start"}>
//         {/* Text Message */}
//         {message.text && (
//           <Flex
//             bg={ownMessage ? "green.800" : "gray.400"}
//             maxW={"350px"}
//             p={2}
//             borderRadius={"md"}
//             color={ownMessage ? "white" : "black"}
//             position="relative"
//           >
//             <Text>{message.text}</Text>

//             {/* Seen Tick for own messages only */}
//             {ownMessage && (
//               <Box ml={2} alignSelf="flex-end" color={tickColor}>
//                 <BsCheck2All size={16} />
//               </Box>
//             )}
//           </Flex>
//         )}

//         {/* Image Message */}
//         {message.img && (
//           <Flex mt={2} w="200px" position="relative">
//             <Image
//               src={message.img}
//               alt="Message image"
//               borderRadius={4}
//               onLoad={() => setImgLoaded(true)}
//               hidden={!imgLoaded}
//             />
//             {!imgLoaded && <Skeleton w="200px" h="200px" />}
//             {imgLoaded && ownMessage && (
//               <Box
//                 position="absolute"
//                 bottom={1}
//                 right={1}
//                 color={tickColor}
//                 bg="rgba(0,0,0,0.4)"
//                 borderRadius="full"
//                 p={0.5}
//               >
//                 <BsCheck2All size={16} />
//               </Box>
//             )}
//           </Flex>
//         )}
//       </Flex>

//       {/* Right Avatar for own messages */}
//       {ownMessage && <Avatar src={user.profilePic} w={7} h={7} />}
//     </Flex>
//   );
// };

// export default Message;



//gpt may 28
import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useEffect, useState } from "react";

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showBlueTick, setShowBlueTick] = useState(false); // local fake "seen"

  useEffect(() => {
    if (ownMessage) {
      const timer = setTimeout(() => {
        setShowBlueTick(true);
      }, 1050);
      return () => clearTimeout(timer);
    }
  }, [ownMessage]);

  const tickColor = showBlueTick ? "blue.400" : "gray.400";

  return (
    <Flex gap={2} alignSelf={ownMessage ? "flex-end" : "flex-start"}>
      {!ownMessage && (
        <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
      )}

      <Flex direction="column" alignItems={ownMessage ? "flex-end" : "flex-start"}>
        {message.text && (
          <Flex
            bg={ownMessage ? "green.800" : "gray.400"}
            maxW={"350px"}
            p={2}
            borderRadius={"md"}
            color={ownMessage ? "white" : "black"}
            position="relative"
          >
            <Text>{message.text}</Text>
            {ownMessage && (
              <Box ml={2} alignSelf="flex-end" color={tickColor}>
                <BsCheck2All size={16} />
              </Box>
            )}
          </Flex>
        )}

        {message.img && (
          <Flex mt={2} w="200px" position="relative">
            <Image
              src={message.img}
              alt="Message image"
              borderRadius={4}
              onLoad={() => setImgLoaded(true)}
              hidden={!imgLoaded}
            />
            {!imgLoaded && <Skeleton w="200px" h="200px" />}
            {imgLoaded && ownMessage && (
              <Box
                position="absolute"
                bottom={1}
                right={1}
                color={tickColor}
                bg="rgba(0,0,0,0.4)"
                borderRadius="full"
                p={0.5}
              >
                <BsCheck2All size={16} />
              </Box>
            )}
          </Flex>
        )}
      </Flex>

      {ownMessage && <Avatar src={user.profilePic} w={7} h={7} />}
    </Flex>
  );
};

export default Message;













//original 
// import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
// import { selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { BsCheck2All } from "react-icons/bs";
// import { useState } from "react";

// const Message = ({ ownMessage, message }) => {
// 	const selectedConversation = useRecoilValue(selectedConversationAtom);
// 	const user = useRecoilValue(userAtom);
// 	const [imgLoaded, setImgLoaded] = useState(false);
	
// 	return (
// 		<>
// 			{ownMessage ? (
// 				<Flex gap={2} alignSelf={"flex-end"}>
// 					{message.text && (
// 						<Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
// 							<Text color={"white"}>{message.text}</Text>
// 							<Box
// 								alignSelf={"flex-end"}
// 								ml={1}
// 								color={message.seen ? "blue.400" : ""}
// 								fontWeight={"bold"}
// 							>
// 								<BsCheck2All size={16} />
// 							</Box>
// 						</Flex>
// 					)}
// 					{message.img && !imgLoaded && (
// 						<Flex mt={5} w={"200px"}>
// 							<Image
// 								src={message.img}
// 								hidden
// 								onLoad={() => setImgLoaded(true)}
// 								alt='Message image'
// 								borderRadius={4}
// 							/>
// 							<Skeleton w={"200px"} h={"200px"} />
// 						</Flex>
// 					)}

// 					{message.img && imgLoaded && (
// 						<Flex mt={5} w={"200px"}>
// 							<Image src={message.img} alt='Message image' borderRadius={4} />
// 							<Box
// 								alignSelf={"flex-end"}
// 								ml={1}
// 								color={message.seen ? "blue.400" : ""}
// 								fontWeight={"bold"}
// 							>
// 								<BsCheck2All size={16} />
// 							</Box>
// 						</Flex>
// 					)}

// 					<Avatar src={user.profilePic} w='7' h={7} />
// 				</Flex>
// 			) : (
// 				<Flex gap={2}>
// 					<Avatar src={selectedConversation.userProfilePic} w='7' h={7} />

// 					{message.text && (
// 						<Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>
// 							{message.text}
// 						</Text>
// 					)}
// 					{message.img && !imgLoaded && (
// 						<Flex mt={5} w={"200px"}>
// 							<Image
// 								src={message.img}
// 								hidden
// 								onLoad={() => setImgLoaded(true)}
// 								alt='Message image'
// 								borderRadius={4}
// 							/>
// 							<Skeleton w={"200px"} h={"200px"} />
// 						</Flex>
// 					)}

// 					{message.img && imgLoaded && (
// 						<Flex mt={5} w={"200px"}>
// 							<Image src={message.img} alt='Message image' borderRadius={4} />
// 						</Flex>
// 					)}
// 				</Flex>
// 			)}
// 		</>
// 	);
// };

// export default Message;
