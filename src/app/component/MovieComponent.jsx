"use client";

import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import AddRemoveFav from "./AddRemoveFav";
import { useEffect } from "react";
import { useState } from "react";

// Prefer environment config, but fall back to the public SVG we added so
// the component still works if the env var is missing in some environments.
const FALLBACK_IMAGE_PATH = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_PATH;

// Component to render individual movie card
export default function MovieComponent({ movie }) {
  // State to track image loading failure
  const [imageError, setImageError] = useState(false);

  const router = useRouter();

  // Prefetch the movie details route when component mounts
  useEffect(() => {
    router.prefetch(`/movie/${movie.imdbID}`);
  }, [movie.imdbID, router]);

  // Use fallback image if movie poster is not available
  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" && !imageError
      ? movie.Poster
      : FALLBACK_IMAGE_PATH;

  function onHandleClick() {
    router.push(`/movie/${movie.imdbID}`);
  }

  return (
    // Movie card container with hover effects
    <div className="flex w-[80%] flex-col items-center gap-3 bg-[#1E1E1E] p-2 text-[#dfdede] hover:shadow-[.1px_.1px_10px_.1px_#000] lg:w-96 lg:p-6">
      {/* Movie poster container with responsive image */}
      <div className="relative h-96 w-72 overflow-hidden rounded-md md:w-80 lg:w-full">
        <Image
          src={posterSrc}
          alt={`${movie.Title} poster not loading`}
          fill
          onError={() => setImageError(true)}
          className="w-full object-cover"
          sizes=" 100vw, 300px"
        />
      </div>
      {/* Movie details section */}
      <div className="flex flex-col gap-3 text-center">
        <p className="font-semibold">{movie.Title}</p>
        <p>Release Year : {movie.Year}</p>
        {/* View Details Button */}
        <Button
          text={"View Details"}
          classAdd={"w-full"}
          onHandleClick={onHandleClick}
        />
      </div>
      {/* Favourites Toggle Button */}
      <AddRemoveFav movieID={movie.imdbID} />
    </div>
  );
}
