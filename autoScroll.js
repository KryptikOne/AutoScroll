/**
 *    ___       __       ____             ____
 *   / _ |__ __/ /____  / __/__________  / / /
 *  / __ / // / __/ _ \_\ \/ __/ __/ _ \/ / /
 * /_/ |_\_,_/\__/\___/___/\__/_/  \___/_/_/
 * Author: Jason Saba
 * Author URI: http://jasonsaba.com/
 * Description: A jQuery plugin to make an element scroll to the bottom, then back up once it hits bottom.
 * Package URL: https://github.com/KryptikOne/AutoScroll
 */

;(function($) {

    "use scrict";

    var defaults = {
        scrollSpeed: 10,
        reachedMaxScroll: false,
        currPosition: 0
    };

    function Scroller(elem, options) {
        this.$el = $(elem);
        this.o   = $.extend({}, defaults, options);
        this.init();
    }

    Scroller.prototype = {

        init: function() {
            var self = this;
            this.$el.scrollTop(0);
            this.makeItMove();
        },

        makeItMove: function(self) {
            setInterval($.proxy(function() {

              var iScroll = this.$el.scrollTop();

              if ( !this.o.reachedMaxScroll ) {
                  this.o.currPosition++;
                  iScroll = this.o.currPosition;
                  this.$el.scrollTop(iScroll);
                  this.o.reachedMaxScroll = this.$el[0].scrollHeight - this.$el.scrollTop() === this.$el.outerHeight();
              } else {
                  this.o.reachedMaxScroll = (this.$el[0].scrollTop === 0) ? false : true;
                  this.o.currPosition--;
                  iScroll = this.o.currPosition;
                  this.$el.scrollTop(iScroll);
              }

            }, this), this.o.scrollSpeed);

        },

    };

    $.fn.autoScroll = function(options) {
        return this.each(function() {
            new Scroller(this, options);
        });
    };

})(jQuery);
