import React from "react";
import "./memberitemdetail.styles.scss";

const MemberItemDetail = (props) => {
  return (
    <div className="item">
      <div className="title">{props.title}</div>
      <div className="detail">{props.children}</div>
    </div>
  );
};

export default MemberItemDetail;
