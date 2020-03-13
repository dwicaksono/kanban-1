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
const server = `http://localhost:3000`;
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
    // getAllTask() {
    //   axios({
    //     method: "GET",
    //     url: `${server}/tasks`,
    //     headers: {
    //       token: localStorage.token
    //     }
    //   })
    //     .then(({ data }) => {
    //       console.log(data);
    //       this.cards = data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
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
    updateTask() {
      axios({
        method: "PUT",
        url: `${server}/tasks/${this.formEdits.id}`,
        data: {
          title: this.formEdits.title,
          description: this.formEdits.description
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data, "<<<<<<< kirim update");
          // this.getAllTask();
          this.changetoFormEdit = false;
        })
        .catch(error => {
          console.log(error.response, "<<<< error update task");
        });
    },
    nextCategory() {
      console.log("<<<<<<<< data next");
      this.$emit("updateTask");
    }
  }
};
</script>

<style>
</style>