
export function addTask(taskObject){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'POST',
      url: `http://localhost:8080/addTask/${taskObject.id}`,
      data: JSON.stringify(taskObject)

    }).done((result)=>{
      console.log('post resolved', result);
      resolve(result);
    })

  })

}
