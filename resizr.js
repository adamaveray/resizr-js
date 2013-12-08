/**
 * Resizr.js v1.0
 * http://github.com/adamaveray/resizr-js
 *
 * Copyright 2013 Adam Averay
 * Free to use under the MIT Licence
 *
 * Author: Adam Averay (@adamaveray)
 */
/*! Resizr.js 1.0 | github.com/adamaveray/resizr-js | (c) 2013 Adam Averay | MIT licence */
window.Resizr	= (function(window, document, undefined){
	var api;
	
	var	self	= {
		resizeCallbacks:	[],


		// Public methods
		addResizeCallback:	function(breakpoint, callback, doFirstRun){
			if(callback === undefined){
				// No breakpoint given - shift args
				doFirstRun	= callback;
				callback	= breakpoint;
				breakpoint	= null;
			}
			
			var item	= {
				callback:	callback,
				breakpoint:	breakpoint
			};
			
			self.resizeCallbacks.push(item);

			// Trigger for first run
			if(doFirstRun || doFirstRun === undefined){
				self.processResizeCallback(item, self.getWidth(), true);
			}
			
			return api;
		},
		
		removeResizeCallback:	function(callback){
			var filteredCallbacks	= [];
			self.each(function(i, item){
				if(item.callback !== callback){
					filteredCallbacks.push(item);
				}
			});

			self.resizeCallbacks	= filteredCallbacks;
		},

		// Private methods
		processResizeCallback:	function(item, width, isFirstRun){
			if(item.breakpoint === null){
				// No breakpoint to check
				item.callback(null, isFirstRun);
				return;
			}
			
			var isBelow	= (item.breakpoint >= width),
				bypass	= (item.isBelow === undefined);	// Check current state

			if(isBelow && (!item.isBelow || bypass)){
				// Went below - trigger
				item.callback(true, isFirstRun);

				// Update item state
				item.isBelow	= true;

			} else if(!isBelow && (item.isBelow || bypass)){
				// Went above - trigger
				item.callback(false, isFirstRun);

				// Update item state
				item.isBelow	= false;
			}
		},
		
		update:	function(){
			var width	= self.getWidth();

			self.each(function(i, item){
				self.processResizeCallback(item, width, false);
			});
		},


		// Utilities
		each:	function(fn){
			for(var i = 0; i < self.resizeCallbacks.length; i++){
				fn(i, self.resizeCallbacks[i]);
			}
		},
		
		getWidth:	(function(element, prefix, axis){
			if(!(prefix+axis) in element){
				// Use fallback element to get width
				prefix	= client;
				element	= document.documentElement || document.body;
			}
	
			// Calculate width
			return function(){
				return element[prefix+axis];
			};
		}(window, 'inner', 'Width')),
		
		throttle:	function(func){
			// (From Underscore.js)
			var context, args, result;
			var timeout		= null;
			var previous	= 0;
			
			var later	= function() {
				previous	= new Date;
				timeout		= null;
				result		= func.apply(context, args);
			};
			
			return function(){
				context	= this;
				args	= arguments;
				
				var now			= new Date,
					remaining	= api.throttle - (now - previous);
				
				if(remaining <= 0){
					window.clearTimeout(timeout);
					timeout		= null;
					
					previous	= now;
					result		= func.apply(context, args);
					
				} else if(!timeout){
					timeout	= window.setTimeout(later, remaining);
				}
				return result;
			};
		}
	};
	

	// Setup listener
	(function(type, fn){
		if(window.addEventListener){
			window.addEventListener(type, fn, false);
			
		} else if(window.attachEvent){
			elem.attachEvent('on'+type, fn);
			
		} else {
			var old	= elem['on'+type];
			elem['on'+type]	= function(e){
				fn(e);
				
				// Call previous
				old && old(e);
			};
		}
	}('resize', self.throttle(self.update)));
	
	// Public API
	return api = {
		add:		self.addResizeCallback,
		remove:		self.removeResizeCallback,
		throttle:	500
	};
	
}(window, document));



