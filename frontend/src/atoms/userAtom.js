//original
// import { atom } from "recoil";

// const userAtom = atom({
// 	key: "userAtom",
// 	default: JSON.parse(localStorage.getItem("user-threads")),
// });

// export default userAtom;

import { atom } from "recoil";

const defaultUser = JSON.parse(localStorage.getItem("user-threads")) || null;

const userAtom = atom({
  key: "userAtom",
  default: defaultUser,
});

export default userAtom;
