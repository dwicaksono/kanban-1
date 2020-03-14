<template>
  <div>
    <div class="cardBox" v-if="!editMode">
      <div class="headCard">
        <div class="nameCard">{{category.name}}</div>
        <div class="iconCard">
          <i v-bind:data-feather="category.icon"></i>
        </div>
      </div>

      <!-- card -->
      <!-- <CardKecil :cards="cards" />  ini kalau langsung lempar data ke child di child baru di loop-->
      <div class="cardContainer">
        <CardKecil
          v-for="card in cards"
          :key="card.id"
          :card="card"
          v-if="category.name == card.category"
          @resultDelete="resultDelete"
          @editask="editask"
          @nextCategory="nextCategory"
          @resAddTask="resAddTask"
          @getonetasks="getonetasks"
        />
      </div>
      <!-- batas card kecil -->
      <!-- </div> -->
      <!-- end card -->
    </div>
    <!-- edit form -->
    <!-- <section>
      <div id="addTaskPage" v-if="editMode">
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
                <div
                  type="button"
                  class="btnLoginRegister morBtnLoginRegis"
                  @click="closeEdit"
                >cancel</div>
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
// const server = `http://localhost:3000`;
const server = "https://kanban-dimas.herokuapp.com";
import CardKecil from "./CardKanban";
export default {
  props: ["category", "editMode", "cards"],
  name: "Cardbesar",
  components: {
    CardKecil
  },
  data() {
    return {
      // cards: []
      // formEdits: null
      // changetoFormEdit: false,
      // dataUpdateTask: {
      //   title: "",
      //   description: ""
      // }
    };
  },
  updated() {
    feather.replace();
  },
  // mounted() {
  //   this.getAllTask();
  // },
  methods: {
    closeEdit() {
      this.$emit("onEditMode", false);
    },
    resultDelete() {
      // this.getAllTask();
      this.$emit("updateTask");
    },
    resAddTask() {
      // this.getAllTask();
      this.resultAddTask = false;
    },
    editask(data) {
      this.formEdits = data;
      this.changetoFormEdit = true;
      // this.$emit("editask", data);
      // this.getAllTask();
    },

    nextCategory() {
      // console.log("<<<<<<<< data next");
      this.$emit("updateTask");
    },
    getonetasks(data) {
      this.$emit("getOnetaskFromBigCard", data);
      // console.log(data, "<<<<<<<< dari card besar");
    }
  }
};
</script>

<style>
</style>