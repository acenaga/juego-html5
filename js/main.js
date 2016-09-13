var framesP = {
	estatico: [{
		x: 30,
        y: 0,
        width: 65,
        height: 79
	}],
    caminar: [{
        x: 30,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 109,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 0,
        width: 65,
		height: 79
	}, {
		x: 267,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 0,
		width: 65,
		height: 79
	}],
    saltarFrames: [{
        x: 109,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 70,
        width: 65,
        height: 79
    },{
        x: 188,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	}]
};

var stage, fondo, grupoAssets, puntaje, imagenFondo;
var Keyboard = {};
var intv;
var personaje;
var grav = 0.8;
var val_reb = 0;
var b = false;
var juego = new Game();
// carga de imagenes para el juego
var imgH = new Image();
imgH.src = 'imgs/Heroe.png';
var imgEn = new Image();
imgEn.src = 'imgs/enemy.png';
var imgMon = new Image();
imgMon.src = 'imgs/moneda.png';
var imgPlata = new Image();
imgPlata.src = 'imgs/pattern.png';
var imgPuer = new Image();
imgPuer.src = 'imgs/puerta.png';
var imgLla = new Image();
imgLla.src = 'imgs/llave.png';
var imgFon = new Image();
imgFon.src = 'imgs/fondo.jpg';


grupoAssets = new Kinetic.Group({
    x:0,
    y:0,
});


stage = new Kinetic.Stage({
    container: 'game',
    width: 960,
    height: 500,
});

imagenFondo = new Kinetic.Image({
    x:0,
    y:0,
    image: imgFon,
    width: stage.getWidth(),
    height: stage.getHeight()
})

puntaje = new Kinetic.Text({
    text: 'Puntaje 0',
    height: 25,
    width: 150,
    x: stage.getWidth() - 150,
    y: 15,
    fill: '#f7f7f7',
    fontFamily: 'Arial',
    fontSize: 20,
});

function nivelUno(){
    if(b) return;
    b = true;
    juego.puntaje = 0;
    juego.llave = true;
    fondo = new Kinetic.Layer();
    /* Enemigos */
    grupoAssets.add(new Enemigo(200, stage.getHeight()-75/*425*/, imgEn));
    grupoAssets.add(new Enemigo(850, stage.getHeight()/3.9-60, imgEn));
    grupoAssets.add(new Enemigo(170, stage.getHeight()/3-60, imgEn));
    grupoAssets.add(new Enemigo(1020, stage.getHeight()/1.6-60, imgEn));
    grupoAssets.add(new Enemigo(1220, stage.getHeight()/2.5-60, imgEn));
    grupoAssets.add(new Enemigo(1520, stage.getHeight()-75, imgEn));

    /*Plataformas*/
    var piso = new Plataforma(0,stage.getHeight()-15, imgPlata);
    piso.setWidth(stage.getWidth()*2);
    grupoAssets.add(piso);
    grupoAssets.add(new Plataforma(20, stage.getHeight()/1.5, imgPlata));
    grupoAssets.add(new Plataforma(180, stage.getHeight()/3, imgPlata));
    grupoAssets.add(new Plataforma(510, stage.getHeight()/1.6, imgPlata));
    grupoAssets.add(new Plataforma(860, stage.getHeight()/3.9, imgPlata));
    grupoAssets.add(new Plataforma(1020, stage.getHeight()/1.6, imgPlata));
    grupoAssets.add(new Plataforma(1220, stage.getHeight()/2.5, imgPlata));

    /*Monedas*/
    grupoAssets.add(new Moneda(350, stage.getHeight()/3-130, imgMon));
    grupoAssets.add(new Moneda(650, stage.getHeight()/2-130, imgMon));
    grupoAssets.add(new Moneda(30, stage.getHeight()-480, imgMon));
    grupoAssets.add(new Moneda(80, stage.getHeight()/1.5-50, imgMon));
    grupoAssets.add(new Moneda(530, stage.getHeight()/5+130, imgMon));
    grupoAssets.add(new Moneda(910, stage.getHeight()/6, imgMon));
    grupoAssets.add(new Moneda(1220, stage.getHeight()-80, imgMon));

    /*Puerta*/
    grupoAssets.add(new Puerta(910, stage.getHeight()-85, imgPuer))

    personaje = new Heroe(imgH, framesP);
    personaje.setX(0);
    personaje.setY(stage.getHeight() - personaje.getHeight());
    personaje.limiteDer = stage.getWidth() - personaje.getWidth;
    personaje.limiteTope = stage.getHeight();
    fondo.add(imagenFondo);
    fondo.add(personaje);
    console.log(personaje);
    personaje.start();
    fondo.add(grupoAssets);
    fondo.add(puntaje);
    stage.add(fondo);
    intv = setInterval(frameLoop,1000/20);
}

function nivelDos(){
    console.log('Bienvenido al nivel dos');
}


function moverPersonaje(){
    if(personaje.getAnimation() !='caminar' && (Keyboard[37] || Keyboard[39])){
        personaje.setAnimation('caminar');
    }
    if(Keyboard[37]){
        personaje.retroceder();
    }
    if(Keyboard[39]){
        personaje.caminar();
    }
    if(Keyboard[38] && personaje.contador < 1){
        personaje.saltar();
    }
    if(!(Keyboard[39] || Keyboard[38] || Keyboard[37]) && !personaje.estaSaltando){
        personaje.setAnimation('estatico');
    }
}

function addKeyBoardEvents(){

    addEvent(document, "keydown", function(e){
        Keyboard[e.keyCode] = true;
    });

    addEvent(document, "keyup", function(e){
        Keyboard[e.keyCode] = false;
    });


    function addEvent(element,eventName,func){
        if(element.addEventListener){
            element.addEventListener(eventName,func,false);

        }else if (element.attachEvent){
            element.attachEvent(eventName,func);
        }
    }
}

function hit(a,b){
	var hit = false;
	//Colsiones horizontales
	if(b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth()){
		//Colisiones verticales
		if(b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight())
			hit = true;
	}
	//Colisión de a con b
	if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth()){
		if(b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight())
			hit = true;
	}
	//Colisión b con a
	if(a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth()){
		if(a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight())
			hit = true;
	}
	return hit;
}

function moverFondo(){
    if(personaje.getX()>(stage.getWidth()/2) && Keyboard[39]){
        for(i in grupoAssets.children){
            personaje.vx = 1;
            var asset = grupoAssets.children[i];
            asset.move(-5,0);
        }
    }else{
        personaje.vx = 10;
    }
}

function moverEnemigos(){
    var enemigos = grupoAssets.children;
    for(i in enemigos){
        var enemigo = enemigos[i];
        if(enemigo instanceof Enemigo)
            enemigo.mover();
    }
}


function aplicarFuerzas(){
    personaje.aplicarGravedad(grav,val_reb);
}

function detectarColPlataformas(){
    var plataformas = grupoAssets.children;
    for (i in plataformas){
        var plataforma = plataformas[i];
        if(hit(plataforma,personaje)){
            if(plataforma instanceof Enemigo){
                if(personaje.vy > 2 && personaje.getY() < plataforma.getY()){
                    plataforma.remove();
                    juego.puntaje +=5;
                }else{
                    console.log('te has morido');
                }
            }
            else if(plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy >=0){
                personaje.contador = 0;
                personaje.setY(plataforma.getY() - personaje.getHeight());
                personaje.vy *= val_reb;
            }
            else if(plataforma instanceof Moneda){
                plataforma.remove();
                juego.puntaje += 2;
            }
            else if(plataforma instanceof Puerta && juego.llave){
                if(juego.nivel == 1) nivelDos();
                if(juego.nivel == 2) console.log('Ganaste Won');
            }
        }
    }
}

function actualizarTexto(){
    puntaje.setText('Puntaje '+juego.puntaje);
}
nivelUno();
addKeyBoardEvents();
function frameLoop(){
    aplicarFuerzas();
    actualizarTexto();
    detectarColPlataformas();
    moverFondo();
    moverPersonaje();
    moverEnemigos();
    stage.draw();
}