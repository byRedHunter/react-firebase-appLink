import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyDrv6D_vhy3Gau5n2FfFRZfd5mpbj1RaC8',
	authDomain: 'fb-react-crud-1945a.firebaseapp.com',
	databaseURL: 'https://fb-react-crud-1945a.firebaseio.com',
	projectId: 'fb-react-crud-1945a',
	storageBucket: 'fb-react-crud-1945a.appspot.com',
	messagingSenderId: '955777545387',
	appId: '1:955777545387:web:22437939ae3368a449b3ee',
}
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
export const db = fb.firestore()
