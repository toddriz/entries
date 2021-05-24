/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useReducer } from 'react';
import firebase from 'firebase';

const defaultState = (defaultValue) => {
    return {
        loading: defaultValue === undefined || defaultValue === null,
        value: defaultValue,
    };
};

const reducer = () => (
    state,
    action
) => {
    switch (action.type) {
        case 'error':
            return {
                ...state,
                error: action.error,
                loading: false,
                value: undefined,
            };
        case 'reset':
            return defaultState(action.defaultValue);
        case 'value':
            return {
                ...state,
                error: undefined,
                loading: false,
                value: action.value,
            };
        default:
            return state;
    }
};

const useLoadingValue = (getDefaultValue) => {
    const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    const [state, dispatch] = useReducer(
        reducer(),
        defaultState(defaultValue)
    );

    const reset = () => {
        const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
        dispatch({ type: 'reset', defaultValue });
    };

    const setError = (error) => {
        dispatch({ type: 'error', error });
    };

    const setValue = (value) => {
        dispatch({ type: 'value', value });
    };

    return useMemo(
        () => ({
            error: state.error,
            loading: state.loading,
            reset,
            setError,
            setValue,
            value: state.value,
        }),
        [state.error, state.loading, reset, setError, setValue, state.value]
    );
};

const useAuthState = (auth = firebase.auth()) => {
    const { error, loading, setError, setValue, value } = useLoadingValue(() => auth.currentUser);

    useEffect(() => {
        const listener = auth.onAuthStateChanged(setValue, setError);

        return () => {
            listener();
        };
    }, [auth]);

    const resArray = [value, loading, error];
    return useMemo(() => resArray, [resArray]);
};

export default useAuthState;
