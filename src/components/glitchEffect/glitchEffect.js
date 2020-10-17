//import { TweenLite } from 'gsap';
API("LaZxZb");

function map_range(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

let layers = document.querySelectorAll(".container>div");

document.addEventListener("mousemove", e => {
	moove(e);
});

let e = {
	offsetX: 50,
	offsetY: 50
};

TweenLite.to(e, 1.5, {
	ease: Power3.easeOut,
	offsetX: Math.random()*window.innerWidth,
	offsetY: Math.random()*window.innerHeight,
	onUpdate: () => {
		moove(e);
	}
});

TweenLite.to(e, 1.5, {
	delay:1.5,
	ease: Power3.easeOut,
	offsetX: Math.random()*window.innerWidth,
	offsetY: Math.random()*window.innerHeight,
	onUpdate: () => {
		moove(e);
	}
});

TweenLite.to(e, 1.5, {
	delay:3,
	ease: Power3.easeOut,
	offsetX: Math.random()*window.innerWidth,
	offsetY: Math.random()*window.innerHeight,
	onUpdate: () => {
		moove(e);
	}
});

function moove(e) {
	layers.forEach(layer => {
		let duration = layer.getAttribute("data-duration");

		let offsetX = window.innerWidth / 2 - e.offsetX;
		let offsetY = window.innerHeight / 2 - e.offsetY;

		let x = map_range(offsetX, 0, window.innerWidth / 2, 0, 100);
		let y = map_range(offsetY, 0, window.innerHeight / 2, 0, 100);
		// console.log(x, y);
		TweenLite.to(layer, duration, {
			ease: Power3.easeOut,
			y: y,
			x: x,
			scale: 1.25
		});
	});
}

