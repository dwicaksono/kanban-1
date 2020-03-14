<template>
  <div>
    <!-- add task -->
    <section v-show="!formAdd">
      <div id="addBox">
        <div id="addBtn" @click="toFormAdd">
          <i data-feather="plus"></i>
        </div>
      </div>
    </section>
    <!-- end add task -->

    <!-- Add Task Form -->
    <section v-if="formAdd">
      <div id="addTaskPage">
        <div class="loginRegisPage">
          <div class="loginRegisBox">
            <h2>Add Task</h2>
            <form @submit.prevent="actionFormAdd">
              <select class="formInputLoginRegis" v-model="dataFormAdd.status">
                <!-- <select v-model="dataFormAdd.status"> -->
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Hight">Hight</option>
                <!-- </select> -->
                <!-- <input type="text" placeholder="status"  /> -->
              </select>
              <div class="formInputLoginRegis">
                <input type="text" placeholder="title" maxlength="20" v-model="dataFormAdd.title" />
              </div>
              <div class="formInputLoginRegis">
                <input
                  type="text"
                  placeholder="description"
                  maxlength="30"
                  v-model="dataFormAdd.description"
                />
              </div>

              <div class="boxBtnloginRegister">
                <!-- <div type="button" class="btnLoginRegister" @click="actionFormAdd">add Task</div> -->
                <button type="submit" class="btnLoginRegister btnNow">Add Task</button>
                <div
                  type="button"
                  class="btnLoginRegister morBtnLoginRegis"
                  @click="cancelToFormAdd"
                >cancel</div>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>
    <!-- End Add Task Form -->
  </div>
</template>

<script>
import axios from "axios";
// const server = "http://localhost:3000";
const server = "https://kanban-dimas.herokuapp.com";
export default {
  name: "AddTask",
  data() {
    return {
      formAdd: false,
      dataFormAdd: {
        title: "",
        description: "",
        status: ""
      }
    };
  },
  methods: {
    toFormAdd() {
      this.formAdd = true;
    },
    cancelToFormAdd() {
      this.formAdd = false;
    },
    actionFormAdd() {
      axios({
        method: "POST",
        url: `${server}/tasks`,
        data: {
          title: this.dataFormAdd.title,
          description: this.dataFormAdd.description,
          status: this.dataFormAdd.status
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data, "<<<< form update");
          this.formAdd = false;
          this.$emit("resultAddTask");
          // this.dataFormAdd.title = "";
          // this.dataFormAdd.description = "";
          // this.dataFormAdd.category = "";
          this.dataFormAdd = {};
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.log(error.response.data, "<<<< erorr");
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }
};
</script>

<style>
</style>