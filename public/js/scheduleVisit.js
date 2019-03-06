$(document).ready(function () {

   // check if this file is loaded
   console.log('approveRequests.js loaded');

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
                  <h3>${userResp.data.firstName} ${userResp.data.lastName}</h3>
                  <p>${userResp.data.email}</p>
                  <p>Availability Start: ${subResp.data.availabilityStart}</p>
                  <p>Availability End: ${subResp.data.availabilityEnd}</p>
                  <p>Visit Duration: ${subResp.data.visitDuration}</p>
                  <p>Activity Preferences: ${subResp.data.activityPreferences}</p>
                  <p>Additional Info: ${subResp.data.additionalInfo}</p>
                  <p>Needs Community Service Form: ${subResp.data.communityServiceForm}</p>
               `);
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
                     <div class="card resident-card" id="resident-${residentsElem.id}-card">

                        <div class="card-header">
                           <h4>${residentsElem.firstName}</h4>
                        </div>

                        <div class="card-body">
                           <p>Activity Preferences: ${residentsElem.activityPreferences}</p>
                        </div> 

                        <div class="card-footer">
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

});
