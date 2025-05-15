<template>
  <v-app class="app">
    <v-container class="nav">
      <div class="menu">
        <div class="pesquisa">
      <v-text-field hide-details  density="default" rounded v-model="searchTable" @keydown.enter="buscar()" @click:append="buscar()"  variant="outlined">
        <template v-slot:label>
          {{ textoPesquisa }}
        </template>
          <template v-slot:append-inner>
            <v-fab-transition>
              <div v-if="searchTable.trim().length > 0" class="clear">
                <v-btn size="small" @click="limparPesquisa" icon color="#ffffff">
                  <v-icon icon="mdi-close" color="#ff6600" />
                </v-btn>
              </div>
            </v-fab-transition>
          </template>
        <template v-slot:prepend>
          <div class="filtros">
            <v-autocomplete rounded class="autocomplete" color="#ff6600" v-model="selectedFiltro" bg-color="#ffffff"  hide-details variant="outlined" density="compact" item-title="title" item-value="id" :items="filtro"></v-autocomplete>
          </div>
        </template>
        <template v-slot:append>
        <v-btn icon color="#ffffff" @click="buscar()">
          <v-icon color="#ff6600" icon="mdi-magnify"></v-icon>
        </v-btn>
        </template>
      </v-text-field>
        </div>
        <div class="imagem">
        <img src="../assets/logo-white-2.png" alt="">
        </div>
        </div>
    </v-container>
    <v-container class="main">
    <v-main class="vmain">
      <v-data-table-server
        class="tabelavuetify"
        loading-text="Carregando itens..."
        items-per-page-text="Itens por página"
        v-model:page="page"
        v-model:itemsPerPage="itemsPerPage"
        :items-length="totalItems"
        :loading="loading"
        hover
        :items="apidothiago"
        :headers="headers"
        disable-sort
        fixed-header
        no-data-text="Não há dados disponíveis"
        :items-per-page-options="ItensPorPagina"
        @update:page="loadFiltro"
        :header-props="{
    style: {
      backgroundColor: '#FF6600',
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  }"
      >
        <template #item.actions="{ item }">
          <router-link :to="`/monitoramento/${item.idCliente}`">
            <v-btn class="btn-tabela" @click="abrirEvento(item)" color="#ff6600">
              {{btnText}}
            </v-btn>
          </router-link>
        </template>
      </v-data-table-server>
    </v-main>
    </v-container>
  </v-app>
</template>
<script setup lang="ts">
import { onMounted, ref, watch} from 'vue'
import ListarEvento from "@/services/listagemeventos.ts";
import FiltrarListaEvento from "@/services/filtragemeventos.ts"
const page = ref(1)
const totalItems = ref(0)
const itemsPerPage = ref(10)
const ItensPorPagina = ref([
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: 250000, title: 'Todos'}
])
const loading = ref(false)
const searchTable = ref('')

const headers = [
  {title: "TG Código", key: "tg", width: "90px"},
  {title: "Nome do evento", key: "evento", width: "200px"},
  {title: "Data", key: "dataEvento", width: "50px"},
  {title: "Ações", key: "actions", sortable: false, width: "40px"},
]

const selectedFiltro = ref(0)
const filtro = ref([
  {title: "TG-Cód", id: 0},
  {title: "Nome do evento", id: 1},
  {title: "Data", id: 2},
])
const textoPesquisa = ref('Pesquisar por Código TG')
const btnText = ref('Acessar')
const apidothiago = ref([])

// Watcher para mudanças na paginação
watch([page, itemsPerPage], () => {
  loadItems()
})
function buscar(){
  loadFiltro()
}
async function loadItems() {
  loading.value = true
  try {
    const response = await ListarEvento(page.value, itemsPerPage.value)
    apidothiago.value = response.dados || []

    totalItems.value = response.total_items || 0
console.log('items por pagina', itemsPerPage.value)
  console.log('paginas', page.value)
    // Se sua API não retorna o total, você pode usar um valor fixo
    // (solução temporária até ajustar o backend)
    // totalItems.value = 1000 // Exemplo com valor fixo
  } catch (error) {
    console.error('Erro ao carregar itens:', error)
    apidothiago.value = []
  } finally {
    loading.value = false
  }
}
async function loadFiltro() {
  loading.value = true
  if(searchTable.value.trim().length <= 0) {
    await loadItems()
    return
  } else {
  try {
    const response = await FiltrarListaEvento(page.value, itemsPerPage.value, selectedFiltro.value, searchTable.value)
    apidothiago.value = response.dados || []

    totalItems.value = response.total_items || 0
    console.log('items por pagina', itemsPerPage.value)
    console.log('paginas', page.value)
    // Se sua API não retorna o total, você pode usar um valor fixo
    // (solução temporária até ajustar o backend)
    // totalItems.value = 1000 // Exemplo com valor fixo
  } catch (error) {
    console.error('Erro ao carregar itens:', error)
    apidothiago.value = []
  } finally {
    loading.value = false
  }}
}
onMounted(async () => {
  await loadItems()
})

function limparPesquisa() {
  if(searchTable.value.trim().length > 0) {
    searchTable.value = ''
  }
  loadItems()
}

function abrirEvento(item) {
  console.log(item)
}
</script>
<style scoped>
@font-face{
  font-family: 'Poppins';
  src: url(../assets/Poppins,Smooch_Sans/Poppins/Poppins-Regular.ttf);
}
.app{
  min-height: 100dvh;
  min-width: 100dvw;
  font-family: 'Poppins', 'sans-serif';
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  top: 0;
  justify-content: center;
  margin: 0;
  font-weight: normal;
}
.nav{
  top: 0;
  display: flex;
  padding: 3px;
  width: 100dvw;
  height: 13dvh;
  place-items: center;
  align-items: center;
  justify-content: center;
}
.menu{
  margin-left: 0;
  margin-top: 1rem;
  width: 100dvw;
  height: 12dvh;
  border-radius: 30px;
  display: flex;
  font-size: 3rem;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 0;
  place-items: center;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  padding: 1.5rem;
  color: white;
  background-color: #FF6600;
}
.imagem{
  width: 10%;
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  align-items: center;
  justify-content: right;
}
.imagem img{
  width: 11.2dvw;
  height: 6.4dvh;
}
.pesquisa{
  width: 54%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.filtros{
  display: flex;
  max-width: 9dvw;
  width: 9dvw;
  background-color: #FF6600;
align-items: center;
place-items: center;
justify-content: center;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
}
.autocomplete{
  background-color: #FF6600 !important;
}
.autocomplete .v-field__input{
  color: #FF6600 !important;
  border: none !important;
}
:deep(.pesquisa .v-field__input) {
  align-items: center;
  text-align: left;
}
:deep(.autocomplete .v-field__input) {
  color: #FF6600;
  border: none;
}
:deep(.v-data-table-footer){
  background-color: #ff6600 !important;
  display: flex;
  align-items: center;
  place-items: center;
  border-radius: 0 0 30px 30px;
}
:deep(.v-data-table-footer .v-field__input){
  width: 5rem;
  min-width: 4rem;
}
:deep(.v-field__input){
  align-items: center;
}

.botoes{
  width: 20%;
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  justify-content: left;
}

.main{
  display: flex;
  place-items: center;
  justify-content: center;
  font-weight: normal;
  margin-top: 2rem;
  max-height: 77dvh;
  height: 77dvh;
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 0 !important;
}
.vmain  {
  display: flex;
  place-items: center;
  justify-content: center;
  font-weight: normal;
  max-height: 77dvh;
  height: 82dvh;
  border-radius: 30px;
  width: 10%;
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
:deep(.vmain .v-data-table-header__content span){
  font-size: 1rem;
  color: white;
  font-weight: bolder !important;
}
</style>
