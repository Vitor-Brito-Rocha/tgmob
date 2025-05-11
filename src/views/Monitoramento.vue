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
                  tile
                  variant="outlined"
                  attach
                  :search="search"
                  menu-icon="none"
                  hide-details
                  placeholder="Filtrar códigos"
                  multiple
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
                <v-list density="compact" tile slim
                lines="one">
                  <div class="d-flex">

                    <v-btn
                      variant="text"
                      @click="toggleSort"
                      class="btndata"
                      stacked
                    >
                      <span class="codigotitulo">Data</span>
                      <v-icon class="codigoicon">
                        {{ sortAscending ? 'mdi-menu-up' : 'mdi-menu-down' }}
                      </v-icon>
                    </v-btn>
                  </div>
                  <v-divider class="opacity-90" color="cyan"></v-divider>
                  <v-list-item
                    v-for="item in sortedDates()"
                    :key="item.text"
                    :value="item"
                    color="gray"
                  >
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </div>
          <div class="dadosempresa">

          </div>
        </div>
        <div class="tabela">

        </div>
      </div>

    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const selectedItems = ref([])
const isOpen = ref(false)
const search = ref('')
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

const apidothiago = ref([
  {
  name: 'comoéamigo',
    id: '12',
    data: '2021-09-01',
  },
  {
    name: 'o gustavo',
    id: '2',
    data: '2021-09-21',
  }])
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
  margin-top: 1dvh;
  display: grid;
  height: 17dvh;
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
  height: 11dvh;
}
@font-face{
  font-family: 'Poppins';
  src: url(../assets/Poppins,Smooch_Sans/Poppins/Poppins-Regular.ttf);
}
.titulo{
  margin-left: 0;
  width: 97dvw;
  height: 18dvh;
  border-radius: 30px;
  display: flex;
  font-size: 3rem;
  font-family: 'Poppins', 'serif';
  justify-content: space-between;
  text-align: center;
  align-items: center;
  top: 0;
  padding: 2rem;
  font-weight: normal;
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
  margin-top: 6dvh;
  background-color: #f2f2f2;
  height: 75dvh;
}
.maindados{
  width: 94dvw;
  position: relative;
  height: 48%;
  margin-top: 8px;
  border-radius: 30px;
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
flex-direction: column;
margin-left: 2.5dvw}
.codigo{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 49%;
  background-color: white;
  border-radius: 30px;
}
.codigoicon{
  font-size: 1.4rem;
  display: block !important;
  width: 100% !important;
  align-items: flex-start !important;
  text-align: left !important;
  margin-left: -0.8dvh !important;

}
.imgcodigo img{
  margin-left: 1dvw;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.codigotitulo{
  font-size: 0.9dvw;
  font-family: 'Arial', 'sans-serif';
  font-weight: 700;
  margin-bottom: 0 !important;
  display: block !important;
  width: 100% !important;
  text-align: left !important;


}
.btndata{
  display: flex !important;
  width: 100%;
  text-align: left !important;
  text-transform: capitalize !important;
  align-items: flex-start !important;
  flex-direction: column !important;
  height: min-content !important;
  border-radius: 0 !important;
  font-size: 0.8dvw;
  gap: 0 !important; /* Reduzido de 4px para 0px */

  font-family: 'Arial', 'sans-serif';
  letter-spacing: 0.01rem !important;

  font-weight: 700;
}
.btndata:hover {
  background-color: #f5f5f5 !important;
}

.codigoselect{
  margin-left: 2.5dvw;
  text-align: left !important;
}
.data{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 49%;
  background-color: white;
  border-radius: 30px;
}
.imgcalendario img{
  margin-left: 1dvw;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dadosempresa{
  background-color: blue;
  width: 72%;
  height: 100%;
  border-radius: 30px;
  position: absolute;
  right: 0
}
.tabela{
  background-color: green;
  height: 48%;
  width: 94dvw;
  border-radius: 30px;
  margin-top: 4px;
}
</style>
