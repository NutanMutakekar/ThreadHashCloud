import { useState } from "react";
// import useShowToast from "./useShowToast"; // Uncomment this if you use toast

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  // const showToast = useShowToast(); // Uncomment if using toast notifications

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "First_time_cloudinary"); // Replace with your actual preset

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dkqc23vpx/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
          setImgUrl(data.secure_url); // ✅ Image uploaded and URL received
        } else {
          console.error("Cloudinary upload failed:", data);
          // showToast("Upload failed", "Cloudinary did not return a secure URL", "error");
          setImgUrl(null);
        }
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        // showToast("Upload error", error.message, "error");
        setImgUrl(null);
      }
    } else {
      // showToast("Invalid file type", "Please select an image file", "error");
      setImgUrl(null);
    }
  };

  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;




//original one
// import { useState } from "react";
// import useShowToast from "./useShowToast";

// const usePreviewImg = () => {
// 	const [imgUrl, setImgUrl] = useState(null);
// 	const showToast = useShowToast();
// 	const handleImageChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file && file.type.startsWith("image/")) {
// 			const reader = new FileReader();

// 			reader.onloadend = () => {
// 				setImgUrl(reader.result);
// 			};

// 			reader.readAsDataURL(file);
// 		} else {
// 			showToast("Invalid file type", " Please select an image file", "error");
// 			setImgUrl(null);
// 		}
// 	};
// 	return { handleImageChange, imgUrl, setImgUrl };
// };

// export default usePreviewImg;
