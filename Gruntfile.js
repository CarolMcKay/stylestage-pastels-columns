module.exports = function (grunt) {

	const autoprefixer					= require("autoprefixer");
	const clean							= require("postcss-clean");
	const sass							= require("sass");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		stylelint: {
			// @link https://stylelint.io/user-guide/configuration/
			options: {
				configFile: ".stylelintrc.yml",
				failOnError: true,
			},
			src: [
				"scss/**/*.scss",
			]
		},

		sass: {
			// using Dart Sass, but see for options:
			// @link https://github.com/sass/node-sass#options
			options: {
				implementation: sass,
				outputStyle: "expanded",
				sourceMap: false,
			},
			dev: {
				files: {
					"style.css" : "scss/style.scss"
				}
			},
			dist: {
				files: {
					"style.min.css" : "scss/style.scss"
				}
			}
		},

		postcss: {
			// @link https://github.com/postcss/autoprefixer#grunt
			// @link https://github.com/jakubpawlowicz/clean-css
			dev: {
				options: {
					map: false,
					processors: [
						autoprefixer(),
						clean({
							level: 2,
							format: "beautify",
						})
					]
				},
				src: "style.css"
			},
			dist: {
				options: {
					map: false,
					processors: [
						autoprefixer(),
						clean({
							level: {
								1: {
									specialComments: 0,
								},
								2: {
								}
							},
						}),
					]
				},
				src: "style.min.css"
			}
		}

	});

	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-stylelint");

	// grunt.registerTask("scss", ["stylelint","sass","postcss"]);
	grunt.registerTask("scss", ["sass","postcss"]);

};
