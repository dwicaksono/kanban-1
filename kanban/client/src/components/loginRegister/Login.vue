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
          <div type="button" id="googleLogin" @click="googleSign"></div>
          <!-- <div type="button" id="googleLogin">
            <Googlelogin />
          </div>-->

          <div class="boxBtnloginRegister">
            <div type="button" class="btnLoginRegister" @click="loginUser">Login</div>
            <div
              type="button"
              class="btnLoginRegister morBtnLoginRegis"
              @click="toRegister"
            >Register</div>
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
import Googlelogin from "./Google";
export default {
  name: "Login",
  components: {
    Googlelogin
  },
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
            this.$emit("setLoginFalse");
            console.log(error.response.data, "<<<< error response data");
          } else if (error.request) {
            console.log(error.request, "<<<<<< error request");
          } else {
            console.log(error.confiq, "<<<<<< error config");
          }
        });
    },
    toRegister() {
      this.$emit("toRegisterPage");
    },
    googleSign() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          let token = GoogleUser.getAuthResponse();
          console.log(token, "<<<<<< token");
          axios({
            method: "POST",
            url: `${server}/users/googleLogin`,
            data: { token }
          })
            .then(({ data }) => {
              // console.log(data, "<<< ?????");
              localStorage.setItem("token", data);
              this.$emit("setLoginTrue");
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          //on fail do something
          console.log(error, "<<<<<<< errr");
        });
    }
  }
};
</script>

<style>
</style>