// // src/utils/audioManager.js

// let messageAudio = null;

// export const unlockAudio = () => {
// 	if (!messageAudio) {
// 		messageAudio = new Audio("/message.mp3");
// 		messageAudio.load();
// 		messageAudio.play().catch(() => {});
// 	}
// };

// export const playMessageSound = () => {
// 	if (messageAudio) {
// 		messageAudio.currentTime = 0;
// 		messageAudio.play().catch((err) => {
// 			console.error("Audio play error:", err);
// 		});
// 	}
// };
