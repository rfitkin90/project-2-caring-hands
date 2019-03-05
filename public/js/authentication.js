$(document).ready(function () {
   console.log("authentication.js loaded!");

   var token = getCookie('token');
   // Store
   localStorage.setItem("token", token);
   var firstName = getCookie('firstName');
   console.log(`token: ${token}`);
   console.log(`firstName: ${firstName}`);

   if (token) {
      updateBodyClass('authenticated');
      updateNavigation(firstName);


      var payload = JSON.parse(window.atob(token.split('.')[1]));
      console.log('payload', payload);
      if (payload.role && payload.role === 'admin') {
         // Do admin things!
         updateBodyClass('role-admin');
         $('#approve-requests-li').css({ 'visibility': 'visible' });


      } else if (payload.role !== 'admin') {
      }

   }


   $('#logout-btn').on('click', function () {
      // clear token cookie
      clearUserCookie();

      // reload the page
      location.reload();
   });

});

function updateBodyClass(newClass) {
   // change body class to apply different css
   $('body').addClass(newClass);
}

function updateNavigation(firstName) {
   $('#nav-welcome-msg').text(`Welcome, ${firstName}!`);
}

function clearUserCookie() {
   delCookie('firstName');
   delCookie('token');
}