<template>
  <div>
    <!-- <div class="cardContainer"> -->
    <div class="cards">
      <div>
        <div class="headCardBox">
          <div class="status">{{card.status}}</div>
          <div class="iconEdit">
            <i data-feather="more-vertical"></i>
          </div>
        </div>
        <div class="titleCards">{{card.title}}</div>
        <div class="descriptionCards">
          <p>{{card.description}}</p>
        </div>
        <div class="switchCards">
          <div class="iconNextPrev">
            <div class="prev">
              <i data-feather="arrow-left"></i>
            </div>
            <div class="next">
              <i data-feather="arrow-right"></i>
            </div>
          </div>
          <div class="delete" @click="actionDelete(card.id)">
            <i data-feather="trash"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import axios from "axios";
const server = "http://localhost:3000";
export default {
  props: ["card"],
  name: "CardKecil",
  data() {
    return {};
  },
  mounted() {
    // console.log(this.card, "<<<<<<<<< mounted");
  },
  methods: {
    actionDelete(id) {
      console.log(id, "<<<<<<< ?");
      axios({
        method: "DELETE",
        url: `${server}/tasks/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data, "<<<<<< data");
          this.$emit("resultDelete");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>