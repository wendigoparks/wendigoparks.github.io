
// Determines if user is logged in by checking if they have a token stored
// (probably in local storage) at any given time
const userIsLoggedIn = () => {
    return Math.random() > 0.5;
    // TODO will check local storage for logged in token, which will have enough info to access
    // account from database. 
}

// Verify password meets requirements, currenlty there are none
const checkPasswordRequirements = (password: String): boolean => {
    return password.trim() != "";
}

// Convert user password into safe hashed version to store in database.
const hashPassword = (password: String): String => {
    return password + "super safe salt";
}

export {userIsLoggedIn, checkPasswordRequirements, hashPassword};