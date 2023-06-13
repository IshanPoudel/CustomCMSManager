export const login = (userId, token , username) => {
  if (!userId || !token) {
    throw new Error('Invalid user ID or token.');
  }

  return {
    type: 'LOGIN',
    payload: {
      userId,
      
      token,
      username,
    },
  };
};


export const logout=() =>
{
    return {type: 'LOGOUT'};
}