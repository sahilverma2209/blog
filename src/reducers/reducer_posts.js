import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type){

        case DELETE_POST:
            return _.omit(state, action.payload);

        case FETCH_POST:
            const post = action.payload.data;
            console.log('post b4 reducer returns = ', post);
            console.log('old state = ', state);
            return { ...state, [post.id]: post }; // same as the green es5 code above

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        
        default:
            return state;
    }
}