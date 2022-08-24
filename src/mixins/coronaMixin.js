import axios from "axios";
const coronaMixin = {
  methods: {
    async fetchData(method, url, params) {
      const res = await axios[method](url, { params });
      return res.data;
    },
  },
};

export default coronaMixin;
