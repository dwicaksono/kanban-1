<template>
  <div>
    <Login
      v-if="!isLogin && !isRegister"
      @setLoginTrue="setLoginTrue"
      @setLoginFalse="setLoginFalse"
      @toRegisterPage="toRegisterPage"
    />
    <Register
      v-if="!isLogin && isRegister"
      @toLoginPage="toLoginPage"
      @setLoginTrue="setLoginTrue"
      @setLoginFalse="setLoginFalse"
    />
    <Navbar v-if="isLogin == true" @logout="logout" />
    <!-- <AddTask v-if="isLogin" /> -->
    <BoardKanband v-if="isLogin" />
  </div>
</template>

<script>
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import Navbar from "./components/mainPage/Navbar";
import BoardKanband from "./components/mainPage/BoardKanban";
export default {
  name: "App",
  components: { Login, Register, Navbar, BoardKanband },
  data() {
    return {
      isLogin: false,
      isRegister: false
    };
  },
  created() {
    if (localStorage.getItem("token")) this.isLogin = true;
  },
  updated() {
    feather.replace();
  },
  methods: {
    setLoginTrue() {
      this.isLogin = true;
    },
    setLoginFalse() {
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
    },

    toRegisterPage() {
      this.isRegister = true;
      this.isLogin = false;
    },
    toLoginPage() {
      this.isRegister = false;
      this.isLogin = false;
    }
  }
};
</script>

<style>
</style>