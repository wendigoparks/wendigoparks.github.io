
const getUserTokenUrl: string = "http://127.0.0.1:8000/user/";

// Determines if user is logged in by checking if they have a token stored
// (probably in local storage) at any given time
const userIsLoggedIn = (): boolean => {
    // return Math.random() > 0.5;
    // TODO will check local storage for logged in token, which will have enough info to access
    // account from database. 
    const savedToken = localStorage.getItem("userToken");

    // Verify user token with backend -- but for now just check local storage..
    return !!savedToken;
}

// Saves token and user id retreived from database into local storage so browser knows user is logged in
const saveUserLoggedIn = (token: string) => {
    localStorage.setItem("userToken", token);
}

// Remove user credentials from local storage.
const logOut = () => {
    localStorage.setItem("userToken", "");
}

// Verify password meets requirements, currenlty there are none
const checkPasswordRequirements = (password: String): boolean => {
    return password.trim() !== "";
}

export {userIsLoggedIn, checkPasswordRequirements, saveUserLoggedIn, logOut};