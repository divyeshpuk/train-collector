;(function() {
    let page = document.getElementById('page');
    let navItems = document.getElementById('gallery-nav-items').getElementsByTagName('li');
    let navItemWidth = null;
    let lastIndex = 0;
    let article = document.getElementById('article');
    let contents = document.getElementById('contents');
    let redline = document.getElementById('redline');
    let collection = [];
    let newContext = true;
    let timer = null;

    // Slides the red line towards the active nav item
    function slideLine(index) {
        let time = 1000;
        let targetX = parseInt(index) * navItemWidth;
        let lineX = parseInt(redline.style.marginLeft);
        let start = new Date().getTime();
        
        clearInterval(timer);
        
        // Starts the animation
        timer = setInterval(function() {
            let step = Math.min(1, (new Date().getTime() - start)/time); 
            redline.style.marginLeft = (lineX + (easingPattern('easeOutQuad', step)*(targetX - lineX))) + 'px';
            step === 1 && clearInterval(timer);
        }, 25);   
    }

    // Places the red line underneath the active nav item on page load
    function placeLine(index) {
        let targetX = parseInt(index) * navItemWidth;
        redline.style.marginLeft = targetX + 'px';
    }

    // Sets active class using the nav item index
    function setActiveBtn(index) {
        navItemWidth = page.offsetWidth / 8;
        redline.style.width = (navItemWidth - 1) + 'px';
        navItems[lastIndex].classList.remove('active');
        navItems[index].classList.add('active');
        lastIndex = index;
    }

    // Populates details from data
    function showDetails(index) {
        article.innerHTML = '';
        article.innerHTML = '<div class="row row-content"><div class="col col-100"><h1>' + collection[index]["headline"] + '</h1></div><div class="col col-75 col-md-75"><div class="gallery-issue-text"><p>' + collection[index]["description"] + '</p></div><a href="" class="gallery-issue-button button button-secondary-white"><span>Download sample copy</span><svg class="button-icon"><use href="#arrow-down" xlink:href="#arrow-down"/></svg></a></div><div class="col col-25 col-md-25 text-right"><img alt="Train Collector ' + collection[index]["button"] + '" class="image" src="' + collection[index]["path"] + '"/></div></div>';
        contents.innerHTML = '';
        
        for (let i=0; i < collection[index]['contents'].length; i++) {
            contents.innerHTML += '<li class="col col-50 list-item white-bullet"><span class="list-item-text">' + collection[index]["contents"][i] + '</span></li>';
        }
    }

    // Runs on nav item click, on page load and on Window resize
    function setView() {
        let id = location.hash ? location.hash.substr(1) : 0;
        
        setActiveBtn(id);
        
        if (newContext) {
            // page load
            placeLine(id);
            newContext = false;
        }
        else {
            slideLine(id);
        }
        
        showDetails(id);
    }
    
    // Gets data and sets the view on page load
    function loadFile() {
        let file = 'data/gallery.json';
        
        fetch(file)
          .then((response) => response.json())
          .then((data) => {
            // Sets nav buttons
            loadList(data);
            // Gets data
            collection = data.gallery;
            // Sets view
            setView();
        });
    }
    
    // Populates nav items on page load
    function loadList(data) {
        let el = document.getElementById('gallery-nav-items');
        
        for (let i = 0; i < data.gallery.length; i++) {
            el.innerHTML += '<li class="gallery-nav-item"><a class="gallery-nav-link" href="#' + i + '">' + data.gallery[i].button + '</a></li>';
        }
    }

    window.addEventListener('load', loadFile, false);
    window.addEventListener('hashchange', setView, false);
    window.addEventListener('resize', function(e) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        // Resizing has "stopped"
        // Sets view
        setView();
      }, 250);
    }, false);
}());