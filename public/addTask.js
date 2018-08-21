
export function addTask(taskObject){
  return new Promise((resolve, reject)=>{
    $.ajax({
      type: 'POST',
      url: "http://127.0.0.1:8080/addTask",
      data: taskObject,
      success: function(result){
        console.log('result:',result);
      }
    })
  })

  console.log('add Task clicked! taskObject: ', taskObject);
}
