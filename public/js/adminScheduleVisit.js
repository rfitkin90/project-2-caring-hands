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

   // set variable for to be populated with API responses
   var chosenResidentID;
   var visitID;
   var emailConfirmKey = '';


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

   // get chosen resident id
   $(document).on('click', '.resident-card', function (e) {
      e.preventDefault();
      chosenResidentID = $(this).attr('data-residentID');
      console.log('chosenResidentID', chosenResidentID);
      $('.resident-card').css('border', 'none');
      $(this).css({
         'border-width': `${2}px`,
         'border-style': 'solid',
         'border-color': 'rgba(0, 132, 255, 0.63)'
      });


   });

   // submit visit
   $(document).on('click', '#submit-visit', function (e) {
      e.preventDefault();

      // generate random email confirm key
      for (var i = 0; i < 35; i++) {
         var RNG = Math.floor(Math.random() * 15);
         if (RNG === 10) { RNG = 'a' } else if (RNG === 11) { RNG = 'b' } else if (RNG === 12) { RNG = 'c' }
         else if (RNG === 13) { RNG = 'd' } else if (RNG === 14) { RNG = 'e' } else if (RNG === 15) { RNG = 'f' }
         else if (RNG === 16) { RNG = 'g' } else if (RNG === 17) { RNG = 'h' } else if (RNG === 18) { RNG = 'i' }
         else if (RNG === 19) { RNG = 'j' } else if (RNG === 20) { RNG = 'k' } else if (RNG === 21) { RNG = 'l' }
         else if (RNG === 22) { RNG = 'm' } else if (RNG === 23) { RNG = 'n' } else if (RNG === 24) { RNG = 'o' }
         else if (RNG === 25) { RNG = 'p' } else if (RNG === 26) { RNG = 'q' } else if (RNG === 27) { RNG = 'r' }
         else if (RNG === 28) { RNG = 's' } else if (RNG === 29) { RNG = 't' } else if (RNG === 30) { RNG = 'u' }
         else if (RNG === 31) { RNG = 'v' } else if (RNG === 32) { RNG = 'w' } else if (RNG === 33) { RNG = 'x' }
         else if (RNG === 34) { RNG = 'y' } else if (RNG === 35) { RNG = 'z' }
         emailConfirmKey += RNG;
      }
      console.log('emailConfirmKey:', emailConfirmKey)

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
            emailConfirmKey: emailConfirmKey,
            confirmed: false,
            UserId: $('#appointment-request-info').attr('data-userID'),
            ResidentId: chosenResidentID
         }
      })
         .then(function (resp) {
            console.log('visit resp', resp);
            console.log('userid', $('#appointment-request-info').attr('data-userID'));
            console.log('residentid', chosenResidentID)
            visitID = resp.data.id;
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
         },
         data: {
            userEmail: $('#user-info-email').text(),
            visitStart: $('#visitStart').val(),
            visitEnd: $('#visitEnd').val(),
            activity: $('#activity').val(),
            communityServiceForm: $('#communityServiceForm').is(':checked'),
            emailConfirmKey: emailConfirmKey,
            VisitId: visitID
         }
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

