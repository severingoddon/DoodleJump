export const countReducer = function (state = 1, action:any) {

    let t = action.type;
    if(t === 'LIGHT' && state === 0) return state + 1;
    else if(t === 'DARK' && state === 1) return state -1;
    else return state;
};