<template>
  <v-container>
    <v-toolbar dark color="grey darken-1">
      <v-toolbar-title>Selection</v-toolbar-title>
      <v-autocomplete :loading="loading" v-model="select" :items="items" :search-input.sync="search" cache-items class="mx-4" flat hide-no-data hide-details label="Search...?" solo-inverted></v-autocomplete>
      <v-btn @click.prevent="searchBtn(search)" class="mt-1 ml-3" small>Search</v-btn>
    </v-toolbar>
    <v-container v-if="this.$store.state.companyData" class="m-0 p-0 d-flex justify-center align-center" style="width: fit-content">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      items: [],
      search: '',
      select: '',
      states: [],
    };
  },

  methods: {
    querySelections(val) {
      this.getSearchCompanies.forEach((title) => {
        // I pushed the data from the api to the items array
        this.items.push(title.bio);
      });

      // I pushed the data from the items index to make it appear in autocomplete
      this.items.filter((e) => {
        return (e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1;
      });

      // loading bar start
      this.loading = true;
      setTimeout(() => {
        // loading bar start end
        this.loading = false;
      }, 500);
    },
    searchBtn(searchData) {
      // Search for company name by company symbol
      let companyTitle = '';
      this.getSearchCompanies.find((e) => {
        if (e.bio === searchData) {
          companyTitle = e.sym;
        }
      });
      this.$router.push({ name: 'Chart', query: { symbol: companyTitle } });

      // send company data to action
      if (this.search !== '') {
        this.$store.commit('SET_COMPANY_TITLE', companyTitle);
        this.$store.dispatch('fetchCompanyData');

        this.select = companyTitle;
      }
    },
  },
  computed: {
    ...mapGetters(['getSearchCompanies']),
  },
  watch: {
    // Searching and forwarding with 3 letters
    search(val) {
      const data = val;
      if (data != null && data.length >= 3) {
        this.$store.dispatch('searchCompanyTitle', val);
        // invoke the querySelections and push the search value for autocompalte
        val && val !== this.select && this.querySelections(val);
      }
    },
  },
};
</script>
