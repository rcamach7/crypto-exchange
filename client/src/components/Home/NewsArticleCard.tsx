import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material/";
import { NewsArticle } from "../../data/global.models";

interface Props {
  article: NewsArticle;
}

const style = {
  width: "300px",
  height: "250px",
  display: "flex",
  flexDirection: "column",
  overflow: "unset",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
};

export const NewsArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Card sx={style} className="animate__animated animate__zoomIn">
      <CardMedia
        component="img"
        alt="article"
        image={article.image_url}
        sx={{
          maxHeight: "100px",
          overflow: "hidden",
          objectPosition: "0 -60px",
        }}
      />

      <CardContent sx={{ overflow: "scroll", padding: "8px" }}>
        <Typography gutterBottom variant="body1" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ padding: "0 10px" }}>
        <Button
          size="small"
          onClick={() => window.open(`${article.link}`, "_blank")}
        >
          Visit Source
        </Button>
      </CardActions>
    </Card>
  );
};
