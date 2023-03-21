(function () {
    let scrollers = [];

    // Constructor function
    function Scroller() {}

    // Sets scroll method on the prototype of Scroller class
    Scroller.prototype.scroll = function() {
        let self = this;
        let target = this.target;
        let time = this.time;
        let targetY = document.getElementById(target).offsetTop;
        let doc = document.documentElement;
        let winY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        let start = new Date().getTime();
        let timer = setInterval(function() {
            let step = Math.min(1, (new Date().getTime() - start)/time); 
            window.scrollTo(0, winY + easingPattern(self.easing, step)*(targetY - winY));
            step === 1 && clearInterval(timer);
        }, 25);
    };

    // Sets setProps method on the prototype of Scroller class
    Scroller.prototype.setProps = function( settings ) {
        for (let key in settings) { 
            this[key] = settings[key]; 
        }
    };

    // Utility to extend or clone an object
    function extend(extension, obj) { 
        for (let key in extension){ 
            obj[key] = extension[key]; 
        } 
    }

    // Instantiate Scroller class for each smooth scroll link
    function addScrollers() {
        let items = document.querySelectorAll('.smooth-scroll');
        let str;
        let settings = {};
        
        for (let i = 0; i < items.length; i++ ) {
            extend( new Scroller(), items[i] );
            str = items[i].getAttribute('data-time'); 
            settings.time = parseInt(str); 
            settings.target = items[i].getAttribute('data-target');
            settings.easing = 'easeInOutQuart';
            items[i].setProps(settings); 
            scrollers.push( items[i] );
        }
    }

    // Binds click event to smooth scroll links
    function bindEvent() {
        for (let i = 0; i < scrollers.length; i++ ) {
            scrollers[i].addEventListener('click', function(event) {
                event.preventDefault();
                this.scroll();  
            }, false);
        }
    }

    // Runs on page load
    function init() {
        addScrollers();
        bindEvent();
    }

    window.addEventListener('load', init, false);
})();

