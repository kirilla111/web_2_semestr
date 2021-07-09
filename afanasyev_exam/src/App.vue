<template>
  <div>
    <div class="header">
      <img
        srcset="./assets/logo_small.jpg, ./assets/logo_med.png 2x"
        class="header__logo"
        src="./assets/logo_med.png"
        alt="Logo"
      />
      <p class="header__text">Afanasyev 191-361</p>
      <div class="header_switch-theme">
        <label>Темная тема</label>
        <input
          type="checkbox"
          name="checkbox"
          @click="switch_theme"
          id="theme_cb"
        />
      </div>
    </div>
    <div class="main">
      <button @click="open_modal" class="main__button">Добавить задачу</button>

      <div class="main__container">
        <h1> Список задач</h1>
        <div class="container__list">
            <card v-for="(task,index) in tasks" :key="index"
              :c_id="task.id"
              :description="task.description"
              :lvl="task.lvl"
            />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_item">
        <p>Афанасьев Кирилл Максимович</p>
      </div>
      <div class="footer_item">
        <p>191-361</p>
      </div>
      <div class="footer_item">
        <p>09.07.2021</p>
      </div>
      <div class="footer_item">
        <a href="https://github.com/kirilla111/web_2_semestr">Github-репозиторий</a>
      </div>
    </div>

    <form  v-on:submit.prevent="onSubmit" @submit="addTask" id="modal">
      <button @click="close_modal"  class="modal__exit">&#215;</button>
      <div class="modal__item">
        <label for="description_input">Описание задачи</label>
        <input v-model="description_input_string" id="description_input" required />
      </div>
      <div class="modal__item">
        <label for="select">Уровень важности</label>
        <select required id="select" class="item__select" v-model="lvl_importance_string">
          <option>Важный</option>
          <option>Средний</option>
          <option>Не важный</option>
        </select>
      </div>
      <button class="modal__button main__button" type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
import card from "./components/card.vue";

export default {
  name: "App",
  components: {
    card,
  },
  data() {
    return {
      theme_mod: false,
      tasks:[],
      lvl_importance_string: '',
      description_input_string: ''
    };
  },
  methods: {
    switch_theme() {
      this.theme_mod = !this.theme_mod;
      if (this.theme_mod) {
        document.documentElement.style.setProperty("--background", "black");
        document.documentElement.style.setProperty("--text-color", "white");
      } else {
        document.documentElement.style.setProperty("--background", "white");
        document.documentElement.style.setProperty("--text-color", "black");
      }
    },
    close_modal(){
      document.getElementById("modal").style.display = "none";
    },
    open_modal(){
      document.getElementById("modal").style.display = "flex";
    },
    addTask(){
      console.log('ad');
    }
  },
};
</script>

<style>
:root {
  --background: white;
  --hover-color: green;
  --text-color: black;
}
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: var(--background);
  color: var(--text-color);
  font-size: 1.2em;
}
.item__select{
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  border-bottom: 1px solid var(--hover-color);
}
.header__logo {
  width: 100px;
}
.header_switch-theme {
  display: flex;
  gap: 10px;
  align-items: center;
}
.main__button {
  padding: 20px 10px;
  border: 1px solid var(--hover-color);
  background: var(--background);
  color: var(--text-color);
}
.main__button:hover,
.main__button:active {
  background: var(--hover-color);
  color: white;
}
.modal__item{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.modal__item input{
  padding: 10px;
}
.main {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: left;
}
#modal {
  min-width: 25%;
  display: none;
  flex-direction: column;
  position: fixed;
  top: 35%;
  padding: 20px;
  gap: 20px;
  left: 35%;
  border: 1px solid var(--hover-color);
}
.modal__button {
  padding: 10px;
}
.modal__exit{
  border: 0px;
  text-align: right;
  background: inherit;
  font-size: 2em;
}
.footer{
  border-top: 1px solid var(--hover-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
  align-items: center;
}
.container__list {
  display: block;
  padding: 50px 5%;
  margin-bottom: 300px;
}

@media (max-width: 500px) {
  .header,.footer {
    flex-direction: column;
    gap: 10px;
  }
  .container__list{
    padding-left: 0px;
    padding-right: 0px;
    display: flex;
    justify-content: center;
  }
  .main{
    padding-left: 5px;
    padding-right: 5px;
  }
}
@media (max-width: 720px) {
  .footer {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
