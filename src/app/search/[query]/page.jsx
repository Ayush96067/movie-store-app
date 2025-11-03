// Enable client-side functionality in Next.js
"use client";

// Import necessary React hooks and components
import { useState } from "react";

// Import icons for UI elements
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// Import custom hook
import useMovieSearch from "@/hooks/useMovieSearch";
import MovieComponent from "@/app/component/MovieComponent";
import Error from "@/app/component/Error";

// Fallback image path for movies without posters
const FALLBACK_IMAGE_PATH = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_PATH;

function SearchQuery({ params }) {
  // State for pagination
  const [page, setPage] = useState(1);

  // Extract search query from URL parameters
  const query = params.query;

  // Use our custom hook for movie search functionality
  const { movies, noResults, hasError, totalPages } = useMovieSearch(
    query,
    page,
  );

  // Show error component for no results
  if (noResults)
    return <Error error={"No results found or too many results"} />;

  // Show error component for API failures
  if (hasError)
    return (
      <div className="p-4 text-center text-white">
        Failed to fetch movies. Please try again later.
      </div>
    );

  // Pagination handlers
  function handlePrev() {
    // Decrease page number unless we're on the first page
    setPage((page) => (page === 1 ? page : page - 1));
  }

  function handleNext() {
    // Increase page number unless we're on the last page
    setPage((page) => (page < totalPages ? page + 1 : page));
  }

  return (
    // Main container with dark background
    <div className="relative bg-[#121212]">
      {/* Grid container for movie cards with responsive columns */}
      <div className="grid grid-cols-2 place-items-center gap-x-8 gap-y-10 p-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-3 lg:gap-y-14 lg:p-6">
        {/* Render movie cards for each movie in the results */}
        {movies.map((movie) => (
          <MovieComponent key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Show pagination only if there are multiple pages */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center p-1 text-2xl">
          {/* Previous page button - hidden on first page */}
          <div className="mb-2 flex items-center gap-2 rounded-full bg-black p-4">
            <button
              onClick={handlePrev}
              className={`${
                page === 1 ? "hidden" : "visible"
              } rounded-full hover:bg-white hover:text-black`}
            >
              <MdKeyboardArrowLeft className="" />
            </button>
            <p>
              {page} ... {totalPages}
            </p>
            <button
              onClick={handleNext}
              className={` ${
                page === totalPages ? "hidden" : "visible"
              } rounded-full hover:bg-white hover:text-black`}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// // Component to render individual movie card
// function MovieComponent({ movie }) {
//   const router = useRouter();

//   // Use fallback image if movie poster is not available
//   const posterSrc =
//     movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE_PATH;

//   function onHandleClick() {
//     router.push(`/movie/${movie.imdbID}`);
//   }

//   return (
//     // Movie card container with hover effects
//     <div className="box-border flex flex-col items-center gap-3 bg-[#1E1E1E] p-2 text-[#dfdede] hover:shadow-[.1px_.1px_10px_.1px_#000] lg:w-96 lg:p-6">
//       {/* Movie poster container with responsive image */}
//       <div className="relative h-96 w-full overflow-hidden rounded-md">
//         <Image
//           src={posterSrc}
//           alt={`${movie.Title} poster not loading`}
//           fill
//           className="object-cover"
//           sizes="(max-width: 600px) 100vw, 300px"
//         />
//       </div>
//       {/* Movie details section */}
//       <div className="flex flex-col gap-3 text-center">
//         <p className="font-semibold">{movie.Title}</p>
//         <p>Release Year : {movie.Year}</p>
//         <Button
//           text={"View Details"}
//           classAdd={"w-full"}
//           onHandleClick={onHandleClick}
//         />
//       </div>
//     </div>
//   );
// }

export default SearchQuery;
