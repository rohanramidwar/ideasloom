//reducers -> controllers
//function that accepts the state and the action
//then based on the action type do some logic
//state cannot be empty -> therefore, empty arr
import {
  CLEARPOSTS,
  CREATEPOST,
  ENDLOADING,
  FETCHALLPOSTS,
  FETCHPOST,
  STARTLOADING,
  UPDATEPOST,
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  isLoading: true,
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STARTLOADING:
      return { ...state, isLoading: true };

    case ENDLOADING:
      return { ...state, isLoading: false };

    case FETCHALLPOSTS:
      return { ...state, posts: [...state.posts, ...payload] };

    case CLEARPOSTS:
      return { ...state, posts: [] };

    case CREATEPOST:
      return { ...state, payload };

    case FETCHPOST:
      return { ...state, posts: [], post: payload };

    case UPDATEPOST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        post: payload,
      };

    default:
      return state;
  }
};

export default posts;
