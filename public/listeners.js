import { addTask } from './addTask.js';
export function addListeners() {
  // document.getElementsByClassName("addTaskButton").addEventListener("click", e=>{
  //   e.preventDefault();
  //   console.log('add Task clicked! ',e);
  //   addTask(e);
  // })
  document.addEventListener("click", e => {
    e.preventDefault();

    console.log('window clicked!', e);
  })
}
