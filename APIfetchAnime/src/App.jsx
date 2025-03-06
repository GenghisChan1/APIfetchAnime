import { useState, useEffect, useRef } from "react";

import { fetchAnime } from "./assets/APImalfetch";

export function Animecards(){
  const [animeid, setAnimeID] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [animelist, setAnimelist] = useState([]);
  const observerRef = useRef(null);
  const loadTriggerRef = useRef(null);

  function loadanimeIds(){
    setAnimeID((prevIds) =>{
      let lastIds = prevIds[prevIds.length - 1];
      let newIds = Array.from({ length: 10 }, (_, i) => i + lastIds + 1);
      return [...prevIds, ...newIds];
    });
  }

  useEffect(() => {
    if (animeid.length === 0) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index > animeid.length) {
        clearInterval(interval);
      }

      fetchAnime(animeid[index]).then((anime) => {
        setAnimelist((prevList) => [...prevList, anime]);
      });

      index++;
    }, 3333)
    
    return () => clearInterval(interval);
  }, [animeid]);  

  useEffect(() => {
    if (!loadTriggerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadanimeIds(); // Load more anime when reaching the end
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(loadTriggerRef.current);

    return () => observerRef.current?.disconnect();
  }, [animelist]);

  return (
    <>
      {animelist.map((anime) => (
        <div key={anime.title}>
          <h2>{anime.title + " " + anime.id}</h2>
          <img src={anime.img} alt={anime.title} />
          <p>{anime.rate}</p>
        </div>
      ))}
      <div ref={loadTriggerRef} style={{ height: "20px", background: "transparent" }}></div>
    </>
  );
}