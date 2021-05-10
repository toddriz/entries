import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import Entries from './entries/Entries';
import NewEntry from './newEntry/NewEntry';

const queryClient = new QueryClient();

function Header() {
    return (
        <div className="jornal-header">
            <Link className="header-link" to="/new">Add Entry</Link>
            <Link className="header-link" to="/">Entries</Link>
            <Link className="header-link" to="/entries/tags">Filter By Tag</Link>
            <Link className="header-link" to="/entries/search">Search</Link>
        </div>
    );
}

function App() {
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
            <div className="jornal-title">Jornal</div>
            <Router>
                <Header />
                <div className="jornal-body">
                    <Switch>
                        <Route path="/new">
                            <NewEntry />
                        </Route>
                        <Route path="/">
                            <Entries />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default function Application() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}
