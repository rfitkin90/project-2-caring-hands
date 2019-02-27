function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
      'apiKey': 'AIzaSyD7ygsN04i6aDGYF_j3RbXcfixkIO10vig',
      // Your API key will be automatically added to the Discovery Document URLs.
      'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
      // clientId and scope are optional if auth is not required.
      'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      'scope': 'profile',
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
      });
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  };
  // 1. Load the JavaScript client library.
  gapi.load('client', start);
    










// // Refer to the JavaScript quickstart on how to setup the environment:
// // https://developers.google.com/calendar/quickstart/js
// // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// // stored credentials.

// var event = {
//     'summary': 'Google I/O 2015',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//       'dateTime': '2015-05-28T09:00:00-07:00',
//       'timeZone': 'America/Los_Angeles'
//     },
//     'end': {
//       'dateTime': '2015-05-28T17:00:00-07:00',
//       'timeZone': 'America/Los_Angeles'
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'attendees': [
//       {'email': 'lpage@example.com'},
//       {'email': 'sbrin@example.com'}
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         {'method': 'email', 'minutes': 24 * 60},
//         {'method': 'popup', 'minutes': 10}
//       ]
//     }
//   };
  
//   var request = gapi.client.calendar.events.insert({
//     'calendarId': 'primary',
//     'resource': event
//   });
  
//   request.execute(function(event) {
//     appendPre('Event created: ' + event.htmlLink);
//   });
  