
const getUserTokenUrl: string = "http://127.0.0.1:8000/user/";

// Determines if user is logged in by checking if they have a token stored
// (probably in local storage) at any given time
const userIsLoggedIn = (): boolean => {
    // return Math.random() > 0.5;
    // TODO will check local storage for logged in token, which will have enough info to access
    // account from database. 
    const savedToken = localStorage.getItem("userToken");
    const savedUserID = localStorage.getItem("userID");

    // Verify user token with backend? May take to long to do everytime it is necessary idk.
    return !!savedToken && !!savedUserID;
}

// Saves token and user id retreived from database into local storage so browser knows user is logged in
const saveUserLoggedIn = (id: string, token: string) => {
    localStorage.setItem("userID", id);
    localStorage.setItem("userToken", token);
}

// Remove user credentials from local storage.
const logOut = () => {
    localStorage.setItem("userID", "");
    localStorage.setItem("userToken", "");
}

// Verify password meets requirements, currenlty there are none
const checkPasswordRequirements = (password: String): boolean => {
    return password.trim() !== "";
}

// Convert user password into safe hashed version to store in database.
const hashPassword = (password: String): String => {
    return password + "super safe salt";
}

export {userIsLoggedIn, checkPasswordRequirements, saveUserLoggedIn, logOut, hashPassword};