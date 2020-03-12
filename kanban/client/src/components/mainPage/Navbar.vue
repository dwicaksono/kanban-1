<template>
  <!-- navbar -->
  <nav id="navbar-box">
    <div id="logo">KANBAND</div>
    <div type="button" id="logout" @click="logutAction">
      <i data-feather="log-out"></i>
    </div>
  </nav>
  <!-- end navbar -->
</template>

<script>
import axios from "axios";
const server = "http://localhost:3000";
export default {
  name: "Navbar",
  methods: {
    logutAction() {
      localStorage.clear();
    }
  }
  // updated() {
  //   feather.replace();
  // }
};
</script>

<style>
</style>