
// State variables
let state = {
    selectionState: null
}

let refs = [];

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

    for (let trigger of refs) {
        trigger();
    }
}

export {subscribe, unsubscribe, getSelectionState, setSelectionState};