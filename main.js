(function(){
	// jQuery-less
	var consoleOutput	= (function(undefined){
		var consoleElement,
			log	= Function.prototype.bind.call(console.log, console);
	
		return function(){
			consoleElement || (consoleElement = document.getElementById('console-output'));
		
			var args	= Array.prototype.slice.call(arguments, 0);
		
			log.apply(undefined, args);
			consoleElement.innerHTML += '<li>'+args.join(' ')+'</li>';
		};
	}());

	(function(amount){
		// Set custom interval (optional)
		Resizr.throttle	= 250;
	
	
		// Standard usage
		Resizr.add(amount, function(isBelow, isFirstRun){
			consoleOutput('Screen '+(isBelow ? 'below' : 'above')+' '+amount+'px', (isFirstRun ? ' (first run)' : ''));
		});

		// Skipping first run usage
		/*
		Resizr.add(amount, function(isBelow){
			console.log('[alt] Resized '+(isBelow ? 'below' : 'above')+' '+amount+'px');
	
		}, false);
		*/

		// Runs constantly
		/*
		Resizr.add(function(isBelow, isFirstRun){
			console.log('Resized window', (isFirstRun ? ' (first run)' : ''));
		});
		*/
	}(800));



	// Using jQuery

	/*! Input Focus */
	(function(e,c,a,g){var d="inputFocus",f={wrapper:null,focusClass:"focussed",activeClass:"active",defaultValue:""};function b(i,h){this.element=i;this.$el=e(i);this.options=e.extend({},f,h);this._defaults=f;this._name=d;this.init()}b.prototype={init:function(){this.wrapper=(this.options.wrapper?this.options.wrapper:this.$el.parent());var h=this;this.$el.focus(function(){h.focus()}).blur(function(){h.blur()});if(this.$el.val()!=this.options.defaultValue){this.wrapper.addClass(this.options.activeClass)}},focus:function(){this.wrapper.addClass(this.options.focusClass).addClass(this.options.activeClass)},blur:function(){this.wrapper.removeClass(this.options.focusClass);if(this.$el.val()==this.options.defaultValue){this.wrapper.removeClass(this.options.activeClass)}}};e.fn[d]=function(h){return this.each(function(){if(!e.data(this,"plugin_"+d)){e.data(this,"plugin_"+d,new b(this,h))}})}})(jQuery,window,document);

	(function($){
		$('body').addClass('js');
		
		var $input	= $('#main-input'),
			breakpoint,
			callback	= function(isBelow, isFirstRun){
				consoleOutput('[Custom Input] Screen '+(isBelow ? 'below' : 'above')+' '+breakpoint+'px', (isFirstRun ? ' (first run)' : ''));
			};
			
		$input.inputFocus().keydown(function(e){
			if(e.keyCode !== 13){	// Enter
				return;
			}
		
			e.preventDefault();
		
			breakpoint	= parseInt($input.val(), 10);
			if(isNaN(breakpoint)){
				// Invalid
				return;
			}
		
			// Clear old callback
			Resizr.remove(callback);
		
			// Add with new breakpoint
			Resizr.add(breakpoint, callback);
		});
	}(jQuery));
}());