import firebase from './firebase';

export const getDepartments = (res, rej) => {
    firebase.database().ref("departments").once('value')
    .then(snap => {
        if (snap.exists()) {
            res(snap.val());
        } else {
            rej("Departments node does not exist");
        }
    })
    .catch(err => rej("There was an error getting department data: " + err));
}