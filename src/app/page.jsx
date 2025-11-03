"use client";

import MainContent from "@/app/component/MainContent";
import { useState } from "react";

function Home() {
  // Store input query
  const [query, setQuery] = useState("");

  return (
    <div className="h-[100%]">
      <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/bg-image.jpg')] bg-cover bg-center">
        <MainContent setQuery={setQuery} query={query} />
      </div>
    </div>
  );
}

export default Home;
