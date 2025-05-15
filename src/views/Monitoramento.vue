<template>
  <v-app class="app">
    <v-container class="menu">
      <div class="titulo">
        <div class="titulomon">
          <span class="monitoramento">Monitoramento</span>
        </div>
        <div class="tituloimg">
          <img src="../assets/logo-tgmob.png" alt="">
        </div>
      </div>
    </v-container>
    <v-main>
      <div class="main">
        <div class="maindados">
          <div class="cod-data">
            <div class="codigo">
              <div class="imgcodigo"><img src="../assets/codigo.png" alt=""></div>
              <div class="codigoselect">
                <span class="codigotitulo">Cód Cliente</span>
                <v-select
                  :loading="loadingTg"
                  v-model="codigoTgSelecionado"
                  :items="codigosTg"
                  density="compact"
                  clearable
                  item-title="name"
                  variant="outlined"
                  attach
                  :search="search"
                  menu-icon="none"
                  hide-details
                  placeholder="Filtrar códigos"
                  show-size
                  class="select"
                  no-data-text="Não há dados disponíveis"
                  :menu-props="{location: 'bottom', maxHeight: 300, maxWidth: 250 }"
                  :append-inner-icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @update:menu="onMenuUpdate"
                >
                  <template v-slot:prepend-item>
                    <v-text-field
                      :search
                      label="Pesquisar"
                      density="compact"
                      hide-details
                      single-line
                      variant="solo"
                      class="mx-2 mt-2"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon start>mdi-magnify</v-icon>
                      </template>
                    </v-text-field>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                  <template #item="{ props, item }">
                    <v-list-item v-bind="props">
                      <template #prepend>
                        <v-icon>{{codigoTgSelecionado == item.raw ? 'mdi-square' : 'mdi-square-outline'}}</v-icon> <!-- same icon for all items -->
                      </template>
                      <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-select>

              </div>
            </div>
            <div class="data">
              <div class="imgcalendario"><img src="../assets/983161df263966517dc3281cc57a618247e2c744.png" alt=""></div>
              <div class="dataselect">

                <span class="codigotitulo">Datas
<!--                  <v-icon @click="toggleSort">{{sortAscending ? 'mdi-menu-up' : 'mdi-menu-down'}}-->
<!--                  </v-icon>-->
                </span>
                <v-select
                  :loading="loadingDatas"
                  :items="sortedDates()"
                  density="compact"
                  variant="outlined"
                  clearable
                  attach
                  hide-details
                  placeholder="Filtrar datas"
                  show-size
                  item-title=""
                  menu-icon="none"
                  item-value=""
                  :menu-props="{ location: 'bottom', maxHeight: 300, maxWidth: 250 }"
                  :append-inner-icon="isOpenData ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @update:menu="onMenuUpdateData"
                  v-model="novaData"
                >
                  <template v-slot:prepend-item>
                    <v-text-field
                      v-model="search"
                      label="Pesquisar"
                      density="compact"
                      hide-details
                      single-line
                      variant="solo"
                      class="mx-2 mt-2"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon start>mdi-magnify</v-icon>
                      </template>
                    </v-text-field>
                    <v-divider class="mt-2"></v-divider>
                  </template>

                  <template #item="{ props, item }">
                    <v-list-item v-bind="props">
                      <template #prepend>
                        <v-icon>{{ novaData === item.raw ? 'mdi-square' : 'mdi-square-outline' }}</v-icon>
                      </template>
                      <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-select>

              </div>
            </div>
          </div>
          <div class="dadosempresa">
            <div class="coluna-esquerda">
              <div class="item-coluna">Empresa</div>
              <div class="item-coluna">Cliente</div>
              <div class="item-coluna">Consultor</div>
              <div class="item-coluna">Evento</div>
            </div>
            <div class="coluna-direita">
              <div class="textos clientetext"> {{apidothiago.resumoCliente?.empresa}} </div>
              <div class="textos clientetext">{{apidothiago.resumoCliente?.cliente}}</div>
              <div class="textos clientetext">{{apidothiago.resumoCliente?.consultor}}</div>
              <div class="textos clientetext">{{apidothiago.resumoCliente?.evento}}</div>
            </div>
          </div>
        </div>
        <div class="tabela">
          <v-data-table class="tabelavuetify"
                        :loading="loading"
                        loading-text="Não há dados disponíveis"
                        hover
                        fixed-header
                        :search="searchTable"
                        :items="apidothiago.viagens"
                        :headers="headers"
                        disable-sort
                        :items-per-page-text="'Itens por página'"
                        :items-per-page-options="[
            {value: 10, title: '10'},
            {value: 25, title: '25'},
            {value: 50, title: '50'},
            {value: 100, title: '100'},
            {value: -1, title: 'Todos'}
          ]"
                        :header-props="{
          style: {
            backgroundColor: '#FF6600',
             color: '#FFFFFF',
            fontWeight: 'bold',

          }
        }"
          >

          </v-data-table>

        </div>
      </div>

    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import {shallowRef, ref, computed, onBeforeMount, watch, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import DadosCliente from '@/services/monitorarcliente.ts';
import GetCodigoCliente from "@/services/codigoscliente.ts";
import GetDataCliente from "@/services/datascliente.ts";
const route = useRoute()
const loadingDatas = ref(false)
const loadingTg = ref(false)
const dataBoolean = ref(true)
const datas = ref([])
const isOpen = ref(false)
const isOpenData = ref(false)
const search = ref('')
const loading = ref(false)
const codigoTgSelecionado = ref(null)
const codigosTg = ref([])
const searchTable = ref('')
const novaData = ref(null)
const headers = [
  {title: "Serviço", key: "tg", width: "120px"},
  {title: "Data", key: "data", width: "100px"},
  {title: "Horário", key: "horario", width: "75px"},
  {title: "Origem", key: "origem", width: "150px"},
  {title: "Destino", key: "destino", width: "180px"},
  {title: "Veículo", key: "veiculo", width: "170px"},
  {title: "Motorista", key: "motorista", width: "160px"}, // Largo o suficiente para "em atendimento"
  {title: "Telefone", key: "telefone", sortable: false, width: "120px"},
  {title: "Passageiro", key: "passageiro", sortable: false, width: "160px"},
  {title: "Status", key: "status", sortable: false, width: "150px"},
]
const codigoCliente = ref(route.params.id)
const apidothiago = ref([])
const isAllSelected = computed(() => {
  return codigosTg.value.length === codigosTg.value.length
})

const onMenuUpdate = (value: boolean) => {
  isOpen.value = value
}
const onMenuUpdateData = (value: boolean) => {
  isOpenData.value = value
}


const sortAscending = ref(true);

onMounted(() => {
  GetDatasCliente()
  getDadosCliente()
  GetCodigosTg()
  console.log(codigoCliente.value)
})

watch([codigoTgSelecionado, novaData], () => {
  getDadosCliente()
})
function sortedDates() {
  const dates = datas.value
  return dates.sort((a, b) => {
    const dateA = a
    const dateB = b
    return sortAscending.value
      ? dateB.localeCompare(dateA)
      : dateA.localeCompare(dateB)
  })
}

function toggleSort() {
  sortAscending.value = !sortAscending.value
}
async function getDadosCliente(){
  apidothiago.value = []
  loading.value = true
  try {
    const response = await DadosCliente(codigoCliente.value, codigoTgSelecionado.value, novaData.value)
    apidothiago.value = response.dados || []
  console.log('apithiagao', apidothiago.value.viagens)
  } catch (error) {
    console.error('Erro ao carregar itens:', error)
  } finally {
    loading.value = false
  }

}

async function GetCodigosTg(){
  loadingTg.value = true
  try {
    const response = await GetCodigoCliente(codigoCliente.value)
    codigosTg.value = response.dados || []

  } catch (error) {
    console.error('Erro ao carregar itens:', error)
  } finally {
    loadingTg.value = false
  }
}
async function GetDatasCliente() {
  loadingDatas.value = true
  try {
    const response = await GetDataCliente(codigoCliente.value)
    datas.value = response.dados || []

  } catch (error) {
    console.error('Erro ao carregar itens:', error)
  } finally {
    loadingDatas.value = false
  }
}
</script>
<style scoped>
::v-deep(.v-data-table-footer){
  max-height: 9dvh !important;
  overflow: hidden !important;
}
.app{
  min-height: 100dvh;
  font-family: Poppins, 'sans-serif';
  display: flex;
  flex-direction: column;
  background-color: #FF6600;
  top: 0;
  margin: 0;
  font-weight: normal;
}
.menu{
  top: 0;
  display: grid;
  padding: 6px;
  height: 13dvh;
  place-items: center;
  justify-content: center;
}
.tituloimg{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.tituloimg img{
  height: 8dvh;
}
@font-face{
  font-family: 'Poppins';
  src: url(../assets/Poppins,Smooch_Sans/Poppins/Poppins-Regular.ttf);
}
.titulo{
  margin-left: 0;
  width: 97dvw;
  height: 13dvh;
  border-radius: 30px;
  display: flex;
  font-size: 3rem;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  top: 0;
  padding: 2rem;
  color: #FF6600;
  background-color: white;
}
.monitoramento{
  font-size: 6dvh;
}
.titulomon{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}
.main{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 97dvw;
  border-radius: 30px;
  margin-top: 2.5dvh;
  background-color: #f2f2f2;
  height: 83dvh;
}
.maindados{
  width: 94dvw;
  position: relative;
  height: 43.5%;
  margin-top: 8px;
  border-radius: 30px;
}
.lista{
  margin: 0;
  padding: 0;
}
.cod-data{
  width: 26%;
  position: absolute;
  bottom: 0;
  height: 95%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.v-select {
  width: 14dvw;
}
.dataselect{
  display: flex;
  width: 60%;
  max-height: 80%;
  margin-bottom: 4dvh;
  flex-direction: column;
  margin-left: 2.5dvw
}
.listitem:hover{
  background-color: #f5f5f5 !important;

}
.v-field__input{
  color: #FF6600 !important;
  border: none !important;
}
:deep(.v-field__input) {
  align-items: center;
  text-align: left;
}
:deep(.v-field__input) {
  color: #FF6600;
  border: none;
}
:deep(.vmain .v-data-table){
  height: 100%;
  border-radius: 30px;
}
:deep(.v-table){
  height: 100%;
  border-radius: 30px;
}
:deep(.v-table__wrapper){
  height: 100%;
  border-radius: 20px;
}
:deep(.v-data-table-header__content span){
  font-size: 1rem;
  color: white;
  font-weight: bolder !important;
}
:deep(.v-data-table-footer){
  background-color: #ff6600 !important;
  border-radius: 0 0 30px 30px;
}
.codigo{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 46%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) ;
}
.codigoicon{
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
  display: block !important;
  width: 100% !important;
  align-items: flex-start !important;
  text-align: center !important;
  margin-left: -0.8dvh !important;
}
.imgcodigo img{
  margin-left: 1dvw;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.codigotitulo{
  font-size: 0.9dvw;
  font-family: 'Arial', 'sans-serif';
  font-weight: 700;
  display: block !important;
  gap: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  text-align: left !important;


}
.btndata{
  display: flex !important;
  width: 100%;
  justify-content: center;
  text-align: left !important;
  text-transform: capitalize !important;
  align-items: flex-start !important;
  flex-direction: column !important;
  height: min-content !important;
  border-radius: 0 !important;
  font-size: 1.2rem;
  gap: 0 !important; /* Reduzido de 4px para 0px */
  margin-bottom: 0 !important;
  font-family: 'Arial', 'sans-serif';
  letter-spacing: 0.01rem !important;
  font-weight: 700;
}
.btndata:hover {
  background-color: #f5f5f5 !important;
}
.select{
  font-size: 2px;
}
.codigoselect{
  margin-left: 2.5dvw;
  margin-bottom: 4dvh ;
  display: flex;
  flex-direction: column;
  align-items: start;
  height: min-content;
  text-align: left !important;
}
.data{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 46%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) ;
}
.imgcalendario img{
  margin-left: 1dvw;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dadosempresa {
  background-color: white;
  width: 72%;
  height: 100%;
  border-radius: 30px;
  position: absolute;
  right: 0;
  padding: 3dvh;
  font-family: 'Poppins', 'sans-serif';
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) ;
}

.coluna-esquerda, .coluna-direita {
  display: flex;
  flex-direction: column;
  gap: 0.7rem; /* Espaçamento ajustado para alinhar com as divs */
  padding-top: 0.2rem; /* Ajuste fino do alinhamento vertical */
}

.coluna-esquerda {
  width: 13%; /* Reduzido para dar mais espaço às divs */
}

.coluna-direita {
  width: 86%;
}

.item-coluna {
  height: 8dvh;
  display: flex;
  align-items: center;
  font-size: 1.2rem; /* Tamanho ajustado para combinar com o design original */
}

.textos.clientetext {
  font-size: 1.2rem;
  font-family: 'Arial', 'sans-serif';
  font-weight: 700;
  border-radius: 30px;
  justify-content: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) ;
  height: 8dvh;
  background-color: white;
  display: flex !important;
  align-items: center;
  padding: 0 1rem !important;
  margin: 0 !important;
  width: 100% !important;

}
.tabela{
  background-color: white;
  height: 59%;
  width: 94dvw;
  border-radius: 30px;
  font-family: 'Arial', 'sans-serif';
  margin-top: 0.6rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) ;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.tabelavuetify{
  height: 100%;
  border-radius: 0;
}
</style>
