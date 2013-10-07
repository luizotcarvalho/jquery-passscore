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
            $(el).after @.settings.scorePlaceholder if @.settings.showScore

        init : (el) ->
            self = @

            $(el).keyup ->
                self.highlight el   
                return

        highlight : (el) ->
            pass = $(el).val()

            $(el).css "border-" + @settings.pos, @getValues(pass)
            return  

        getValues : (pass) ->
            len = pass.length

            if len 
                @settings.width + " " + @settings.style + " rgb(" + @getColor(pass) + ")"
            else
                ""

        getColor : (pass) ->
            score = @getScore(pass)

            @.settings.scorePlaceholder.text "Your password score is " + Math.round(score / 2 ) if @.settings.showScore

            if score >= 200
                r = 200 - score
                g = 200
            else
                r = 200;
                g = score

            color = r + "," + g + ", 0" 

        getScore : (pass) ->
            score = 0

            score = (@checkString(/[a-z]/, pass) * @settings.alphaLowerScore) + (@checkString(/[A-Z]/, pass) * @settings.alphaUpperScore) + (@checkString(/[0-9]/, pass) * @settings.numericScore) + (@checkString(/(!|\$|%|@|#|&|\*|\^)/, pass) * @settings.symbolScore)
            score * (@settings.multiplier - @getForceDiff())

        checkString : (regex, str) ->
            i = 0
            count = 0

            while i <= str.length - 1
              count++  if str.charAt(i).match(regex)
              i++

            count 

        getForceDiff : ->

            switch @settings.force
              when "weak" then -1
              when "strong" then 1
              when "impossible" then 2
              else 0

    $.fn[pluginName] = (options) ->
        @each ->
            if !$.data(@, "plugin_#{pluginName}")
                $.data(@, "plugin_#{pluginName}", new Plugin(@, options))