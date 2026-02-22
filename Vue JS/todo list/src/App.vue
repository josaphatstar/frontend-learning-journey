<template>
   <h1>TODO LIST</h1> <br>

   <form action="" @submit.prevent = "addTodo">
      <fieldset role="group">
      <input v-model="newTodo" type="text" placeholder="Tache à effectuer">
      <button :disabled=" newTodo.length === 0" >Ajouter</button>
      </fieldset>
   </form>
   <div v-if = "todos.length === 0">Vous n'avez pas de taches à faire </div>

   <div v-else>
      <ul>
         <li v-for="todo in sortedTodos()" :key="todo.date" :class="{completed: todo.completed}" >
            <label>
               <input type="checkbox" v-model="todo.completed">
               {{ todo.title }}
            </label>
         </li>
      </ul>
      <label>
         <input type="checkbox" v-model = 'hideCompleted'> Masquer les taches completeés
      </label>
   </div>
</template>
 
<script setup>
   import {ref} from 'vue';
 
   const newTodo = ref('')
   const hideCompleted = ref(false)
   const todos = ref([{
      title: 'Tache de test',
      completed: true,
      date: 1,
   },
   {
      title: 'Tache à faire',
      completed: false,
      date: 2
   }
])
   const addTodo = () => {
      todos.value.push({
         title: newTodo.value,
         completed: false,
         date: Date.now()
      })

      newTodo.value = ''
   }
   const sortedTodos = () => {
      const sortedTodos = todos.value.toSorted((a,b) => a.completed > b.completed ? 1 : -1)

      if (hideCompleted.value === true) {
         return sortedTodos.filter(t => t.completed === false)
      }
      return sortedTodos
   }

</script>

<style>
   .completed{
      opacity: .5;
      text-decoration: line-through;
   }

   h1{
      text-align: center;
   }

   body{
      background-color: #13161e;
      color: #fff;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
   }

   *{
      box-sizing: border-box;
   }

   fieldset{
      border: none;
   }

   button{
      background: #deb622;
      border: none;
      color: #13161e;
      padding: 15px 30px;
      border-radius: 0 5px 5px 0;
      font-weight: 600;
   }

   button:hover{
      cursor: pointer;
   }

   input{
      border: none;
      color: #fff;
      background-color: #1c212b;
      padding: 15px 70px;
      outline: none;
      border-radius: 5px 0 0 5px;
      margin-right: 3px;
   }

   input:focus{
      border: 1px solid #deb622;
   }
</style>