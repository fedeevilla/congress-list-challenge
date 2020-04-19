import React from "react";
import { useHistory } from "react-router-dom";
import "./itemlist.styles.scss";

const ItemList = ({ id, first_name, last_name, title, gender, party }) => {
  const history = useHistory();
  return (
    <div className="item-list" onClick={() => history.push(`/member/${id}`)}>
      <div className="details">
        <span className="fullname">{`${first_name} ${last_name}`}</span>
        <span className="party">{party}</span>
      </div>
      <div className="extra">
        <p>{title}</p>
        <p>{gender}</p>
      </div>
    </div>
  );
};

export default ItemList;
