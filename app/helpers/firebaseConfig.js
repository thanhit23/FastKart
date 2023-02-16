import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import axios from 'axios'

headers = {'Access-Control-Allow-Origin': '*'}
axios.post(url, params, headers )
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: '',
};
axios.request()

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export const uploadFile = file => {
  console.log('asdasdas');
  const storageRef = ref(storage, 'some-child');
    
  uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot, 'Uploaded a blob or file!');
  });
}

