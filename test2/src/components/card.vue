<template>
    <div :id="id" class="card" draggable="true" @dragstart="dragstart" @dragover.prevent>
        <div class="card__title">
            <h3>{{title.toUpperCase()}}</h3>
        </div>
        <div class="card__text">
            <div class="text__text">
                <p>{{description}}</p>
            </div>
            <div class="form_item__title_text">
                <p>{{date_start_text}}</p>
            </div>
            <div class="text__text">
                <p>{{date_start.toLocaleString()}}</p>
            </div>
            <div v-if="col == 3" class="form_item__title_text">
              <p>{{date_end_text}}</p>
            </div>
            <div v-if="col == 3" class="text__text">
              <p>{{getDateEnd()}}</p>
            </div>
            <div class="form_item__title_text">
                <p>{{owner_text}}</p>
            </div>
            <div class="text__text">
                <p>{{owner}}</p>
            </div>
        </div>
        <div v-if="col == 3" class="card__options">
            <img src="..\assets\btn_edit.png" @click="openForm()" width="30" alt="done">
            <img src="..\assets\close_card.png" @click="removeCard()" width="30" alt="edit">
        </div>
        <div v-else class="card__options">
            <img src="..\assets\btn_edit.png" @click="openForm()" width="30" alt="done">
            <img src="..\assets\btn_done.png" @click="moveCardToEnd()" width="30" alt="edit">
        </div>

        <slot />
    </div>
</template>

<script>
import {bus} from '../main'

export default {
  name: 'card',
  props: {
    id: {
      type: String,
      default: 'c1'
    },
    title: {
      type: String,
      default: 'NO TITLE'
    },
    description: {
      type: String,
      default: 'NO DESCRIPTION'
    },
    date_start: {
      type: Date,
      default: 'NO DATE'
    },
    date_end: {
      type: String,
      default: '0 дней, 0 часов'
    },
    owner: {
      type: String,
      default: 'NO OWNER'
    },
    colIndex: {
      type: Number,
      default: 0
    },
    draggable:{
        type: Boolean,
        default: true
    }
  },
  data () {
    return {
      date_start_text: 'Дата и время начала',
      date_end_text: 'Ушло времяни',
      owner_text: 'Ответственный',
      col: this.colIndex,
      highlightedStyles: {
        color: 'white'
      }
    }
  },
  methods: {
    dragstart: e => {
      const target = e.target
      //this.$store.dispatch('SET_ID',e.target.id)
      //alert(e.target.id)
      e.dataTransfer.setData('card_id', target.id)
      setTimeout(() => {
        target.style.display = 'none'
      }, 0)
    },
    saveId() {
      this.$store.dispatch('SET_ID',this.id)   
    },
    removeCard(){
      //alert(this.id)
      this.$store.commit('dincrement3');
      document.getElementById(this.id).style.display = "none"
    },
    moveCardToEnd(){
      this.col = 3;
      const card_id = this.id
      const card = document.getElementById(card_id)
      document.getElementById('board-3').appendChild(card)
            
    },
    openForm(){
      this.saveId()
      document.getElementById('form_id').style.display = 'block'
    },
    getDateEnd(){
      var mills = new Date()-this.date_start
      var sec = mills/1000
      var min = sec/60
      var hours = min/60
      var days = hours/24
       
      return (`Дни: ${Math.round(days)} часы: ${Math.round(hours)} минуты: ${Math.round(min)} секунды: ${ Math.round(sec)}`)
    }
  },
  created() {
    bus.$on('message',val => {
      if (this.id === val){
        if (this.col === 1){
          this.$store.commit('dincrement1');
        }
        if (this.col === 2){
          this.$store.commit('dincrement2');
        }
        if (this.col === 3){
          this.$store.commit('dincrement3');
        }
        this.col = this.$store.getters.COL
        if (this.col === 1){
          this.$store.commit('increment1');
        }
        if (this.col === 2){
          this.$store.commit('increment2');
        }
        if (this.col === 3){
          this.$store.commit('increment3');
        }
      }
    }),
    bus.$on('save_card',values => {
      if (this.id === this.$store.getters.ID){
        console.log(values)

              //bus.$emit('save_card',[options,dropdown_text,owner,date_start,date_end]);
        var description = values.shift()
        if (description === '')
          description = 'NO DESCRIPTION'
        this.description = description
        
        var dropdown_text = values.shift()

        if (dropdown_text === 'План'){
          this.col = 1
          const card = document.getElementById(this.id)
          document.getElementById('board-1').appendChild(card)
        }
        else if (dropdown_text === 'В работе'){
          this.col = 2
          const card = document.getElementById(this.id)
          document.getElementById('board-2').appendChild(card)
        }
        else{
          this.col = 3
          const card = document.getElementById(this.id)
          document.getElementById('board-3').appendChild(card)
        }

        var owner = values.shift()
        if (owner === '')
          description = 'NO OWNER'
        this.owner = owner
        //this.description = values.shift()
        //this.description = values.shift()
        //this.description = values.shift()
      }
    })
  }
}
</script>

<style>
    .card__text{
        padding-top: 0;
        min-height: 220px;
    }
    .text__text{
        color: inherit;
        font-size: 0.8rem;
    }
    .card__options{
        display: flex;
        flex-direction: row;
        justify-content:flex-end;
        align-items:flex-end;
        gap: 10px;
    }
    .form_item__title_text{
        color: inherit;
        font-size: 0.8rem;
        font-weight: bold;
    }
</style>
