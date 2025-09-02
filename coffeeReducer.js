import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from './coffeeActions';

const initialState = {
  loading: false,
  coffeeList: [],
  error: '',
};

const coffeeReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { loading: false, coffeeList: action.payload, error: '' };
    case FETCH_FAILURE:
      return { loading: false, coffeeList: [], error: action.payload };
    default:
      return state;
  }
};

export default coffeeReducer;
