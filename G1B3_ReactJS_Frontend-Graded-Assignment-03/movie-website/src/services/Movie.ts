import axios from "axios";
import IMovie from "../models/IMovie";

const baseURL = process.env.REACT_APP_BASE_URL;

const getMovies = async (tabName: string) => {
  const response = await axios.get<IMovie[]>(`${baseURL}/${tabName}`);
  return response.data;
};

const getMovieDetailsByID = async (tabName: string, id: string) => {
  const response = await axios.get<IMovie>(`${baseURL}/${tabName}/${id}`);
  return response.data;
};

const getMovieDetailsByTitleAndYear = async (
  tabName: string,
  title: string,
  year: string
) => {
  const response = await axios.get<IMovie[]>(
    `${baseURL}/${tabName}?title=${title}&year=${year}`
  );
  return response.data;
};

const getMoviesFromSearching = async (
  tabName: string,
  searchedText: string
) => {
  const response = await axios.get<IMovie[]>(
    `${baseURL}/${tabName}?title_like=${searchedText}`
  );
  return response.data;
};

const addMovieToFavorite = async (favMovie: IMovie) => {
  const response = await axios.post<IMovie>(`${baseURL}/favorite`, favMovie, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const removeMovieFromFavorite = async (id: string) => {
  const response = await axios.delete(`${baseURL}/favorite/${id}`);
  return response.data;
};

const getMenuData = async () => {
  const response = await axios.get(`${baseURL}/db`);
  const menuitem = Object.keys(response.data);
  return menuitem;
};

export {
  getMovies,
  getMovieDetailsByID,
  getMovieDetailsByTitleAndYear,
  getMoviesFromSearching,
  addMovieToFavorite,
  removeMovieFromFavorite,
  getMenuData,
};
