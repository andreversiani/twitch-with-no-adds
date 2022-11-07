import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CREDENTIAL } from '../credentials';

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const StyledTypograph = styled(Typography)`
  :hover {
    cursor: pointer;
  }
`

export default function PrimarySearchAppBar( { username }:{ username: string | undefined } ) {
  const router = useRouter();
  const [textInput, setTextInput] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/' + textInput);
  }

  const handleClick = (event: any, header?: string) => {
    if (username || header) {
      event.preventDefault();
      router.push('/');
    }
    else {
      handleFetch();
    }
  }

  const handleFetch = () => {
    location.href = `https://id.twitch.tv/oauth2/authorize?scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls+user%3Aread%3Afollows&response_type=token&client_id=${CREDENTIAL.client_id}&redirect_uri=${CREDENTIAL.redirect_uri}`
  }   

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#6441a5'}}>
        <Toolbar variant='dense'>
          <StyledTypograph
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={(event) => handleClick(event, 'header')}
          >
            Twitch With No Ads
          </StyledTypograph>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={(event) => handleSubmit(event)}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => setTextInput(event.target.value)}
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <StyledTypograph
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={handleClick}
          >
            {username || 'Login'}
          </StyledTypograph>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}