import { useState, useMemo, useCallback } from 'react';
import firebase from 'firebase/app';

const useCreateUserWithEmailAndPassword = (auth = firebase.auth(), options) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const createUserWithEmailAndPassword = useCallback(async (
        email,
        password
    ) => {
        setLoading(true);
        try {
            const user = await auth.createUserWithEmailAndPassword(email, password);
            if (options && options.sendEmailVerification && user.user) {
                await user.user.sendEmailVerification(options.emailVerificationOptions);
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [auth, options]);

    return useMemo(() => [createUserWithEmailAndPassword, loading, error], [createUserWithEmailAndPassword, loading, error]);
};

export default useCreateUserWithEmailAndPassword;
