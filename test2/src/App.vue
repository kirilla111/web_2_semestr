<template>
  <body v-bind:class="[{darkMode: isSwitched}, {lightMode: !isSwitched}]">
    <header>
      <div class="header__title">
        <p>Канбан</p>
      </div>
      <div class="header__theme_mode">
        <div class="theme_mode__title">
          <p>Темная тема</p>
        </div>
        <div class="theme_mode__change_theme_button">
          <div
            id="switch_rotate_b"
            class="change_theme_button__switch"
            v-bind:class="[{active: !isSwitched}, {notActive: isSwitched}]"
            v-on:click="switch_theme">
            </div>
          <div
            style="
              padding-left: 5px;
              padding-right: 5px;
              display: flex;
              flex-direction: row;
              gap: 10px;">
            <p id="switch_text_1">ON</p>
            <p id="switch_text_2">OFF</p>
          </div>
        </div>
      </div>
    </header>
    <main>
          <div class="main__add_card_container">
              <p v-bind:class="[{text_1: !isSwitched}, {darkMode_text: isSwitched}]">Добавить новую задачу</p>
              <div class="add_card_container__form">
                  <input  v-bind:class="[{darkMode_input: isSwitched}, {lightMode_input: !isSwitched}]" type="text" size="40" placeholder="Описание">
                  <button class="form__submit" onclick="add_card_form()"> &#128929; </button>
              </div>
          </div>
          <div  class="main__tasks_container" >
              <board :id="'board-1'" :title="'План (1)'">
                <card v-bind:class="[{darkMode_c: isSwitched}, {lightMode_c: !isSwitched}]"
                :id="'card1'" 
                :title="'t1'"
                :owner="'o1'"
                :colIndex='1'
                />
            </board>
              <board :id="'board-2'" :title="'В работе (2)'">
                <card v-bind:class="[{darkMode_c: isSwitched}, {lightMode_c: !isSwitched}]"
                :id="'card2'"
                :title="'t1'"
                :owner="'o2'"
                :colIndex='2'
                />
            </board>
            <board :id="'board-3'" :title="'Готово (3)'">
                <card v-bind:class="[{darkMode_c: isSwitched}, {lightMode_c: !isSwitched}]"
                :id="'card3'"
                :title="'t3'"
                :owner="'o3'"
                :colIndex='3'
                />
            </board>
          </div>
    </main>
  </body>
</template>

<script>
import card from './components/card'
import board from './components/board.vue'

export default {
  name: 'App',
  components: { board, card },
    data () {
    return {
      isSwitched: false,
      tasksContainers: [
        {
          title: 'План (1)',
          toChange: false,
          colIndex: 1
        },
        {
          title: 'В работе (2)',
          toChange: false,
          colIndex: 2
        },
        {
          title: 'Готово (3)',
          toChange: false,
          colIndex: 3
        }
      ]
    }
  },
  methods: {
    switch_theme: function () {
      this.isSwitched = !this.isSwitched
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body{
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #ffffff;
    color: black;
    box-sizing: border-box;
}
.darkMode{
  padding:0;
  margin: 0;
  background: black;
  color: white;
}
input::placeholder{
  color:inherit;
}
.lightMode{
  margin: 0;
  padding:0;
  background: white;
  color: black;
}
.darkMode_input{
  background: black;
  color: white;
  border-radius: 15px;
  border: 1px solid #219afb;
  height: 100%;
  padding: 15px;
}
input:focus{
  outline: 0;
}
.darkMode_text{
  color:white;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.8rem;
}
.lightMode_input{
  color: #219afb;
  border-radius: 15px;
  border: 1px solid #219afb;
  height: 100%;
  padding: 15px;
  background-color: #f1f9ff;
}
.active{
  animation: spin2 0.3s 1;
  animation-fill-mode: forwards;
}
.notActive{
  animation: spin1 0.3s 1;
  animation-fill-mode: forwards;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: inherit;
  vertical-align: middle;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 30px;
}
.header__title {
  font-size: 3rem;
  font-weight: bold;
}
.header__theme_mode {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.theme_mode__change_theme_button {
  background-color: #bde1fd;
  color: white;
  font-size: 0.5rem;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.theme_mode__title {
  font-size: 1rem;
}
.change_theme_button__switch {
  background-color: white;
  margin-top: 1px;
  margin-left: -1px;
  height: 23px;
  width: 22px;
  border-radius: 20px;
  position: absolute;
}
@keyframes spin1 {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(28px);
  }
}
@keyframes spin2 {
  0% {
    transform: translateX(28px);
  }
  100% {
    transform: translateX(0px);
  }
}
.text_1{
    margin-top: 5px;
    margin-bottom: 5px;
    color: #219afb;
    font-weight: bold;
    font-size: 0.8rem;
 }
 .form__input{
    border-radius: 15px;
    border: 1px solid #219afb;
    height: 100%;
    padding: 15px;
    background-color: #f1f9ff;
    color:#219afb;
 }
 .form__submit{
     width: 45px;
     height: 45px;
     border-radius: 25px;
     border: 0px;
     color: white;
     font-size: 1.5rem;
     background-color: #219afb;
 }
 ::placeholder {
    color: #219afb;
    font-weight: bold;
  }
  .add_card_container__form{
      display: flex;
      flex-direction: row;
      gap:20px;
  }
  main{
    padding-left: 10%;
    padding-right: 10%;
  }
  .main__tasks_container{
    margin-top: 50px;
    padding-left: 5%;
    padding-right: 5%;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    justify-content: space-between;
    column-gap: 50px;
  }
  @media (max-width:1000px) and (min-width: 500px) {
      .main__tasks_container{
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
        row-gap: 50px;
      }
  }
  @media (max-width:500px) {
    .main__tasks_container{
        grid-template-columns: repeat(1,1fr);
        grid-template-rows: repeat(3,1fr);
        row-gap: 50px;
    }
    header{
        flex-direction: column;
    }
    input{
        width: 70%;
    }
    .header__title{
        height: 100px;
    }
  }
  .lightMode_c{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        padding: 6%;
        padding-top: 0;
        background-color: #f1f9ff;
        color: #219afb;
        min-height: 200px;
        overflow: hidden;
    }
    .darkMode_c{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        padding: 6%;
        padding-top: 0;
        background-color: black;
        color: white;
        min-height: 200px;
        border: 1px solid white;
        overflow: hidden;
    }
</style>
