module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
      banner:  
				"/*\n" +
				"*  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				"*  <%= pkg.description %>\n" +
				"*  <%= pkg.homepage %>\n" +
				"*\n" +
				"*  Made by <%= pkg.author.name %> - <%= pkg.author.url %>\n" +
				"*  Under <%= pkg.licenses[0].type %> License\n" +
				"*\n" +
				"*         .---.\n" +
				"*        /o   o\\\n" +
				"*     __(=  \"  =)__\n" +
				"*      //\\'-=-'/\\\\\n" +
				"*         )   (_\n" +
				"*        /      `\"=-._\n" +
				"*       /       \\     ``\"=.\n" +
				"*      /  /   \\  \\         `=..--.\n" +
				"*  ___/  /     \\  \\___      _,  , `\\\n" +
				"* `-----' `\"\"\"\"`'-----``\"\"\"`  \\  \\_/\n" +
				"*                             `-`\n" +
				"* FOCA NO CÓDIGO!\n" +
				"*/\n"
    },

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"dist/jquery.passscore.js": "src/jquery.passscore.coffee"
				}
			}
		},  

		// Lint definitions
		jshint: {
			files: ["dist/jquery.passscore.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
      options: {
        banner: "<%= meta.banner %>"
      },
      dist: {
        files: {
          'dist/jquery.passscore.min.js' : ['dist/jquery.passscore.js']
        }
      }
    }

	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-coffee");

	grunt.registerTask("default", ["coffee", "jshint", "uglify"]);

};
