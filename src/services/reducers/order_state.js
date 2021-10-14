import { handleActions } from 'redux-actions';

const initState = () => ({
    count: 0
});

export default handleActions({
    ORDER_STATE(state, action) {
        const { count } = action;
        return {
            ...state,
            count
        }
    },

}, initState())
