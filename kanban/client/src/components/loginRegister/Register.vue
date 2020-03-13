<template>
  <!-- Register -->
  <section>
    <div class="loginRegisPage">
      <div class="loginRegisBox">
        <h2>Register</h2>
        <form>
          <div class="formInputLoginRegis">
            <input type="text" placeholder="Username" v-model="register.username" />
          </div>
          <div class="formInputLoginRegis">
            <input type="email" placeholder="Email" v-model="register.email" />
          </div>
          <div class="formInputLoginRegis">
            <input type="password" placeholder="Password" v-model="register.password" />
          </div>
          <div type="button" id="googleLogin"></div>
          <div class="boxBtnloginRegister">
            <div type="button" class="btnLoginRegister morBtnLoginRegis" @click="toLogin">Login</div>
            <div type="button" class="btnLoginRegister" @click="registerUser">Register</div>
          </div>
        </form>
        <hr />
      </div>
    </div>
  </section>
  <!-- end Register -->
</template>

<script>
import axios from "axios";
// const server = "http://localhost:3000";
const server = "https://kanban-dimas.herokuapp.com";
export default {
  name: "Register",
  data() {
    return {
      register: {
        username: "",
        emai: "",
        password: ""
      }
    };
  },
  methods: {
    registerUser() {
      axios({
        method: "POST",
        url: `${server}/users/register`,
        data: {
          username: this.register.username,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data;
          this.$emit("setLoginTrue", data);
          this.register.username = "";
          this.register.email = "";
          this.register.password = "";
          Swal.fire({
            position: "center",
            icon: "success",
            title: "WELCOME",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.log(error.response.data, "<<<< error response data");
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    toLogin() {
      this.$emit("toLoginPage");
    }
  }
};
</script>

<style>
</style>