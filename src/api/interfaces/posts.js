const URL = `http://jsonplaceholder.typicode.com/posts`;
const headers = {
  "Content-type": "application/json; charset=UTF-8"
};

const API = {
  async retrievePosts() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  },
  async retrievePostsByUser(userId) {
    const response = await fetch(`${URL}?userId=${userId}`);
    const data = await response.json();
    return data;
  },
  async createPost(payload) {
    const options = {
      headers,
      method: "POST",
      body: JSON.stringify(payload)
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
  },
  async updatePost(payload, postId) {
    const options = {
      headers,
      method: "PUT",
      body: JSON.stringify(payload)
    };
    const response = await fetch(`${URL}/${postId}`, options);
    const data = await response.json();
    return data;
  },
  async deletePost(postId) {
    const options = { method: "DELETE" };
    const response = await fetch(`${URL}/${postId}`, options);
    return response.status;
  }
};

export default API;
