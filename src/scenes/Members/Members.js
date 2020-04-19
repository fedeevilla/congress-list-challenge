import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchMembers } from "../../store/actions/members";
import MermberList from "../../components/MemberList/MemberList";
import Search from "../../components/Search/Search";

function Members({ fetchMembers }) {
  const [filter, setFilter] = useState("");
  const [fields, setFields] = useState("all");
  const [type, setType] = useState("senate");
  const [number, setNumber] = useState("116");

  useEffect(() => {
    fetchMembers(type, number);
  }, [fetchMembers, type, number]);

  return (
    <>
      <h3>Lists of Members</h3>
      <Search
        setFilter={setFilter}
        setFields={setFields}
        setType={setType}
        setNumber={setNumber}
      />
      <MermberList filter={filter} fields={fields} />
    </>
  );
}

const enhancer = connect(null, {
  fetchMembers,
});

export default enhancer(Members);
