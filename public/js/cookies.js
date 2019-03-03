// Set cookie.
function setCookie(name, value, expires, path, domain, secure) {
   document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
}

// Just set cookie:
setCookie('name', 'value');
// Set cookie for 1 hour:
date = new Date();
date.setHours(date.getHours() + 1);
setCookie('name', 'value', date.toUTCString());

// Get cookie.
function getCookie(name) {
   var cookie = " " + document.cookie;
   var search = " " + name + "=";
   var setStr = null;
   var offset = 0;
   var end = 0;
   if (cookie.length > 0) {
      offset = cookie.indexOf(search);
      if (offset != -1) {
         offset += search.length;
         end = cookie.indexOf(";", offset)
         if (end == -1) {
            end = cookie.length;
         }
         setStr = unescape(cookie.substring(offset, end));
      }
   }
   return (setStr);
}

// // Example:
// getCookie('name');

// Delete cookie.
function delCookie(name) {
   document.cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

// // Example:
// delCookie('name');