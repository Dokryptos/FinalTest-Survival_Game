class Game{
    constructor(){
        this.player = null;
        this.zombieArr = [];
        this.bulletArr= [];
        this.bonusArr = []

    }
    start(){
        this.player = new player();
        this.eventListener()

        setInterval(() => {
            const newZombie = new zombie();
            this.zombieArr.push(newZombie);
        }, 2000)

        setInterval(() => {
            this.zombieArr.forEach((e) => {

                zombieMouvement(e)

                this.detectCollision(e)


            })
        }, 50)
    
    
    }
    detectCollision(obstacleInstance){ 
    // il creer une collision et alert(GAme Over)
    if(
    obstacleInstance.positionX < this.player.positionX + this.player.width &&
    obstacleInstance.positionX + obstacleInstance.width > this.player.positionX &&
    obstacleInstance.positionY < this.player.positionY + this.player.height &&
    obstacleInstance.height + obstacleInstance.positionY > this.player.positionY
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
            this.player.shoot();
        }
        })
    }
}

class player{
    constructor(){
    this.positonX = 50;
    this.positonY = 50;
    this.width = 2.5;
    this.heigth = 5;
    this.domPlayer = null
    
    this.createPlayer();
    

    }
    createPlayer(){
        this.domPlayer = document.createElement("div")

        this.domPlayer.id = 'player'
        this.domPlayer.style.height = this.heigth + 'vh';
        this.domPlayer.style.width = this.width + 'vw';
        this.domPlayer.style.bottom = this.positonY + 'vh';
        this.domPlayer.style.left = this.positonX + 'vw';
        
        const playerId = document.getElementById('board');
        playerId.appendChild(this.domPlayer);
    }

    moveUp(){
        if(this.positonY === 100 ){
            return
        }else {
            this.positionY++;
            this.domPlayer.style.bottom = this.positonY + 'vh'
        }
    }

    moveDown(){
        if(this.positonY === 0 ){
            return
        }else{
            this.positonY--;
            this.domPlayer.style.bottom = this.positonY +'vh'
        }
    }

    moveLeft(){
        if(this.positonX === 0 + this.width){
            return
        }else{
            this.positonX--;
            this.domPlayer.style.left = this.positonX +'vw'
        }
    }

    moveRight(){
        if(this.positonX === 100 - this.width){
            return
        }else{
            this.positonX++;
            this.domPlayer.style.left = this.positonX +'vw'
        }
    }
}



class bullet{
    constructor(){
     this.bulletX = this.player.positonX + this.player.width/2;
     this.bulletY = this.player.positonY; 
     this.speed = 5;
     this.delay = 8;
     this.damage = 1;

     this.width = 1
     this.height = 1
     this.domBullet = null
     createBullet()
    }
    createBullet(){
        this.domBullet = document.createElement("div")

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
        this.positonX = Math.random() * (100 - 0);
        this.positonY = Math.random() * (100 - 0);
        this.width = 3;
        this.heigth = 6;
        
        this.domZombie = null
        this.createZombie()
    }

    createZombie(){
        this.domZombie = document.createElement('div');
        this.domZombie.id = 'zombie'

        this.domZombie.style.bottom = this.positonY + 'vh'
        this.domZombie.style.left = this.positonX + 'vw'
        this.domZombie.style.height = this.heigth + 'vh'
        this.domZombie.style.width = this.width + 'vw'
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie);
    }

    zombieMouvement(){

        if(this.player.positionY < this.zombie.positionY){
        this.zombie.positionY--;
        }else{
            this.zombie.positionY++;
        }
        if(this.player.positonX < this.zombie.positonX){
        this.zombie.positonX--;
        } else {
            this.zombie.positonX++;
        }

    }
}   





class bonus{

    constructor(){
        this.positonX = Math.random() * (95 - 1);
        this.positonY = Math.random() * (95 - 1);
        this.width = 1.5;
        this.heigth = 3;
        
        this.domBonus = null
        this.createBonus()
    }

    createBonus(){
        this.domBonus = document.createElement('div');
        this.domBonus.id = 'bonus'

        this.domBonus.style.bottom = this.positonY + 'vh'
        this.domBonus.style.left = this.positonX + 'vw'
        this.domBonus.style.height = this.heigth + 'vh'
        this.domBonus.style.width = this.width + 'vw'
        
        const bonusId = document.getElementById('board')
        bonusId.appendChild(this.domBonus);
    }
}









//Event listener 
const game = new Game();
game.start()