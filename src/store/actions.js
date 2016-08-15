import axios from 'axios';
import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

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
var data = {};

var ndata = new FormData();
ndata.append( "json", JSON.stringify( data ) );
  //http://172.16.138.79:9189/alternatePlans/plans/list/
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch( `https://api.github.com/users/hadley/repos`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function postInsuranceForm(formValues) {
//formValues will be actual form data need to submit/post to the API Gateway
var formValues = '{title: "asdfasdfasdf", categories: "asdf", content: "asdf"}';
 const request = axios({
    method: 'post',
    data: formValues,
    url: 'https://api.github.com/users/hadley/repos'  //URL for the API gateway for submission 
	//'http://172.16.138.79:9189/alternatePlans/plans/submit'
	//the following header with the correct token is needed for authentication
    //headers: {'Authorization': 'Bearer ${tokenFromStorage}'}
  });
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