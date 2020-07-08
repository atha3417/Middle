(function() {
	let $ = function(element) {
		if (this === window) {
			return new $(element);
		}

		if (element instanceof Object) {
			this.element = element;
		} else {
			this.element = getElement(element);
		}
		return this;
	}

	let = getElement = function(element) {
		// ambil karakter pertama
		let firstLetter = element.charAt(0);

		if (element.indexOf(',') > 0 || element.indexOf(' ') > 0) {
			return document.querySelectorAll(element);
		}

		switch (firstLetter) {
			case '#':
				return document.getElementById(element.substr(1));
				break;
			case '.':
				return document.getElementsByClassName(element.substr(1));
				break;
			case ':':
				return document.getElementsByTagName(element.substr(1));
				break;
			case '[':
				return document.querySelectorAll(element);
				break;
			default:
				return document.querySelector(element);
		}
	}

	let forEach = function(items, callback, scope) {
		for (let i = 0; i < items.length; i++) {
			callback.call(scope, i, items[i]);
		}
	}

	let callFunction = function(items, callback, scope) {
		// deteksi 1 element atau lebih?
		if (items.length) {
			// kalau lebih dari 1
			// loop - ulang
			forEach(items, function(index, element) {
				callback.call(scope, index, element);
			});
		} else {
			callback.call(scope, null, items);
		}
	}

	$.prototype.content = function(text) {
		// deteksi 1 element atau lebih?
		if (this.element !== null) {
			callFunction(this.element, function(index, element) {
				element.innerHTML = text;
			});
		} else {
			console.log('Element not found!');
		}
		return this;
	}

	$.prototype.css = function(property, value) {
		// deteksi 1 element atau lebih?
		if (this.element !== null) {
			callFunction(this.element, function(index, element) {
				element.style[property] = value;
			});
		} else {
			console.log('Element not found!');
		}
		return this;
	}

	$.prototype.on = function(event, callback) {
		// deteksi 1 element atau lebih?
		if (this.element !== null) {
			callFunction(this.element, function(index, element) {
				element.addEventListener(event, callback);
			});
		} else {
			console.log('Element not found!');
		}
		return this;
	}

	window.$ = $;
	window.middle = $;

}());