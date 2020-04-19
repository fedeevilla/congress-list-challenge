import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";
import "./memberlist.styles.scss";

import ItemList from "./ItemList/ItemList";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Pagination/Pagination";

const PER_PAGE = 10;

const MemberList = ({ list, loading, filter, fields }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [loading, filter, fields, perPage]);

  const filterOptions = {
    shouldSort: true,
    keys:
      fields === "all"
        ? ["first_name", "last_name", "gender", "party"]
        : [fields],
    threshold: 0,
  };
  const fuse = new Fuse(list, filterOptions);

  const filteredMembers = filter
    ? fuse.search(filter).map(({ item }) => item)
    : list;

  const paginatedResults = filteredMembers.filter(
    (_, index) => index >= (page - 1) * perPage && index < page * perPage
  );

  const totalPages = Math.ceil(filteredMembers.length / perPage);

  return (
    <div className="container-list">
      {loading ? (
        <Spinner />
      ) : (
        <div className="list">
          <div className="header-list">
            <p className="results">
              {`Total results filtered: ${filteredMembers.length} of 
                ${list.length}`}
            </p>
            <div className="">
              <span className="items-per-page">Items per page</span>
              <select onChange={(ev) => setPerPage(ev.target.value)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          {paginatedResults.length ? (
            paginatedResults.map((item) => (
              <ItemList key={item.key} {...item} />
            ))
          ) : (
            <div className="no-results">No Results</div>
          )}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

const enhancer = connect(({ members }) => ({
  list: members.list,
  loading: members.loading,
}));

export default enhancer(MemberList);
