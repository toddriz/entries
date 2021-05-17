import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import App from './app/App';
import './index.css';

const firebaseConfig = {
    apiKey: "AIzaSyAigwgMLcuUNQHNMkRK3beACBERpbGFQCY",
    authDomain: "jornal-32d72.firebaseapp.com",
    projectId: "jornal-32d72",
    storageBucket: "jornal-32d72.appspot.com",
    messagingSenderId: "789659533307",
    appId: "1:789659533307:web:0b28f42ce1ed2e73bad55e"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode className="jornal" >
        <App className="jornal" />
    </React.StrictMode>,
    document.getElementById('root')
);
