<template>
  <div class="card" v-bind:class="[{ short: lvl === 1 }, { med: lvl === 2 }, { long: lvl === 3 }]">
    <div class="card__item">
      <p class="item__title">Задача: {{ c_id }}</p>
    </div>
    <div class="card__item">
      <p>{{ description }}</p>
    </div>
    <div class="card__item_right">
      <button @click="drop_card" class="modal__exit">&#215;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    c_id: {
      type: String,
      default: "-1",
    },
    description: {
      type: String,
      default: "-1",
    },
    lvl: {
      type: Number,
      default: 1,
    },
  },
  methods:{
      drop_card(){
          console.log('drop');
          this.$emit('drop',this.c_id)
      }
  }
};
</script>

<style>
.card {
  display: block;
  word-wrap: break-word;
  padding: 5px;
}
.short {
  width: 150px;
  border: 1px solid var(--hover-color);
}
.card__item_right {
  text-align: right;
}
.modal__exit{
    color: var(--text-color);
}
.item__title{
    font-size: 1.5em;
    text-decoration: underline;
}
.med {
  width: 220px;
  border: 1px solid var(--hover-color);
}
.long {
  width: 290px;
  border: 1px solid var(--hover-color);
}
</style>