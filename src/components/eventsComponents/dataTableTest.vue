<template>
  <div>
    <v-data-table
      :loading="$store.state.__loadingGetEvents"
      dark
      :search="$store.state.__searchEvent"
      :headers="headersTestEvents"
      :items="$store.state.itemsTestEvents"
      :items-per-page="5"
      multi-sort
      @click:row="_selectTest"
      :item-class="itemRowBackground"
      class="elevation-0 __data_table_main_test"
    >
      <template v-slot:top>
        <v-toolbar class="__data_table_main_test" elevation="0">
          <v-toolbar-title
            ><h4 color="#b9bab8">LISTA DE PRUEBAS</h4></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="!$store.state.mode_juez"
            color="pink"
            small
            rounded
            @click="$store.state.__modal_select_test = true"
          >
            Agregar Pruebas
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.flag`]="{ item }">
        <v-avatar size="24">
          <v-img width="30" :src="item.flag"></v-img>
        </v-avatar>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip v-if="item.status == 1" small color="success" dark>
          Activo
        </v-chip>
        <v-chip v-if="item.status == 0" small color="error" dark>
          Inactivo
        </v-chip>
      </template>

      <template
        v-if="!$store.state.mode_juez"
        v-slot:[`item.action`]="{ item }"
      >
        <v-btn fab x-small color="orange" @click="openEdit(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <modalUploadFileVue />

    <v-dialog
      v-model="modalEdit"
      scrollable
      persistent
      :overlay="false"
      max-width="600"
      transition="dialog-transition"
    >
      <v-card class="__data_table_main_test" dark>
        <v-card-title> EDITAR PRUEBA </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="$store.state.itemsListTest"
                  item-text="description"
                  item-value="id"
                  label="Prueba"
                  v-model="id_test"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="$store.state.__test_time"
                  item-text="name"
                  item-value="id"
                  label="Jornada"
                  v-model="id_time"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="$store.state.__test_turn"
                  item-text="name"
                  item-value="id"
                  label="Turno"
                  v-model="id_turn"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="$store.state.__test_categories"
                  item-text="name"
                  item-value="id"
                  label="Categoria"
                  v-model="id_category"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="$store.state.__test_gender"
                  item-text="name"
                  item-value="id"
                  label="Genero"
                  v-model="id_gender"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="id_status"
                  :items="itemsStatus"
                  item-text="name"
                  item-value="id"
                  label="Estado"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="close()">CANCELAR</v-btn>
          <v-btn color="success" @click="_putTest()">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import modalUploadFileVue from "@/views/testFolder/modalUploadFile.vue";

export default {
  name: "dataTableTest",
  data() {
    return {
      modalEdit: false,
      headersTestEvents: [
        { text: "Codigo de Prueba", value: "name_test" },
        { text: "Jornada", value: "name_time" },
        { text: "Turno", value: "name_turn" },
        { text: "Prueba", value: "description_test" },
        { text: "Categoria", value: "name_category" },
        { text: "Genero", value: "name_gender" },
        { text: "Estado", value: "status" },
        { text: "Acción", value: "action" },
      ],
      id_selected: null,
      itemsStatus: [
        { id: 1, name: "Activo" },
        { id: 0, name: "Inactivo" },
      ],

      id_test: null,
      id_category: null,
      id_time: null,
      id_turn: null,
      id_gender: null,
      id_status: null,
    };
  },
  mounted() {
    this._getTestEvents();
    this._getListCategories();
    this._getListGender();
    this._getListTest();
    this._getListTime();
    this._getListTurn();
  },
  components: {
    modalUploadFileVue,
  },
  methods: {
    _putTest() {
      let vm = this;
      var data = JSON.stringify({
        idEvent: vm.$route.params.idEvent,
        idCategory: vm.id_category,
        idGender: vm.id_gender,
        idTest: vm.id_test,
        idTime: vm.id_time,
        idTurn: vm.id_turn,
        status: vm.id_status,
      });

      var config = {
        method: "put",
        url: process.env.VUE_APP_URLBASE + "test/update/" + vm.id_selected,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.statusBol == true) {
            vm.$swal({
              position: "top-end",
              icon: "success",
              title: "Prueba actualizada",
              showConfirmButton: false,
              timer: 1500,
            });
            vm.modalEdit = false;
            vm._getTestEvents();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    openEdit(item) {
      this.id_selected = item.id;
      this.id_test = item.id_test;
      this.id_category = item.id_category;
      this.id_gender = item.id_gender;
      this.id_status = item.status;
      this.id_time = item.id_time;
      this.id_turn = item.id_turn;
      this.modalEdit = true;
    },
    clean() {
      this.id_selected = null;
      this.id_status = null;
      this.id_gender = null;
      this.id_test = null;
      this.id_category = null;
      this.id_time = null;
      this.id_turn = null;
    },
    close() {
      this.modalEdit = false;
      this.clean();
    },
    itemRowBackground(item) {
      if (this.$route.params.idTest) {
        if (item.id == this.$route.params.idTest) {
          return "__row_selected";
        }
      }
    },
    _selectTest(item) {
      this.$router.push(
        "/test/main/" +
          this.$route.params.idEvent +
          "/" +
          item.id +
          "/" +
          item.id_type_test +
          "/" +
          item.type_test_category
      );
      this._getSerieTest();
    },
    _getSerieTest() {
      let vm = this;
      vm.$store.state.__loadingGetSerieTest = true;
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE + "serie/list/" + vm.$route.params.idTest,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsSerieTest = response.data.data;
          vm.$store.state.__loadingGetSerieTest = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _getTestEvents() {
      let vm = this;
      vm.$store.state.__loadingGetEvents = true;
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE +
          "datatest/listAlladmin/" +
          vm.$route.params.idEvent,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsTestEvents = response.data.data;
          vm.$store.state.__loadingGetEvents = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getListTest() {
      let vm = this;

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "test/listAll",
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

<style lang="scss">
.__data_table_main_test {
  background-color: #15182f !important;
  border-radius: 15px !important;
}

.__data_toolbar_main_test {
  background-color: #0b0d20 !important;
  border-radius: 15px 15px 0px 0px;
}

.__row_selected {
  background: #4d4f61 !important;
}

.__row_ {
  background-color: blue !important;
}
</style>