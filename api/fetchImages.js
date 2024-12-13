// api/nasaApi.js
const BASE_URL = 'https://images-api.nasa.gov/search';

export const fetchImages = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${category}&page=1`);
    const data = await response.json();
    return data.collection.items.map(item => ({
      id: item.data[0].nasa_id,
      title: item.data[0].title,
      links: item.links,
    }));
  } catch (error) {
    console.error('Erro ao carregar imagens:', error);
    return [];
  }
};

