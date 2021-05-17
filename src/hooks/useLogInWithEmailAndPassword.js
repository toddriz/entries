
import { useState, useMemo } from 'react';
import firebase from 'firebase';

export default (auth = firebase.auth()) => {
    const [error, setError] = useState();
    const [
        loggedInUser,
        setLoggedInUser,
    ] = useState();
    const [loading, setLoading] = useState(false);

    const logInWithEmailAndPassword = async (
        email,
        password
    ) => {
        setLoading(true);
        try {
            const user = await auth.signInWithEmailAndPassword(email, password);
            setLoggedInUser(user);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const resArray = [
        logInWithEmailAndPassword,
        loggedInUser,
        loading,
        error,
    ];
    return useMemo(() => resArray, [resArray]);
};
