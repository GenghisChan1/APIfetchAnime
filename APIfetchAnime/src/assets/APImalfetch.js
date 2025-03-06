export function fetchAnime(id) {
  return fetch(`https://api.jikan.moe/v4/anime/${id}`, {mode: 'cors'})
    .then((res) => {
      if(!res.ok) {
        throw new Error(res.status + " " + res.type);
      } 
      return res.json();
    })
    .then((res) => ({
      title: res.data.title,
      img: res.data.images.jpg.image_url,
      rate: res.data.score,
      id: id
    }))
}  