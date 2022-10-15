<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="3">
          <v-text-field
            v-model="$store.state.__searchTest"
            label="Buscar "
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-autocomplete
            label="Jornada"
            v-model="$store.state.__id_test_time"
            :items="$store.state.__test_time"
            item-text="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            label="Turno"
            v-model="$store.state.__id_test_turn"
            :items="$store.state.__test_turn"
            item-text="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            label="Categoría"
            v-model="$store.state.__id_test_category"
            :items="$store.state.__test_categories"
            item-text="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>

        <v-col cols="2">
          <v-autocomplete
            label="Genero"
            v-model="$store.state.__id_test_gender"
            :items="$store.state.__test_gender"
            item-text="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      v-model="$store.state.__test_selected"
      dark
      show-select
      :search="$store.state.__searchTest"
      :headers="headersTest"
      :items="$store.state.itemsListTest"
      :items-per-page="5"
      class="elevation-0 __data_table_main mt-2"
      multi-sort
    >
      <template v-slot:[`body.append`]>
        <tr>
          <td colspan="4">
            <p>
              CANTIDAD DE PRUEBAS SELECCIONADAS:
              {{ $store.state.__test_selected.length }}
            </p>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dataListTest",
  data() {
    return {
      headersTest: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "code",
        },
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
      ],
      selected: [],
    };
  },
  mounted() {
    this._getListTest();
    this._getListCategories();
    this._getListGender();
    this._getListTime();
    this._getListTurn();
  },
  methods: {
    _getListTest() {
      let vm = this;
      let valueType = null;

      if (vm.$store.state.value_type_test == 0) {
        valueType = 1;
      } else if (vm.$store.state.value_type_test == 1) {
        valueType = 4;
      }

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "test/listAll/" + valueType,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsListTest = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getListCategories() {
      let vm = this;

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "categories/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.__test_categories = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getListTime() {
      let vm = this;

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "time/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.__test_time = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getListTurn() {
      let vm = this;

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "turn/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.__test_turn = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getListGender() {
      let vm = this;

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "gender/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.__test_gender = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.__data_table_main {
  background-color: #15182f;
}
</style>