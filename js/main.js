class Game{
    constructor(){
        this.player = null;
        this.zombieArr = [];
        this.bulletArr= [];
        this.bonusArr = [];
        this.bossArr =[];
        this.time = [];
        this.point = 0;
        }
    start(){
        this.player = new player();
        this.eventListener()

        setInterval(() => {
            const newZombie = new zombie();
            this.zombieArr.push(newZombie);
        }, 4000)
 

        setInterval(() => {
            this.zombieArr.forEach((e) => {

                this.zombieMouvement(e)

                this.detectCollision(e)

            })
        }, 200)
        
        setInterval(() =>{
            const newBonus = new bonus();
            this.bonusArr.push(newBonus);
        }, 10000)
    
        setInterval(() =>{
            const newBoss = new zombieBoss();
            this.bossArr.push(newBoss);
        }, 25000);
    }

    detectCollision(zombieInstance){ 
    // il creer une collision et alert(GAme Over)
    if(
    zombieInstance.positionX < this.player.positionX + this.player.width &&
    zombieInstance.positionX + zombieInstance.width > this.player.positionX &&
    zombieInstance.positionY < this.player.positionY + this.player.height &&
    zombieInstance.height + zombieInstance.positionY > this.player.positionY
    ){
     alert('game Over')
    }
    }
    eventListener(){
    document.addEventListener('keydown', (event) => {
        if(event.code === 'ArrowRight'){
            this.player.moveRight();
        }
        else if (event.code === 'ArrowLeft'){
            this.player.moveLeft();
        }
        else if (event.code === 'ArrowDown'){
            this.player.moveDown();
        }
        else if (event.code === 'ArrowUp'){
            this.player.moveUp();
        }
        else if (event.code === 'SpaceBar'){
            this.player.reload();
        }
        else if(event.code === 'click'){
            this.player.shoot();
        }
        })
    
    const playerImgId = document.getElementById('player')

    document.addEventListener('mousemove', handleMouseMove)
    
    function handleMouseMove(event){
        let mouseX = event.clientX;
        let imageWidth = playerImgId.offsetWidth;
        let imageCenterX = playerImgId.offsetLeft + imageWidth / 2;

        let rotationAngle = (mouseX - imageCenterX) / imageWidth * 15;
        playerImgId.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
    }

    }
    zombieMouvement(zombie){
        if(this.player.positionY < zombie.positionY){
            zombie.positionY--;
            zombie.style.bottom = zombie.positionY +'vh'
        }else{
            zombie.positionY++;
            zombie.style.bottom = zombie.positionY +'vh'
        }
        if(this.player.positionX < zombie.positionX){
            zombie.positionX--;
            zombie.style.left = zombie.positionX +'vw'
        } else {
            zombie.positionX++;
            zombie.style.left = zombie.positionX +'vw'
        }
    }
}

class player{
    constructor(){
    this.positionX = 50;
    this.positionY = 50;
    this.width = 4;
    this.heigth = 8;
    this.domPlayer = null
    
    this.createPlayer();
    

    }
    createPlayer(){
        this.domPlayer = document.createElement("img")

        this.domPlayer.id = 'player'
        this.domPlayer.style.height = this.heigth + 'vh';
        this.domPlayer.style.width = this.width + 'vw';
        this.domPlayer.style.bottom = this.positionY + 'vh';
        this.domPlayer.style.left = this.positionX + 'vw';

        this.domPlayer.setAttribute('src', '../img/player.gif')
        
        const playerId = document.getElementById('board');
        playerId.appendChild(this.domPlayer);
    }

    moveUp(){
        if(this.positionY === 100 - this.heigth ){
            return
        }else {
            this.positionY++;
            this.domPlayer.style.bottom = this.positionY + 'vh'
        }
    }

    moveDown(){
        if(this.positionY === 0 ){
            return
        }else{
            this.positionY--;
            this.domPlayer.style.bottom = this.positionY +'vh'
        }
    }

    moveLeft(){
        if(this.positionX === 0){
            return
        }else{
            this.positionX--;
            this.domPlayer.style.left = this.positionX +'vw'
        }
    }

    moveRight(){
        if(this.positionX === 98){
            return
        }else{
            this.positionX++;
            this.domPlayer.style.left = this.positionX +'vw'
        }
    }
    reload(){

    }
    shoot(){

    }
}



class bullet{
    constructor(){
     this.bulletX = this.player.positionX + this.player.width/2;
     this.bulletY = this.player.positionY; 
     this.speed = 5;
     this.delay = 8;
     this.damage = 1;

     this.width = 1
     this.height = 1
     this.domBullet = null
     createBullet()
    }
    createBullet(){
        this.domBullet = document.createElement("img")

        this.domBullet.id = 'bullet'
        this.domBullet.style.height = this.heigth + 'vh';
        this.domBullet.style.width = this.width + 'vw';
        this.domBullet.style.bottom = this.bulletY + 'vh';
        this.domBullet.style.left = this.bulletX + 'vw';


        
        const bulletId = document.getElementById('board');
        bulletId.appendChild(this.domBullet);
    }
}
       


class zombie{
    constructor(){
        this.positionX = Math.random() * (100 - 0);
        this.positionY = Math.random() * (100 - 0);
        this.width = 3.5;
        this.heigth = 7;
        this.health = 2

        this.domZombie = null
        this.createZombie()
    }

    createZombie(){
        this.domZombie = document.createElement('img');
        this.domZombie.id = 'zombie'

        this.domZombie.style.bottom = this.positionY + 'vh'
        this.domZombie.style.left = this.positionX + 'vw'
        this.domZombie.style.height = this.heigth + 'vh'
        this.domZombie.style.width = this.width + 'vw'
        this.domZombie.setAttribute('src', '../img/zombie_test.gif')
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie);
    }
}   

class zombieBoss{
    constructor(){
        this.positionX = Math.random() * (100 - 0);
        this.positionY = Math.random() * (100 - 0);
        this.width = 7;
        this.heigth = 14;
        this.health = 10

        this.domZombie2 = null
        this.createZombie()
    }

    createZombie(){
        this.domZombie2 = document.createElement('img');
        this.domZombie2.id = 'boss'

        this.domZombie2.style.bottom = this.positionY + 'vh'
        this.domZombie2.style.left = this.positionX + 'vw'
        this.domZombie2.style.height = this.heigth + 'vh'
        this.domZombie2.style.width = this.width + 'vw'
        this.domZombie2.setAttribute('src', '../img/zombie_test.gif')
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie2);
    }
}   




class bonus{

    constructor(){
        this.positionX = Math.random() * (95 - 1);
        this.positionY = Math.random() * (95 - 1);
        this.width = 1.5;
        this.heigth = 3;
        
        this.domBonus = null
        this.createBonus()
    }

    createBonus(){
        this.domBonus = document.createElement('div');
        this.domBonus.id = 'bonus'

        this.domBonus.style.bottom = this.positionY + 'vh'
        this.domBonus.style.left = this.positionX + 'vw'
        this.domBonus.style.height = this.heigth + 'vh'
        this.domBonus.style.width = this.width + 'vw'
        
        const bonusId = document.getElementById('board')
        bonusId.appendChild(this.domBonus);
    }
}









//Event listener 
const game = new Game();
game.start()