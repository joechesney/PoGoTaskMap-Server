
export function addTask(taskObject){
  console.log('taskObject',taskObject);
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: `http://localhost:8080/addTask/${taskObject.id}`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      headers: {

      },
      data: taskObject,
      success: function (data) {
        console.log('Success', data);
      },
      error: function () {
          console.log('We are sorry but our servers are having an issue right now');
      }

    })

})
}
