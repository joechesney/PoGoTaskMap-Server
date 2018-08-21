import { addTask } from './addTask.js';
export function addListeners() {
  // window.addEventListener("click", e=>{
  //   e.preventDefault();
  //   console.log('add Task clicked! ',e);
  //   addTask(e);
  // })
  document.addEventListener("click", e => {
    e.preventDefault();
    console.log('window click! ',e);
    console.log('window clicked!', e.target.id);
    if (e.target.className === "addTaskButton"){
      console.log('CHUPS',e.target.id);
    }
  })
}
