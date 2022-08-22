import React from 'react';
import { Provider } from 'react-redux';
import { store} from './redux/configure-store';
import { Container} from './redux/container';


export const App = () => {
    return(
        <Provider store={store}>
            <Container />
        </Provider>
    );
};
