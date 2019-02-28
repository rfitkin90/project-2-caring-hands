$.ajax("/api/users/:id", {
   type: "GET"
}).then(
   function () {
      console.log("");
   }
);

$('#submit-request').on('click', function () {
   var submissionData = {
      availabilityStart: $('#availabilityStart').val().trim(),
      availabilityEnd: $('#availabilityEnd').val().trim(),
      visitDuration: $('#visitDuration').val().trim(),
      activityPreferences: $('#activityPreferences').val().trim(),
      additionalInfo: $('#additionalInfo').val().trim(),
      communityServiceForm: $('#communityServiceForm').val().trim(),
      usersId: "placeholder"
   }

   $.ajax("/api/requests", {
      type: "POST",
      data: submissionData
   }).then(
      function () {
         console.log("");
      }
   );

});