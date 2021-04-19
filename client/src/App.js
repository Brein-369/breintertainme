import './App.css';
import {ApolloProvider} from '@apollo/client/react'
import client from './config/graphql'
import {Home, Add, Update, Favorites} from './pages'
import {
 BrowserRouter as Router,
 Switch,
 Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>

          <Switch>
            <Route path="/movie/update/:id">
              <Update></Update>
            </Route>
            <Route path="/movie/add">
              <Add></Add>
            </Route>
            <Route path="/movie/favorite">
              <Favorites></Favorites>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
         
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
