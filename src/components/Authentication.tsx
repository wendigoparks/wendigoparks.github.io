
// Determines if user is logged in by checking if they have a token stored
// (probably in local storage) at any given time
const userIsLoggedIn = () => {
    return Math.random() > 0.5;
}

// Verify password meets requirements, currenlty there are none
const checkPasswordRequirements = (password: String): boolean => {
    return password.trim() != "";
}

const hashPassword = (password: String): String => {
    return password + "super safe salt";
}

export {userIsLoggedIn, checkPasswordRequirements, hashPassword};