import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material/";
import { NewsArticle } from "../../global.models";

const style = {
  width: "300px",
  maxHeight: "200px",
  display: "flex",
  flexDirection: "column",
  overflow: "unset",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
};

interface Props {
  article: NewsArticle;
}

export const NewsArticleCard: React.FC<Props> = ({ article }) => {
  const { title, description, link, pubDate } = article;
  return (
    <Card sx={style} className="animate__animated animate__zoomIn">
      <CardContent sx={{ overflow: "scroll", padding: "8px" }}>
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ padding: "0 10px" }}>
        <Button size="small" onClick={() => window.open(`${link}`, "_blank")}>
          Read full article
        </Button>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "12px", marginLeft: "auto" }}
        >
          {new Date(pubDate).toDateString()}
        </Typography>
      </CardActions>
    </Card>
  );
};
