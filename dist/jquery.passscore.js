(function() {
  (function($) {
    var Plugin, defaults, pluginName;
    pluginName = "passScore";
    defaults = {
      pos: "bottom",
      width: "2px",
      style: "solid",
      force: "normal",
      showScore: false,
      scorePlaceholder: $("<small id=\"passScore\"/>"),
      alphaLowerScore: 3,
      numericScore: 4,
      alphaUpperScore: 5,
      symbolScore: 6,
      multiplier: 6
    };
    Plugin = (function() {
      function Plugin(el, options) {
        this.el = el;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init(el);
        if (this.settings.showScore) {
          $(el).after(this.settings.scorePlaceholder);
        }
      }

      Plugin.prototype.init = function(el) {
        var self;
        self = this;
        return $(el).keyup(function() {
          self.highlight(el);
        });
      };

      Plugin.prototype.highlight = function(el) {
        var pass;
        pass = $(el).val();
        $(el).css("border-" + this.settings.pos, this.getValues(pass));
      };

      Plugin.prototype.getValues = function(pass) {
        var len;
        len = pass.length;
        if (len) {
          return this.settings.width + " " + this.settings.style + " rgb(" + this.getColor(pass) + ")";
        } else {
          return "";
        }
      };

      Plugin.prototype.getColor = function(pass) {
        var color, g, r, score;
        score = this.getScore(pass);
        if (this.settings.showScore) {
          this.settings.scorePlaceholder.text("Your password score is " + (Math.round(score / 2)));
        }
        if (score >= 200) {
          r = 200 - score;
          g = 200;
        } else {
          r = 200;
          g = score;
        }
        return color = r + "," + g + ", 0";
      };

      Plugin.prototype.getScore = function(pass) {
        var score;
        score = 0;
        score = (this.checkString(/[a-z]/, pass) * this.settings.alphaLowerScore) + (this.checkString(/[A-Z]/, pass) * this.settings.alphaUpperScore) + (this.checkString(/[0-9]/, pass) * this.settings.numericScore) + (this.checkString(/(!|\$|%|@|#|&|\*|\^)/, pass) * this.settings.symbolScore);
        return score * (this.settings.multiplier - this.getForceDiff());
      };

      Plugin.prototype.checkString = function(regex, str) {
        var count, i;
        i = 0;
        count = 0;
        while (i <= str.length - 1) {
          if (str.charAt(i).match(regex)) {
            count++;
          }
          i++;
        }
        return count;
      };

      Plugin.prototype.getForceDiff = function() {
        switch (this.settings.force) {
          case "easy":
            return -1;
          case "strong":
            return 1;
          case "impossible":
            return 2;
          default:
            return 0;
        }
      };

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery);

}).call(this);
