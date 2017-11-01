import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import middlewares from '../middlewares';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        middlewares
    );
} else {
    enhancer = compose(
        middlewares,
        DevTools.instrument(),
        persistState(
            window.location.href.match(
                /[?&]debug_session=([^&]+)\b/
            )
        )
    );
}
/* eslint-enable */

const finalCreateStore = enhancer(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}