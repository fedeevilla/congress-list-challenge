import axios from "axios";

let BASE_URL = "https://api.propublica.org/congress/v1/";
let API_KEY = "vg7Rc0aVQWPYUcDzdP5OMGtLkIzojStWjZ1Db42I";

const DEFAULT_OPTIONS = {
  crossDomain: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};

const api = {
  request: async function ({ url, method, data = {}, ...rest }) {
    try {
      const response = await axios({
        ...DEFAULT_OPTIONS,
        url: BASE_URL + url,
        method: method || "get",
        data,
        headers: {
          ...DEFAULT_OPTIONS.headers,
          "X-API-Key": API_KEY,
        },
        ...rest,
      });

      if (response.status >= 400) throw response;

      return { data: response.data };
    } catch (error) {
      return { error };
    }
  },
  members: {
    fetchMembers: async function (type, number) {
      const { error, data } = await api.request({
        url: `${number}/${type}/members.json`,
        method: "GET",
      });

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(data);
    },
    fetchMember: async function (id) {
      const { error, data } = await api.request({
        url: `/members/${id}.json`,
        method: "GET",
      });

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(data);
    },
  },
};

export default api;
