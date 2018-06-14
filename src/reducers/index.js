import { combineReducers } from 'redux'
import appData from './dataReducer'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';



const rootReducer = combineReducers({
    appData,
    form: formReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;