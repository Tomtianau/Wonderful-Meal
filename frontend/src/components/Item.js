import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

export default function Item(props) {
  const { item } = props;
  return (
    <Card className="item" sx={{ maxWidth: 275 }}>
      <CardActionArea>
        <Link to={`/item/${item.slug}`}>
          <CardMedia
            component="img"
            height="197"
            width="275"
            image={item.image}
            alt={item.name}
          />
          <CardContent>
            <Typography
              sx={{ fontSize: 17 }}
              color="text.secondary"
              gutterBottom
              ml={2}
            >
              {item.name}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography ml={2} mb={3}>
          {item.weight}
        </Typography>
        <Typography ml={2}>${item.price}</Typography>
      </CardContent>
    </Card>
  );
}
