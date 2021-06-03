<template>
    <div :id="id" class="card" :draggable="draggable" @dragstart="dragstart" @dragover.stop @dragover="saveIndex()">
        <div class="card__title">
            <h3>{{title}}</h3>
        </div>
        <div class="card__text">
            <div class="text__text">
                <p>{{description}}</p>
            </div>
            <div class="form_item__title_text">
                <p>{{date_start_text}}</p>
            </div>
            <div class="text__text">
                <p>{{date_start}}</p>
            </div>
            <div v-if="col == 3" class="form_item__title_text">
              <p>{{date_end_text}}</p>
            </div>
            <div v-if="col == 3" class="text__text">
              <p>{{date_end}}</p>
            </div>
            <div class="form_item__title_text">
                <p>{{owner_text}}</p>
            </div>
            <div class="text__text">
                <p>{{owner}}</p>
            </div>
        </div>
        <div class="card__options">
            <img src="..\assets\btn_done.png" width="30" alt="edit">
            <img src="..\assets\btn_edit.png" width="30" alt="done">
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
      default: 'NO INFO'
    },
    description: {
      type: String,
      default: 'no info'
    },
    date_start: {
      type: Date,
      default: 'no info'
    },
    date_end: {
      type: String,
      default: '0 дней, 0 часов'
    },
    owner: {
      type: String,
      default: 'no info'
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
    
      e.dataTransfer.setData('card_id', target.id)
      setTimeout(() => {
        target.style.display = 'none'
      }, 0)
    },
    saveIndex() {
      this.$store.dispatch('SET_NAME', 'asd')
    }
  },
  created() {
    bus.$on('message', val => {
      alert(this.$store.getters.NAME,val);
    })
  }
}
</script>

<style>
    .card__text{
        padding-top: 0;
        min-height: 200px;
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
