

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

   var token = localStorage.getItem("token");
   console.log(token);


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

});