import { useMovieContext } from "../context/MovieContext";
import Button from "./Button";

function AddRemoveFav({ movieID, className }) {
  const { addFavourite, removeFavourite, isFavourite, isLoading } =
    useMovieContext();
  
  return (
    <div className="flex">
      {/* Add to favourite if not added */}
      {!isFavourite(movieID) && (
        <Button
          onHandleClick={() => addFavourite(movieID)}
          text={isLoading ? <p>Adding...</p> : "Add to favourites"}
          classAdd={className}
        />
      )}

      {/* Remove from favourite if present */}
      {isFavourite(movieID) && (
        <Button
          onHandleClick={() => removeFavourite(movieID)}
          text={"Remove"}
          classAdd={className}
        />
      )}
    </div>
  );
}
export default AddRemoveFav;
