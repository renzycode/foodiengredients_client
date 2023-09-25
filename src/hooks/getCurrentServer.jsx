

const cloudserver = process.env.REACT_APP_CLOUD_SERVER_URL;
const localserver = process.env.REACT_APP_LOCAL_SERVER_URL;


export const getCurrentServer = () => {
    return cloudserver;
}