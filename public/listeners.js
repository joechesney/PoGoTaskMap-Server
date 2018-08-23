import { addTask } from './addTask.js';
import { addNewPokestop } from './addNewPokestop.js';
export function addListeners() {

  $("#add-new-pokestop-form").on("submit", (e) => {
    e.preventDefault();
    let newPokeStopObject = {
      name: $(`#add-new-popkestop-name`).val(),
      latitude: $(`#add-new-pokestop-latitude`).val(),
      longitude: $(`#add-new-pokestop-longitude`).val(),
    };
    console.log('newPokestopObjecr', newPokeStopObject);
  })

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
    if (e.target.className === "add-new-pokestop-button"){
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
    }

    // $.get("http://localhost:8080/testRoute", (data, status)=> console.log('data, status:',data, status))

  })
}
