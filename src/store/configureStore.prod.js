import { createStore, compose } from 'redux';
import rootReducer from '../reducers';
import middlewares from '../middlewares';

const finalCreateStore = compose(
    middlewares
)(createStore);


export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}