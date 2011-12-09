// New idea is to add santa had and beard to
// Wrap this into a jQuery plugin
// Wrap this in a jQuery bookmarklet
// Swap to place based on center of image

$(function(){

	var $body = $('body'),
	$beards = {
		'beard1':{scale:1.46,pctL:0.18,pctT:0.28,src:'img/beard.png'},
		'beard2':{scale:1.46,pctL:0.14,pctT:0.29,src:'img/mustache.png'}
	},
	beard = $beards.beard1;

	$body.find('img').each(function(index, el){

		var $el = $(this), pos = $el.offset(), w = $el.width(), l = $el.height();

		// Only apply to image that are larger than 40x40
		if(w > 40 && l > 40) {
			//beardMeJS($el, beard);
			beardMeFaceApi($el, beard);
			//showOutline($el, image, coordinates);
		}

	});

	// JavaScript face detection
	function beardMeJS($el,beard){

		$el.faceDetection(
			{complete: function(image, coordinates) {
				if(coordinates.length) {
					coordinates.forEach(function(coord) {
						var $beard = $('<img src="' + beard.src + '" />'),
							bw = Math.round(beard.scale * coord.width),
							bl = Math.round(coord.positionX - (bw*beard.pctL)),
							bt = Math.round((coord.height * beard.pctT) + coord.positionY);

							$beard
								.css({top:bt, left:bl, width:bw, position:'absolute'})
								.appendTo($body);
					});
				}
			},
			error: function() {
				console.log($el);
				console.log("Could not process image");
		}});

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

	function beardMeFaceApi($el, beard){

		//var apiUrl = "http://api.face.com/faces/detect.json?api_key=aa310f793c57fdaebe185bdcee13857&urls=";
		var apiUrl = "http://local.beardify.com/example.json";

		$.ajax({
			url: apiUrl,
			dataType: 'jsonp',
			success: beardMeFaceApiCallback,
			error: beardMeFaceApiError
		});

	}

	function beardMeFaceApiError(e){
		console.log(e);
	}

	function beardMeFaceApiCallback(data, textStatus, jqXHR){
		log(data,textStatus, jqXHR);
		console.log('success');
		if(data.photos !== null) {
			data.photos.each();
		}
	}

	function beardMeFaceApiPlace(index, photo){
		var $beard = $('<img src="' + beard.src + '" />'),
			bw = Math.round(beard.scale * coord.width),
			bl = Math.round(coord.positionX - (bw*beard.pctL)),
			bt = Math.round((coord.height * beard.pctT) + coord.positionY);

			$beard
				.css({top:bt, left:bl, width:bw, position:'absolute'})
				.appendTo($body);
	}

	function beardMe(x, y){
		
	}

});