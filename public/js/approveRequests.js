$(document).ready(function () {


   console.log('approveRequests.js loaded');

   var token = localStorage.getItem("token");
   console.log('token:', token);

   // getting all appointment requests
   axios({
      url: "/api/submissions",
      method: "GET",
      headers: {
         Authorization: "Bearer " + token
      }
   })
      .then(function (subResp) {
         // console.log('get submissions resp:', subResp.data);

         // for each appointment request
         subResp.data.forEach(elem => {
            // get the appointment's user's info by foreign key
            axios({
               url: "/api/user/" + elem.UserId,
               method: "GET",
               headers: {
                  Authorization: "Bearer " + token
               }
            })
               .then(function (userResp) {

                  // convert date/time formats
                  var monthNameArr = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
                  // start date
                  var startDate = elem.availabilityStart.split('T')[0];
                  var startDateArr = startDate.split('-');
                  var startDateString = `
                     ${monthNameArr[Number(startDateArr[1]) - 1]} ${startDateArr[2]}, ${startDateArr[0]}`;
                  // start time
                  var startTime = elem.availabilityStart.split('T')[1];
                  var startTimeArr = startTime.split(':');
                  if (startTimeArr[0] <= 12) {
                     var startTimeString = `${startTimeArr.join(':')} AM`
                  } else {
                     startTimeArr[0] -= 12;
                     var startTimeString = `${startTimeArr.join(':')} PM`
                  }
                  // end date
                  var endDate = elem.availabilityEnd.split('T')[0];
                  var endDateArr = endDate.split('-');
                  var endDateString = `
                     ${monthNameArr[Number(startDateArr[1]) - 1]} ${endDateArr[2]}, ${endDateArr[0]}`;
                  // end time
                  var endTime = elem.availabilityEnd.split('T')[1];
                  var endTimeArr = endTime.split(':');
                  if (endTimeArr[0] <= 12) {
                     var endTimeString = `${endTimeArr.join(':')} AM`
                  } else {
                     endTimeArr[0] -= 12;
                     var endTimeString = `${endTimeArr.join(':')} PM`
                  }

                  // append each appointment request
                  console.log('userResp', userResp);
                  $('#approve-body').append(`
                  <button class="card individual-request" 
                     data-submissionId="${elem.id}" data-userId="${userResp.data.id}">

                     <div class="card-body">
                        <h4>${userResp.data.firstName} ${userResp.data.lastName}</h4>
                        <p>${userResp.data.email}</p>
                        <p>Availability Start: ${startDateString}, ${startTimeString}</p>
                        <p>Availability End: ${endDateString}, ${endTimeString}</p>
                     </div>

                  </button>
               `);
               });
            ;
         });

      })
      .catch(function (err) {
         console.error(err);
      });
   ;

});

// on click to send admin to new approval page with user and submission ids passed as url parameters
$(document).on('click', '.individual-request', function (e) {
   e.preventDefault();
   window.location.href = `
      ./scheduleVisit.html?u=${$(this).attr('data-userId')}&s=${$(this).attr('data-submissionId')}
   `;
});


// find out how to return 4 different things
// function reformatDateTime() {
//    var monthNameArr = ['January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'];

//    // convert date/time formats
//    // start date
//    var startDate = elem.availabilityStart.split('T')[0];
//    var startDateArr = startDate.split('-');
//    var startDateString = `
//    ${monthNameArr[Number(startDateArr[1]) - 1]} ${startDateArr[2]}, ${startDateArr[0]}`;
//    // start time
//    var startTime = elem.availabilityStart.split('T')[1];
//    var startTimeArr = startTime.split(':');
//    if (startTimeArr[0] <= 12) {
//       var startTimeString = `${startTimeArr.join(':')} AM`
//    } else {
//       startTimeArr[0] -= 12;
//       var startTimeString = `${startTimeArr.join(':')} PM`
//    }
//    // end date
//    var endDate = elem.availabilityEnd.split('T')[0];
//    var endDateArr = endDate.split('-');
//    var endDateString = `
//    ${monthNameArr[Number(startDateArr[1]) - 1]} ${endDateArr[2]}, ${endDateArr[0]}`;
//    // end time
//    var endTime = elem.availabilityEnd.split('T')[1];
//    var endTimeArr = endTime.split(':');
//    if (endTimeArr[0] <= 12) {
//       var endTimeString = `${endTimeArr.join(':')} AM`
//    } else {
//       endTimeArr[0] -= 12;
//       var endTimeString = `${endTimeArr.join(':')} PM`
//    }
// }