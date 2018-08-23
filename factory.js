const knex = require('knex');
module.exports = {
  addPokestopToDatabase ({ name, latitude, longitude }) {
    console.log(`Add pokestop named ${name} with location ${latitude} ${longitude}`)
    return Promise.resolve()
  },
  addTaskToDatabase ({ id, task, reward }) {
    console.log(`Add task to pokestop id ${id} with task ${task} and reward ${reward}`)
    return Promise.resolve("server-side promise reolve as hell")
  }
}