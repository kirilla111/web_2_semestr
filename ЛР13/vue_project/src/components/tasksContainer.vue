<template>
  <div class="tasks_container">
    <div class="task_container__title">
      <h2>{{title}}</h2>
    </div>
    <div v-for="(card,index) in cards" :key="index"
    >
      <card v-bind:class="[{darkMode_c: toChange}, {lightMode_c: !toChange}]"
      :title='card.title'
      :date_start='card.date_start'
      :owner='card.owner'
      :card_index='index'
      />
    </div>
  </div>
</template>

<script>
import card from './card'

export default {
  name: 'tasksContainer',
  components: { card },
  props: {
    title: String,
    index: Number,
    toChange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cards: [
        {
          title: 'title',
          date_start: '1580558031264',
          owner: 'owner'
        },
        {
          title: 'title',
          date_start: '1580558031264',
          owner: 'title'
        },
        {
          title: 'title',
          date_start: '1580558031264',
          owner: 'title'
        }
      ],
      isSwitched: false
    }
  },
  methods: {
    switch_theme () {
      this.isSwitched = !this.isSwitched
    }
  }
}
</script>

<style>
.tasks_container {
  border: 1px solid #219afb;
  background-color: inherit;
  border-radius: 10px;
  min-height: 500px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.tasks_container h2{
  margin-top: 15px;
  margin-bottom: 0px;
}
</style>
