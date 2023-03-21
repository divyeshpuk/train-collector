;(function() {
    let page = document.getElementById('page');
    let carousel = document.getElementById('carousel');
	let pics = carousel.getElementsByClassName('carousel-item');
    let imgs = carousel.getElementsByTagName('img');
	let navItems = document.getElementById('carousel-nav-items').getElementsByTagName('li');
	let nxt = 1;
	let picId = 0;
	let show = false;
	let timer = null;
    let slideTimer = null;
	let ready = true;
	let allevents = false;

    // Slides the image. Right to left is default direction.
	function slidepic(direction) {	
        if (ready) {
			ready = false;
			let pic1;
			let pic2;
			let curr = nxt - 1;
            
            // Resets current pic to 0
			if (curr === -1) {
                curr = 0;
            } 
            
            navItems[curr].classList.remove('active');
		
			if (show) {
                // Sets pic from collection using pic id
				pic1 = pics[picId];	
				pic2 = pics[curr];
				nxt = picId;
				show = false;
			} else {
                // Resets next number to 0 after each cycle
				if (nxt === pics.length) {
                    nxt = 0;
                }
                
                // Resets current number after each cycle
				if (nxt === 0) {
                    curr = pics.length - 1;
                }
                
                // Resets next and current pics
				pic1 =  pics[nxt];
				pic2 =  pics[curr];
			}
            	
			pic1.style.display = 'block';
			pic2.style.left = '0px';
		
            // Sets the next image ready on the edge of the page
            let left1 = page.offsetWidth;
            // Sets the current image on the page
			let left2 = 0;
            // Gets a fraction of the full page width.
            let fract = page.offsetWidth / 256;
            // Sets the fraction as increment for animation
			let incr = fract * -1;
		
			if (direction === 'l') {
				left1 = page.offsetWidth * -1;
				incr = fract;
			}

			clearInterval(slideTimer);
			slideTimer = null;

            // Starts the animation
			slideTimer = setInterval(function () {
                navItems[nxt-1].classList.add('active');

				if ( left1 <= (fract * -1) || left1 >= fract) {
					left1 += incr; 
					left2 += incr;
					pic1.style.left = left1 + 'px'; 
					pic2.style.left = left2 + 'px'; 
				}
				else {
					pic2.style.display = 'none';
					ready = true;
				}
			}, 1);
			nxt++;
        }
	}

    // Runs when nav item is clicked
	function showpic(id) {
		if (id === nxt - 1) { 
			// picId = nxt;
        } else {
            clearInterval(timer);
            timer = null;
            // Sets pic id from nav item index
            picId = id;
            show = true;

            if (id > nxt - 1) {
                // Sets direction right to left
                slidepic('r');
            }

            if (id < nxt - 1) {
                // Sets direction left to right
                slidepic('l');
            }

            timer = setInterval(slidepic, 4000);
		}
	}

    // Runs on Window resize and on page load
	function startCarousel() {
		clearInterval(timer);
		timer = null;
		timer = setInterval(slidepic, 4000);
	}
    
    // Runs on Window resize and on page load
    function setCarousel() {
        carousel.style.height = (page.offsetWidth / 1.5) + 'px';
        
        for (let i = 0; i < pics.length; i++) {
            if (navItems[i].classList.contains('active')) {
                // Shows current slide
                pics[i].style.left = '0px';
                pics[i].style.display = 'block';
            } else {
                // Hides all other slides
                pics[i].style.left = (page.offsetWidth * -1) + 'px';
                pics[i].style.display = 'none';
            }
            // Sets all images to full page width
            imgs[i].style.width = page.offsetWidth + 'px';
        }
    }

    // Runs on Window resize and on page load
	function setallevents() {
        setCarousel();
		startCarousel();

        // Adds data attributes to each nav item and binds click event
		for (let i = 0; i < navItems.length; i++) {
			navItems[i].setAttribute('data-carousel-nav-item' , i);
			navItems[i].addEventListener('click', function() {
                showpic(this.getAttribute('data-carousel-nav-item'));
            }, false);
		}

        // Binds mouseover event to stop carousel when a slide is on focus to allow the user to read slide content 
		carousel.addEventListener('mouseover', function() {
            clearInterval(timer);
            timer = null;
        }, false);
		carousel.addEventListener('mouseout',  startCarousel, false);
	}

    window.addEventListener('load', setallevents, false);
    window.addEventListener('resize', function(e) {
      clearTimeout(timer);
      timer = null;
      timer = setTimeout(function() {
        // Resizing has "stopped"
        // Restarts carousel
        setallevents();
      }, 250);
    }, false);
}());