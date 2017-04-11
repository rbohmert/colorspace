function AutoPXLS(images){

	var Painter = function(config){
		var board = document.getElementById("canvas").getContext('2d'); //colorthis.space
		// var board = document.getElementById("board").getContext('2d'); //pxls.space
		var title = config.title || "unnamed";

		var img = new Image();
		img.crossOrigin = "anonymous";
		img.src = config.image;
		var x = config.x;
		var y = config.y;

		var canvas = document.createElement('canvas');
		var image;

		var image_loaded_flag = false;


		function isSamePixelColor(coords){
			var board_pixel = board.getImageData((parseInt(x) + parseInt(coords["x"])), (parseInt(y) + parseInt(coords["y"])), 1, 1).data;
			var image_pixel = image.getImageData(coords["x"], coords["y"], 1, 1).data;

			if(image_pixel[3] <= 127) return true;

			for(var i = 0; i < 3; i++){
				if(board_pixel[i] != image_pixel[i]) return false;
			}
			return true;
		}

		function getNearestColor(pixel){	
			var colors = [
				[255,255,255],
				[228,228,228],
				[136,136,136],
				[34,34,34],
				[255,167,209],
				[229,0,0],
				[229,149,0],
				[160,106,66],
				[229,217,0],
				[148,224,68],
				[2,190,1],
				[0,211,221],
				[0,131,199],
				[0,0,234],
				[207,110,228],
				[130,0,128]
			];
				var tmp_dif = 755;
				var color_id = 0;
				for(var i = 0; i < colors.length; i++)
				{
					var dif = 0;
					for(var j = 0; j < 3; j++)
					{
						if (pixel[j] <= colors[i][j])
							dif = dif + (colors[i][j] - pixel[j]);
						else
							dif = dif + (pixel[j] - colors[i][j]);
					}
					if (dif < tmp_dif)
					{
						color_id = i;
						tmp_dif = dif;
					}
				}
				return (color_id);
		}

		function getColorId(coords){
			var pixel = image.getImageData(coords["x"], coords["y"], 1, 1).data;
			var colors = [
				[255,255,255],
				[228,228,228],
				[136,136,136],
				[34,34,34],
				[255,167,209],
				[229,0,0],
				[229,149,0],
				[160,106,66],
				[229,217,0],
				[148,224,68],
				[2,190,1],
				[0,211,221],
				[0,131,199],
				[0,0,234],
				[207,110,228],
				[130,0,128]
			];

				var color_id = -1;
				var flag = false;
				for(var i = 0; i < colors.length; i++){
					flag = true;
					for(var j = 0; j < 3; j++){
						if(pixel[j] != colors[i][j]){
							flag = false;
							break;
						}
					}
					if(flag){
						color_id = i;
						break;
					}
				}
				if (color_id === -1){
					color_id = getNearestColor(pixel);
				}
				return color_id;
		}

		function pictureIsDone(){
			for(var _x = 0; _x < canvas.width; _x++){
				for(var _y = 0; _y < canvas.height; _y++) {
					var coords = {x: _x, y: _y};
					if(!isSamePixelColor(coords))
						return 0;
				}
			}
			return 1;
		}
		function tryToDraw(){
			while (!pictureIsDone())
			{
				var coords = {x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height)};
				if(isSamePixelColor(coords)){
					console.log("same color on x: %i y : %i, skip",(parseInt(x) + parseInt(coords["x"])),(parseInt(y) + parseInt(coords["y"])));
				}
				else{
					console.log("drawing " + title + " coords " + " x:" + (parseInt(x) + parseInt(coords["x"])) + " y:" + (parseInt(y) + parseInt(coords["y"])));
					//App.switchColor(getColorId(coords)); //pxls.space
					tryColorPixel(parseInt(parseInt(x) + parseInt(coords["x"])), (parseInt(y) + parseInt(coords["y"])), getColorId(coords)); //colorthis.space
					//App.attemptPlace ( (parseInt(x) + parseInt(coords["x"])), (parseInt(y) + parseInt(coords["y"])) ); //pxls.space
					return 1;
				}
			}
			console.log(title + " is correct");
			return -1;
		}

		function drawImage(){
			if(image_loaded_flag){
				return tryToDraw();
			}
			return -1;
		}

		function isReady(){
			return image_loaded_flag;
		}

		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;
			image = canvas.getContext('2d');
			image.drawImage(img, 0, 0, img.width, img.height);

			image_loaded_flag = true;
		};



		return {
drawImage: drawImage,
		   isReady: isReady
		}
	};


	var painters = [];
	for(var i = 0; i < images.length; i++){
		painters[i] = Painter(images[i]);
	}

	function draw(){
			for(var i = 0; i < painters.length; i++){
				if(painters[i].isReady()){
					var result = painters[i].drawImage();
					if(result > 0){
						setTimeout(draw, 5000);
						return;
					}
				}
			}
			setTimeout(draw, 1000);
		return;
	}
	draw();
}
