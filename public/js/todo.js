if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful.');
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed!');
      });
    });
  }else{
    console.log("ServiceWorker Not Supported on browser.");
  }