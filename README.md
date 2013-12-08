Resizr.js
=========

_"For when media queries just aren't enough"_

Trigger events when browser windows resize past certain breakpoints. Zero dependencies.

[Download](https://raw.github.com/adamaveray/resizr-js/master/resizr.min.js) | [Demo](http://adamaveray.github.io/resizr-js)

-----


Usage
-----

### Adding

The global object `Resizr` will be created when the script is added. Call `add` on it to add a listener:

~~~javascript
Resizr.add(500, function(isBelow){
	// Custom logic
});
~~~

The first parameter provided is the breakpoint to watch, in pixels. The system matches based on "greater than or equal", so if the window is the breakpoint's width exactly it is considered over.

The callback will be passed a boolean value for the first parameter. If the value is `true`, the window was resized over the breakpoint, and if `false`, resized under.

When the callback is added, it will be triggered immediately (with the first parameter same as above). This first run, however, will also have `true` passed as the second parameter, indicating the callback was triggered without user input. This lets you prepare the initial state of what the callback will affect initially, then later toggle based on window resizing.

A very trivial example of using the second parameter:

~~~javascript
var $element;

Resizr.add(500, function(isBelow, isFirstRun){
	if(isFirstRun){
		$element	= $('<div/>').text('A demo');
	}
	
	if(isBelow){
		$element.appendTo($someElement);
	} else {
		$element.appendTo($otherElement);
	}
});
~~~

You can optionally pass `false` as the third parameter to prevent the first run of the callback.


### Removing

To remove a callback, call `remove` with the callback to remove.

~~~javascript
var callback	= function(){ /* ... */ };
Resizr.add(850, callback);

// ...

Resizr.remove(callback);
~~~


### Additional Options

To prevent overwhelming some browsers the callbacks are throttled, so will have a forced delay between runthroughs. The default delay is 500ms, but this interval can be customised by setting the `throttle` value:

~~~javascript
Resizr.throttle	= 1000;
~~~
