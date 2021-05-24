import useAuthState from '../../hooks/useAuthState';

const Settings = () => {
    const [user] = useAuthState();

    return (
        <pre>{JSON.stringify(user, null, 3)}</pre>
    );
};

export default Settings;
