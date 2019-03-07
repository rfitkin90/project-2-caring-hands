$(document).ready(function () {

   // check if this file is loaded
   console.log('adminScheduleVisit.js loaded');

   // get token from local storage
   var token = localStorage.getItem("token");
   console.log('token:', token);

   // get the parameters from the url string
   var url_string = window.location.href;
   var url = new URL(url_string);
   var userId = url.searchParams.get("u");
   var submissionId = url.searchParams.get("s");
   console.log('userId', userId);
   console.log('submissionId', submissionId);


   // get submission by id
   axios({
      url: "/api/submissions/" + submissionId,
      method: "GET",
      headers: {
         Authorization: "Bearer " + token
      }
   })
      .then(function (subResp) {

         // get user by id
         axios({
            url: "/api/user/" + userId,
            method: "GET",
            headers: {
               Authorization: "Bearer " + token
            }
         })
            .then(function (userResp) {
               console.log('subResp.data', subResp.data);
               console.log('userResp.data', userResp.data);

               // populate the appointment request div w/ user & submission info
               $('#appointment-request-info').append(`
                  <h3 id="user-info-name">${userResp.data.firstName} ${userResp.data.lastName}</h3>
                  <p id="user-info-email">${userResp.data.email}</p>
                  <p>Availability Start: ${subResp.data.availabilityStart}</p>
                  <p>Availability End: ${subResp.data.availabilityEnd}</p>
                  <p>Visit Duration: ${subResp.data.visitDuration}</p>
                  <p>Activity Preferences: ${subResp.data.activityPreferences}</p>
                  <p>Additional Info: ${subResp.data.additionalInfo}</p>
                  <p>Needs Community Service Form: ${subResp.data.communityServiceForm}</p>
               `);

               $('#appointment-request-info').attr('data-userID', userResp.data.id);
            })
            .catch(function (err) {
               console.error(err);
            });
         ;

      })
      .catch(function (err) {
         console.error(err);
      });
   ;


   // get all residents info
   axios({
      url: "/api/residents",
      method: "GET",
      headers: {
         Authorization: "Bearer " + token
      }
   })
      .then(function (residentsResp) {

         // for each resident
         residentsResp.data.forEach(residentsElem => {
            console.log(`${residentsElem.firstName}'s info`, residentsElem);

            // get all of their visits
            axios({
               url: "/api/visits/" + residentsElem.id,
               method: "GET",
               headers: {
                  Authorization: "Bearer " + token
               }
            })
               .then(function (visitsResp) {
                  console.log(`${residentsElem.firstName}'s visits`, visitsResp.data);

                  // append a card for each resident
                  $('#residents-div').append(`
                     <div class="card resident-card" id="resident-${residentsElem.id}-card"
                        data-residentID="${residentsElem.id}">

                        <div class="card-body">
                           <h4>${residentsElem.firstName}</h4><span>ID: ${residentsElem.id}</span>
                           <p>Activity Preferences: ${residentsElem.activityPreferences}</p>
                           <p>Scheduled Visits</p>
                           <ul id="resident-${residentsElem.id}-visits"></ul>
                        </div>
                        
                     </div>
                  `);

                  visitsResp.data.forEach(visitsElem => {
                     $(`#resident-${residentsElem.id}-visits`).append(`
                        <li>
                           ${visitsElem.visitStart} - ${visitsElem.visitEnd}
                        </li>
                     `);
                  });
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

   // prefill resident form with resident id
   $(document).on('click', '.resident-card', function (e) {
      e.preventDefault();
      console.log($(this).attr('data-residentID'));

      $('#resident-id').val($(this).attr('data-residentID'));
   });

   // submit visit
   $(document).on('click', '#submit-visit', function (e) {
      e.preventDefault();

      axios({
         url: "/api/visits",
         method: "POST",
         headers: {
            Authorization: "Bearer " + token
         },
         data: {
            visitStart: $('#visitStart').val(),
            visitEnd: $('#visitEnd').val(),
            activity: $('#activity').val(),
            communityServiceForm: $('#communityServiceForm').is(':checked'),
            confirmed: false,
            UserId: $('#appointment-request-info').attr('data-userID'),
            ResidentId: $('#resident-id').val()
         }
      })
         .then(function (resp) {
            console.log('submit request resp', resp);
            console.log('userid', $('#appointment-request-info').attr('data-userID'));
            console.log('residentid', $('#resident-id').val())
         })
         .catch(function (err) {
            console.error(err);
         });
      ;

      axios({
         url: "/api/sendemail",
         method: "POST",
         headers: {
            Authorization: "Bearer " + token
         }
         // data: {
         //    visitStart: $('#visitStart').val(),
         //    visitEnd: $('#visitEnd').val(),
         //    activity: $('#activity').val(),
         //    communityServiceForm: $('#communityServiceForm').is(':checked'),
         //    confirmed: false,
         //    UserId: $('#appointment-request-info').attr('data-userID'),
         //    ResidentId: $('#resident-id').val()
         // }
      })
         .then(function (resp) {
            console.log(resp);
         })
         .catch(function (err) {
            console.error(err);
         });
      ;



   });

});

