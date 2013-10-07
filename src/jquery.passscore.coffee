do ($ = jQuery) ->

    # Create the defaults once
    pluginName = "passScore"
    defaults =
        #configs
        pos: "bottom",
        width: "2px",
        style: "solid",
        force: "normal",
        showScore: false,
        scorePlaceholder: $("<small id=\"passScore\"/>"),

        #scores normal
        alphaLowerScore: 3,
        numericScore: 4,
        alphaUpperScore: 5,
        symbolScore: 6,

        multiplier: 6

    # Plugin constructor
    class Plugin
        constructor: (@el, options) ->
            @settings = $.extend {}, defaults, options
            @_defaults = defaults
            @_name = pluginName
            @init(el)
            if @.settings.showScore then $(el).after(@.settings.scorePlaceholder)

        init : (el) ->
            self = @

            $(el).keyup ->
                self.highlight(el)  
                return

        highlight : (el) ->
            pass = $(el).val()

            $(el).css("border-" + @settings.pos, @getValues(pass))
            return  

        getValues : (pass) ->
            len = pass.length

            if len then @settings.width + " " + @settings.style + " rgb(" + @getColor(pass) + ")" else ""

        getColor : (pass) ->
            score = @getScore(pass)

            if @.settings.showScore then @.settings.scorePlaceholder.text("Your password score is " + ( Math.round(score / 2 )) )

            if score >= 200 then r = 200 - score; g = 200 else r = 200; g = score

            color = r + "," + g + ", 0" 

        getScore : (pass) ->
            score = 0

            score = (@checkString(/[a-z]/, pass) * @settings.alphaLowerScore) + (@checkString(/[A-Z]/, pass) * @settings.alphaUpperScore) + (@checkString(/[0-9]/, pass) * @settings.numericScore) + (@checkString(/(!|\$|%|@|#|&|\*|\^)/, pass) * @settings.symbolScore)
            return score * (@settings.multiplier - @getForceDiff())

        checkString : (regex, str) ->
            i = 0
            count = 0

            while i <= str.length - 1
              count++  if str.charAt(i).match(regex)
              i++

            return count 

        getForceDiff : ->

            switch @settings.force
              when "easy" then return -1
              when "strong" then return 1
              when "impossible" then return 2
              else return 0

    $.fn[pluginName] = (options) ->
        @each ->
            if !$.data(@, "plugin_#{pluginName}")
                $.data(@, "plugin_#{pluginName}", new Plugin(@, options))