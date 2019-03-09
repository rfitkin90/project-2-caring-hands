var token = localStorage.getItem("token");
console.log(token);


// get the parameters from the url string
var url_string = window.location.href;
var url = new URL(url_string);
var residentFirstName = url.searchParams.get("r");

console.log('res first name url param', residentFirstName);

if (residentFirstName) {
   console.log('prefilling info textfield');
   $('#additionalInfo').text(`Requesting to visit ${residentFirstName}.`);
}

$('.checkbox').on('click', function () {
   var checkClass = $(this).attr('class');

   // check the box
   if (checkClass === 'checkbox unchecked') {
      $(this).attr({ 'class': 'checkbox checked' });

      // uncheck the box
   } else if (checkClass === 'checkbox checked') {
      $(this).attr({ 'class': 'checkbox unchecked' });
   }
});



// $('#communityServiceForm').on('click', function () {
//    console.log('checked?', $(this).is(':checked'));
// })

$('#submit-visit-request').on('click', function (e) {
   e.preventDefault();
   var checkArr = [];




   // get the which activities are checked and put them in a string
   for (var i = 1; i < 11; i++) {
      if ($(`#checkbox${i}`).attr('class') === 'checkbox checked') {
         var activity = $(`#checkbox${i}`).text();
         checkArr.push(activity);
      }
   }
   var checkArrString = checkArr.toString();
   console.log(checkArrString);

   var availabilityStart = $('#availabilityStart').val();
   var availabilityEnd = $('#availabilityEnd').val();
   var visitDuration = $('#visitDuration').val();
   var additionalInfo = $('#additionalInfo').val();
   var communityServiceForm = $('#communityServiceForm').is(':checked');

   if (availabilityStart) availabilityStart.trim();
   if (availabilityEnd) availabilityEnd.trim();
   if (visitDuration) visitDuration.trim();
   if (additionalInfo) additionalInfo.trim();


   if (availabilityStart && availabilityEnd) {
      axios({
         url: "/api/submissions",
         method: "POST",
         headers: {
            Authorization: "Bearer " + token
         },
         data: {
            availabilityStart: availabilityStart,
            availabilityEnd: availabilityEnd,
            visitDuration: visitDuration,
            activityPreferences: checkArrString,
            additionalInfo: additionalInfo,
            communityServiceForm: communityServiceForm,
         }
      })
         .then(function (resp) {
            console.log('submit request resp', resp);
         })
         .catch(function (err) {
            console.error(err);
         });
      ;

      // clear form
      $('#availabilityStart').val('');
      $('#availabilityEnd').val('');
      $('#visitDuration').val('');
      $('#additionalInfo').val('');

   } else {
      alert('Please specify availability.');
      $('.modal').hide();
   }



});