import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import axios from 'axios';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyDAWdC1eFBcPaLT8Ppgr9ox1nOu_-BoqHM',
  authDomain: 'http://localhost:3000/',
  databaseURL: 'https://dpl-dew-5da22-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'gs://dpl-dew-5da22.appspot.com',
};


const firebaseApp = initializeApp(firebaseConfig);


// Get a reference to the storage service, which is used to create references in your storage bucket
//const storage = getStorage(firebaseApp);

export default firebaseApp;