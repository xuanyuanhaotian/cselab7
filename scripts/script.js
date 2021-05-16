// script.js
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let header = document.querySelector('h1');
let settingsIcon = document.querySelector('img');
// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let i = 1;
      entries.forEach(entry => {
        let num = i;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        //creating a state with its state, entry text, and entry number
        newPost.onclick = function () {
          setState({pageState: "Entry", entry: entry, entryCount: num},  false);
        }
        i += 1;
        document.querySelector('main').appendChild(newPost);
      });
    });
    setState({pageState: "home"}, false);
});
//allows back button to fire
window.addEventListener('popstate', (event) => {
  setState(event.state, true);
})
//go back to the main page
header.addEventListener('click', ()=> {
    setState({pageState: "Home"}, false);
});
//go to settings page
settingsIcon.addEventListener('click', ()=> {
  setState({pageState: "Settings"}, false);
});