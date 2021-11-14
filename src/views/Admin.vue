<template>
  <div class="admin">
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in items" :key="i">
          <v-expansion-panel-header :class="item.state == 'alert' ? 'alert' : ''">
            <v-col cols="1">
              <v-icon v-if="item.state == 'redirect'" class="fa fa-long-arrow-right"></v-icon>
              <v-icon v-if="item.state == 'alert'" class="fa fa-exclamation" color="red"></v-icon>
            </v-col>
            <v-col cols="">
              {{ item.name }}
            </v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row> <strong>from: </strong> {{ item.from }} </v-row>
              <v-row> <strong>to: </strong> {{ item.to }} </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import store from '@/store';
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    let i = 0;
    while (localStorage.getItem(`log${i}`) != null) {
      this.items.push(JSON.parse(localStorage.getItem(`log${i}`)));
      i++;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.onlineUser != 'Admin') {
      let obj = new Object({
        id: store.state.log_count,
        name: `user:${store.state.onlineUser}${Math.floor(Math.random() * 999 + 1)} - ${new Date().toUTCString()}`,
        state: 'alert',
        from: from.fullPath,
        to: to.fullPath,
      });
      localStorage.setItem(`log${store.state.log_count}`, JSON.stringify(obj));
      store.state.log_count++;
      alert('Unauthorized User');
    } else {
      next();
    }
  },
};
</script>
<style>
.alert {
  color: red;
}
</style>
