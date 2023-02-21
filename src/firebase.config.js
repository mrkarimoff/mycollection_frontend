import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIsolmgp3_qaq0N-LAez72xTdHW27voRc",
  authDomain: "mycollectionimages-64a3d.firebaseapp.com",
  projectId: "mycollectionimages-64a3d",
  storageBucket: "mycollectionimages-64a3d.appspot.com",
  messagingSenderId: "473327648875",
  appId: "1:473327648875:web:1d9e7193d0ec0baf53712e",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
