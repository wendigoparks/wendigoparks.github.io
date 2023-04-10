import React from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { checkPasswordRequirements, saveUserLoggedIn } from "./Authentication";
import { useNavigate } from "react-router-dom";

/*
Goal of this component is to allow users to login or create an account in a way that will communicate to the
backend and save a token so the user can access their account. 
*/
const Login = () => {

    // Save username and password as state variables with useState hook
    const [username, setUsername] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // Use to "switch" between log in and create account screens.
    const [showCreateAccount, setShowCreateAccount] = React.useState(false);

    // TODO If Already logged in user manually navigates to this page could use 
    // useEffect hook to navigate page to myAccount instead, probably unnecessary. 

    // Endpoints to send POST requests to backend
    const loginEndpoint = "http://127.0.0.1:8000/token";
    const createAccountEndpoint = "http://127.0.0.1:8000/users";
    
    // Allows us to navigate to the home page on successful login
    const navigate = useNavigate();

    // Login method to communicate with backend that an existing user is presenting their
    // credentials. 
    const login = () => {
        // Specify username and password in text in body
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
                'Access-Control-Allow-Methods': 'POST',
            },
            body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
        };
        // Using Fetch API
        fetch(loginEndpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.access_token) {
                console.log("access token is: " + data.access_token);
                saveUserLoggedIn(data.access_token);
                // successfully posted! alert user and navigate back to home after one second
                alert("Login Successful, Returning to Home Page");
                // Should receive token back in data, need to retreive token and store it in local data!
                // TODO Retreive and store token.
                setTimeout(() => {
                    navigate("/home")
                }, 1000);
            } else {
                alert("Unable to Login, please verify Username and Password are correct.")   
            }
        })
        .catch((err) => {
            console.log(err.message);
            alert("Unable to Login, error contacting database.")
        });
    }

    // Create Account method to form a new user account with the given username and password
    const createAccount = () => {
        // First check password meets requirments (could also verify email, etc)
        if (checkPasswordRequirements(password)) {
            // build request body with schema:
            /*
                username: str
                email: str | None = None
                full_name: str | None = None
                disabled: bool | None = None
                hashed_pswd: str | None = None
            */
            const userJson = {
                "username": username,
                "email": email,
                "full_name": fullName.trim() ? fullName : "N/A",
                // TODO TEMPORARY FIX, BACKEND SHOULD DO THE HASHING
                "hashed_pswd": password
            }
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify(userJson)
            };
            // Using Fetch API
            fetch(createAccountEndpoint, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // successfully created account. Leave fields so they can log in.
                setShowCreateAccount(false);
                alert("Account created, you may now log in");
            })
            .catch((err) => {
                console.log(err.message);
                alert("Unable to Create Account")
            });
        } else {
            alert("Password does not meet the password requirements.")
        }
    }


    return (
        <div className="LoginPage" style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <h1>Login or Create a Free Account!</h1>
        {/* showCreateAccount boolean decides if login or create account form is shown */}
        {
            showCreateAccount ? 
                <div className="LoginForms" style={{
                    height:500,
                    width:500,
                    display:'flex',
                    justifyContent: 'space-evenly',
                    alignItems:'center',
                    flexDirection:'column'
                }}>
                    <TextField 
                        style={{width: 500}}
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(event.target.value)} }
                    />
                    <TextField 
                        style={{width: 500}}
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)} }
                    />
                    <TextField 
                        style={{width: 500}}
                        id="outlined-basic" 
                        label="Email Address" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value)} }
                    />
                    <TextField 
                        style={{width: 500}}
                        id="outlined-basic" 
                        label="Your Name" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setFullName(event.target.value)} }
                    />
                    <Button
                        style={{width: 500}}
                        onClick={() => createAccount()} 
                        variant="contained" 
                        disabled={!(username.trim()) || !(password.trim()) || !(email.trim())}
                    >
                        Create Account
                    </Button>
                    <Button
                        onClick={() => setShowCreateAccount(false)} 
                        variant="contained" 
                        style={{width:250}}
                    >
                        Back To Login
                    </Button>
                </div>
                :
                <div className="LoginForms" style={{
                    height:500,
                    width:500,
                    display:'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection:'column'
                }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(event.target.value)} }
                        style={{width: 500}}
                    />
                    <TextField 
                        style={{width: 500}}
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)} }
                    />
                    <TextField 
                        style={{width: 500}}
                        id="outlined-basic" 
                        label="Email Address" 
                        variant="outlined" 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value)} }
                    />
                    <Button
                        onClick={() => login()} 
                        variant="contained" 
                        disabled={!(username.trim()) || !(password.trim())}
                        style={{width: 500}}
                    >
                        Log In
                    </Button>
                    <Button
                        onClick={() => setShowCreateAccount(true)} 
                        variant="contained" 
                        color="secondary"
                        style={{width: 250}}
                    >
                        Create A New Account
                    </Button>
                </div>
        }
        <h1>Forgot your old password? that sucks make a new account and start over</h1>
        </div>
    )
}

export default Login;