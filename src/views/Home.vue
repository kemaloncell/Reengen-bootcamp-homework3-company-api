<template>
  <v-container>
    <v-toolbar dark color="grey darken-1">
      <v-toolbar-title>State selection</v-toolbar-title>
      <v-autocomplete :loading="loading" v-model="select" :items="items" :search-input.sync="search" cache-items class="mx-4" flat hide-no-data hide-details label="What state are you from?" solo-inverted></v-autocomplete>
      <v-btn @click="searchBtn(search)" class="mt-1 ml-3" small>Search</v-btn>
    </v-toolbar>
    <v-container class="m-0 p-0 d-flex justify-center align-center" style="width: fit-content">
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
      search: null,
      select: null,
      states: [],
    };
  },
  watch: {
    search(val) {
      if (val.length == 3) {
        this.$store.dispatch('searchCompanyTitle', val);
        val && val !== this.select && this.querySelections(val);
      }
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.getSearchCompanies.forEach((element) => {
          this.states.push(element.bio);
        });

        this.items = this.states.filter((e) => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    searchBtn(searchData) {
      var companyTitle = '';
      this.getSearchCompanies.find((e) => {
        if (e.bio === searchData) {
          companyTitle = e.sym;
        }
      });
      console.log(companyTitle);
      this.$router.push({ name: 'Chart', query: { title: companyTitle } });

      if (this.search !== '') {
        this.$store.dispatch('fetchCompanyData', companyTitle);
        this.search = companyTitle;
      }
    },
  },

  computed: {
    ...mapGetters(['getSearchCompanies']),
  },
};
</script>
