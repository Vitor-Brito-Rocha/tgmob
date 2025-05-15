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
                  v-model="selectedItems"
                  :items="apidothiago"
                  density="compact"
                  item-title="name"
                  variant="outlined"
                  attach
                  :search="search"
                  menu-icon="none"
                  hide-details
                  placeholder="Filtrar códigos"
                  multiple
                  chips
                  closable-chips
                  show-size
                  counter
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

                    <v-list-item
                      density="compact"
                      class="mt-2"
                      @click="toggleSelectAll"
                    >
                      <template v-slot:prepend>
                        <v-checkbox-btn true-icon="mdi-square"
                                        v-model="isAllSelected"
                        ></v-checkbox-btn>
                      </template>
                      <v-list-item-title>
                        {{ isAllSelected ? 'Desmarcar todos' : 'Selecionar todos' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>

              </div>
            </div>
            <div class="data">
              <div class="imgcalendario"><img src="../assets/983161df263966517dc3281cc57a618247e2c744.png" alt=""></div>
              <div class="dataselect">

                  <v-btn
                    variant="text"
                    @click="toggleSort"
                    class="btndata"
                  >
                    <span class="codigotitulo">Data</span> &nbsp;
                    <v-icon class="codigoicon">
                      {{ sortAscending ? 'mdi-menu-up' : 'mdi-menu-down' }}
                    </v-icon>
                  </v-btn>

                  <v-divider class="opacity-90 ma-0" color="cyan" ></v-divider>
                <v-list density="compact" v-model:selected="novaData" tile slim
                lines="one" class="lista" @update:selected="dataSelecionada" >
                  <v-list-item
                    v-for="item in sortedDates()"
                    :key="item.text"
                    :value="item"
                    color="gray"
                    density="compact"
                    class="listitem"
                  >
                    <v-list-item-title  v-text="item.text"></v-list-item-title>
                  </v-list-item>
                </v-list>
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
    <div class="textos clientetext"> {{novaData[0]?.text}} </div>
    <div class="textos clientetext"></div>
    <div class="textos clientetext"></div>
    <div class="textos clientetext"></div>
  </div>
</div>
        </div>
        <div class="tabela">
          <v-data-table class="tabelavuetify"
                        :loading="loading"
                        hover
                        fixed-header
                        :search="searchTable"
                        :items="apidothiago"
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
import { shallowRef, ref, computed } from 'vue'
const selectedItems = ref([])
const isOpen = ref(false)
const search = ref('')
const loading = ref(false)
const searchTable = ref('')
const novaData = shallowRef([])
const dataFormatada = ref('')
const headers = [
  {title: "Serviço", key: "servico", width: "140px"},
  {title: "Data", key: "data", width: "140px"},
  {title: "Horário", key: "horario", width: "180px"},
  {title: "Origem", key: "origem", width: "150px"},
  {title: "Destino", key: "destino", width: "180px"},
  {title: "Veículo", key: "veiuclo", width: "180px"},
  {title: "Motorista", key: "name", width: "180px"}, // Largo o suficiente para "em atendimento"
  {title: "Telefone", key: "telefone", sortable: false, width: "150px"},
  {title: "Passageiro", key: "passageiro", sortable: false, width: "160px"},
  {title: "Status", key: "id", sortable: false, width: "150px"},
]
const apidothiago = ref([
  {
  name: 'comoéamigo',
    id: '12',
    data: '2021-09-01',
  },
  {
    name: 'o johnson',
    id: '2',
    data: '2021-09-21',
  }])
const isAllSelected = computed(() => {
  return selectedItems.value.length === apidothiago.value.length
})

const onMenuUpdate = (value: boolean) => {
  isOpen.value = value
}

const toggleSelectAll = () => {
  selectedItems.value = isAllSelected.value ? [] : apidothiago.value
}

const sortAscending = ref(true)

function sortedDates() {
  const dates = dataFormatted()
  return dates.sort((a, b) => {
    const dateA = a.text.split('/').reverse().join('-')
    const dateB = b.text.split('/').reverse().join('-')
    return sortAscending.value
      ? dateB.localeCompare(dateA)
      : dateA.localeCompare(dateB)
  })
}

function toggleSort() {
  sortAscending.value = !sortAscending.value
}

function dataSelecionada() {
  if (novaData.value.length > 0 && novaData.value[0].text) {
    dataFormatada.value = novaData.value[0].text.split('/').reverse().join('-')
    console.log('Data formatada:', dataFormatada.value)
  } else {
    dataFormatada.value = ''
  }
}
function dataFormatted() {
  if (!apidothiago.value?.length) {
    return []
  }


  return apidothiago.value.map(item => ({
    text: item.data ? item.data.split('-').reverse().join('/') : ''
  }))
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
  height: 80%;
  max-height: 80%;
flex-direction: column;
margin-left: 2.5dvw
}
.listitem:hover{
  background-color: #f5f5f5 !important;

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
