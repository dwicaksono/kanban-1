<template>
  <div>
    <!-- <div class="cardContainer"> -->
    <div class="cards">
      <div>
        <div class="headCardBox">
          <div class="status">{{card.status}}</div>
          <div class="iconEdit" @click="getOneTask(card.id)">
            <i data-feather="more-vertical"></i>
          </div>
        </div>
        <div class="titleCards">{{card.title}}</div>
        <div class="descriptionCards">
          <p>{{card.description}}</p>
        </div>
        <div class="switchCards">
          <div class="iconNextPrev">
            <div class="prev" v-if="card.category != 'Backlog'" @click="prevCard(card.id)">
              <i data-feather="arrow-left"></i>
            </div>
            <div class="next" v-if="card.category != 'Done'" @click="nextCard(card.id)">
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
// const server = "http://localhost:3000";
const server = "https://kanban-dimas.herokuapp.com";
export default {
  props: ["card", "onetask"],
  name: "CardKecil",
  data() {
    return {
      formEdit: false,
      getonetasks: []
    };
  },
  methods: {
    actionDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            axios({
              method: "DELETE",
              url: `${server}/tasks/${id}`,
              headers: {
                token: localStorage.token
              }
            }).then(({ data }) => {
              this.$emit("resultDelete");
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOneTask(id) {
      axios({
        method: "GET",
        url: `${server}/tasks/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("getonetasks", data);
          // this.$emit("editask", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    nextCard(id) {
      let newCategory = "";
      if (this.card.category == "Backlog") {
        newCategory = "Todo";
      } else if (this.card.category == "Todo") {
        newCategory = "Completed";
      } else if (this.card.category == "Completed") {
        newCategory = "Done";
      }
      axios({
        method: "PATCH",
        url: `${server}/tasks/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          category: newCategory
        }
      })
        .then(({ data }) => {
          this.$emit("nextCategory");
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    prevCard(id) {
      let newCategory = "";
      if (this.card.category == "Done") {
        newCategory = "Completed";
      } else if (this.card.category == "Completed") {
        newCategory = "Todo";
      } else if (this.card.category == "Todo") {
        newCategory = "Backlog";
      }
      axios({
        method: "PATCH",
        url: `${server}/tasks/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          category: newCategory
        }
      })
        .then(({ data }) => {
          this.$emit("nextCategory");
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
</style>