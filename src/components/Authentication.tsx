

// url for endpoint to get user data
const getUserInfoUrl = "http://127.0.0.1:8000/users/me";

// Determines if user is logged in by checking if they have a token stored
// (probably in local storage) at any given time
const userIsLoggedIn = (): boolean => {
    // return Math.random() > 0.5;
    // TODO will check local storage for logged in token, which will have enough info to access
    // account from database. 
    //  savedToken = localStorage.getItem("userToken");
    // Verify user token with backend -- but for now just check local storage..
    //    return !!savedToken;

    // NOW verify via GET request to /users/me
    fetch(getUserInfoUrl, {
        method: 'GET', 
        headers: { 'Access-Control-Allow-Credentials':'true',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Accept',
            'authjwt_cookie_samesite': 'none'},
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Retrived the following data:\n");
        console.log(data);
        // Save user data if successfull - redirect to login page if not 
        if (data.username) {
            return true;
        } else {
            return false;
        }
    })
    .catch((err) => {
        return false;
    });
    return !!localStorage.getItem("userToken");
}

// Saves token and user id retreived from database into local storage so browser knows user is logged in
const saveUserLoggedIn = (token: string) => {
    // don't need this method at all 
    localStorage.setItem("userToken", token);
}

// Remove user credentials from local storage.
const logOut = () => {
    // Needs to call backend endpiont that simply removes the cookie.
    localStorage.setItem("userToken", "");
    
}

// Verify password meets requirements, currenlty there are none
const checkPasswordRequirements = (password: String): boolean => {
    return password.trim() !== "";
}

export {userIsLoggedIn, checkPasswordRequirements, saveUserLoggedIn, logOut};