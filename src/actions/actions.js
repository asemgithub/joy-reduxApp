import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(subreddit, json) {
  console.log(json);
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.map(child => child),
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit) {
  var data = {
  "demographics": {
    "id": "string",
    "members": [
      {
        "dateOfBirth": "2016-08-12T05:47:58.299Z",
        "firstName": "string",
        "lastName": "string",
        "relationShip": "string",
        "tobaccoUse": "string"
      }
    ],
    "zipCode": "string"
  },
  "user": {
    "userId": "string"
  }
};
var ndata = new FormData();
ndata.append( "json", JSON.stringify( data ) );
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://api.github.com/users/hadley/repos`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}