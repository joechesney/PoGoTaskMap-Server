// This file will just get the pokestops from my firebase and print them on the screen on first page load
export function getPokestops() {
  $.get("https://nashquestmap.firebaseio.com/pokestops.json")
  .then(pokestops=>{
    console.log('all stops: ',pokestops);
    return pokestops;
  })
}

// export { getPokestops };