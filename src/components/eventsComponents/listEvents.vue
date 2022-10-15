<template>
  <div>
    <v-list dark class="__list_main_event" max-width="100%" three-line>
      <v-subheader>EVENTOS ACTIVOS</v-subheader>

      <v-list-item
        link
        dense
        v-for="item in itemsEvents"
        @click="_seeEventTest(item.name, item.id)"
        :key="item.id"
        :class="item.id == $route.params.idEvent ? '__active' : ''"
        :disabled="item.id == $route.params.idEvent"
      >
        <v-tooltip bottom color="success">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-avatar
              size="32"
              class="ma-auto mr-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-img :src="item.flag"></v-img>
            </v-list-item-avatar>
          </template>
          <span>{{ item.name_pais }}</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title
            v-html="item.code + ' ' + item.name"
          ></v-list-item-title>
          <v-list-item-subtitle style="margin-top: -30px !important">
            Locación: {{ item.location }} <br />
            Período: {{ item.date_time_begin_string }} -
            {{ item.date_time_end_string }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "listEvents",
  mounted() {
    this._getEvents();
  },
  data() {
    return {
      itemsEvents: [],
    };
  },

  methods: {
    _seeEventTest(selected, idSelected) {
      let vm = this;
      vm.$store.state._nameEventSelected = selected;
      vm.$router.push("/test/main/" + idSelected);
      vm._getTestEvents();
    },

    _getTestEvents() {
      let vm = this;
      vm.$store.state.__loadingGetEvents = true;
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE +
          "datatest/listAll/" +
          vm.$route.params.idEvent,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsTestEvents = response.data.data;
          vm.$store.state.__loadingGetEvents = false;
          vm.$store.state.itemsSerieTest = [];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getEvents() {
      let vm = this;
      vm.$store.state.__loadingGetEvents = true;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "events/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsEvents = response.data.data;
          vm.$store.state.__loadingGetEvents = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.__list_main_event {
  background-color: #15182f !important;
  border-radius: 15px !important;
  max-height: 100vh;
  overflow-y: scroll !important;
}

.__list_main_event::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.__active {
  background-color: #4d4f61;
}
</style>