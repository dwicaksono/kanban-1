<template>
  <div>
    <!-- dashboard card -->
    <section>
      <AddTask v-if="changetoFormEdit == false" @resultAddTask="resultAddTask" />
      <div id="cardContainer" v-if="changetoFormEdit == false">
        <!-- <div class="cardBox" v-for="(category,i) in categorys"  :key="i"> --->

        <!-- <div class="headCard">
            <div class="nameCard">{{category.name}}</div>
            <div class="iconCard">
              <i v-bind:data-feather="category.icon"></i>
        </div>-->

        <Cardbesar
          :editMode="editMode"
          v-for="(category,i) in categorys"
          :key="i"
          :category="category"
          :cards="cards"
          @updateTask="updateTask"
        />

        <!-- card-->
        <!-- <CardKecil :cards="cards" />  ini kalau langsung lempar data ke child di child baru di loop-->
        <!-- <div class="cardContainer">
          <CardKecil
            v-for="card in cards"
            :key="card.id"
            :card="card"
            v-if="category.name == card.category"
            @resultDelete="resultDelete"
            @editask="editask"
            @nextCategory="nextCategory"
          />
        </div>-->
        <!-- batas card kecil -->

        <!-- </div> -->
        <!-- end card -->
        <!-- </div> -->
      </div>
    </section>
    <!-- edit form -->
    <!-- <section>
      <div id="addTaskPage" v-if="changetoFormEdit == true">
        <div class="loginRegisPage">
          <div class="loginRegisBox">
            <h2>Edit Task</h2>
            <form>
              <div class="formInputLoginRegis">
                <input type="text" maxlength="20" v-model="formEdits.title" />
              </div>
              <div class="formInputLoginRegis">
                <input type="text" maxlength="30" v-model="formEdits.description" />
              </div>
              <div class="boxBtnloginRegister">
                <div type="button" class="btnLoginRegister" @click="updateTask">Submit</div>
                <div type="button" class="btnLoginRegister morBtnLoginRegis">cancel</div>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script>
import axios from "axios";
// import CardKecil from "../mainPage/CardKanban";
import Cardbesar from "./CardBesar";
import AddTask from "./AddTask";
const server = "http://localhost:3000";
export default {
  name: "BoardKanband",
  // components: { CardKecil, AddTask },
  components: { AddTask, Cardbesar },
  data() {
    return {
      editMode: false,
      categorys: [
        { name: "Backlog", icon: "book-open" },
        { name: "Todo", icon: "cpu" },
        { name: "Completed", icon: "shield" },
        { name: "Done", icon: "star" }
      ],
      cards: [],
      changetoFormEdit: false,
      dataUpdateTask: {
        title: "",
        description: ""
      }
    };
  },
  mounted() {
    this.getAllTask();
  },
  updated() {
    feather.replace();
  },
  methods: {
    resultAddTask() {
      // this.$emit("resAddTask");
      // // this.resultAddTask = false;
      this.getAllTask();
    },
    getAllTask() {
      axios({
        method: "GET",
        url: `${server}/tasks`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.cards = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateTask() {
      this.getAllTask();
    }
  }
};
</script>

<style>
</style>