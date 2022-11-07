import { useRouter } from "next/router";
import { CardContainer, CentralizedFlexContainer, FlexColumn } from "./styles";
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme } from '@mui/material/styles';

export default function Card({ streamerName, gameName, viewerCount }: { streamerName: string, gameName: string, viewerCount: number }) {
  
  const router = useRouter();

  const handleClick = (event: any) => {
    event.preventDefault();
    router.push(streamerName)
  }
  return (
    <CardContainer onClick={(event) => handleClick(event) } >
      <FlexColumn style={{width: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography
              variant='body1'
              noWrap
              onClick={handleClick}
              fontSize='13px'
            >
              {streamerName}
            </Typography>
          <CentralizedFlexContainer>
            <Typography
              variant='body2'
              noWrap
              onClick={handleClick}
              style={{marginLeft: 'auto'}}
              fontSize='11px'
            >
              <CentralizedFlexContainer>
                <AccountCircleIcon style={{ width: '11px', height: '11px', margin: '0 0.2rem 0 0.2rem', color: 'red' }} fontSize='small' />
                {viewerCount}
              </CentralizedFlexContainer>
            </Typography>
          </CentralizedFlexContainer>
          </div>
          <Typography
            variant='body2'
            noWrap
            onClick={handleClick}
            color={'#b8b7b1'}
            fontSize='12px'
          >
            {gameName}
          </Typography>
      </FlexColumn>
    </CardContainer>
  )
}