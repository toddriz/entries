import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import firebase from 'firebase';

import Entries from './entries/Entries';
import NewEntry from './newEntry/NewEntry';
import './App.scss';
import Login from './login/Login';
import useAuthState from '../hooks/useAuthState';
import Settings from './settings/Settings';

const queryClient = new QueryClient();


function Header({ onLogout }) {
    return (
        <div className="jornal-header">
            <Link className="header-link" to="/new">Add Entry</Link>
            <Link className="header-link" to="/">Entries</Link>
            <Link className="header-link" to="/entries/tags">Filter By Tag</Link>
            <Link className="header-link" to="/entries/search">Search</Link>
            <button type="button"
                className="header-link logout-button"
                onClick={onLogout}
            >
                logout
                </button>
        </div>
    );
}

function Footer() {
    const consecutiveDaysJournaled = 12;

    return (
        <div className="jornal-footer">
            <div className="stats">
                <div className="stat-label">
                    Consecutive Days Journaled
                </div>
                -
                <div className="stat-value">
                    {consecutiveDaysJournaled} days
                </div>
            </div>
            <div className="stats">
                <div className="stat-label">

                    Record
                </div>
                -
                <div className="stat-value">
                    32 days
                </div>
            </div>
            <div className="stats">
                <div className="stat-label">
                    Entries by category (last 30 days)
            </div>
                <div className="stat-value">
                    food - 10, idea - 5, story - 10, work - 9
            </div>
            </div>
        </div>
    );
}

function AuthenticatedApp({ onLogout }) {
    // const { isLoading, error, data } = useQuery('repoData', () =>
    //     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
    //         (res) => res.json()
    //     )
    // );

    // if (isLoading) {
    //     return 'Loading...';
    // }

    // if (error) {
    //     console.log(data);

    //     return 'An error has occurred: ' + error.message;
    // }

    return (
        <div className="jornal">
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div className="jornal-title">JORNAL</div>
                    <Header onLogout={onLogout} />
                    <Switch>
                        <Route path="/new">
                            <NewEntry />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/">
                            <Entries />
                        </Route>
                    </Switch>
                </Router>
            </QueryClientProvider>
            <Footer />
        </div>
    );
}

function Home() {

}

function App() {
    const logout = () => firebase.auth().signOut();

    const [user, isLoading, error] = useAuthState();

    console.log('user', user);
    console.log('isLoading', isLoading);
    console.log('error', error);

    return user ?
        <AuthenticatedApp onLogout={logout} />
        :
        <Login />;
}

export default App;
