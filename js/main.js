

/*const bird1 = new Image();
bird1.src = 'images/bird1.png';
ctx.drawImage(bird1,500,20);
bird1.onload = function(){
	ctx.drawImage(bird1,500,20);
};*/

window.onload = function(){
	const c = document.getElementById('canvas');

	c.width = window.innerWidth;
	c.height = 600;

	const ctx = c.getContext('2d');

	/*ctx.fillRect(20,20,20,20);
	ctx.fillStyle = "#00FF00";

	ctx.fillRect(100,20,20,20);
	ctx.fillStyle = "#0000FF";

	ctx.fillRect(200,20,20,20);

	ctx.strokeRect(300,20,20,20);
	ctx.strokeStyle = "#FF0000";
	ctx.strokeRect(400,20,20,20);

	ctx.drawImage(document.getElementById('bird1'),500,20);
	ctx.drawImage(document.getElementById('bird2'),700,20);*/

	const environment = new Environment(c,ctx);
	const bird = new Bird(250,300,ctx);
	const pipes = [];
	gameLoop();

	setInterval(function(){
		let pipeSet =  generateRandomPipes(ctx, c.width, c.height);
		pipes.push(pipeSet.top, pipeSet.bottom);
	},3000);

	/*ctx.fillStyle ="#FFFFFF";*/

	function gameLoop(){
		/*ctx.fillRect(0,0,c.width, c.height);*/
		bird.update(pipes);
		if(!bird.dead){
		
			environment.update();
		
			pipes.forEach(function(pipe1){
			pipe1.update();
			
			});
		}
		
		/*if(detectCollisions(bird,pipes)) {
			alert("you lose");
			
		}*/
		
		environment.render();
		pipes.forEach(function(pipe1){
		
			pipe1.render();
			});
		bird.render();
		if(bird.dead){
			drawGameOver(ctx,c);
			window.location = "/";
		}
			
		window.requestAnimationFrame(gameLoop);	
		
	}	
};

	
	function generateRandomPipes(ctx, canvasWidth, canvasHeight){
		let lengthTop = Math.round(Math.random()*200+50);
		let lengthBottom = canvasHeight -300 -lengthTop;
		let returnVal = { };
		returnVal.top = new Pipe(canvasWidth,-5,lengthTop,4,ctx);
		returnVal.bottom = new Pipe(canvasWidth,canvasHeight+5-lengthBottom,lengthBottom,4,ctx);
		return returnVal;
	}

	function drawGameOver(ctx,c){
		ctx.font = "30px verdana";
		ctx.fillText("Game over",c.width/2,c.height/2);
	}

	

