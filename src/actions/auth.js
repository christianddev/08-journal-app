import Swal from 'sweetalert2';
import { types } from '../types/types';
import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const login = (uid, displayName) => (
  {
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
)

export const logout = () => (
  {
    type: types.logout
  }
);

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        dispatch(finishLoading());
        dispatch(
          login(user.uid, user.displayName)
        );
      } )
      .catch((error) => {
        Swal.fire({
          title: error?.code,
          text: error?.message,
          icon: 'error'
        });
        console.error('error startLoginWithEmailPassword: ', error);
        dispatch(finishLoading());
      });
    }

}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return ( dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async({user}) => {
        await user.updateProfile({displayName: name})
        dispatch(
          login(user.uid, user.displayName)
        );
      })
      .catch((error) => {
        Swal.fire({
          title: error?.code,
          text: error?.message,
          icon: 'error'
        });
        console.error('error startRegisterWithEmailPasswordName: ', error)
      }
        );
  }

}

export const startLoginGoogle = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
      })
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch( noteLogout() );
  }
}