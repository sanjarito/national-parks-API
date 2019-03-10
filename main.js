console.log('hello')
const state_array = [];

$('.state-input').on('click',function(){
  event.preventDefault();
  const state_values = $('.multiple-state')
  for (let i =0; i<state_values[0].selectedOptions.length;i++){
  const state_selection = state_values[0].selectedOptions[i].computedName
  state_array.push(state_selection)

  }
  const max_results = $('.max-results').val()

  let state_string = state_array.toString()
  console.log(state_string)

  getParks(state_string,max_results)


  // $('.state-input').on('click',function(){
  //   console.log(state_selection)
  //
  // })
})

function getParks(state_string,max_results){
  var request = new Request('https://developer.nps.gov/api/v1/parks?stateCode=CA', {
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
    })

  })

}
