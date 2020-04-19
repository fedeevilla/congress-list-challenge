import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as R from "ramda";
import "./memberdetails.styles.scss";

import MemberItemDetail from "../MemberItemDetails/MemberItemDetail";
import Spinner from "../../components/Spinner/Spinner";
import { fetchMember } from "../../store/actions/members";
import twitter from "../../assets/twitter_icon.png";
import facebook from "../../assets/facebook_icon.png";
import youtube from "../../assets/youtube_icon.png";

const Image = ({ src }) => {
  return <img src={src} alt="" height={16} style={{ marginRight: 5 }} />;
};

const MemberDetails = ({ list, fetchMember, loading, selected }) => {
  const params = useParams();
  const history = useHistory();

  const member = R.find(R.propEq("id", params.id), list);

  useEffect(() => {
    if (!member) {
      fetchMember(params.id);
    }
  }, [fetchMember, member, params.id]);

  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    party,
    title,
    twitter_account,
    facebook_account,
    youtube_account,
    office,
    in_office,
    phone,
  } = member || selected;

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <div className="member-details">
        <div className="header-details">Member Details</div>
        {!first_name ? (
          <div className="not-found">Member not found</div>
        ) : (
          <>
            <MemberItemDetail title="Fullname">
              {`${first_name} ${last_name}`}
            </MemberItemDetail>
            <MemberItemDetail title="Party">{party}</MemberItemDetail>
            {title && (
              <MemberItemDetail title="Title">{title}</MemberItemDetail>
            )}
            <MemberItemDetail title="Gender">{gender}</MemberItemDetail>
            {date_of_birth && (
              <MemberItemDetail title="Birth">{date_of_birth}</MemberItemDetail>
            )}
            {office && (
              <MemberItemDetail title="Office">{office}</MemberItemDetail>
            )}
            {phone && (
              <MemberItemDetail title="Phone">{phone}</MemberItemDetail>
            )}
            {(twitter_account || facebook_account || youtube_account) && (
              <MemberItemDetail title="Social Networks">
                <span>
                  {twitter_account && (
                    <p>
                      <Image src={twitter} />
                      {twitter_account}
                    </p>
                  )}
                  {facebook_account && (
                    <p>
                      <Image src={facebook} />
                      {facebook_account}
                    </p>
                  )}
                  {youtube_account && (
                    <p>
                      <Image src={youtube} />
                      {youtube_account}
                    </p>
                  )}
                </span>
              </MemberItemDetail>
            )}
            {in_office && (
              <MemberItemDetail title="Active">
                {in_office ? "Yes" : "No"}
              </MemberItemDetail>
            )}
          </>
        )}
      </div>
      <button className="back-button" onClick={() => history.push("/")}>
        Back
      </button>
    </div>
  );
};

const enhancer = connect(
  ({ members }) => ({
    list: members.list,
    loading: members.loading,
    selected: members.selected,
  }),
  { fetchMember }
);

export default enhancer(MemberDetails);
