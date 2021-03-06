import db from './dexie';

// State variables
let state = {
    selectionState: null
}

let refs = [];

// Local Refresh: 1 - selectionState
db.states.where("_id").equals(1)
.each(prevState => {
    state.selectionState = prevState;

    for (let trigger of refs) {
        trigger();
    }
});

// Subscription Methods
const subscribe = trigger => {
    refs.push(trigger);
    trigger();
}

const unsubscribe = trigger => {
    let pos = -1;
    for (let i in refs) {
        if (refs[i]===trigger) {
            pos = i;
        }
    }
    if (pos!==-1) {
        refs.splice(pos, 1);
    }
}

// Selection Methods
const getSelectionState = () => {
    return state.selectionState;
}

const setSelectionState = SelectionState => {
    state.selectionState = SelectionState;

    db.states.put({
        _id: 1,
        ...SelectionState
    });

    for (let trigger of refs) {
        trigger();
    }
}

export {subscribe, unsubscribe, getSelectionState, setSelectionState};