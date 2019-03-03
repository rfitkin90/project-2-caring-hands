$( document ).ready(function() {
    console.log( "ready!" );

     // Get the modal
     var modal = document.getElementById('id01');
     var modal2 = document.getElementById('id02');
 
     // When the user clicks anywhere outside of the modal, close it
     window.onclick = function (event) {
         if (event.target == modal) {
             modal.style.display = "none";
         } else if (event.target == modal2) {
             modal2.style.display = "none";
         }
     }
     
     //onclick function for signup page
     $("#submit").on("click", function(e) {
             e.preventDefault();
             var firstName = $("#fname").val().trim();
             var lastName = $("#lname").val().trim();
             var email = $("#email").val().trim();
             var password = $("#password").val().trim();
             var confirmPassword = $("#confirmPassword").val().trim();
 
             if(password === confirmPassword){
                 console.log("password match");
                 axios.post("/auth/signup", {
                     firstName: firstName,
                     lastName: lastName,
                     email: email,
                     password:password
                 }).then(function(resp){
                     console.log(resp);
                     // window.location.assign("/login");
                 }).catch(function(err){
                     console.error(err);
                 });
             }
             else{
                 alert("password does not match.");
            }  
        });
        
        
       //onclick function for login page
        $("#login-submit").on("click", function (e) {
            e.preventDefault();
            var email = $("#login-email").val();
            var password = $("#login-pass").val();

            axios.post("/auth/login", {
                email: email,
                password: password
            })
            .then(function (resp) {
                    console.log(resp);
                    window.localStorage.setItem("token", resp.data.token);
                    $(".login").hide();
                    $(".redirect").show();
                    window.setTimeout(function () {
                        window.location.assign("/index.html")
                    }, 2000)
            })
            .catch(function (err) {
                console.error(err);
            });
        });
        //jwt authorisation
        var token = window.localStorage.getItem("token");
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        if(token) {
            axios({
                url: "/api/protect",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(function(resp) {
                console.log(resp)
            })
            .catch(function(err) {
                console.error(err);
            })
        }
        console.log(payload);
});