
let activePromise;



const makeSyncRequest = (store, action) => {
    if (!activePromise) {
        activePromise = Promise.resolve();
    }

    activePromise = activePromise.then(() => {
        const requestAction = prepareRequestAction(store, action);
        return store.dispatch(requestAction);
    }).catch(err => {
        //console.log(err);
        return err;
    });
};

export default store => next => action => {
    if (typeof action.partUrl === 'string') {
        
    }
    return next(action);
};
