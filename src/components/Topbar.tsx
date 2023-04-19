import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { userIsLoggedIn } from './Authentication';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'Parks', 'Add Park'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const ResponsiveAppBar = () => {
    
    const [searchQuery, setSearchQuery] = React.useState("");
    // navigate allows to switch pages and supply the search query in the url
    const navigate = useNavigate();

    const performSearch = () => {
        // One idea is to just navigate to the parks page and pass the search query
        // as a url parameter. Then the Parks code can fetch parks matching a search query
        // if given, and matching all parks if not.
        navigate(`/Parks/${searchQuery}`);

    }

    return (
        <AppBar position="static" sx={{ bgcolor: "green" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WenDiGo
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, flexWrap:'wrap' }}>



                        
                        {pages.map((page) => (
                            <Button
                                key={page}
                                href={"/"+page}
                                sx={{ my: 2, mx: 2, color: 'white', display: 'block', bgcolor: 'success.main' }}
                                variant="contained"
                            >
                                {page}
                            </Button>
                        ))}
                        {/* Hardcoding Login page so that it can double as My account button if user is logged in 
                            TODO make this determined by user logged in status */}
                        {
                            userIsLoggedIn() ?
                            <Button
                                href={"/MyAccount"}
                                sx={{ my: 2, mx: 2, color: 'white', display: 'block', bgcolor: 'success.main' }}
                                variant="contained"
                            >
                                My Account
                            </Button> :
                            <Button
                                href={"/login"}
                                sx={{ my: 2, mx: 2, color: 'white', display: 'block', bgcolor: 'success.main' }}
                                variant="contained"
                            >
                                Login
                            </Button> 
                        }
                    </Box>

                    <Search>
                        <div onClick={() => performSearch()}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        </div>
                        <StyledInputBase
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                performSearch();
                                }
                            }}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;