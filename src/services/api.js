import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const getPopularMovies = () => api.get("/movie/popular");
export const getPopularTVShows = () => api.get("/tv/popular");
export const getTrending = () => api.get("/trending/all/week");
export const getMovieGenres = () => api.get("/genre/movie/list");
export const getTVGenres = () => api.get("/genre/tv/list");
export const getDiscoverMovies = (page = 1, genreId = null) =>
  api.get("/discover/movie", {
    params: { page, ...(genreId && { with_genres: genreId }) },
  });

export const getDiscoverTV = (page = 1, genreId = null) =>
  api.get("/discover/tv", {
    params: { page, ...(genreId && { with_genres: genreId }) },
  });

export const getImageUrl = (path, size = "w500") =>
  `https://image.tmdb.org/t/p/${size}${path}`;
