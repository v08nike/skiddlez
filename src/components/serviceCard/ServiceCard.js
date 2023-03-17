import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Image from '../Image'

const SecondButton = styled(Button)(() => ({
  color: 'white',
  padding: '10px',
}))

const DividerStyle = styled(Divider)(() => ({
  marginLeft: '24px',
  marginRight: '24px',
}))

export default function ServiceCard(props) {
  // eslint-disable-next-line react/prop-types
  const { imageUrl, iconColor, cardStyle, text, title } = props

  const isDefault = cardStyle === 'default'

  return isDefault ? (
    <Card
      sx={{
        minWidth: 275,
        background: 'white',
        color: 'black',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: iconColor }} aria-label="recipe">
            <Image src={imageUrl} width="20px" height="20px" />
          </Avatar>
        }
        title={title}
        sx={{ color: '#0065A5' }}
      />
      <CardContent xs={{ borderButtom: '1px solid black' }}>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      <DividerStyle />
      <CardActions>
        <Box sx={{ padding: '10px' }}>
          <Button
            color="secondary"
            size="small"
            endIcon={<ArrowRightAltIcon />}
          >
            Read More
          </Button>
        </Box>
      </CardActions>
    </Card>
  ) : (
    <Card
      sx={{
        background: 'linear-gradient(90.39deg, #0065A5 0.37%, #1DB99B 99.71%)',
        boxShadow: '0px 0px 20px 5px rgba(0, 101, 165, 0.14)',
        borderRadius: '10px',
        color: 'white',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
            <Image src={imageUrl} width="20px" height="20px" />
          </Avatar>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      <DividerStyle />
      <CardActions>
        <SecondButton size="small" endIcon={<ArrowRightAltIcon />}>
          Read More
        </SecondButton>
      </CardActions>
    </Card>
  )
}
