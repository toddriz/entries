import { useEffect, useState } from 'react';
import firebase from 'firebase';

import useLogInWithEmailAndPassword from '../../hooks/useLogInWithEmailAndPassword';
import useCreateUserWithEmailAndPassword from '../../hooks/userCreateUserWithEmailAndPassword';
import './Login.scss';

const FORM_STATES = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD'
};

function Login() {
    const [formState, setFormState] = useState(FORM_STATES.LOGIN);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [didAlertUserOfCreateUserError, setDidAlertUserOfCreateUserError] = useState(false);
    const [didAlertUserOfLoginError, setDidAlertUserOfLoginError] = useState(false);

    const [
        logInWithEmailAndPassword,
        isLoggingIn,
        loginError,
    ] = useLogInWithEmailAndPassword();

    const [
        createUserWithEmailAndPassword,
        isCreatingUser,
        createUserError,
    ] = useCreateUserWithEmailAndPassword();

    useEffect(() => {
        if (isLoggingIn && didAlertUserOfLoginError) {
            setDidAlertUserOfLoginError(false);
        }

        if (loginError && !didAlertUserOfLoginError) {
            alert(loginError);
        }
    }, [isLoggingIn, loginError, didAlertUserOfLoginError]);

    useEffect(() => {
        if (isCreatingUser && didAlertUserOfCreateUserError) {
            setDidAlertUserOfCreateUserError(false);
        }

        if (createUserError && didAlertUserOfCreateUserError) {
            alert(createUserError);
        }
    }, [isCreatingUser, didAlertUserOfCreateUserError, createUserError]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        switch (formState) {
            case FORM_STATES.FORGOT_PASSWORD:
                firebase.auth().sendPasswordResetEmail(email);
                break;
            case FORM_STATES.REGISTER:
                if (password === confirmPassword) {
                    createUserWithEmailAndPassword(email, password);
                } else {
                    alert('passwords do not match');
                }

                break;
            default:
                logInWithEmailAndPassword(email, password);
                break;
        }
    };

    const renderButtons = () => {
        const buttons = [];

        let submitButtonLabel = 'login';
        switch (formState) {
            case FORM_STATES.LOGIN:
                buttons.push(
                    <button
                        key="register"
                        className="form-button register-button"
                        type="button"
                        onClick={() => setFormState(FORM_STATES.REGISTER)}
                    >
                        register
                    </button>
                );

                buttons.push(
                    <button
                        key="forgotPassword"
                        className="form-button forgot-password-button"
                        type="button"
                        onClick={() => setFormState(FORM_STATES.FORGOT_PASSWORD)}
                    >
                        forgot password?
                    </button>
                );

                break;
            case FORM_STATES.REGISTER:
                submitButtonLabel = 'register';
                buttons.push(
                    <button
                        key="back"
                        className="form-button back-button"
                        type="button"
                        onClick={() => setFormState(FORM_STATES.LOGIN)}
                    >
                        back
                    </button>
                );
                break;
            case FORM_STATES.FORGOT_PASSWORD:
                submitButtonLabel = 'submit';
                buttons.push(
                    <button
                        key="back"
                        className="form-button back-button"
                        type="button"
                        onClick={() => setFormState(FORM_STATES.LOGIN)}
                    >
                        back
                    </button>
                );

                break;
            default:
                break;
        }

        buttons.push(
            <button
                key="submit"
                className="form-button submit-button"
                type="submit"
            >
                {submitButtonLabel}
            </button>
        );

        buttons.push(<button
            key="quickLogin"
            className="quick-button"
            type="button"
            onClick={() => logInWithEmailAndPassword('toddriz@gmail.com', 'Gruffly2^Direness^Tracing')}
        >
            quick login
                    </button>);

        return (
            <div className="button-wrapper">
                {buttons}
            </div>
        );
    };

    return (
        <div className="jornal-login">
            <form className="login-form" onSubmit={handleOnSubmit}>
                <div className="login-title">jornal</div>
                <label className="field-label">
                    Email
                    <input
                        className="field-input email"
                        required
                        type="text"
                        autoComplete="true"
                        onChange={({ target }) => setEmail(target.value)}
                        value={email}
                    />
                </label>
                {formState !== FORM_STATES.FORGOT_PASSWORD && <label className="field-label">
                    Password
                    <input
                        className="field-input password"
                        required
                        type="password"
                        autoComplete="true"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                </label>}
                {formState === FORM_STATES.REGISTER && <label className="field-label">
                    Confirm Password
                    <input
                        className="field-input confirm-password"
                        required
                        type="password"
                        autoComplete="true"
                        onChange={({ target }) => setConfirmPassword(target.value)}
                        value={confirmPassword}
                    />
                </label>}
                {renderButtons()}
            </form>
        </div>
    );
}

export default Login;
