<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="name"
            clearable
            filled
            dense
            label="Nombre"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            v-model="dialogDate_begin"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                clearable
                v-model="date_begin"
                label="Fecha de Inicio"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                filled
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date_begin"
              @input="dialogDate_begin = false"
              locale="pe-ES"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            v-model="dialogDate_end"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                clearable
                v-model="date_end"
                label="Fecha de Cierre"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                filled
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date_end"
              @input="dialogDate_end = false"
              locale="pe-ES"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="location"
            clearable
            filled
            dense
            label="Locación"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="itemsPais"
            v-model="id_pais"
            item-text="name"
            item-value="id"
            clearable
            filled
            dense
            label="Pais"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="itemsOrganizers"
            v-model="id_organizer"
            item-text="name"
            item-value="id"
            clearable
            filled
            dense
            label="Organizador"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="itemsInspectors"
            v-model="id_inspector"
            item-text="name"
            item-value="id"
            clearable
            filled
            dense
            label="Fiscalizador"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn block color="red" @click="__close()">CANCELAR</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn @click="_setEvent" block color="success">GUARDAR EVENTO</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

import notifySuccess from "@/components/notifications/notifySuccess";
export default {
  name: "formNewEvents",
  components: {
    notifySuccess,
  },

  data() {
    return {
      name: "",
      date_begin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date_end: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dialogDate_begin: false,
      dialogDate_end: false,
      location: "",
      id_pais: 1,
      id_organizer: "",
      id_inspector: "",

      itemsPais: [],
      itemsOrganizers: [],
      itemsInspectors: [],

      dataSuccess: false,

      insertId: null,
    };
  },
  mounted() {
    this._getPais();
    this._getOrganizers();
    this._getInspectors();
    this.__validate();
  },
  methods: {
    __close() {
      this.$store.state.__modal_new_events = false;
      this.$store.state.__itemsEvents_ = [];
      this.name = "";
    },
    __validate() {
      let vm = this;
      let data = vm.$store.state.__itemsEvents_;

      if (JSON.stringify(data).length > 0) {
        this.name = data.name;
      }
    },
    _getPais() {
      let vm = this;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "pais/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsPais = response.data.data;
          vm.id_pais = 1;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getOrganizers() {
      let vm = this;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "organizers/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsOrganizers = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getInspectors() {
      let vm = this;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "inspectors/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsInspectors = response.data.data;
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
          vm.$store.state.itemsEvents = response.data.data;
          vm.$store.state.__loadingGetEvents = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _setEvent() {
      let vm = this;
      var data = JSON.stringify({
        code: 3,
        name: vm.name,
        date_time_begin: vm.date_begin,
        date_time_end: vm.date_end,
        location: vm.location,
        id_pais: vm.id_pais,
        id_organizer: vm.id_organizer,
        id_inspector: vm.id_inspector,
        status: 1,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_URLBASE + "events/save",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.statusBol == true) {
            vm._getEvents();
            vm.insertId = response.data.insertId;
            vm.dataSuccess = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>