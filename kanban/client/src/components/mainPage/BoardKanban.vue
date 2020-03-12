<template>
  <div>
    <!-- dashboard card -->
    <section>
      <div id="cardContainer">
        <div class="cardBox" v-for="(category,i) in categorys" :key="i">
          <div class="headCard">
            <div class="nameCard">{{category.name}}</div>
            <div class="iconCard">
              <i v-bind:data-feather="category.icon"></i>
            </div>
          </div>
          <!-- card -->
          <!-- <CardKecil :cards="cards" />  ini kalau langsung lempar data ke child di child baru di loop-->
          <div class="cardContainer">
            <!-- <div class="cards"></div> -->
            <CardKecil
              v-for="card in cards"
              :key="card.id"
              :card="card"
              v-if="category.name == card.category"
              @resultDelete="resultDelete"
            />
          </div>
          <!-- batas card kecil -->
          <!-- </div> -->
          <!-- end card -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import CardKecil from "../mainPage/CardKanban";
const server = "http://localhost:3000";
export default {
  name: "BoardKanband",
  components: { CardKecil },
  data() {
    return {
      categorys: [
        { name: "Backlog", icon: "book-open" },
        { name: "Todo", icon: "cpu" },
        { name: "Completed", icon: "shield" },
        { name: "Done", icon: "star" }
      ],
      cards: []
    };
  },
  updated() {
    feather.replace();
  },
  mounted() {
    this.getAllTask();
  },
  methods: {
    getAllTask() {
      axios({
        method: "GET",
        url: `${server}/tasks`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.cards = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    resultDelete() {
      this.getAllTask();
    }
  }
};
</script>

<style>
</style>