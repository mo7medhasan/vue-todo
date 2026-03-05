<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Task } from "./shared/task";
import { remult } from "remult";
import { TasksController } from "./shared/TasksController";
const tasks = ref<Task[]>([]);
const taskRepo = remult.repo(Task);
onMounted(() =>
  onUnmounted(
  taskRepo
    .liveQuery({
      where: { completed: undefined },
    })
    .subscribe((info) => (tasks.value = info.applyChanges(tasks.value))),
));

const newTaskTitle = ref("");
async function addTask() {
  try {
    const task = await taskRepo.insert({
      title: newTaskTitle.value,
      // completed: false,
    });
    newTaskTitle.value = "";
  } catch (error:any) {
    alert(error.message);
  }
}
async function deleteTask(task:Task){
  try {
    await taskRepo.delete(task);
  } catch (error:any) {
    alert(error.message);
  }
}
async function saveTask(task:Task){
  try {
    await taskRepo.save(task);
  } catch (error:any) {
    alert(error.message);
  }
}


async function setAllCompleted(completed:boolean){
  try {
    await  TasksController.setAllCompleted(completed);
  } catch (error:any) {
    alert(error.message);
  }
}
</script>

<template>
  <h1>Todos</h1>
  <main>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="What needs to be done?" v-model="newTaskTitle" />
      <button type="submit">Add</button>
    </form>
    <div v-for="task in tasks" :key="task.id">
      <input type="checkbox" v-model="task.completed"
      @change="saveTask(task)"
      />
      <input type="text" v-model="task.title"
      />
      <button type="button" @click="$event => saveTask(task)">Save</button>
      <button type="button" @click="$event => deleteTask(task)">Delete</button>
    </div>
    <div>
      <button type="button" @click="$event => setAllCompleted(true)">Set All Completed</button>
      <button type="button" @click="$event => setAllCompleted(false)">Set All Not Completed</button>
    </div>
  </main>
</template>
