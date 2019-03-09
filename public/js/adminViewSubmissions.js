$(document).ready(function () {


   console.log('adminViewSubmissions.js loaded');

   var token = localStorage.getItem("token");
   console.log('token:', token);

   var submissionsArr = [];

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
            // push it to submissionArr
            submissionsArr.push(elem);

         });

         // sort the submissions array by availability end date
         function compare(a, b) {
            if (moment(a.availabilityEnd).format('X') < moment(b.availabilityEnd).format('X'))
               return -1;
            if (moment(a.availabilityEnd).format('X') > moment(b.availabilityEnd).format('X'))
               return 1;
            return 0;
         }
         submissionsArr.sort(compare);
         console.log('sorted submissionsArr', submissionsArr);

         // for each submission in the sorted array
         submissionsArr.forEach(elem => {

            // and get the appointment's user's info by foreign key
            axios({
               url: "/api/user/" + elem.UserId,
               method: "GET",
               headers: {
                  Authorization: "Bearer " + token
               }
            })
               .then(function (userResp) {


                  console.log('elem', elem);

                  var momentStartTime = moment(elem.availabilityStart).format("dddd, MMMM Do YYYY<br> h:mm a");
                  var momentEndTime = moment(elem.availabilityEnd).format("h:mm a");

                  // append each appointment request
                  console.log('userResp', userResp);
                  $('#approve-body').append(`
                  <button class="card individual-request" 
                     data-submissionId="${elem.id}" data-userId="${userResp.data.id}">

                     <div class="card-body">
                        <h4>${userResp.data.firstName} ${userResp.data.lastName}</h4>
                        <p>${userResp.data.email}</p>
                        <p><strong>Availability:</strong> ${momentStartTime} - ${momentEndTime}</p>
                     </div>

                  </button>
                  `);

               })
               .catch(function (err) {
                  console.error(err);
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
      ./adminScheduleVisit.html?u=${$(this).attr('data-userId')}&s=${$(this).attr('data-submissionId')}
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