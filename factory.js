
module.exports = {
  addNewPokestop ({ name, latitude, longitude }) {
    console.log(`Add pokestop named ${name} with location ${latitude} ${longitude}`)
    return Promise.resolve()
  }
}