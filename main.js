'use strict';

$('.state-input').on('click',function(event){
  event.preventDefault()
  let state_array = [];
  $('.parks-container').empty()
  const state_values = $('.multiple-state')
  for (let i =0; i<state_values[0].selectedOptions.length;i++){
    let state_selection = state_values[0].selectedOptions[i].value
    state_array.push(state_selection)
    }
  const max_results = $('.max-results').val()
  let state_string = state_array.toString()
  getParks(state_string,max_results)
})

function getParks(state_string,max_results){
  console.log('getparks function debug')
  let limit_results = max_results -1
  const geocordinates = []
  let parks_url = `https://developer.nps.gov/api/v1/parks`
  let parks_url2 = `https://api.nps.gov/api/v1/parks?api_key=3CXESj6FPvSAowQ1dKe2xVYlUV5GQIb6Q5E5ecGy&stateCode=${state_string}&limit=${limit_results}`
  fetch(parks_url2)
  .then(function(response){
    let answer = response.json()
    return answer
    .then(function(answer){
      for(let i=0;i<answer.data.length;i++){
        $('.parks-container').append(`
          <h1>${answer.data[i].fullName}</h1>
          <p>${answer.data[i].description}</p>
          <h2>${answer.data[i].url}</h2>
          <h3 class=${i}address></h3>
          `)
          geocordinates.push(answer.data[i].latLong)
        }
    getAdress(geocordinates)
    })
  })
}

function getAdress(geocordinates){
  for (let i = 0; i<geocordinates.length;i++){
    let latitude = geocordinates[i].replace('lat:','');
    let latitude_only = latitude.split(',')[0]
    let longitude = geocordinates[i].replace('long:','');
    let longitude_only = longitude.substring(longitude.indexOf(",")+1)
    let latitude_final = latitude_only.replace(' ','')
    let longitude_final = longitude_only.replace(' ','')
    let request = new Request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude_final},${longitude_final}&key=AIzaSyDNKJqTTO1ABklWksGvydQ0X2nCpM4yRNY`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
    })
  });

  fetch(request).then(function(response){
    let answer = response.json()
    return answer
    .then(function(answer){
      let address = answer.results[0].formatted_address
      $(`.${i}address`).append(
      `${address}`)
    })
    .catch(function(error){
      console.log(error);
    })
  })
  }
}
