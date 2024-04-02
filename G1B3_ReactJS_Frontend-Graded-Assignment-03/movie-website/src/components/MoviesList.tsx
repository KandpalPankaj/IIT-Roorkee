import React, { useState, useEffect } from "react";
import {
  Alert,
  Col,
  Form,
  InputGroup,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import LoadingIndicator from "./LoadingIndicator";
import IMovie from "../models/IMovie";
import { LoadingStatus } from "../models/types";
import MovieListItem from "./MovieListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  addMovieToFavorite,
  removeMovieFromFavorite,
  getMovies,
  getMoviesFromSearching,
  getMovieDetailsByTitleAndYear,
} from "../services/Movie";

const MoviesList = ({ tabName }: { tabName: string }) => {
  const [status, setStatus] = useState<LoadingStatus>("LOADING");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchedText, setSearchedText] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
  };

  const getSearchedData = async (text: string) => {
    try {
      const moviesList = await getMoviesFromSearching(tabName, text);
      setMovies(moviesList);
      setStatus("LOADED");
    } catch (err) {
      setStatus("ERROR_LOADING");
      setError(err as Error);
    }
  };

  const getData = async () => {
    setStatus("LOADING");
    try {
      const moviesList = await getMovies(tabName);
      setMovies(moviesList);
      setStatus("LOADED");
    } catch (err) {
      setStatus("ERROR_LOADING");
      setError(err as Error);
    }
  };

  const getDataAfterRemove = async (id: string) => {
    await removeMovieFromFavorite(id);
    getData();
    setShow(true);
    setResponse("Success");
    setResponseText("Successfully removed");
  };

  const addSelectedMovieToFavorite = async (movieToAdd: IMovie) => {
    const tempMovie = await getMovieDetailsByTitleAndYear(
      "favorite",
      movieToAdd.title,
      movieToAdd.year
    );

    if (tempMovie[0] === undefined) {
      const addedFavM = await addMovieToFavorite(movieToAdd);
      console.log(addedFavM.title);
      setShow(true);
      setResponse("Success");
      setResponseText("Successfully added");
    } else {
      console.log("Already Exist");
      setShow(true);
      setResponse("Error");
      setResponseText("Already added");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchedText !== "") {
      getSearchedData(searchedText);
    }
  }, [searchedText]);

  let el;

  switch (status) {
    case "LOADING":
      el = <LoadingIndicator size="large" message="Hold On..." />;
      break;
    case "LOADED":
      el = (
        <div>
          <div>
            {tabName !== "favorite" && <h4>Movies</h4>}
            {tabName === "favorite" && <h4>Favorites</h4>}
          </div>
          <Row className="search-box-row">
            <InputGroup className="search-box">
              <Form.Control
                placeholder="Search Movie"
                type="text"
                onChange={handleInputChange}
              />
              <InputGroup.Text className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
            </InputGroup>
          </Row>
          {movies.length === 0 && (
            <div className="no-data">
              <h3>No Data Found!</h3>
            </div>
          )}
          {movies.length !== 0 && (
            <Row xs={2} md={3} lg={6}>
              {movies.map((movie, idx) => (
                <Col key={idx} className="d-flex align-items-stretch my-3">
                  <MovieListItem
                    movie={movie}
                    tabName={tabName}
                    onRemove={getDataAfterRemove}
                    onAddClick={addSelectedMovieToFavorite}
                  />
                </Col>
              ))}
            </Row>
          )}
          <ToastContainer position="top-end" className="p-3 position-fixed">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={1700}
              autohide
            >
              <Toast.Header>
                {response === "Success" && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="2x"
                    style={{ color: "#2A9134" }}
                  />
                )}
                {response === "Error" && (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    size="2x"
                    style={{ color: "#FF0000" }}
                  />
                )}
                <strong className="me-auto toast-header-text">
                  {response}
                </strong>
              </Toast.Header>
              <Toast.Body className="toast-body-text">
                {responseText}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      );
      break;
    case "ERROR_LOADING":
      el = <Alert variant="danger">{error?.message}</Alert>;
      break;
  }

  return el;
};

export default MoviesList;
