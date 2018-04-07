
(function($){

  $(function() {

    var flashDiv = '<div id="flash" style="display:none;"> \
                      <div class="flash_close"></div> \
                      <div class="flash_inner"></div> \
                    </div>';
    $(flashDiv).appendTo('body');

    $.extend({
      flash: function(content, options) {
        var flash = $('#flash');

        flash.find('.flash_inner').html(content);
        flash
          .show()
          .css({opacity: 0})
          .bottom()
          .animate({
            top: (($(window).height()-flash.height()))-50+'px',
            opacity: 0.8
          });

        $(document).click(function(){
          setTimeout(function() {
            flash.animate({
            top: ($(window).height()+50)+'px',
            opacity: 0
            });
          }, 2000)
        });
      }
    });

    $.fn.extend({
      bottom: function() {
        var offLeft = Math.floor((($(window).width()-this.width())/2)-20),
            offTop = Math.floor($(window).height()+50);
        this.css({
          top: ((offTop != null && offTop > 0) ? offTop : '0')+ 'px',
          left: ((offLeft != null && offLeft > 0) ? offLeft :'0') + 'px'
        });
        return this;
      },

      flash: function(options) {
        $.flash(this.html(), options);
        return this;
      }
    });

  });

})(jQuery);
