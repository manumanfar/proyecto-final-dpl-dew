// import {ref, getDownloadURL} from 'firebase/storage';
// import storage from '../firebase/storage.js';


// const obtenerStorageUrl = async(nameUrl) => {

//     const httpsReference = await getDownloadURL(ref(storage, nameUrl));

//     const image = httpsReference.split('/');
    
//     let url = 'https://firebasestorage.googleapis.com/v0/b/dpl-dew-5da22.appspot.com/o/'+image[7];
    
//     return  url;
// }

// export default obtenerStorageUrl;