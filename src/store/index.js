import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    _titleNavigation: '',
    __drawer: null,

    //MODALS
    __modal_new_events: false,
    __modal_select_test: false,
    __modal_test_upload_file: false,
    __modal_form_serie: false,

    __refreshEvents: false,

    //EVENTS
    itemsEvents: [],
    _nameEventSelected: null,

    __itemsEvents_: [],


    //LOADINGS
    __loadingGetEvents: false,
    __searchEvent: '',
    __loadingGetSerieTest: false,


    //TEST
    itemsListTest: [],
    __searchTest: '',
    __test_selected: [],
    __test_categories: [],
    __test_time: [],
    __test_turn: [],
    __test_gender: [],
    __id_test_category: '',
    __id_test_gender: '',
    __id_test_time: '',
    __id_test_turn: '',
    itemsTestEvents: [],
    itemsSerieTest: [],
    value_type_test: 0,


    //SERIE
    idSerieSelected: '',

    //JUEZ
    mode_juez: 0, 

  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
