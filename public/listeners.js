import { addTask } from './addTask.js';
export function addListeners() {

  $(document).on("click", e => {
    e.preventDefault();

    if (e.target.className === "addTaskButton"){
      let taskObject = {
        task: $(`#${e.target.id}task`).val(),
        reward: $(`#${e.target.id}reward`).val(),
        id: e.target.id
      }
      addTask(taskObject)
      .then(result=>{
        console.log('result',result);
      })
    }

    // $.get("http://localhost:8080/testRoute", (data, status)=> console.log('data, status:',data, status))

  })
}
