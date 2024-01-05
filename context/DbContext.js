import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import { useAuth } from "./AuthContext.js";

const DbContext = createContext();

export function useDb() {
  return useContext(DbContext);
}

export function DbProvider({ children }) {
  const [userData, setUserData] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  // create context for user data on firestore
  // if user is logged in, get user data from firestore
  // if user is not logged in, set user data to null

  const getUserData = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (currentUser) {
      getUserData();
    } else {
      setUserData({ name: "" });
      setLoading(false);
    }
  }, [currentUser]);

  const value = { userData };

  return (
    <DbContext.Provider value={value}>
      {!loading && children}
    </DbContext.Provider>
  );
}
