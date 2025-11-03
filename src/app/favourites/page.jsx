"use client";

import { useMovieContext } from "../context/MovieContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";

const FALLBACK_BG_IMAGE = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_PATH;

function FavouritesPage() {
  const { favourites } = useMovieContext();
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   fetch favourite movies using IDs stored in favourites array in useMovieContext
  useEffect(() => {
    async function fetchFavouriteMovies() {
      setIsLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        const baseUrl = process.env.NEXT_PUBLIC_OMDB_URL;

        // Fetch details for each favourite movie ID - (returns an array of promises)
        const moviePromises = favourites.map(async (id) => {
          const res = await fetch(`${baseUrl}/?apikey=${apiKey}&i=${id}`);
          if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
          return res.json();
        });
        // Takes the array of running promises and returns a single new Promise.
        const movies = await Promise.all(moviePromises);

        // store movies
        setFavouriteMovies(movies);
      } catch (error) {
        console.error("Error fetching favourite movies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (favourites.length > 0) {
      fetchFavouriteMovies();
    } else {
      setFavouriteMovies([]);
      setIsLoading(false);
    }
  }, [favourites]);

  if (isLoading) {
    return <Loading />;
  }

  if (favourites.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-2xl font-bold">No favourite movies yet</h1>
        <Link href="/" className="text-purple-400 hover:text-purple-300">
          Browse movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">
        Your Favourite Movies
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favouriteMovies.map((movie) => (
          <Link
            key={movie.imdbID}
            href={`/movie/${movie.imdbID}`}
            className="transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : FALLBACK_BG_IMAGE
                  }
                  alt={movie.Title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="mb-2 text-xl font-bold text-white">
                  {movie.Title}
                </h2>
                <p className="text-sm text-gray-400">{movie.Year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FavouritesPage;
