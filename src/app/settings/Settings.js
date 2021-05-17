import useAuthState from '../../hooks/useAuthState';

export default function () {
    const [user] = useAuthState();

    return (
        <pre>{JSON.stringify(user, null, 3)}</pre>
    );
}
