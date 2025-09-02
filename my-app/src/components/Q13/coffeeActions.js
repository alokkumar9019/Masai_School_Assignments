export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchRequest = () => ({ type: FETCH_REQUEST });
export const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, payload: data });
export const fetchFailure = (error) => ({ type: FETCH_FAILURE, payload: error });

export const fetchCoffeeData = (sortBy) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      let url = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee';
      if (sortBy) url += `?sort=${sortBy}`;
      
      const res = await fetch(url);
      const data = await res.json();
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      dispatch(fetchFailure(error.message));
    }
  };
};
