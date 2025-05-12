const ACCESS_TOKEN_KEY = 'access_token';

export const setAccessToken = (token) => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const clearAccessToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};