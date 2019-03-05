

axios({
   url: "/api/submissions/id",
   method: "GET"
})
   .then(function (resp) {
      console.log('submit request resp', resp);
   })
   .catch(function (err) {
      console.error(err);
   });
;