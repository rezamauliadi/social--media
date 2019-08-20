const URL = `http://jsonplaceholder.typicode.com/albums`;

const API = {
  async retrieveAlbums() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  },
  async retrieveAlbum(id) {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    return data;
  },
  async retrieveAlbumsByUser(userId) {
    const response = await fetch(`${URL}?userId=${userId}`);
    const data = await response.json();
    return data;
  }
};

export default API;
