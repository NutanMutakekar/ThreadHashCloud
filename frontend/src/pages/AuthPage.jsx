//original
// import { useRecoilValue } from "recoil";
// import LoginCard from "../components/LoginCard";
// import SignupCard from "../components/SignupCard";
// import authScreenAtom from "../atoms/authAtom";

// const AuthPage = () => {
// 	const authScreenState = useRecoilValue(authScreenAtom);

// 	return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
// };

// export default AuthPage;


//gpt 18 june
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to feed page (or dashboard)
    if (user) {
      navigate("/feed"); // Change to "/" or "/home" if your route is different
    }
  }, [user, navigate]);

  return (
    <>
      {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
    </>
  );
};

export default AuthPage;
