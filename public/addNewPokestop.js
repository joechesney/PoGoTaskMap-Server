
export function addNewPokestop(newPokestopObject){
  console.log('newPokestopObject',newPokestopObject);
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: `http://localhost:8080/addNewPokestop`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      headers: {

      },
      data: newPokestopObject,
      success: function (data) {
        console.log('Success', data);
      },
      error: function () {
          console.log('We are sorry but our servers are having an issue right now');
      }

    })

})
}
