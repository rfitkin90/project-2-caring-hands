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


         });

      })
      .catch(function (err) {
         console.error(err);
      });
   ;

{/* <div class="card" style="width: 18rem;">
   <img class="card-img-top"
      src="https://www.catholiccharitiesusa.org/wp-content/uploads/2018/04/Story_Meals-on-Wheels-for-Senior-Citizens-1024x512.jpg"
      height="150" alt="Card image cap" />
   <div class="card-body">
      <h5 class="card-title">Maggie</h5>
      <p class="card-text">Maggie loves to listen to music and hear a good story. She is very pleasant to sit
      with and enjoys books.</p>
      <a href="#" class="btn btn-primary">Schedule Visit</a>
   </div>
</div> */}


});