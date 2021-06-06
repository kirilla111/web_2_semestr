<template>
  <div class="tasks_container" :id="id" @dragover.prevent @drop="drop" @dragover="saveIndex()">
    <div class="task_container__title">
      <h2>{{getTitle()}}</h2>
    </div>
    <slot />
  </div>
</template>

<script>
import {bus} from '../main'

export default {
  name: 'board',
  props: {
    id: {
      type: String,
      default: '1'
    },
    title: {
      type: String,
      default: 'no info'
    },
    colIndex: {
      type: Number,
      default: 0
    },
    toChange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSwitched: false,
      col: this.colIndex
    }
  },
  methods: {
    switch_theme () {
      this.isSwitched = !this.isSwitched
    },
    drop: e => {
      const card_id = e.dataTransfer.getData('card_id')
      const card = document.getElementById(card_id)
      card.style.display = 'block'
      e.target.appendChild(card)
      bus.$emit('message',card_id);
    },
    saveIndex() {
      this.$store.dispatch('SET_COL',this.colIndex)
    },
    getTitle(){
      if (this.colIndex === 1)
      return (`${this.title} (${this.$store.getters.C1})`)
      if (this.colIndex === 2)
      return (`${this.title} (${this.$store.getters.C2})`)
      if (this.colIndex === 3)
      return (`${this.title} (${this.$store.getters.C3})`)
    }
  }
}
</script>

<style>
.tasks_container {
  border: 1px solid #219afb;
  background-color: inherit;
  border-radius: 10px;
  min-height: 700px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow: hidden;
}
.tasks_container h2{
  margin-top: 15px;
  margin-bottom: 0px;
}
</style>
