const BASE_URL = "http://localhost:5000/api"; // Replace with your actual API base URL
//http://tharrak_api.galaxydev.pk/
//const BASE_URL = "https://tharrakapi.galaxydev.pk/api";

const EXPORTAPIURL = {
  AUTH: {
    LOGIN: `${BASE_URL}/users/login`,
    REGISTER: `${BASE_URL}/users/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE: `${BASE_URL}/user/update`,
    DELETE: `${BASE_URL}/user/delete`,
    GET_DETALS: `${BASE_URL}//Google/details`,
  },
  POSTS: {
    GET_ALL: `${BASE_URL}/posts/get`,
    CREATE: `${BASE_URL}/posts/create`,
    DELETE: `${BASE_URL}/posts/delete`,
    TRENDING: `${BASE_URL}/Trending`,
  },
  OTHER: {
    CONTACT_US: `${BASE_URL}/contact-us`,
    TERMS: `${BASE_URL}/terms`,
  },
  THARRAK: {
    ADD: `${BASE_URL}/add/tharrak`,
    GET: `${BASE_URL}/get/tharrak`,
  },

  FOLLOW: {
    FOLLOW: `${BASE_URL}/follow/add`,
    UNFOLLOW: `${BASE_URL}/follow/del`,
    GEALL: `${BASE_URL}/follow/getall`,
  },
  COMMENTS: {
    GET: `${BASE_URL}/get/comments`,
    POST: `${BASE_URL}/add/comment`,
  },
};

export default EXPORTAPIURL;
