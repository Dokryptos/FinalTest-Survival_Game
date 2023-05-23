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
        this.player = new Player();
        this.eventListener()

        setInterval(() => {
            const newZombie = new Zombie();
            this.zombieArr.push(newZombie);
        }, 2000)
        
        setInterval(() =>{
            console.log(this.zombieArr)

            this.zombieArr.forEach((elm) => {
                console.log(elm)

                

                elm.zombieMouvement(this.player)

                this.detectCollision(elm)
                    
                
            
            })
        }, 300)

        
        // setInterval(() =>{
        //     const newBoss = new ZombieBoss();
        //     this.bossArr.push(newBoss);
        // }, 25000);
        
        setInterval(() =>{
            //updateBullet()

            this.bossArr.forEach((elm) => {
                console.log(elm)

                zombieMouvement(elm)

                if(this.detectCollision(elm) === true){
                    alert('game Over')
                }

            })
        }, 200)



        setInterval(() =>{
            const newBonus = new Bonus();
            this.bonusArr.push(newBonus);
        }, 10000)

        setInterval(() =>{
            this.bonusArr.forEach((elm) => {

                if(this.detectCollision(elm) === true){
                    this.point += 100;
                    elm.remove()
                }
            })
        }, 500)
        
        
        
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
        })

    document.addEventListener('click', (event) =>{
                    
            const newBullet = new Bullet(this.player.positionX, this.player.positionY, event.clientX, event.clientY)
             this.bulletArr.push(newBullet); 
             
        }
    )
        
       
    
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
    addCounter(){
        const pointCounter = document.getElementById('counter');    
        pointCounter.textContent(this.point)
    }

}

class Player{
    constructor(){
    this.positionX = 50;
    this.positionY = 50;
    this.width = 4;
    this.heigth = 8;
    this.dir = 0


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
}



class Bullet{
    constructor(playerX, playerY, targetX, targetY){
     this.bulletX = playerX + playerX.width/2;
     this.bulletY = playerY; 
     this.speed = 5;
     this.delay = 8;
     this.targetX = targetX
     this.targetY = targetY

     this.directionX = (this.targetX - this.bulletX)/ this.speed
     this.directionY = (this.targetY - this.bulletY) / this.speed

     this.width = 0.5;
     this.height = 0.5;
     this.domBullet = null
        

    }
    createBullet(){
        this.domBullet = document.createElement("div")

        this.domBullet.className = 'bullet'
        this.domBullet.style.height = this.heigth + 'vh';
        this.domBullet.style.width = this.width + 'vw';
        this.domBullet.style.bottom = this.bulletY + 'vh';
        this.domBullet.style.left = this.bulletX + 'vw';


        
        const bulletId = document.getElementById('board');
        bulletId.appendChild(this.domBullet);
    }
    updateBullet(){
        this.domBullet.style.left = this.bulletX += this.directionX;
        this.domBullet.style.bottom = this.bulletY += this.directionY;
    }
}
       


class Zombie{
    constructor(){
        this.positionX = Math.random() * (100 - 0);
        this.positionY = Math.random() * (100 - 0);
        this.width = 3.5;
        this.heigth = 7;
        this.health = 2
        this.speed = 1

        this.domZombie = null
        this.createZombie()
        
    }
    moveRight(){
        this.positionX++;
        this.domZombie.style.left = this.positionX + 'vw'
    }

    createZombie(){
        this.domZombie = document.createElement('img');
        this.domZombie.className = 'zombie'

        this.domZombie.style.bottom = this.positionY + 'vh'
        this.domZombie.style.left = this.positionX + 'vw'
        this.domZombie.style.height = this.heigth + 'vh'
        this.domZombie.style.width = this.width + 'vw'
        this.domZombie.setAttribute('src', '../img/zombie_test.gif')
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie);
    }
    zombieMouvement(player){
        const distX = player.positionX - this.positionX;
        const distY = player.positionY - this.positionY;
        const distance = Math.sqrt(distX * distX + distY * distY)

        const vx = (distX / distance) * this.speed;
        const vy = (distY / distance) * this.speed;

        this.positionX += vx;
        this.positionY += vy

        this.domZombie.style.left = this.positionX + 'vw';
        this.domZombie.style.bottom = this.positionY + 'vh'
    //     if(player.positionY < this.domZombie.positionY){
    //         this.domZombie.positionY--;
    //         this.domZombie.style.bottom = this.domZombie.positionY +'vh'
    //     }else{
    //          this.domZombie.positionY++;
    //          this.domZombie.style.bottom = this.domZombie.positionY +'vh'
    //      }
    //      if(player.positionX < this.domZombie.positionX){
    //          this.domZombie.positionX--;
    //          this.domZombie.style.left = this.domZombie.positionX +'vw'
    //     } else {
    //          this.domZombie.positionX++;
    //          this.domZombie.style.left = this.domZombie.positionX +'vw'
    //     }
    }
}

/*class ZombieBoss{
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
        this.domZombie2.className = 'boss'

        this.domZombie2.style.bottom = this.positionY + 'vh'
        this.domZombie2.style.left = this.positionX + 'vw'
        this.domZombie2.style.height = this.heigth + 'vh'
        this.domZombie2.style.width = this.width + 'vw'
        this.domZombie2.setAttribute('src', '../img/zombie_test.gif')
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie2);
    }
}   */




class Bonus{

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
        this.domBonus.className = 'bonus'

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