;(function() {
    function setMainNav() {
        let pages = [
            {name: 'index', label: 'Home'},
            {name: 'current-issue', label: 'Current issue'},
            {name: 'past-issues', label: 'Past issues'},
            {name: 'articles', label: 'Articles'},
            {name: 'subscribe', label: 'Subscribe'}
        ];
        let mainNav = document.getElementById('main-nav-items');
        let navItems = mainNav.getElementsByClassName('nav-item');
        let mainNavLinks = mainNav.getElementsByClassName('main-nav-link');
        let location = document.location.href;
        let value = location.match(/\/.+?html/g);
        
        // Loads main nav items
        for (let page of pages) {
            mainNav.innerHTML += '<li class="nav-item"><a class="button button-secondary-grey main-nav-link" href="' + page.name + '.html">' + page.label + '</a></li>'
        }
        
        // Makes current link active
        for (let i = 0; i < mainNavLinks.length; i++) {
            let href = mainNavLinks[i].getAttribute('href');
            if (value) {
                if (value[0].indexOf(href) > -1) {
                   navItems[i].classList.add('active');
                }
            } else {
                if (i === 0) {
                    navItems[0].classList.add('active');
                }
            }
        }
    }
    
    window.addEventListener('load', setMainNav, false);
}());
