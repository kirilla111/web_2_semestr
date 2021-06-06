<template>
  <body @dragover.stop v-bind:class="[{darkMode: isSwitched}, {lightMode: !isSwitched}]">
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
                  <input id="options" v-bind:class="[{darkMode_input: isSwitched}, {lightMode_input: !isSwitched}]" type="text" size="40" placeholder="Описание">
                  <button class="form__submit" @click="createCard()"> &#128929; </button>
              </div>
          </div>
          <div  class="main__tasks_container" >
              <board :id="'board-1'" :title="'План'" :colIndex="1">
                <card v-for="(col,index) in tasksContainers" :key="index" v-bind:class="[{darkMode_c: isSwitched}, {lightMode_c: !isSwitched}]"
                :id='col.id'
                :title='col.title'
                :colIndex='1'
                :date_start='col.date_start'
                />
            </board>
              <board :id="'board-2'" :title="'В работе'" :colIndex="2">
                
            </board>
            <board :id="'board-3'" :title="'Готово'" :colIndex="3">
                
            </board>
          </div>
    </main>

    <div id="form_id">
        <div class="form_header">
            <img src="..\src\assets\exit.png" @click="close_form()" alt="exit">
        </div>
        <form>
            <div class="form_item">
                <p class="form_item__title_text">Описание</p>
                <input id="options_input" class="form_item__container" type="text" placeholder="Lorem ipsum" name="user_name" />
            </div>
            <div class="form_item">
                <p class="form_item__title_text">Статус</p>
                <div class="form_item__container dropdown unselectable" @click="open_dropdown()">
                    <div id="dropdown_text" class="container__dropbtn">
                        <p id="dropdown_text__name">План</p>
                        <p id="dropdown_text__arrow">˅</p>
                    </div>
                    <div>
                        <div id="myDropdown" class="dropdown-content">
                            <div class="dropdown-content__text" @click="setDropDownText('План')">План</div>
                            <div class="dropdown-content__text" @click="setDropDownText('В работе')">В работе</div>
                            <div class="dropdown-content__text" @click="setDropDownText('Готово')">Готово</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form_item">
                <p class="form_item__title_text">Ответственный</p>
                <input id="owner_input" class="form_item__container" type="text" placeholder="Введите имя" name="user_name" />
            </div>
            <div class="form_item">
                <p class="form_item__title_text">Дата и время начала</p>
                <input id="date_start_input" class="form_item__container" type="datetime-local" name="user_name" />
            </div>
            <div class="form_item">
                <p class="form_item__title_text">Дата и время завершения</p>
                <input id="date_end_input" class="form_item__container" type="datetime-local" name="user_name" />
            </div>
            <div class="form_item_button" @click="saveAndClose()">
                ➔
            </div>
        </form>
    </div>

  </body>
</template>

<script>
import card from './components/card'
import board from './components/board.vue'
import {bus} from './main'

export default {
  name: 'App',
  components: { board, card },
    data () {
    return {
      isSwitched: false,
      tasksContainers: [
      ],
      card_count: 0
    }
  },
  methods: {
    switch_theme: function () {
      this.isSwitched = !this.isSwitched
    },
    createCard(){
      // card = new card({
      //   id:`card${this.count}`,
      //   title: `t`,
      //   colIndex: 1
      // });
      var card_title = document.getElementById('options').value
      if (card_title === ''){
        card_title = 'NO INFO'
      }
      this.tasksContainers.push({id:`card${this.card_count}`,title: `${card_title}`,colIndex: 1,date_start: new Date()})
      this.$store.commit('increment1');
      //card.id = `card${this.count}`
      //card.title = `t`
      //card.colIndex = 1

      this.card_count++;
    },
    close_form(){
      document.getElementById('form_id').style.display = 'none'
    },
    open_dropdown(){
      document.getElementById("myDropdown").classList.toggle("show");
    },
    setDropDownText(val){
      document.getElementById("dropdown_text__name").innerHTML = val;
    },
    saveAndClose(){
      var options = document.getElementById("options_input").value
      console.log(options)

      var dropdown_text = document.getElementById("dropdown_text__name").innerHTML
      console.log(dropdown_text)

      var owner = document.getElementById("owner_input").value
      console.log(owner)

      var date_start = document.getElementById("date_start_input").value
      console.log(date_start)

      var date_end = document.getElementById("date_end_input").value
      console.log(date_end)
      
      bus.$emit('save_card',[options,dropdown_text,owner,date_start,date_end]);
      document.getElementById('form_id').style.display = 'none'
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
  #form_id{
     position: fixed;
     display: none;
     top: 50%;
     border-radius: 20px;
     left: 0;
     width: 40%;
     height: 600px;
     margin-left: 30%;
     margin-right: 30%;
     margin-top: -300px;
     border: 1px solid black;
     background-color: white;
 }
 .form_header{
     padding: 30px;
     display: flex;
     justify-content:flex-end;
     align-items:flex-end;
 }
 form{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 25px;
     padding-left: 25%;
     padding-right: 25%;
 }
 .container__dropbtn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    margin: 0;
}
form p{
    margin: 0;
    padding: 0;
}
.form_item__container{
    background-color: #f1f9ff;
    border-radius: 10px;
    border: 1px solid #219afb;
    font-size: 0.7rem;
    color: #219afb;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
}
.form_item{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.form_item_button{
    width: 85%;
    text-align: center;
    border-radius: 5px;
    background-color: #219afb;
    color: white;
    font-size: 0.7rem;
    padding: 8px;
    font-weight: lighter;
}
.form_item_button:hover{
    background-color: #2980B9;
}
input:focus{
    outline: 0;
}
.dropdown-content__text{
    padding: 10px;
    background-color: inherit;
}
.dropdown-content__text:hover{
    color: white;
    background-color: #219afb;
}
/* Dropdown button on hover & focus */
.container__dropbtn:hover, .dropbtn:focus {
  
}
.unselectable {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;           /* Non-prefixed version, currently
                                    not supported by any browser */
  }
/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f9ff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f9ff;}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}

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
