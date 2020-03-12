<template>
  <!-- login -->
  <!-- <div> -->
  <section>
    <div class="loginRegisPage">
      <div class="loginRegisBox">
        <h2>Login</h2>
        <form>
          <div class="formInputLoginRegis">
            <input type="email" placeholder="Email" v-model="login.email" />
          </div>
          <div class="formInputLoginRegis">
            <input type="password" placeholder="Password" v-model="login.password" />
          </div>
          <div type="button" id="googleLogin"></div>
          <div class="boxBtnloginRegister">
            <div type="button" class="btnLoginRegister" @click="loginUser">Login</div>
            <div type="button" class="btnLoginRegister morBtnLoginRegis">Register</div>
          </div>
        </form>
        <hr />
      </div>
    </div>
  </section>
  <!-- </div> -->
  <!-- end login -->
</template>

<script>
import axios from "axios";
const server = "http://localhost:3000";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    loginUser() {
      axios({
        method: "POST",
        url: `${server}/users/login`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data;
          this.$emit("setLoginTrue");
          console.log(data, "<<<<<< data login");
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