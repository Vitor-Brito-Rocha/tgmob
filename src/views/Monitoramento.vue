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
              <div class="imgcalendario"><img src="../assets/983161df263966517dc3281cc57a618247e2c744.png" alt=""></div><div class="dataselect"></div>
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


const apidothiago = ref([
  {
  name: 'comoéamigo',
    id: '12',
  },
  {
    name: 'o gustavo',
    id: '2',
  }])
</script>
<style scoped>
.app{
  min-height: 100dvh;
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
.titulo{
  margin-left: 0;
  width: 97dvw;
  height: 18dvh;
  border-radius: 30px;
  display: flex;
  font-family: Poppins, 'sans-serif';
  font-size: 3rem;
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

.codigo{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 49%;
  background-color: white;
  border-radius: 30px;
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
  font-size: 1.1dvw;
  font-family: PoppinsThin, 'sans-serif';
  font-weight: bold;
}
.codigoselect{
  margin-left: 2.5dvw;
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
