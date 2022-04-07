window.onload = function(){

// navbar effect

(function () {
		console.log('arrived')
      const link = document.querySelectorAll('nav > .hover-this');
      const cursor = document.querySelector('.cursor');
           if(cursor){

      const animateit = function (e) {
            const span = this.querySelector('span');
            const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,
            move = 25,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;
            span.style.transform = `translate(${xMove}px, ${yMove}px)`;
            if (e.type === 'mouseleave') span.style.transform = '';
      };
      const editCursor = e => {
            const { clientX: x, clientY: y } = e;
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
      };
      link.forEach(b => b.addEventListener('mousemove', animateit));
      link.forEach(b => b.addEventListener('mouseleave', animateit));
      window.addEventListener('mousemove', editCursor);
      }
})();


	/*BLING JS*/

	window.$ = document.querySelectorAll.bind(document);

	Node.prototype.on = window.on = function (name, fn) {
	  this.addEventListener(name, fn);
	}

	NodeList.prototype.__proto__ = Array.prototype;

	NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
	  this.forEach(function (elem, i) {
	    elem.on(name, fn);
	  });
	}

	/*FIXED FORM*/
	let elements = $('.fixed-form')[0];
	if(elements){
		Stickyfill.add(elements);
	}


	/* #EFFECTS */

	 
	/* (1) NAVIGATION MENU */


	let menu    = $("#menu")[0];
	let sidebar = $('.sidebar')[0];
	let exitBar    = $(".sidebar-exit")[0];
	let bodyOverlay = $('.body-overlay')[0];

	menu.addEventListener('click', function(){
		gsap.to(sidebar, 0.4, {right:0, display:"block", ease:"power2.out"})
		gsap.to(bodyOverlay, 0.3, {opacity:1, display:"block", ease:"power2.out"})
	});

	[exitBar, bodyOverlay].forEach((el)=>{
			el.addEventListener('click', function(){
			gsap.to(sidebar, 0.4, {right:"-50%", display:"none", ease:"power1.in"})
			gsap.to(bodyOverlay, 0.3, {opacity:0, display:"none", ease:"power1.in"})
		});
	})





	/* (2) SCROLL BACK TO THE TOP + PROGRESS BAR */	
	
	var progressPath = document.querySelector('.progress-wrap path');
	var pathLength = progressPath.getTotalLength();
			progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
			progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
			progressPath.style.strokeDashoffset = pathLength;
			progressPath.getBoundingClientRect();
			progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';	

	// updating page scroll progress  
	var body = document.body,
    	html = document.documentElement;
	var offset = 50;


 	var updateProgress = function () {
	var scroll = window.pageYOffset || 
		           body.scrollTop ||
    			     html.scrollTop || 0;

	var height = (Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight)) - window.innerHeight ;
		

	var progress = pathLength - ((scroll * (pathLength / height)));
		progressPath.style.strokeDashoffset = progress;
	}

	updateProgress();

	window.addEventListener('scroll', updateProgress);

	var duration = 550;
	window.addEventListener('scroll', function() {
		if (this.scrollY > offset) {
			$('.progress-wrap')[0].classList.add('is-active-progress');
		} else {
			$('.progress-wrap')[0].classList.remove('is-active-progress');
		}
	});				

	$('.progress-wrap')[0].on('click', function () {
	   scrollTo(document.documentElement);   
	});

function scrollTo(element, to = 0, duration= 1000) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 1000;
    let currentTime = 0;

    const animateScroll = (() => {

      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    });

    animateScroll();
  };

  // progress bar transition 
  Math.easeInOutQuad = function (t, b, c, d) {

    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };





/* POST SECTION NAVIGATION */

	if($('.content-table')[0]){
		let table = $('.content-table')[0];

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const id = entry.target.getAttribute('id');
				if (entry.intersectionRatio > 0) {
					document.querySelector(`.section-nav li a[href="#${id}"]`).parentElement.classList.add('is-active');
				} else {
					document.querySelector(`.section-nav li a[href="#${id}"]`).parentElement.classList.remove('is-active');
				}
			});
		});

		// Track all sections that have an `id` applied
		document.querySelectorAll('h2[id]').forEach((section) => {
			observer.observe(section);
		});
	}


	/* TEXT REVEAL AND SKEW EFFECT */

	gsap.registerPlugin(ScrollTrigger, SplitText);
	
	if($('.skew')[0]){ // if there is an image to apply a skew effect on:

		let tlReveal, childSplit, parentSplit;
	  gsap.set(".skew", {transformOrigin: "center center", force3D: true});

	}
	  var proxy = { skew: 0 },
	    skewSetter = gsap.quickSetter(".skew", "skewY", "deg"), // fast
	    clamp = gsap.utils.clamp(-2, 2); // don't let the skew go beyond 20 degrees. 


		$('.reveal-text').forEach((el)=>{
			 childSplit = new SplitText(el, {
			  type: "lines",
			  linesClass: "split-child",
		 	});
			
			 parentSplit = new SplitText(el, {
			  type: "words lines",
			  linesClass: "split-parent",
		 	});

			 tlReveal = gsap.timeline({
				scrollTrigger:{
					trigger:el,
					start:"top center",
					onUpdate: (self) => {
				      var skew = clamp(self.getVelocity() / -300);
				      if (Math.abs(skew) > Math.abs(proxy.skew)) {
				        proxy.skew = skew;
				        gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
				      }
					}
				}
			})
			.from([childSplit.lines], { duration: 1.5, yPercent: 100, ease: "power4", stagger: 0.1 })	
		});

	/* IMAGE REVEAL EFFECT */

	let revealContainers = document.querySelectorAll(".reveal-image-container");

	revealContainers.forEach(container => {
	  let wrapper = container.querySelectorAll(".reveal-image");
	  let image = container.querySelectorAll("img");
	  let tl = gsap.timeline({
	      scrollTrigger: {
	        trigger: container,
	        start: 'top 50%',
	      },
	    });
	  
	  tl.set(wrapper, { autoAlpha: 1});
	    tl.from(wrapper, 1, {
	      xPercent: -100,
	      ease: Power2.out,
	    });
	    tl.from(image, 1, {
	      xPercent: 100,
	      delay: -1,
	      ease: Power2.out,
	    });
	});
}