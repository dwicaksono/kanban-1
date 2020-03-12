<template>
  <div>
    <Login v-if="!isLogin" @setLoginTrue="setLoginTrue" />
    <!-- <Register v-if="!islogin" /> -->
    <Navbar v-if="isLogin == true" />
    <AddTask v-if="isLogin" />
    <BoardKanband v-if="isLogin" />
  </div>
</template>

<script>
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import Navbar from "./components/mainPage/Navbar";
import AddTask from "./components/mainPage/AddTask";
import BoardKanband from "./components/mainPage/BoardKanban";
export default {
  name: "App",
  components: { Login, Register, Navbar, AddTask, BoardKanband },
  data() {
    return {
      isLogin: false
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
    }
  }
};
</script>

<style>
</style>