import {ApolloClient, InMemoryCache} from '@apollo/client'

// mirip store kaya redux
const client = new ApolloClient({
    uri: `http://localhost:4000`,
    cache: new InMemoryCache()
})

export default client