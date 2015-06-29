var app = angular.module("incode", ["ui.router"])

.config(function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise("/");

	// Now set up the states
	$stateProvider

		.state('home', {
			url: "/",
			templateUrl: "html/home.html"
		})

		.state('c', {
			url: "/c",
			templateUrl: "html/c.html",
			controller: function(){
				var annotations = {
						"#include": "Preproccessor directive used to reference an external header (.h) or a source (.c) file. "+
									"\"\" used to point at a local file, while <> is used to reference a file from the include directory"
						, "main": "The initiating function to be called when the program is executed"
						, "int": "Integer data type"
						, "char": "8 bytes long, represents a single character ('a'); can be declared as unsigned"
					};

				$.ajax({
					url: "code/c/inetd.c",
					beforeSend: function( xhr ) {
						xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
					}
				}).done(function( data ) {
					$('.sh_c').text(data);

					sh_highlightDocument();

					$('pre span').each(function(){
						var text = this.textContent;

						if( text in annotations ) {
							//$(this).attr('title', annotations[text]);
							Tipped.create(this, annotations[text]);
							$(this).addClass('tipped');
						}
					});
				});
			}
		})

		.state('state1.list', {
			url: "/list",
			templateUrl: "partials/state1.list.html",
			controller: function($scope) {
				$scope.items = ["A", "List", "Of", "Items"];
			}
		})

		.state('state2', {
			url: "/state2",
			templateUrl: "partials/state2.html"
		})

		.state('state2.list', {
			url: "/list",
			templateUrl: "partials/state2.list.html",
			controller: function($scope) {
				$scope.things = ["A", "Set", "Of", "Things"];
			}
		});

});

