/***************************************************************************************
*   Author: Unknown, Title: Easing pattern - Animation utility. [Online].
*
***************************************************************************************/
let easingPattern = function ( type, time ) {
	let pattern;
	switch(type) {
	    case 'easeInQuad':
			pattern = time * time; // accelerating from zero velocity
			break;
	    case 'easeOutQuad':
			pattern = time * (2 - time); // decelerating to zero velocity
			break;
	    case 'easeInOutQuad':
			pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
			break;
	    case 'easeInCubic':
			pattern = time * time * time; // accelerating from zero velocity
			break;
	    case 'easeOutCubic':
			pattern = (--time) * time * time + 1; // decelerating to zero velocity 
			break;
	    case 'easeInOutCubic':
			pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
			break;
	    case 'easeInQuart':
			pattern = time * time * time * time; // accelerating from zero velocity
			break;
	    case 'easeOutQuart':
			pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
			break;
	    case 'easeInOutQuart':
			pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
			break;
	    case 'easeInQuint':
			pattern = time * time * time * time * time; // accelerating from zero velocity
			break;
	    case 'easeOutQuint':
			pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
			break;
	    case 'easeInOutQuint':
			pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
			break;
	}
  	return pattern || time; // no easing, no acceleration
};