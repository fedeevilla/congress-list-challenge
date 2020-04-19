import {
  FETCH_MEMBERS_RESOLVED,
  FETCH_MEMBERS_STARTED,
  FETCH_MEMBERS_REJECTED,
  FETCH_MEMBER_RESOLVED,
  FETCH_MEMBER_STARTED,
  FETCH_MEMBER_REJECTED,
} from "../actions/members";

const initialState = {
  list: [],
  selected: {},
  num_results: 0,
  loading: false,
};

const PARTIES = {
  R: "Republican",
  D: "Democratic",
  I: "Independent",
  "": "N/A",
};

const GENDERS = {
  F: "Famale",
  M: "Male",
  "": "N/A",
};

export const members = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case FETCH_MEMBER_STARTED:
    case FETCH_MEMBERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEMBER_RESOLVED:
      return {
        ...state,
        selected: {
          ...payload,
          gender: GENDERS[payload.gender],
          //Here I had to change some props, because the backend have them with different name.
          party: PARTIES[payload.current_party],
        },
        loading: false,
      };
    case FETCH_MEMBERS_RESOLVED:
      return {
        ...state,
        num_results: payload.num_results,
        list: payload.members.map((member, index) => {
          return {
            ...member,
            //Here I used an index as a key beacuse the backend has duplicated IDs.
            key: index,
            gender: GENDERS[member.gender],
            party: PARTIES[member.party],
          };
        }),
        loading: false,
      };
    case FETCH_MEMBER_REJECTED:
    case FETCH_MEMBERS_REJECTED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
