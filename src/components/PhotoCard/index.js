import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

const PhotoCard = ({ items, isAlbum }) => {
  const cardTitleStyle = {
    width: "140px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const cardProps = item => {
    const prop = { as: isAlbum ? Link : "a" };
    if (isAlbum) prop.to = item.url;
    else prop.href = item.url;
    return prop;
  };

  return (
    <div>
      <Card.Group itemsPerRow={3}>
        {items.map(item => (
          <Card {...cardProps(item)} key={item.id} color="blue">
            <Image
              style={{ height: "173px", width: "172px" }}
              src={item.thumbnailUrl}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header style={cardTitleStyle}>{item.title}</Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

PhotoCard.propTypes = {
  items: PropTypes.array
};

export default PhotoCard;
