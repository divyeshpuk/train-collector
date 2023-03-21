;(function() {
    // Gets site logo png base64 data on page load
    function loadSiteLogo() {
        let file = 'data/site-logo.txt';
        
        fetch(file)
          .then((response) => response.text())
          .then((data) => {
            let img = document.getElementById('site-logo-img');
            img.src = data;
            img.classList.remove('hidden');
        }); 
    }
    
    // Gets svg icons xml template on page load
    function loadIcons() {
        let file = 'templates/icons.xml';
        
        fetch(file)
          .then((response) => response.text())
          .then((data) => {
            let el = document.getElementById('svg-icons');
            el.innerHTML = data;
        });
    }
    
    window.addEventListener('load', loadSiteLogo, false);
    window.addEventListener('load', loadIcons, false);
}());
