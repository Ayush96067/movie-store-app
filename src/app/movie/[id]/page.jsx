"use client";
import AddRemoveFav from "@/app/component/AddRemoveFav";
import Button from "@/app/component/Button";
import useMovieDetail from "@/hooks/useMovieDetail";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCameraReelsFill } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { FaFlag, FaPen, FaStar, FaVoteYea } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { MdDescription, MdMovie } from "react-icons/md";
import { PiFilmSlateBold } from "react-icons/pi";
import { RiAwardFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import styled from "styled-components";

const StyledPara = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Movie({ params }) {
  const imdbId = params.id;

  // custom hook for getting details of movie
  const { movie, isLoading } = useMovieDetail(imdbId);

  // Early return for loading state
  if (isLoading || !movie) {
    return;
  }

  // Destructuring movie with fallback values
  const {
    Actors = "N/A",
    Awards = "N/A",
    Country = "N/A",
    Director = "N/A",
    Genre = "N/A",
    Plot = "N/A",
    Poster = "/placeholder-movie.jpg", // You should add a placeholder image
    Released = "N/A",
    Runtime = "N/A",
    Title = "Movie Title",
    Writer = "N/A",
    imdbRating = "N/A",
    imdbVotes = "N/A",
  } = movie;

  return (
    <div className="relative min-h-screen text-white">
      <Image
        src={Poster}
        alt={`${Title} Poster Background`}
        fill
        className="-z-10 object-cover"
        priority={true}
        sizes="100vw"
      />
      <div className="flex min-h-screen w-full justify-center backdrop-blur-lg backdrop-brightness-50 lg:items-center">
        <div className="mt-8 grid h-auto w-[80%] gap-y-6 bg-[#6a6a6a33] p-3 shadow-2xl shadow-black md:grid-cols-[30%_auto] lg:mt-0">
          <Image
            src={Poster}
            alt={`${Title} Poster Background`}
            className="object-cover"
            priority={true}
            sizes="100vw"
            width={400}
            height={100}
          />
          <div className="flex flex-col justify-center gap-y-4 text-[1.1rem] font-semibold text-gray-300 md:text-[1.2rem] lg:p-10 lg:text-[1.3rem]">
            <p className="flex w-fit gap-3 border-8 border-double border-[#540154] p-2 text-2xl md:text-3xl lg:text-4xl">
              <MdMovie /> {Title}
            </p>
            <div className="flex flex-col justify-between lg:flex-row">
              <StyledPara>
                <IoIosPerson /> Actors : {Actors}
              </StyledPara>
              <StyledPara>
                <PiFilmSlateBold /> Director : {Director}
              </StyledPara>
            </div>
            <StyledPara>
              <FaPen /> Writer {Writer}
            </StyledPara>
            <StyledPara>
              <BsCameraReelsFill /> Genre : {Genre}
            </StyledPara>
            <StyledPara>
              <FaFlag /> Country : {Country}
            </StyledPara>
            <StyledPara className="">
              <MdDescription className="text-3xl" /> Plot : {Plot}
            </StyledPara>

            <StyledPara>
              <SlCalender /> Released : {Released}
            </StyledPara>
            <StyledPara className="text-blue-400">
              <RiAwardFill /> Awards : {Awards}
            </StyledPara>
            <div className="grid grid-cols-2 justify-between gap-3 text-base text-yellow-400 lg:grid-cols-3 lg:text-[1.1rem]">
              <StyledPara>
                <FaVoteYea className="" /> Vote : {imdbVotes}
              </StyledPara>
              <StyledPara className="">
                <FaStar /> Rating : {imdbRating}
              </StyledPara>
              <StyledPara>
                <CiTimer /> Runtime : {Runtime}
              </StyledPara>
            </div>
            <AddRemoveFav movieID={imdbId} className={"p-4"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Movie;
