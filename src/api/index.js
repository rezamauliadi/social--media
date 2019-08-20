import usersApi from "src/api/interfaces/users";
import postsApi from "src/api/interfaces/posts";
import albumsApi from "src/api/interfaces/albums";
import photosApi from "src/api/interfaces/photos";
import commentsApi from "src/api/interfaces/comments";

export default {
  ...usersApi,
  ...postsApi,
  ...albumsApi,
  ...photosApi,
  ...commentsApi
};
