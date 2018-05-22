import ActionTypes from '../action-types';

const collectionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_COLLECTION:
      return Object.assign({}, state, {
        [action.collectionId]: {
          isFetching: true,
        },
      });
    case ActionTypes.RECEIVE_COLLECTION:
      return Object.assign({}, state, {
        [action.collectionId]: {
          json: action.collectionJson,
          isFetching: false,
          parent: action.parent
        },
      });
    case ActionTypes.RECEIVE_COLLECTION_FAILURE:
      return Object.assign({}, state, {
        [action.collectionId]: {
          error: action.error,
          isFetching: false,
        },
      });
    default: return state;
  }
};

export default collectionsReducer;
