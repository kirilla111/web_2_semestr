<template>
  <div>
    <div class="header">
      <img
        srcset="./assets/logo_med.png 1.5x , ./assets/logo_small.jpg 2x"
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
            <card 
              v-for="(task,index) in tasks" :key="index"
              :c_id="task.c_id"
              :description="task.description"
              :lvl="task.lvl"
              @drop="drop(index)"
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
        <a class="item_href" href="https://github.com/kirilla111/web_2_semestr">Github-репозиторий</a>
      </div>
    </div>

    <form  v-on:submit.prevent="onSubmit" @submit="addTask" id="modal">
      <button type="button" @click="close_modal" class="modal__exit">&#215;</button>
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
      <button id="submit_bu" class="modal__button disabled" type="submit">Добавить</button>
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
      tasks:[
        //{c_id:1,description:'asd',lvl:1},{c_id:2,description:'asd',lvl:2},{c_id:3,description:'asd',lvl:3},{c_id:4,description:'asd',lvl:1}
      ],
      lvl_importance_string: '',
      description_input_string: '',
      card_count: 0
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
    drop: function(index){
      //console.log(index);
      this.tasks.splice(index,1)
    },
    close_modal(){
      document.getElementById("modal").style.display = "none";
      this.description_input_string = '';
      this.lvl_importance_string = '';
    },
    open_modal(){
      document.getElementById("modal").style.display = "flex";
    },
    addTask(){
      var description = this.description_input_string
      console.log(this.lvl_importance_string);
      var lvl = 1;
      if (this.lvl_importance_string === 'Важный'){
        lvl = 3;
      }
      else if(this.lvl_importance_string === 'Средний'){
        lvl = 2;
      }
      this.tasks.unshift({
        c_id: `${this.card_count++}`,
        description: description,
        lvl: lvl
      })
      document.getElementById("modal").style.display = "none";
      this.description_input_string = '';
      this.lvl_importance_string = '';
    }
  },
  computed: {
    // getTasks: function() {
    //   var new_tasks = this.tasks;
    //   var newnew = new_tasks.reverse();
    //   return newnew
    // }
  },
  watch:{
    description_input_string: function(){
      if (this.lvl_importance_string != '' && this.description_input_string != ''){
        //console.log(2);        
        document.getElementById("submit_bu").classList.remove('disabled');
        document.getElementById("submit_bu").classList.add('main__button');
      }else{
         document.getElementById("submit_bu").classList.add('disabled');
         document.getElementById("submit_bu").classList.remove('main__button');
      }
    },
    lvl_importance_string: function(){
      if (this.lvl_importance_string != '' && this.description_input_string != ''){
        //console.log(2);        
        document.getElementById("submit_bu").classList.remove('disabled');
        document.getElementById("submit_bu").classList.add('main__button');
      }else{
         document.getElementById("submit_bu").classList.add('disabled');
         document.getElementById("submit_bu").classList.remove('main__button');
      }
    }
  }
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
  background: var(--background);
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
  display: grid;
  max-width: 100%;
  padding: 50px;
  margin-bottom: 250px;
  grid-column-gap: 5%;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, 300px);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.item_href{
  color: var(--text-color);
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
.disabled{
 border: 1px solid gray; 
}
.disabled:hover{
 
}
.disabled:active{
  border: 2px solid red;
  animation: shake 0.5s;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
