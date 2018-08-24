import { addTask } from './addTask.js';
import { addNewPokestop } from './addNewPokestop.js';
import { getCurrentDate } from './getCurrentDate.js';
export function addListeners() {

  $("#add-new-pokestop-form").on("click", (e) => {
    e.preventDefault();
    let newPokeStopObject = {
      name: $(`#add-new-pokestop-name`).val(),
      latitude: +$(`#add-new-pokestop-latitude`).val(),
      longitude: +$(`#add-new-pokestop-longitude`).val(),
    };
    console.log('newPokestopObjecr', newPokeStopObject);
    addNewPokestop(newPokeStopObject)
    .then(result=>{
      console.log('result',result);
    })
  })

  $(document).on("click", e => {
    e.preventDefault();

    if (e.target.className === "addTaskButton"){
      let taskObject = {
        requirements: $(`#${e.target.id}task`).val(),
        reward: $(`#${e.target.id}reward`).val(),
        pokestop_id: +e.target.id,
        task_date: getCurrentDate()
      };
      addTask(taskObject)
      .then(result=>{
        console.log('result',result);
      })
    }
    if (e.target.className === "add-new-pokestop-button"){

    }

    // $.get("http://localhost:8080/testRoute", (data, status)=> console.log('data, status:',data, status))

  })
}
