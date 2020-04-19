import api from "../../utils/api";

export const FETCH_MEMBERS_STARTED = "FETCH_MEMBERS_STARTED";
export const FETCH_MEMBERS_RESOLVED = "FETCH_MEMBERS_RESOLVED";
export const FETCH_MEMBERS_REJECTED = "FETCH_MEMBERS_REJECTED";

export const FETCH_MEMBER_STARTED = "FETCH_MEMBER_STARTED";
export const FETCH_MEMBER_RESOLVED = "FETCH_MEMBER_RESOLVED";
export const FETCH_MEMBER_REJECTED = "FETCH_MEMBER_REJECTED";

export const fetchMembers = (type, number) => async (dispatch) => {
  dispatch({
    type: FETCH_MEMBERS_STARTED,
  });
  try {
    const { results } = await api.members.fetchMembers(type, number);

    dispatch({
      type: FETCH_MEMBERS_RESOLVED,
      payload: {
        members: results[0].members,
        num_results: results[0].num_results,
      },
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: FETCH_MEMBERS_REJECTED,
    });
  }
};

export const fetchMember = (id) => async (dispatch) => {
  dispatch({
    type: FETCH_MEMBER_STARTED,
  });
  try {
    const { results } = await api.members.fetchMember(id);

    dispatch({
      type: FETCH_MEMBER_RESOLVED,
      payload: results ? results[0] : {},
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: FETCH_MEMBER_REJECTED,
    });
  }
};
