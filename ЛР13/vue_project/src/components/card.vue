<template>
    <div>
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
    </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    date_start: {
      type: Date,
      default: ''
    },
    date_end: {
      type: String,
      default: ''
    },
    owner: {
      type: String,
      default: ''
    },
    card_index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      date_start_text: 'Дата и время начала',
      date_end_text: 'Ушло времяни',
      owner_text: 'Ответственный',
      highlightedStyles: {
        color: 'white'
      }
    }
  }
}
</script>

<style>
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
    }
    .card__text{
        padding-top: 0;
        min-height: 150px;
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
