

export function getTodaysTasks(task_date) {
  return new Promise((resolve, reject)=>{
    $.get(`http://localhost:8080/getTodaysTasks/${task_date}`)
    .then(tasksArray=>{
      console.log('tasksArray ',tasksArray);
      if(tasksArray){
        resolve(tasksArray);
      }
      else {
        reject(err)
      }
    })
  })
}