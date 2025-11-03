"use client";

import { useState, useEffect } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_URL;
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

const useMovieSearch = (query, page) => {
  // State management for movies and loading states
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Scroll to top when new results are loaded
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `//www.omdbapi.com/?apikey=1596c620&s=${query}&page=${page}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (data.Response === "False") {
          setMovies([]);
          setNoResults(true);
          setTotalResults(0);
        } else if (data.Search && Array.isArray(data.Search)) {
          setMovies(data.Search);
          if (page === 1) setTotalResults(parseInt(data.totalResults) || 0);
          setNoResults(false);
          setHasError(false);
        } else {
          setHasError(true);
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setHasError(true);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  // Calculate total pages
  const totalPages = totalResults !== 0 ? Math.floor(totalResults / 10) + 1 : 1;

  return {
    movies,
    noResults,
    hasError,
    totalResults,
    isLoading,
    totalPages,
  };
};

export default useMovieSearch;
