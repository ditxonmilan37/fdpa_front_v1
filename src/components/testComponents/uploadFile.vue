<template>
  <div>
    <v-card small dark class="__card_main">
      <v-card-title>
        CARGAR
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          v-if="
            $route.params.idTypeTest == 4 &&
            $route.params.typeCategory == 2 &&
            $store.state.mode_juez == true
          "
          @click="dialogMedida = true"
          >AGREGAR MEDIDA</v-btn
        >
        <v-btn
          color="orange"
          @click="_delResults()"
          v-if="!$store.state.mode_juez && $route.params.idTypeTest != 4"
          >LIMPIAR RESULTADOS</v-btn
        >
      </v-card-title>
      <v-card-text>
        <div
          v-if="
            $route.params.idTypeTest == 4 &&
            $route.params.typeCategory == 2 &&
            $store.state.mode_juez == true
          "
        >
          <h3>Medidas</h3>
          <div
            v-for="item of itemsResultsSize"
            :key="item.id"
            class="__card_medida"
          >
            {{ item.size }}
          </div>
        </div>

        <v-file-input
          v-if="$route.params.idTypeTest == 1"
          label="Subir archivo"
          filled
          prepend-icon="mdi-file"
          v-model="files"
          ref="doc"
          @change="loadFile()"
          accept=".lif, .Evt"
        ></v-file-input>

        <v-row dense v-if="!$store.state.mode_juez">
          <v-col cols="6 " v-if="$route.params.idTypeTest == 4">
            <v-text-field
              dense
              v-if="$route.params.idTypeTest == 4"
              filled
              v-model="name"
              label="Nombre"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4" v-if="$route.params.idTypeTest == 4">
            <v-text-field
              dense
              v-model="group"
              v-if="$route.params.idTypeTest == 4"
              filled
              label="Grupo"
            >
            </v-text-field>
          </v-col>

          <v-col cols="2" v-if="$route.params.idTypeTest == 4">
            <v-btn color="primary" @click="addName()" block x-large>
              AGREGAR
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="
            $route.params.idTypeTest == 4 &&
            $route.params.typeCategory == 2 &&
            $store.state.mode_juez == true
          "
          class="pt-5"
        >
          <v-col
            class="__divM2"
            v-for="item of itemsResultsM2"
            :key="item.id"
            cols="12"
          >
            <div>
              <h3>{{ item.name }}</h3>
              <div>
                <a
                  v-for="child of item.results"
                  :key="child.id"
                  class="__btnM2"
                  @click="openM2(item, child)"
                  >{{ child.size }}
                  <v-row dense>
                    <v-col cols="4">{{
                      child.res[0].r1 == 1
                        ? "O"
                        : child.res[0].r1 == 2
                        ? "-"
                        : child.res[0].r1 == 0
                        ? "X"
                        : "::"
                    }}</v-col>
                    <v-col cols="4">{{
                      child.res[0].r2 == 1
                        ? "O"
                        : child.res[0].r2 == 2
                        ? "-"
                        : child.res[0].r2 == 0
                        ? "X"
                        : "::"
                    }}</v-col>
                    <v-col cols="4">{{
                      child.res[0].r3 == 1
                        ? "O"
                        : child.res[0].r3 == 2
                        ? "-"
                        : child.res[0].r3 == 0
                        ? "X"
                        : "::"
                    }}</v-col>
                  </v-row>
                </a>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-data-table
          dark
          :headers="
            !$store.state.mode_juez ? headersResults : headersResultsJuez
          "
          :items="itemsResults"
          :items-per-page="5"
          @click:row="_selectItem"
          class="elevation-0 __data_table_main"
          v-if="
            $route.params.idTypeTest != 4 ||
            $route.params.typeCategory != 2 ||
            $store.state.mode_juez == false
          "
        >
          <template v-slot:[`item.result1`]="{ item }">
            <v-chip color="warning" v-if="item.bol1 == 1" small>-</v-chip>
            <v-chip color="error" v-if="item.bol1 == 0" small>X</v-chip>
            <v-chip
              color="success"
              v-if="item.bol1 == null && item.result1"
              small
              >{{ item.result1 }}</v-chip
            >
          </template>
          <template v-slot:[`item.result2`]="{ item }">
            <v-chip color="warning" v-if="item.bol2 == 1" small>-</v-chip>
            <v-chip color="error" v-if="item.bol2 == 0" small>X</v-chip>
            <v-chip
              color="success"
              v-if="item.bol2 == null && item.result2"
              small
              >{{ item.result2 }}</v-chip
            >
          </template>
          <template v-slot:[`item.result3`]="{ item }">
            <v-chip color="warning" v-if="item.bol3 == 1" small>-</v-chip>
            <v-chip color="error" v-if="item.bol3 == 0" small>X</v-chip>
            <v-chip
              color="success"
              v-if="item.bol3 == null && item.result3"
              small
              >{{ item.result3 }}</v-chip
            >
          </template>
          <template v-slot:[`item.result4`]="{ item }">
            <v-chip color="warning" v-if="item.bol4 == 1" small>-</v-chip>
            <v-chip color="error" v-if="item.bol4 == 0" small>X</v-chip>
            <v-chip
              color="success"
              v-if="item.bol4 == null && item.result4"
              small
              >{{ item.result4 }}</v-chip
            >
          </template>
          <template v-slot:[`item.result5`]="{ item }">
            <v-chip color="warning" v-if="item.bol5 == 1" small>-</v-chip>
            <v-chip color="error" v-if="item.bol5 == 0" small>X</v-chip>
            <v-chip
              color="success"
              v-if="item.bol5 == null && item.result5"
              small
              >{{ item.result5 }}</v-chip
            >
          </template>
          <template v-slot:[`item.result6`]="{ item }">
            <v-chip color="warning" v-if="item.bol6 == 1" small>-</v-chip>
            <v-chip color="error" v-if="item.bol6 == 0" small>X</v-chip>
            <v-chip
              color="success"
              v-if="item.bol6 == null && item.result6"
              small
              >{{ item.result6 }}</v-chip
            >
          </template>
          <template v-slot:[`item.parcial`]="{ item }">
            {{
              Math.max(
                item.bol1 == null ? item.result1 : null,
                item.bol2 == null ? item.result2 : null,
                item.bol3 == null ? item.result3 : null,
                item.bol4 == null ? item.result4 : null,
                item.bol5 == null ? item.result5 : null,
                item.bol6 == null ? item.result6 : null
              ).toFixed(2)
            }}
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="close()">CANCELAR</v-btn>
        <v-btn
          color="success"
          v-if="!$store.state.mode_juez"
          @click="_setResults()"
          >GUARDAR RESULTADOS</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog
      :fullscreen="onDevice"
      v-model="dialogResultCamp"
      max-width="800"
      dark
    >
      <v-card class="__card_main" flat>
        <v-card-title>
          CARGAR RESULTADOS DE <br />
          {{ itemsData.camp5 }}</v-card-title
        >
        <v-card-text>
          <v-row dense v-if="!onDevice">
            <v-col class="border_re" md="2" cols="12">
              <label for="">Resultado 1</label>
              <v-text-field
                v-model="dataR1"
                :disabled="bol1 != null"
                @click.native="bol1 = null"
                label="Resultado 1"
                filled
                :append-icon="'mdi-close'"
                @click:append="dataR1 = null"
              ></v-text-field>
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    @click="bol1 = 0"
                    :light="bol1 != 0"
                    light
                    color="error"
                    :outlined="bol1 != 0"
                    block
                    dense
                    small
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="bol1 = 1"
                    :light="bol1 != 1"
                    color="warning"
                    :outlined="bol1 != 1"
                    block
                    dense
                    small
                    >-</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col class="border_re" md="2" cols="12">
              <label for="">Resultado 2</label>
              <v-text-field
                v-model="dataR2"
                :disabled="bol2 != null"
                @click.native="bol2 = null"
                label="Resultado 2"
                filled
                :append-icon="'mdi-close'"
                @click:append="dataR2 = null"
              ></v-text-field>
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    @click="bol2 = 0"
                    :light="bol2 != 0"
                    light
                    color="error"
                    :outlined="bol2 != 0"
                    block
                    dense
                    small
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="bol2 = 1"
                    :light="bol2 != 1"
                    color="warning"
                    :outlined="bol2 != 1"
                    block
                    dense
                    small
                    >-</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col class="border_re" md="2" cols="12">
              <label for="">Resultado 3</label>
              <v-text-field
                v-model="dataR3"
                :disabled="bol3 != null"
                @click.native="bol3 = null"
                label="Resultado 3"
                filled
                :append-icon="'mdi-close'"
                @click:append="dataR3 = null"
              ></v-text-field>
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    @click="bol3 = 0"
                    :light="bol3 != 0"
                    light
                    color="error"
                    :outlined="bol3 != 0"
                    block
                    dense
                    small
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="bol3 = 1"
                    :light="bol3 != 1"
                    color="warning"
                    :outlined="bol3 != 1"
                    block
                    dense
                    small
                    >-</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col class="border_re" md="2" cols="12">
              <label for="">Resultado 4</label>
              <v-text-field
                v-model="dataR4"
                :disabled="bol4 != null"
                @click.native="bol4 = null"
                label="Resultado 4"
                filled
                :append-icon="'mdi-close'"
                @click:append="dataR4 = null"
              ></v-text-field>
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    @click="bol4 = 0"
                    :light="bol4 != 0"
                    light
                    color="error"
                    :outlined="bol4 != 0"
                    block
                    dense
                    small
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="bol4 = 1"
                    :light="bol4 != 1"
                    color="warning"
                    :outlined="bol4 != 1"
                    block
                    dense
                    small
                    >-</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col class="border_re" md="2" cols="12">
              <label for="">Resultado 5</label>
              <v-text-field
                v-model="dataR5"
                :disabled="bol5 != null"
                @click.native="bol5 = null"
                label="Resultado 5"
                filled
                :append-icon="'mdi-close'"
                @click:append="dataR5 = null"
              ></v-text-field>
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    @click="bol5 = 0"
                    :light="bol5 != 0"
                    light
                    color="error"
                    :outlined="bol5 != 0"
                    block
                    dense
                    small
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="bol5 = 1"
                    :light="bol5 != 1"
                    color="warning"
                    :outlined="bol5 != 1"
                    block
                    dense
                    small
                    >-</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col class="border_re" md="2" cols="12">
              <label for="">Resultado 6</label>
              <v-text-field
                v-model="dataR6"
                :disabled="bol6 != null"
                @click.native="bol6 = null"
                label="Resultado 6"
                filled
                :append-icon="'mdi-close'"
                @click:append="dataR6 = null"
              ></v-text-field>
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    @click="bol6 = 0"
                    :light="bol6 != 0"
                    light
                    color="error"
                    :outlined="bol6 != 0"
                    block
                    dense
                    small
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="bol6 = 1"
                    :light="bol6 != 1"
                    color="warning"
                    :outlined="bol6 != 1"
                    block
                    dense
                    small
                    >-</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col
              v-if="$route.params.idTest == 869 || $route.params.idTest == 870"
              md="2"
              cols="12"
            >
              <v-text-field
                v-model="dataV1"
                label="Viento 1"
                filled
              ></v-text-field>
            </v-col>
            <v-col
              v-if="$route.params.idTest == 869 || $route.params.idTest == 870"
              md="2"
              cols="12"
            >
              <v-text-field
                v-model="dataV2"
                label="Viento 2"
                filled
              ></v-text-field>
            </v-col>
            <v-col
              v-if="$route.params.idTest == 869 || $route.params.idTest == 870"
              md="2"
              cols="12"
            >
              <v-text-field
                v-model="dataV3"
                label="Viento 3"
                filled
              ></v-text-field>
            </v-col>
            <v-col
              v-if="$route.params.idTest == 869 || $route.params.idTest == 870"
              md="2"
              cols="12"
            >
              <v-text-field
                v-model="dataV4"
                label="Viento 4"
                filled
              ></v-text-field>
            </v-col>
            <v-col
              v-if="$route.params.idTest == 869 || $route.params.idTest == 870"
              md="2"
              cols="12"
            >
              <v-text-field
                v-model="dataV5"
                label="Viento 5"
                filled
              ></v-text-field>
            </v-col>
            <v-col
              v-if="$route.params.idTest == 869 || $route.params.idTest == 870"
              md="2"
              cols="12"
            >
              <v-text-field
                v-model="dataV6"
                label="Viento 6"
                filled
              ></v-text-field>
            </v-col>

            <v-col md="12">
              <v-btn x-large block @click="setResultCamp()" color="success"
                >GUARDAR RESULTADO</v-btn
              >
            </v-col>
          </v-row>
          <v-row dense v-if="onDevice">
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataR1"
                label="Resultado 1"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataV1"
                label="Viento 1"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataR2"
                label="Resultado 2"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataV2"
                label="Viento 2"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataR3"
                label="Resultado 3"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataV3"
                label="Viento 3"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataR4"
                label="Resultado 4"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataV4"
                label="Viento 4"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataR5"
                label="Resultado 5"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataV5"
                label="Viento 5"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataR6"
                label="Resultado 6"
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model="dataV6"
                label="Viento 6"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn
                x-large
                block
                @click="dialogResultCamp = false"
                color="error"
                >CANCELAR</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn x-large block @click="setResultCamp()" color="success"
                >GUARDAR</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      dark
      v-model="dialogRM2"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="__card_main">
        <v-card-title>
          Resultados de {{ nameM2 }} <br />Medida: {{ sizeM2 }}
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="3">Intento 1</v-col>
            <v-col cols="9">
              <v-row dense>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(1, RM2, RM3)"
                    block
                    :color="RM1 == 1 ? 'success' : 'white'"
                    :light="RM1 != 1"
                    >O</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(2, RM2, RM3)"
                    block
                    :color="RM1 == 2 ? 'warning' : 'white'"
                    :light="RM1 != 2"
                    ><b>-</b></v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(0, RM2, RM3)"
                    block
                    :color="RM1 == 0 ? 'error' : 'white'"
                    :light="RM1 != 0"
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(null, RM2, RM3)"
                    block
                    :color="RM1 == null ? 'success' : 'white'"
                    :light="RM1 != null"
                    >VACIO</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">Intento 2</v-col>
            <v-col cols="9">
              <v-row dense>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, 1, RM3)"
                    block
                    :color="RM2 == 1 ? 'success' : 'white'"
                    :light="RM2 != 1"
                    >O</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, 2, RM3)"
                    block
                    :color="RM2 == 2 ? 'warning' : 'white'"
                    :light="RM2 != 2"
                    ><b>-</b></v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, 0, RM3)"
                    block
                    :color="RM2 == 0 ? 'error' : 'white'"
                    :light="RM2 != 0"
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    block
                    @click="_setRM2(RM1, null, RM3)"
                    :color="RM2 == null ? 'success' : 'white'"
                    :light="RM2 != null"
                    >VACIO</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">Intento 3</v-col>
            <v-col cols="9">
              <v-row dense>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, RM2, 1)"
                    block
                    :color="RM3 == 1 ? 'success' : 'white'"
                    :light="RM3 != 1"
                    >O</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, RM2, 2)"
                    block
                    :color="RM3 == 2 ? 'warning' : 'white'"
                    :light="RM3 != 2"
                    ><b>-</b></v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, RM2, 0)"
                    block
                    :color="RM3 == 0 ? 'error' : 'white'"
                    :light="RM3 != 0"
                    >X</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn
                    @click="_setRM2(RM1, RM2, null)"
                    block
                    :color="RM3 == null ? 'success' : 'white'"
                    :light="RM3 != null"
                    >VACIO</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogRM2 = false" outlined color="error"
            >CERRAR</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogMedida"
      scrollable
      persistent
      :overlay="false"
      max-width="200"
      transition="dialog-transition"
    >
      <v-card class="__card_main" dark>
        <v-card-title dark> Insertar Medida </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="size"
            filled
            type="number"
            min="0"
            step="0.01"
          ></v-text-field>
          <v-btn block color="success" @click="_setSize()">AGREGAR</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="dialogMedida = false" color="error"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "uploadFile",
  data() {
    return {
      dialogResultCamp: false,
      dialogMedida: false,
      dialogRM2: false,
      itemsData: [],
      files: [],
      content: "",
      file: [],
      idSelected: null,
      dataR1: null,
      dataR2: null,
      dataR3: null,
      dataR4: null,
      dataR5: null,
      dataR6: null,
      dataV1: null,
      dataV2: null,
      dataV3: null,
      dataV4: null,
      dataV5: null,
      dataV6: null,
      bol1: null,
      bol2: null,
      bol3: null,
      bol4: null,
      bol5: null,
      bol6: null,

      idM2: null,

      nameM2: "",
      sizeM2: "",

      RM1: null,
      RM2: null,
      RM3: null,

      size: null,

      onDevice: false,

      itemsResults: [],
      itemsResultsM2: [],
      itemsResultsSize: [],
      wind: null,
      name: null,
      group: null,
      headersResultsCamp: [],
      headersResults: [
        { text: "Puesto", value: "camp1" },
        { text: "Dorsal", value: "camp2" },
        { text: "Carril", value: "camp3" },
        { text: "Nombre", value: "camp4" },
        { text: "Apellido", value: "camp5" },
        { text: "Grupo", value: "camp6" },
        { text: "Tiempo", value: "camp7" },
        { text: "Diferencia", value: "camp9" },
      ],
      headersResultsJuez: [
        { text: "Participante", value: "camp5" },
        { text: "Grupo", value: "camp6" },
        { text: "Resultado N° 1", value: "result1" },
        { text: "Resultado N° 2", value: "result2" },
        { text: "Resultado N° 3", value: "result3" },
        { text: "Resultado N° 4", value: "result4" },
        { text: "Resultado N° 5", value: "result5" },
        { text: "Resultado N° 6", value: "result6" },
        { text: "Parcial", value: "parcial" },
      ],
    };
  },
  mounted() {
    this._getResults();
    this._getResultsM2();
    this._getResultsSize();
    this.modoDevice();
  },

  methods: {
    close() {
      this.$store.state.__modal_test_upload_file = false;
      this.itemsResults = [];
    },
    openM2(item, child) {
      this.idM2 = child.id;
      this.nameM2 = item.name;
      this.sizeM2 = child.size;
      this.RM1 = child.res[0].r1;
      this.RM2 = child.res[0].r2;
      this.RM3 = child.res[0].r3;
      this.dialogRM2 = true;
    },
    addName() {
      this.itemsResults.push({
        camp5: this.name,
        camp6: this.group,
      });
    },
    modoDevice() {
      if (screen.width < 800) {
        this.onDevice = true;
      } else {
        this.onDevice = false;
      }
    },
    _selectItem(item) {
      this.itemsData = item;
      this.idSelected = item.id;
      this.dataR1 = item.result1;
      this.dataR2 = item.result2;
      this.dataR3 = item.result3;
      this.dataR4 = item.result4;
      this.dataR5 = item.result5;
      this.dataR6 = item.result6;
      this.dataV1 = item.viento1;
      this.dataV2 = item.viento2;
      this.dataV3 = item.viento3;
      this.dataV4 = item.viento4;
      this.dataV5 = item.viento5;
      this.dataV6 = item.viento6;
      this.bol1 = item.bol1;
      this.bol2 = item.bol2;
      this.bol3 = item.bol3;
      this.bol4 = item.bol4;
      this.bol5 = item.bol5;
      this.bol6 = item.bol6;
      this.dialogResultCamp = true;
    },
    _getResults() {
      let vm = this;

      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE +
          "results/list/" +
          vm.$store.state.idSerieSelected,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsResults = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getResultsM2() {
      let vm = this;

      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE +
          "results/list/m2/" +
          vm.$store.state.idSerieSelected,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsResultsM2 = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getResultsSize() {
      let vm = this;

      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE +
          "results/getsizeresults/" +
          vm.$store.state.idSerieSelected,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsResultsSize = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _setRM2(r1, r2, r3) {
      let vm = this;
      var data = JSON.stringify({
        r1: r1,
        r2: r2,
        r3: r3,
      });

      vm.RM1 = r1;
      vm.RM2 = r2;
      vm.RM3 = r3;

      var config = {
        method: "put",
        url: process.env.VUE_APP_URLBASE + "results/update/m2/" + vm.idM2,
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
              title: "Resultados registrados",
              showConfirmButton: false,
              timer: 1500,
            });
            vm.dialogMedida = false;
            vm._getResultsSize();
            vm._getResults();
            vm._getResultsM2();
            vm.itemsResults = [];
            vm.files = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _setSize() {
      let vm = this;
      var data = JSON.stringify({
        id_serie: vm.$store.state.idSerieSelected,
        size: vm.size,
        itemsResults: vm.itemsResults,
        status: 1,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_URLBASE + "results/size/save",
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
              title: "Resultados registrados",
              showConfirmButton: false,
              timer: 1500,
            });
            vm.dialogMedida = false;
            vm._getResultsSize();
            vm._getResults();
            vm._getResultsM2();
            vm.itemsResults = [];
            vm.files = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _setResults() {
      let vm = this;
      var data = JSON.stringify({
        id_serie: vm.$store.state.idSerieSelected,
        wind: vm.wind,
        itemsResults: vm.itemsResults,
        status: 1,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_URLBASE + "results/save",
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
              title: "Resultados registrados",
              showConfirmButton: false,
              timer: 1500,
            });
            vm.$store.state.__modal_test_upload_file = false;
            vm.itemsResults = [];
            vm.files = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setResultCamp() {
      let vm = this;
      var data = JSON.stringify({
        result1: vm.dataR1,
        result2: vm.dataR2,
        result3: vm.dataR3,
        result4: vm.dataR4,
        result5: vm.dataR5,
        result6: vm.dataR6,
        bol1: vm.bol1,
        bol2: vm.bol2,
        bol3: vm.bol3,
        bol4: vm.bol4,
        bol5: vm.bol5,
        bol6: vm.bol6,
        viento1: vm.dataV1,
        viento2: vm.dataV2,
        viento3: vm.dataV3,
        viento4: vm.dataV4,
        viento5: vm.dataV5,
        viento6: vm.dataV6,
      });

      var config = {
        method: "put",
        url: process.env.VUE_APP_URLBASE + "results/update/" + vm.idSelected,
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
              title: "Resultados registrados",
              showConfirmButton: false,
              timer: 1500,
            });
            vm._getResults();
            vm.dialogResultCamp = false;
            vm.files = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _delResults() {
      let vm = this;

      var config = {
        method: "delete",
        url:
          process.env.VUE_APP_URLBASE +
          "results/delete/" +
          vm.$store.state.idSerieSelected,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function (response) {
          if (response.data.statusBol == true) {
            vm.$swal({
              position: "top-end",
              icon: "success",
              title: "Resultados borrados",
              showConfirmButton: false,
              timer: 1500,
            });

            vm.itemsResults = [];
            vm.files = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadFile() {
      if (this.$route.params.idTypeTest == 1) {
        this.itemsResults = [];
        let reader = new FileReader();

        reader.readAsText(this.files, "ISO-8859-1");
        reader.onload = () => {
          this.content = reader.result.split(/\r\n|\n/);
          let dataOne = this.content[0].split(",");
          this.wind = dataOne[4];
          for (var line = 1; line < this.content.length - 1; line++) {
            let results = this.content[line].split(",");
            this.itemsResults.push({
              camp1: results[0],
              camp2: results[1],
              camp3: results[2],
              camp4: results[3],
              camp5: results[4],
              camp6: results[5],
              camp7: results[6],
              camp8: results[7],
              camp9: results[8],
              camp10: results[9],
              camp11: results[10],
              camp12: results[11],
              camp13: results[12],
              camp14: results[13],
              camp15: results[14],
              camp16: results[15],
              camp17: results[16],
              camp18: results[17],
              camp19: results[18],
            });
          }
          //console.table(this.itemsResults);
        };
      } else if (this.$route.params.idTypeTest == 4) {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.__card_main {
  background-color: #15182f !important;
}
.__data_table_main {
  background-color: #15182f !important;
  border-radius: 15px;
}

.__card_medida {
  background-color: #080b1f;
  padding: 10px;
  width: 60px;
  height: 40px;
  text-align: center;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
}

.__btnM2 {
  background-color: #080b1f;
  padding: 10px;
  width: 70px;
  height: 65px;
  text-align: center;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  text-decoration: none;
  color: white;
}

.border_re {
  border: solid 1px white;
  border-radius: 5px;
}
</style>
