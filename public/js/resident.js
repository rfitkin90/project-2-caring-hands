$(document).ready(function () {

   // get the token
   var token = localStorage.getItem("token");
   console.log(token);

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
               <div class="card resident-card" style="width: 18rem;">
                  <img class="card-img-top"
                     src="${elem.photo}"
                     height="150" alt="Card image cap" />
                  <div class="card-body">
                     <h5 class="card-title">${elem.firstName}</h5>
                     <p class="card-text">${elem.additionalInfo}</p>
                     <a href="./submissionForm.html?r=${elem.firstName}" 
                        class="btn btn-primary">Schedule Visit</a>
                  </div>
               </div>
            `);

         });

      })
      .catch(function (err) {
         console.error(err);
      });
   ;

});