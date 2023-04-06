import React from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { checkPasswordRequirements } from "./Authentication";
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
        // build request body with format:
        /*
            username: str
            email: str | None = None
            full_name: str | None = None
            password: str | None = None
        */
        const userJson = {
            "username": username,
            "email": email,
            "password": password
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
        fetch(loginEndpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // successfully posted! alert user and navigate back to home after one second
            alert("Login Successful, Returning to Home Page");
            // Should receive token back in data, need to retreive token and store it in local data!
            // TODO Retreive and store token.
            setTimeout(() => {
                navigate("/home")
            }, 1000);
        })
        .catch((err) => {
            console.log(err.message);
            alert("Unable to Login, please verify Username and Password are correct.")
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
        <h1>Login or Create a new Account!</h1>
            <div className="LoginForms" style={{
                height:500,
                width:500,
                display:'flex',
                justifyContent: 'space-evenly',
                flexDirection:'column'
            }}>
                <TextField 
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(event.target.value)} }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value)} }
                />
                <Button
                    onClick={() => login()} 
                    variant="contained" 
                    disabled={!(username.trim()) || !(password.trim())}
                >
                    Log In
                </Button>
                <TextField 
                    id="outlined-basic" 
                    label="Your Name" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFullName(event.target.value)} }
                />
                <TextField 
                id="outlined-basic" 
                label="Email Address" 
                variant="outlined" 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value)} }
                />
                <Button
                    onClick={() => createAccount()} 
                    variant="contained" 
                    disabled={!(username.trim()) || !(password.trim()) || !(email.trim())}
                >
                    Create Account
                </Button>
            </div>
        <h1>Forgot your old password? that sucks make a new account and start over</h1>
        </div>
    )
}

export default Login;