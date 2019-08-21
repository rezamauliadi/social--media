const URL = `http://jsonplaceholder.typicode.com/photos`;

const API = {
  async retrievePhotos() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  },
  async retrievePhoto(id) {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    return data;
  },
  async retrievePhotosByAlbum(albumId) {
    const response = await fetch(`${URL}?albumId=${albumId}`);
    const data = await response.json();
    return data;
  }
};

export default API;
