/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

// for local
// export const API_URL = 'http://localhost:3001/api';
// export const STATIC_URL = 'http://localhost:3001/uploads/';
// export const CONTRACT_URL = 'http://localhost:3001/uploads/';

// for server
export const MERCHANT_API =
  'http://91d90ac373dc.sn.mynetname.net:30301/api/merchant';
export const API_URL = ' http://91d90ac373dc.sn.mynetname.net:30301/api';
export const STATIC_URL =
  'http://91d90ac373dc.sn.mynetname.net:30301/api/uploads/';
export const CONTRACT_URL = 'http://91d90ac373dc.sn.mynetname.net:2020/ipfs/';
export const CURRENCY = 'XOF';
