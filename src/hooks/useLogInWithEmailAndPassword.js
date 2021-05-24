import { useState, useMemo, useCallback } from 'react';
import firebase from 'firebase';

const useLoginInWithEmailAndPassword = (auth = firebase.auth()) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const logInWithEmailAndPassword = useCallback(async (
        email,
        password
    ) => {
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, [auth]);

    return useMemo(() => [
        logInWithEmailAndPassword,
        loading,
        error,
    ], [logInWithEmailAndPassword, loading, error]);
};

export default useLoginInWithEmailAndPassword;
