import { useState, useMemo } from 'react';
import firebase from 'firebase/app';

export default (auth = firebase.auth(), options) => {
    const [error, setError] = useState();
    const [
        registeredUser,
        setRegisteredUser,
    ] = useState();
    const [loading, setLoading] = useState(false);

    const createUserWithEmailAndPassword = async (
        email,
        password
    ) => {
        setLoading(true);
        try {
            const user = await auth.createUserWithEmailAndPassword(email, password);
            if (options && options.sendEmailVerification && user.user) {
                await user.user.sendEmailVerification(options.emailVerificationOptions);
            }
            setRegisteredUser(user);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const resArray = [
        createUserWithEmailAndPassword,
        registeredUser,
        loading,
        error,
    ];
    return useMemo(() => resArray, resArray);
};
