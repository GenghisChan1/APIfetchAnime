export async function fetchAnime(page, retryCount = 0) {
  const MAX_RETRIES = 3;
  const LIMIT = 10; // Number of anime per page

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=${LIMIT}`, { mode: "cors" });

    if (response.status === 200) {
      const res = await response.json();
      return res.data.map((anime) => ({
        title: anime.title,
        img: anime.images.jpg.image_url,
        rate: anime.score,
        id: anime.mal_id,
      }));
    } else if (response.status === 304) {
      console.warn(`Page ${page} - Not Modified (Cache Validated)`);
      return [];
    } else if (response.status === 400 || response.status === 405) {
      console.error(`Page ${page} - Bad Request (Check API Docs)`);
      return [];
    } else if (response.status === 404) {
      console.warn(`Page ${page} - Not Found`);
      return [];
    } else if (response.status === 429) {
      if (retryCount < MAX_RETRIES) {
        console.warn(`Page ${page} - Rate Limited! Retrying in 5 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return fetchAnimePage(page, retryCount + 1);
      } else {
        console.error(`Page ${page} - Rate Limit Exceeded after ${MAX_RETRIES} retries.`);
        return [];
      }
    } else if (response.status === 500 || response.status === 503) {
      console.error(`Page ${page} - Server Error! Try again later.`);
      return [];
    } else {
      console.error(`Page ${page} - Unexpected Error: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(`Page ${page} - Network Error:`, error);
    return [];
  }
}