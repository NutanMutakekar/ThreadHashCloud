// original below

// import { Box, Container } from "@chakra-ui/react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import UserPage from "./pages/UserPage";
// import PostPage from "./pages/PostPage";
// import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import { useRecoilValue } from "recoil";
// import userAtom from "./atoms/userAtom";
// import UpdateProfilePage from "./pages/UpdateProfilePage";
// import CreatePost from "./components/CreatePost";
// import ChatPage from "./pages/ChatPage";
// import { SettingsPage } from "./pages/SettingsPage";
// import { useEffect } from "react";



// export let messageAudio = null;
// function App() {
// 	const user = useRecoilValue(userAtom);
// 	const { pathname } = useLocation();

	
// 	// useEffect(() => {
// 	// 	const unlockAudio = () => {
// 	// 		const audio = new Audio("/message.mp3");
// 	// 		audio.play().catch(() => {});
// 	// 		document.removeEventListener("click", unlockAudio);
// 	// 	};
	
// 	// 	document.addEventListener("click", unlockAudio);
// 	// }, []);
	
// // 	  useEffect(() => {
// //     const unlockAudio = () => {
// //       messageAudio = new Audio("/message.mp3");
// //       messageAudio.load();
// //       messageAudio.play().catch(() => {});
// //       document.removeEventListener("click", unlockAudio);
// //     };

// //     document.addEventListener("click", unlockAudio);

// //     return () => document.removeEventListener("click", unlockAudio);
// //   }, []);
// useEffect(() => {
//     const unlockAudio = () => {
//       if (!messageAudio) {
//         messageAudio = new Audio("/message.mp3");
//       }
//       messageAudio.load();
//       messageAudio.play().catch(() => {}); // unlock it on user interaction
//       document.removeEventListener("click", unlockAudio);
//     };

//     document.addEventListener("click", unlockAudio);

//     return () => {
//       document.removeEventListener("click", unlockAudio);
//     };
//   }, []);


// 	return (
// 		<Box position={"relative"} w='full'>
// 			<Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
// 				<Header />
// 				<Routes>
// 					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
// 					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
// 					<Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

// 					<Route
// 						path='/:username'
// 						element={
// 							user ? (
// 								<>
// 									<UserPage />
// 									<CreatePost />
// 								</>
// 							) : (
// 								<UserPage />
// 							)
// 						}
// 					/>
// 					<Route path='/:username/post/:pid' element={<PostPage />} />
// 					<Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
// 					<Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />
// 				</Routes>
// 			</Container>
// 		</Box>
// 	);
// }

// export default App;



//gpt one working


// import React, { useEffect } from "react";
// import { Box, Container } from "@chakra-ui/react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import UserPage from "./pages/UserPage";
// import PostPage from "./pages/PostPage";
// import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import { useRecoilValue } from "recoil";
// import userAtom from "./atoms/userAtom";
// import UpdateProfilePage from "./pages/UpdateProfilePage";
// import CreatePost from "./components/CreatePost";
// import ChatPage from "./pages/ChatPage";
// import { SettingsPage } from "./pages/SettingsPage";
// import { initiateSocket } from "./socketUI"; // <-- import your socket functions here

// export let messageAudio = null;

// function App() {
//   const user = useRecoilValue(userAtom);
//   const { pathname } = useLocation();

//   // Initialize socket only if user is logged in
//   useEffect(() => {
//     if (!user?._id) return; // wait for user to be loaded

//     const socket = initiateSocket(user._id);

//     socket.on("newMessage", (message) => {
//       console.log("Received new message:", message);
//       // TODO: update your chat UI or notify user here
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [user?._id]);

//   useEffect(() => {
//     const unlockAudio = () => {
//       if (!messageAudio) {
//         messageAudio = new Audio("/message.mp3");
//       }
//       messageAudio.load();
//       messageAudio.play().catch(() => {});
//       document.removeEventListener("click", unlockAudio);
//     };

//     document.addEventListener("click", unlockAudio);

//     return () => {
//       document.removeEventListener("click", unlockAudio);
//     };
//   }, []);

//   return (
//     <Box position={"relative"} w="full">
//       <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
//         <Header />
//         <Routes>
//           <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
//           <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
//           <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />

//           <Route
//             path="/:username"
//             element={
//               user ? (
//                 <>
//                   <UserPage />
//                   <CreatePost />
//                 </>
//               ) : (
//                 <UserPage />
//               )
//             }
//           />
//           <Route path="/:username/post/:pid" element={<PostPage />} />
//           <Route path="/chat" element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
//           <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />
//         </Routes>
//       </Container>
//     </Box>
//   );
// }

// export default App;


//gpt 18june

// import React, { useEffect } from "react";
// import { Box, Container } from "@chakra-ui/react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// import UserPage from "./pages/UserPage";
// import PostPage from "./pages/PostPage";
// import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import UpdateProfilePage from "./pages/UpdateProfilePage";
// import CreatePost from "./components/CreatePost";
// import ChatPage from "./pages/ChatPage";
// import { SettingsPage } from "./pages/SettingsPage";

// import { useRecoilValue } from "recoil";
// import userAtom from "./atoms/userAtom";

// import { initiateSocket, getSocket } from "./socketUI"; // ✅ Make sure this file exports both

// export let messageAudio = null;

// function App() {
//   const user = useRecoilValue(userAtom);
//   const { pathname } = useLocation();

//   // ✅ Connect socket only when user is logged in
//   useEffect(() => {
//     if (!user?._id) return;

//     const socket = initiateSocket(user._id);

//     socket.on("newMessage", (message) => {
//       console.log("📩 New message received:", message);

//       // Play notification sound
//       if (messageAudio) {
//         messageAudio.play().catch((err) => console.warn("Audio play failed", err));
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, [user?._id]);

//   // ✅ Unlock audio on first user click (required by browsers)
//   useEffect(() => {
//     const unlockAudio = () => {
//       if (!messageAudio) {
//         messageAudio = new Audio("/message.mp3"); // Make sure this file exists in your public folder
//       }
//       messageAudio.load();
//       messageAudio.play().catch(() => {});
//       document.removeEventListener("click", unlockAudio);
//     };

//     document.addEventListener("click", unlockAudio);

//     return () => {
//       document.removeEventListener("click", unlockAudio);
//     };
//   }, []);

//   return (
//     <Box position="relative" w="full">
//       <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
//         <Header />
//         <Routes>
//           <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
//           <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
//           <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />

//           <Route
//             path="/:username"
//             element={
//               user ? (
//                 <>
//                   <UserPage />
//                   <CreatePost />
//                 </>
//               ) : (
//                 <UserPage />
//               )
//             }
//           />
//           <Route path="/:username/post/:pid" element={<PostPage />} />
//           <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
//           <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
//         </Routes>
//       </Container>
//     </Box>
//   );
// }

// export default App;


//gpt part22 18 june


import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";

import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

import { initiateSocket, getSocket } from "./socketUI";

export let messageAudio = null;

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user?._id) return;

    const socket = initiateSocket(user._id);

    if (socket) {
      socket.on("newMessage", (message) => {
        console.log("📩 New message received:", message);

        if (messageAudio) {
          messageAudio.play().catch((err) => console.warn("Audio play failed", err));
        }
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("🛑 Socket disconnected");
      }
    };
  }, [user?._id]);

  useEffect(() => {
    const unlockAudio = () => {
      if (!messageAudio) {
        messageAudio = new Audio("/message.mp3");
      }
      messageAudio.load();
      messageAudio.play().catch(() => {});
      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
    };
  }, []);

  return (
    <Box position="relative" w="full">
      <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
        <Header />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />

          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;



//gpt 33 18 june

// import React, { useEffect } from "react";
// import { Box, Container } from "@chakra-ui/react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// import UserPage from "./pages/UserPage";
// import PostPage from "./pages/PostPage";
// import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import UpdateProfilePage from "./pages/UpdateProfilePage";
// import CreatePost from "./components/CreatePost";
// import ChatPage from "./pages/ChatPage";
// import { SettingsPage } from "./pages/SettingsPage";

// import { useRecoilValue } from "recoil";
// import userAtom from "./atoms/userAtom";

// import { initiateSocket } from "./socketUI";

// export let messageAudio = null;

// const UserWithPost = () => (
//   <>
//     <UserPage />
//     <CreatePost />
//   </>
// );

// function App() {
//   const user = useRecoilValue(userAtom);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     console.log("Logged-in user:", user);
//     if (!user?._id) return;

//     const socket = initiateSocket(user._id);

//     socket.on("newMessage", (message) => {
//       console.log("📩 New message received:", message);
//       if (messageAudio) {
//         messageAudio.play().catch((err) => console.warn("Audio play failed", err));
//       }
//     });

//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, [user?._id]);

//   useEffect(() => {
//     const unlockAudio = () => {
//       if (!messageAudio) {
//         messageAudio = new Audio("/message.mp3");
//       }
//       messageAudio.load();
//       messageAudio.play().catch(() => {});
//       document.removeEventListener("click", unlockAudio);
//     };

//     document.addEventListener("click", unlockAudio);
//     return () => {
//       document.removeEventListener("click", unlockAudio);
//     };
//   }, []);

//   return (
//     <Box position="relative" w="full">
//       <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
//         <Header />
//         <Routes>
//           <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
//           <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
//           <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
//           <Route path="/:username" element={user ? <UserWithPost /> : <UserPage />} />
//           <Route path="/:username/post/:pid" element={<PostPage />} />
//           <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
//           <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
//         </Routes>
//       </Container>
//     </Box>
//   );
// }

// export default App;
