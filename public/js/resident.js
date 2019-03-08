$(document).ready(function () {

   // get the token
   var token = localStorage.getItem("token");
   console.log(token);

   // redefine payload
   var payload = JSON.parse(window.atob(token.split('.')[1]));
   console.log('resident payload', payload)

   // create add residents button for admin
   if (payload.role === 'admin') {
      $('#add-residents-row').append(`
         <span onclick="document.getElementById('id03').style.display='block'" 
            class="btn btn-primary" id="add-resident-btn">Add Resident</span>
      `)
   }

   // get all residents info
   axios({
      url: "/api/residents",
      method: "GET",
      headers: {
         Authorization: "Bearer " + token
      }
   })
      .then(function (resp) {

         // for each resident
         resp.data.forEach(elem => {
            console.log(`${elem.firstName}'s info`, elem);

            // append their card to the flexbox
            $('#residents-flexbox').append(`
               <div class="card resident-card" id="resident-${elem.id}-card" style="width: 18rem;">
                  <img class="card-img-top"
                     src="${elem.photo}"
                     height="150" alt="Card image cap" />
                  <div class="card-body" id="resident-${elem.id}-body">
                     <h5 class="card-title">${elem.firstName}</h5>
                     <p class="card-text">${elem.additionalInfo}</p>
                     <a href="./submissionForm.html?r=${elem.firstName}" 
                        class="btn btn-primary">Schedule Visit</a>
                  </div>
               </div>
            `);

            if (payload.role === 'admin') {
               $(`#resident-${elem.id}-body`).append(`
                  <span onclick="document.getElementById('id04').style.display='block'" 
                     class="btn btn-primary" id="edit-resident-button" data-residentID="${elem.id}" data-residentName = ${elem.firstName}>Edit</span>
               `);
            }

         });

      })
      .catch(function (err) {
         console.error(err);
      });
   ;

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
   
   //onclick function to add a new resident
   $(document).on('click', '#add-resident-submit', function (e) {
      e.preventDefault();
      // create empty array for check values
      var checkArr = [];

      // check to see if each box is checked; push only the checked ones to array
      for (var i = 1; i < 11; i++) {
         if ($(`#checkbox${i}`).attr('class') === 'checkbox checked') {
            var activity = $(`#checkbox${i}`).text();
            checkArr.push(activity);
         }
      }

      // create string out of array
      var checkArrString = checkArr.toString();
      console.log(checkArrString);
      
      // get new resident values from form
      var residentName = $('#add-resident-name').val();
      var residentAge = $('#add-resident-age').val();
      var residentAdditionalInfo = $('#add-resident-additional-info').val();
      var residentPhoto = $('#add-resident-photo').val();

      // post new resident to database
      axios({
         url: "/api/residents",
         method: "POST",
         headers: {
            Authorization: "Bearer " + token
         },
         data: {
            firstName: residentName,
            age: residentAge,
            activityPreferences: checkArrString,
            additionalInfo: residentAdditionalInfo,
            photo: residentPhoto
         }
      })
         .then(function (resp) {
            console.log('new resident data:', resp.data);
         })
         .catch(function (err) {
            console.error(err);
         });
      ;

   });

   //onclick function to edit a resident's info
   $(document).on('click','#edit-resident-button', function (e) {
      e.preventDefault();
      console.log("hello");
     // var residentNameToEdit = $(this).attr("data-name");
      var residentsNameToEdit = $(this).attr("data-residentName");
     
      $('#edit-resident-name').val(residentsNameToEdit);
      //onclick function for edit button inside modal
      $(document).on('click','#edit-resident-submit', function (e) {
      
     
      // create empty array for check values
      var checkArrEdit = [];

      // check to see if each box is checked; push only the checked ones to array
      for (var i = 1; i < 11; i++) {
         if ($(`#chkbox${i}`).attr('class') === 'checkbox checked') {
            var activity = $(`#chkbox${i}`).text();
            checkArrEdit.push(activity);
         }
      }
      // create string out of array
      var checkArrString = checkArrEdit.toString();
      console.log(checkArrString);

      var residentName = residentsNameToEdit; 
      var residentAge = $('#edit-resident-age').val();
      var residentAdditionalInfo = $('#edit-resident-additional-info').val();
      var residentPhoto = $('#edit-resident-photo').val();
      
      //update the current resident's info to database
      axios({
            url: "/api/residents",
            method: "PUT",
            headers: {
               Authorization: "Bearer " + token
            },
            data: {
               firstName: residentName,
               age: residentAge,
               activityPreferences: checkArrString,
               additionalInfo: residentAdditionalInfo,
               photo: residentPhoto
            }
         })
            .then(function (resp) {
               console.log("updated resident's data:", resp.data);
            })
            .catch(function (err) {
               console.error(err);
            });

         });
      ;
    

    });

});
