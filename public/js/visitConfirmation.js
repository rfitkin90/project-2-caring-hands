$(document).ready(function () {

   // get token from local storage
   var token = localStorage.getItem("token");
   console.log('token:', token);

   // get the parameters from the url string
   var url_string = window.location.href;
   var url = new URL(url_string);
   var confirmationKey = url.searchParams.get("k");
   var confirmAction = url.searchParams.get("c");
   console.log('confirmationKey:', confirmationKey);
   console.log('confirmAction:', confirmAction);

   // if user clicked on confirm link, set their appointment to confirmed so it doesn't get deleted
   if (confirmAction == '1') {
      console.log('updating visit');

      axios({
         url: "api/visits/" + confirmationKey,
         method: "PUT",
         headers: {
            Authorization: "Bearer " + token
         }
      })
         .then(function (resp) {
            console.log(resp);
         })
         .catch(function (err) {
            console.error(err);
         });
      ;

      $('#action-msg').text('Your appointment has been confirmed.');
      redirectTimer();


      // if user clicked on cancel link, delete their appointment
   } else if (confirmAction == '0') {

      axios({
         url: "api/visits/" + confirmationKey,
         method: "DELETE",
         headers: {
            Authorization: "Bearer " + token
         }
      })
         .then(function (resp) {
            console.log(resp);
         })
         .catch(function (err) {
            console.error(err);
         });
      ;


      $('#action-msg').text('Your appointment has been cancelled.');
      redirectTimer();
   }

   function redirectTimer() {
      setTimeout(function () { $('#redirect-timer').text('4') }, 1000);
      setTimeout(function () { $('#redirect-timer').text('3') }, 2000);
      setTimeout(function () { $('#redirect-timer').text('2') }, 3000);
      setTimeout(function () { $('#redirect-timer').text('1') }, 4000);
      setTimeout(function () { window.location.href = '/' }, 5000);
   }
});