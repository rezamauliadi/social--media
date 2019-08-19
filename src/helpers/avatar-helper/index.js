const avatar = [
  ["joe", "jpg"],
  ["daniel", "jpg"],
  ["jenny", "jpg"],
  ["molly", "png"],
  ["elliot", "jpg"],
  ["steve", "jpg"],
  ["matthew", "png"],
  ["helen", "jpg"],
  ["justen", "jpg"],
  ["laura", "jpg"],
  ["matt", "jpg"],
  ["stevie", "jpg"]
];

const getAvatar = id => `/images/${avatar[id][0]}.${avatar[id][1]}`;

export default getAvatar;
