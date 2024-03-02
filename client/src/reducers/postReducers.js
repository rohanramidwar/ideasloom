//reducers -> controllers
//function that accepts the state and the action
//then based on the action type do some logic
//state cannot be empty -> therefore, empty arr
import {
  CREATEPOST,
  FETCHALLPOSTS,
  FETCHPOST,
  UPDATEPOST,
} from "../constants/actionTypes";

const posts = (state = { posts: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHALLPOSTS:
      return { ...state, posts: [...state.posts, ...payload] };

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
