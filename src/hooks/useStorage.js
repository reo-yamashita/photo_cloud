import { useState, useEffect } from "react";
import { timestamp } from "../firebase/config";
import { useFirebase, useFirestore } from "react-redux-firebase";

const useStorage = (file) => {
  const firebase = useFirebase();
  const firestore = useFirestore();

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const storageRef = firebase.storage().ref().child(file.name);
    const collectionRef = firestore.collection("images");

    storageRef.put(file).on(
      "state changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError("faild upload");
        console.log(err);
      },
      async () => {
        const src = await storageRef.getDownloadURL();
        const name = storageRef.name;
        const createdAt = timestamp();

        await storageRef.getMetadata().then((snap) => {
          //  console.log(snap);
          const size = snap.size;
          collectionRef.add({ name, src, createdAt, size });
        });
        setSrc(src);
      }
    );
  }, [file, firebase, firestore]);

  return { progress, src, error };
};

export default useStorage;
