<template>
  <!-- Register -->
  <section v-if="!isLogin">
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
            <div type="button" class="btnLoginRegister morBtnLoginRegis">Login</div>
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
const server = "http://localhost:3000";
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
          this.isLogin = true;
          this.register.username = "";
          this.register.email = "";
          this.register.password = "";
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data, "<<<< error response data");
            console.log(error.response.data, "<<<< error response status");
            console.log(error.response.data, "<<<< error response headers");
          } else if (error.request) {
            console.log(error.request, "<<<<<< error request");
          } else {
            console.log(error.confiq, "<<<<<< error config");
          }
        });
    }
  }
};
</script>

<style>
</style>