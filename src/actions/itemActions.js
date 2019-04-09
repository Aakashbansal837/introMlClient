import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

var serverUrl = "https://intromlserver.herokuapp.com";
//forlocal
// var serverUrl = "";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get(serverUrl+'/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post(serverUrl+'/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  if(!id){
    return;
  }
  try{
  axios
    .delete(serverUrl+'/api/items/'+id, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
  }catch(err){
    console.log("error in delete video",err);
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
