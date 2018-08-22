
module.exports = {
  addPokestopToDatabase ({ name, latitude, longitude }) {
    console.log(`Add pokestop named ${name} with location ${latitude} ${longitude}`)
    return Promise.resolve()
  },
  addTaskToDatabase ({ id, task, reward }) {
    console.log(`Add pokestop named ${id} with location ${task} ${reward}`)
    return Promise.resolve()
  }
}