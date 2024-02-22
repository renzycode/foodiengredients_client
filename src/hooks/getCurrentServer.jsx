

const cloudserver = 'https://delightful-colt-drawers.cyclic.app';
const localserver = process.env.REACT_APP_LOCAL_SERVER_URL;


export const getCurrentServer = () => {
    return cloudserver;
}