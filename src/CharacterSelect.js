import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { chars } from './characters'

export default function CharacterSelect({select}) {

  return (
    <Grid sx={{m: 2}}>
        <Grid textAlign={'center'} sx={{mb: 2}}>
          <Typography variant='h4' color={'white'}>Qual voce escolhe?</Typography>
          <Typography variant='h6' color={'white'}>Esolha um para blah blha blah..</Typography>
        </Grid>
        <Grid container spacing={2}>
            {
                chars.map((c, i) => {
                return <Grid key={i} item xs={12} sm={4} lg={2}>
                    <Card>
                        <CardActionArea onClick={() => select(c)}>
                            <CardContent
                                    sx={{
                                        pt: '200px',
                                        position: 'relative',
                                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0),rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1)), url(${c.img})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        textAlign: 'justify'
                                    }}
                                >
                                <Typography component="div" sx={{pb: '5px'}}>
                                    {c.name}
                                </Typography>
                                <Typography variant="body" color="text.secondary" sx={{color: 'black', m: '10px 0'}}>
                                    {c.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                })
            }
        </Grid>
    </Grid>
  );
}
