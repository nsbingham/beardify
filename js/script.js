$(function(){

	var $body = $('body'),
	$beards = {
		'beard1':{scale:1.46,pctL:0.18,pctT:0.28,src:'img/beard.png'},
		'beard2':{scale:1.46,pctL:0.14,pctT:0.29,src:'img/mustache.png'}
	};

	$body.find('img').each(function(index, el){
		var $el = $(this), pos = $el.offset(), w = $el.width(), l = $el.height();

		if(w > 40 && l > 40) {
			$el.faceDetection(
				{complete: function(image, coordinates) {
					beardMe($el,$beards.beard1,image,coordinates);
					//showOutline($el, image, coordinates);
				},
				error: function() {
					console.log($el);
					console.log("Could not process image");
			}});
		}

	});

	// JavaScript face detection
	function beardMe($el, b, image, coordinates){
		if(coordinates.length) {
			coordinates.forEach(function(coord) {
				var $beard = $('<img src="' + b.src + '" />'),
					bw = Math.round(b.scale * coord.width),
					bl = Math.round(coord.positionX - (bw*b.pctL)),
					bt = Math.round((coord.height * b.pctT) + coord.positionY);

					$beard
						.css({top:bt, left:bl, width:bw, position:'absolute'})
						.appendTo($body);
			});
		}
	}

	function showOutline($el, image, coordinates){
		coordinates.forEach(function(coord) {
			$("<div>", {
				css: {
				position: "absolute",
				left: coord.positionX + 5 + "px",
				top: coord.positionY + 5 + "px",
				width: coord.width + "px",
				height: coord.height + "px",
				border: "2px solid #ff0000"
				}
			}).appendTo($el.parent());
		});
	}

	function beardMeFaceApi(){

		//var apiUrl = "http://api.face.com/faces/detect.json?api_key=aa310f793c57fdaebe185bdcee13857&urls=";
		var apiUrl = "http://local.beardify.com/example.json";

		$.ajax({
		  url: apiUrl,
		  dataType: 'jsonp',
		  data: data,
		  success: callback
		});

	}

	function beardMeFaceApiCallback(data, textStatus, jqXHR){
		console.log('success');
	}

});