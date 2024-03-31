import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import IMovie from "../models/IMovie";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  movie: IMovie;
  tabName: string;
  onRemove: any;
  onAddClick: any;
};

const MovieListItem = ({ movie, tabName, onRemove, onAddClick }: Props) => {
  const { id, title, posterurl, year } = movie;
  const encodedTitle = encodeURIComponent(title);
  const [data] = useState({
    id: id,
    currentTab: tabName,
    releasedYear: year,
  });

  const addMovieToFav = async () => {
    const { id, ...favMovie } = movie;
    onAddClick(favMovie);
  };

  const removeMovieFromFav = async () => {
    onRemove(id as string);
  };

  return (
    <div>
      <Card className="movie-card">
        <Link to={`/${encodedTitle}`} state={{ data: data }}>
          <div className="poster-container">
            <Card.Img
              variant="top"
              src={`${posterurl}`}
              alt={title}
              className="card-img"
            />
          </div>
        </Link>
        <Card.Body>
          <Card.Title className="card-title">
            {title.length > 23 ? title.substring(0, 23).concat("...") : title}
          </Card.Title>
          <div className="add-to-fav">
            {tabName === "favorite" && (
              <Button
                className="btn-del"
                onClick={removeMovieFromFav}
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faTrash} /> Remove from Favorite
              </Button>
            )}
            {tabName !== "favorite" && (
              <Button
                className="btn-fav"
                onClick={addMovieToFav}
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faHeart} style={{ color: "#FF0000" }} />{" "}
                Add to Favorite
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default MovieListItem;
