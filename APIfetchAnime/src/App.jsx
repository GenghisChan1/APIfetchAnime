import { useState, useEffect } from "react";
import { fetchAnime } from "./assets/APImalfetch";

export function Animecards() {
  const [animelist, setAnimelist] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Stops when no more data

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const newAnime = await fetchAnime(page);
      if (newAnime.length > 0) {
        setAnimelist((prevList) => [...prevList, ...newAnime]);
      } else {
        setHasMore(false); // No more pages
      }
      setLoading(false);
    }

    fetchData();
  }, [page]);

  return (
    <>
      {animelist.map((anime, index) => (
        <div key={index}>
          <h2>{anime.title} {anime.id}</h2>
          <img src={anime.img} alt={anime.title} />
          <p>{anime.rate}</p>
        </div>
      ))}

      {hasMore && !loading && (
        <button onClick={() => setPage(page + 1)}>Load More</button>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
}