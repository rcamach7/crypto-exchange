import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material/";
import { NewsArticle } from "../../global.models";

interface Props {
  article: NewsArticle;
}

const style = {
  width: "300px",
  maxHeight: "200px",
  display: "flex",
  flexDirection: "column",
  overflow: "unset",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
};

export const NewsArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Card sx={style} className="animate__animated animate__zoomIn">
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
          Read full article
        </Button>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "12px", marginLeft: "auto" }}
        >
          {new Date(article.pubDate).toDateString()}
        </Typography>
      </CardActions>
    </Card>
  );
};
