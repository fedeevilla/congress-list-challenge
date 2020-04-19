import React from "react";
import "./pagination.styles.scss";

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination">
      <button
        className="button"
        onClick={() => setPage(page - 1)}
        disabled={page < 2}
      >
        Prev
      </button>
      {<h5>{`Page ${page} of ${totalPages === 0 ? 1 : totalPages}`}</h5>}
      <button
        className="button"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
