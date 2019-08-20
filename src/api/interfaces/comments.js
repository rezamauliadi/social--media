const URL = `http://jsonplaceholder.typicode.com/comments`;
const headers = {
  "Content-type": "application/json; charset=UTF-8"
};

const API = {
  async retrieveComments() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  },
  async retrieveCommentsByPost(postId) {
    const response = await fetch(`${URL}?postId=${postId}`);
    const data = await response.json();
    return data;
  },
  async createComment(payload) {
    const options = {
      headers,
      method: "POST",
      body: JSON.stringify(payload)
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
  },
  async updateComment(payload, commentId) {
    const options = {
      headers,
      method: "PUT",
      body: JSON.stringify(payload)
    };
    const response = await fetch(`${URL}/${commentId}`, options);
    const data = await response.json();
    return data;
  },
  async deleteComment(commentId) {
    const options = { method: "DELETE" };
    const response = await fetch(`${URL}/${commentId}`, options);
    const data = await response.json();
    return data;
  }
};

export default API;
