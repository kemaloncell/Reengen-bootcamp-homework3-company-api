import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiURL: 'https://alpha-vantage.p.rapidapi.com/',
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': 'e3a4c39faamsh38e322c67483b4bp13281cjsncbb2f77f229e',
    },
    searchCompanies: [],
    companyData: [],
    timeSeries: 'TIME_SERIES_DAILY',
    onlineUser: 'User',
    log_count: 0,
  },
  mutations: {
    SET_COMPANY_SEARCH_RESULT(state, payload) {
      state.searchCompanies = payload;
    },
    SET_COMPANY_DATA(state, payload) {
      state.companyData = payload;
    },
    SET_TIME_SERIES(state, payload) {
      state.timeSeries = payload;
    },
  },
  actions: {
    searchCompanyTitle({ state, commit }, payload) {
      axios
        .get(`${state.apiURL}/query`, { headers: { ...state.headers }, params: { keywords: payload, function: 'SYMBOL_SEARCH', datatype: 'json' } })
        .then((res) => {
          let companyData = res.data['bestMatches'];
          let companyList = [];
          companyData.forEach((element) => {
            let obj = new Object({
              bio: element['2. name'],
              sym: element['1. symbol'],
            });
            companyList.push(obj);
          });
          commit('SET_COMPANY_SEARCH_RESULT', companyList);
        })
        .catch((e) => console.log(e));
    },

    fetchCompanyData({ state, commit, getters }, payload) {
      axios
        .get(`${state.apiURL}/query`, {
          headers: { ...state.headers },
          params: {
            function: state.timeSeries,
            symbol: payload,
            outputsize: 'compact',
            datatype: 'json',
          },
        })
        .then((res) => {
          /*  console.log(res);
          commit('SET_COMPANY_DATA', res.data);
          console.log(state.companyData); */
          let arrayData = Object.keys(res.data[getters.timeSeriesName]).map((item) => ({
            [item]: res.data[getters.timeSeriesName][item],
          }));
          arrayData = arrayData.slice(0, 100);
          commit('SET_COMPANY_DATA', arrayData);
          console.log(state.companyData);
          console.log(res);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    },
  },
  getters: {
    getSearchCompanies(state) {
      return state.searchCompanies;
    },
    timeSeriesName(state) {
      switch (state.timeSeries) {
        case 'TIME_SERIES_DAILY':
          return 'Time Series (Daily)';
        case 'TIME_SERIES_WEEKLY':
          return 'Weekly Time Series';
        case 'TIME_SERIES_MONTHLY':
          return 'Monthly Time Series';
      }
    },
  },
});
