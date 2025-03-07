import { useState, useEffect, useRef } from "react";

import { fetchAnime } from "./assets/APImalfetch";

export function Animecards(){
  const [animelist, setAnimelist] = useState([Array.from({ length: 10 }, (_, i) => i + 1)]);
  const [currentAnimeIDs, setCurrentAnimeIDs] = useState([]);

  function fetchdata(){
    fetchAnime(currentAnimeIDs).then((anime) => {
      setAnimelist((prevList) => [...prevList, anime]);
    });
  }

  for (let i = 0; i < currentAnimeIDs.length; i++){
    setTimeout(fetchdata, 333);
  }

  useEffect(() => {
    const timeout = setTimeout();
    
    setCurrentAnimeIDs((prevIDs) => {
      return [Array.from({ length: 10 }, (_, i) => i + prevIDs[prevIDs.length - 1] + 1)];
    });

    function fetchdata(){
      fetchAnime(currentAnimeIDs).then((anime) => {
        setAnimelist((prevList) => [...prevList, anime]);
      });
    }

    for (let i = 0; i < currentAnimeIDs.length; i++){
      timeout(fetchdata, 333);
    }

    return () => timeout.forEach(clearTimeout);

  }, []);

  

  return (
    <>
      {animelist.map((anime, index) => (
        <div key={index}>
          <h2>{anime.title + " " + anime.id}</h2>
          <img src={anime.img} alt={anime.title} />
          <p>{anime.rate}</p>
        </div>
      ))}
    </>
  );
}