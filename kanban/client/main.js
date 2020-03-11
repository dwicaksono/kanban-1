
let server = 'http://localhost:3000'

new Vue({
  el: '#app',
  data: {
    isLogin: false,
    categorys: [
      { name: 'Backlog', icon: 'book-open' },
      { name: 'Todo', icon: 'cpu' },
      { name: 'Completed', icon: 'shield' },
      { name: 'Done', icon: 'star' },
    ],
    allTask: [],
    login: {
      email: '',
      password: ''
    },
    register: {
      username: '',
      email: '',
      password: ''
    }
  },

  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true
      this.getAllTask()
    }
  },

  methods: {

    loginUser() {
      axios({
        method: 'POST',
        url: `${server}/users/login`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data
          this.isLogin = true
          this.login.email = ''
          this.login.password = ''
        })
        .catch(err => {
          console.log(err)
        })
    },

    registerUser() {
      axios({
        method: 'POST',
        url: `${server}/users/register`,
        data: {
          username: this.register.username,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data
          this.isLogin = true
          this.register.username = ''
          this.register.email = ''
          this.register.password = ''
        })
        .catch(err => {
          console.log(err)
        })
    },

    getAllTask() {
      axios({
        method: 'GET',
        url: `${server}/tasks`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.allTask = data
        })
        .catch(err => {
          console.log(err, '<<<< err??')
        })
    },

    logutAction() {
      localStorage.clear()
      this.isLogin = false
    },
    // toRegister() {
    //   this.indexPage.registerPage
    // }

  }
})
