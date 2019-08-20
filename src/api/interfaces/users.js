const URL = `http://jsonplaceholder.typicode.com/users`;

const API = {
  async retrieveUsers() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  },
  async retrieveUser(id) {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    return data;
  }
};

export default API;
