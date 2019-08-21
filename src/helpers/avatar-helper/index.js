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

const getAvatar = id => {
  let ava = avatar[0];
  if (id && avatar[id]) {
    ava = avatar[id];
  }

  return `/images/${ava[0]}.${ava[1]}`;
};

export default getAvatar;
