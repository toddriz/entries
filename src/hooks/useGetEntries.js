import { useEffect, useMemo, useState } from 'react';
import firebase from 'firebase';
import useAuthState from './useAuthState';

const useGetEntries = (limit = 10, offset = 0, filters) => {
    const [user] = useAuthState();
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const firestore = firebase.firestore();

        const getEntries = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // TODO implement startAt aka offset
                // TODO implement filtering by tag
                const querySnapshot = await firestore.collection('entries')
                    .where('userId', '==', user.uid).orderBy('date', 'desc').limit(limit).get();

                const queriedEntries = [];
                querySnapshot.forEach((doc) => queriedEntries.push({ id: doc.id, ...doc.data() }));
                setEntries(queriedEntries);
            } catch (error) {
                setError(error);
            }

            setIsLoading(false);
        };
        getEntries();
    }, [user.uid, limit, offset, filters]);

    return useMemo(() => [entries, isLoading, error], [entries, isLoading, error]);
};

export default useGetEntries;
