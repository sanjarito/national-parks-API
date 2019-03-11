// console.log('hello')
let state_array = [];

$('.state-input').on('click',function(event){
  event.preventDefault()

  $('.parks-container').empty()
  const state_values = $('.multiple-state')
  for (let i =0; i<state_values[0].selectedOptions.length;i++){
  const state_selection = state_values[0].selectedOptions[i].computedName
  state_array.push(state_selection)

  }
  console.log(state_array)
  const max_results = $('.max-results').val()

  let state_string = state_array.toString()



  getParks(state_string,max_results)


  // $('.state-input').on('click',function(){
  //   console.log(state_selection)
  //
  // })
})

function getParks(state_string,max_results){
  console.log('getparks function debug')
  let limit_results = max_results -1
  const geocordinates = []

  let parks_url = `https://developer.nps.gov/api/v1/parks?stateCode=CA+&limit=3`
  let parks_url2 = `https://developer.nps.gov/api/v1/parks?stateCode=${state_string}+&limit=+${limit_results}`
  let request = new Request(parks_url, {
  method: 'GET',
	mode: 'cors',
	headers: new Headers({
		'X-Api-Key': '3CXESj6FPvSAowQ1dKe2xVYlUV5GQIb6Q5E5ecGy'
	})
});
  fetch(request).then(function(response){
    let answer = response.json()
    return answer
    .then(function(answer){
      console.log(answer.data)
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
  console.log(geocordinates)
  for (let i = 0; i<geocordinates.length;i++){
    // console.log(geocordinates[i].toString())
    let latitude = geocordinates[i].replace('lat:','');
    let latitude_only = latitude.split(',')[0]


    let longitude = geocordinates[i].replace('long:','');
    let longitude_only = longitude.substring(longitude.indexOf(",")+1)
    let latitude_final = latitude_only.replace(' ','')
    let longitude_final = longitude_only.replace(' ','')
    // let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude_final},${longitude_final}`
    // let string_url = url.toString()
    // string_url.replace(/\s/g, "")
    // console.log(url)
    let request = new Request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude_final},${longitude_final}&key=AIzaSyDNKJqTTO1ABklWksGvydQ0X2nCpM4yRNY`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
    })
  });

  fetch(request).then(function(response){
    console.log(request)
    let answer = response.json()
    return answer
    .then(function(answer){
      let address = answer.results[0].formatted_address
      $(`.${i}address`).append(
      `${address}`)
    })
  })
  }
}
