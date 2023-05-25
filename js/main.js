const collisionDistance = 4;

class Game{
    constructor(){
        this.player = null;
        this.zombieArr = [];
        this.bulletArr= [];
        this.bonusArr = [];
        this.bossArr =[];
        this.gameOver = false

        this.timer = 0;
        this.point = 0;

        this.pointId = document.getElementById('point');
        this.timerId = document.getElementById('timer');
        this.audioId = document.getElementById("backgroundMusic");
        this.iconAudioId = document.getElementById('volumeIcon')
        }

    start(){

        this.player = new Player();
        this.eventListener()

        setInterval(() => {
            const newZombie = new Zombie();
            this.zombieArr.push(newZombie);
        }, 1000)
        
        
        setInterval(() =>{

            this.zombieArr.forEach((elm) => {
                elm.zombieMouvement(this.player)
            })

             this.bulletArr.forEach((elm) => {
                elm.updateBullet()
             })

            this.bulletArr.forEach((bullet) => {
                this.zombieArr.forEach((zombie) => {

                    if(zombie.checkCollisionBullet(bullet)){

                        console.log(bullet, zombie)
                        this.deleteZombie(zombie);

                        this.point += 300;
                           
                        this.bulletArr.splice(this.bulletArr.indexOf(bullet), 1);
                        bullet.domBullet.remove();
                    }
                        this.pointId.innerText = `Score : ${this.point}` 
                });
            });

            this.zombieArr.forEach((zombie) => {
                const distance = Math.sqrt((zombie.positionX - this.player.positionX) ** 2 + (zombie.positionY - this.player.positionY) **2);
                if(distance <= collisionDistance){
                    //window.open('gameover.html', '_self')
                }
            })


        }, 75)

        
        setInterval(() =>{
             const newBoss = new ZombieBoss();
             this.bossArr.push(newBoss);
        }, 25000);
        
        setInterval(() =>{

            this.bossArr.forEach((elm) => {
                elm.bossZombieMouvement(this.player)
            })



            this.bulletArr.forEach((bullet) => {
                this.bossArr.forEach((enemy) => {
                    if(enemy.checkCollisionBullet(bullet)){
                        this.deleteBossZombie(enemy);
                        
                        this.point += 500;
                        
                        this.bulletArr.splice(this.bulletArr.indexOf(bullet), 1);
                        bullet.domBullet.remove()
                    }
                        this.pointId.innerText = `Score : ${this.point}` 
                });
            });


            this.bossArr.forEach((zombie) => {
                const distance = Math.sqrt((zombie.positionX - this.player.positionX) ** 2 + (zombie.positionY - this.player.positionY) **2);
                if(distance <= 4){
                    //window.open('gameover.html', '_self')
                }
            })

        }, 100)


        setInterval(() =>{
            const newBonus = new Bonus();
            this.bonusArr.push(newBonus);
        }, 5000)

        setInterval(() =>{

            this.bonusArr.forEach((bonus) => {
                const distance = Math.sqrt((bonus.positionX - this.player.positionX) ** 2 + (bonus.positionY - this.player.positionY) **2);
                if(distance <= 6){
                    
                    this.deleteBonus(bonus)
                    this.point += 200;
                    
                    
                }

                this.pointId.innerText = `Score : ${this.point}`  
            })
             
        }, 300)

        setInterval(() =>{

            this.timer++;
            this.point += 10;


            this.timerId.innerText = `Timer : ${this.timer}`
            this.pointId.innerText = `Score : ${this.point}`     
        }, 1000)
        
        

}



    deleteBossZombie(zombie){
        const index = this.bossArr.indexOf(zombie)
        if(index !== -1){
            this.bossArr.splice(index, 1);
        }
        zombie.domZombie2.remove();
    }

    deleteZombie(zombie){
        const index = this.zombieArr.indexOf(zombie)
        if(index !== -1){
            this.zombieArr.splice(index, 1);
        }
        zombie.domZombie.remove()
    }

    deleteBonus(bonus){
        const index = this.bonusArr.indexOf(bonus)
        if(index !== -1){
            this.bonusArr.splice(index, 1);
        }
        bonus.domBonus.remove()

    }

    eventListener(){
    document.addEventListener('keydown', (event) => {
        
        if (event.code === 'ArrowUp' && event.code === 'ArrowLeft'){
            this.player.moveUp();
            this.player.moveLeft();
        }
        else if (event.code === 'ArrowUp' && event.code === 'ArrowRight'){
            this.player.moveUp();
            this.player.moveRight();
        }
        else if (event.code === 'ArrowDown' && event.code === 'ArrowLeft'){
            this.player.moveDown();
            this.player.moveLeft();
        }
        else if (event.code === 'ArrowDown' && event.code === 'ArrowRight'){
            this.player.moveDown();
            this.player.moveRight();
        }
        
        
        else if(event.code === 'ArrowRight'){
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
        event.preventDefault();

        let vw = window.innerWidth;
        let vh = window.innerHeight;
        const mouseX = event.clientX / vw * 100;
        const mouseY = 100 - event.clientY / vh * 100;

        console.log("mouseX", mouseX, mouseY);
        const bullet = new Bullet(this.player.positionX + this.player.width / 2, this.player.positionY + this.player.heigth / 2, mouseX, mouseY);
        this.bulletArr.push(bullet);
    });
        
    const playerImgId = document.getElementById('player')

    document.addEventListener('mousemove', handleMouseMove)

    function handleMouseMove(event){
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let mouseX = event.clientX / vw * 100;
        let mouseY = 100 - event.clientY/ vh * 100;

        let imageWidth = playerImgId.offsetWidth;
        let imageCenterX = playerImgId.offsetLeft + imageWidth / 2;

        let rotationAngle = (mouseX - imageCenterX) / imageWidth * 180;
        playerImgId.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
    }

    this.iconAudioId.addEventListener('click', ()=>{
        if(this.audioId.paused){
            this.audioId.play();
            this.iconAudioId.src = '../';
        } else {
            this.audioId.pause();
            this.iconAudioId.src = "/img/sound_off.png"
        }
    })
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

        this.domPlayer.setAttribute('src', './img/player.gif')
        
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
     this.bulletX = playerX;
     this.bulletY = playerY; 
     this.speed = 2.5;

     this.targetX = targetX
     this.targetY = targetY


     this.width = 0.5;
     this.height = 1;
     this.domBullet = null
        
     this.createBullet()
    }
    createBullet(){
        this.domBullet = document.createElement("div")
        this.domBullet.className = 'bullet'

        this.domBullet.style.height = this.height + 'vh';
        this.domBullet.style.width = this.width + 'vw';
        this.domBullet.style.bottom = this.bulletY + 'vh';
        this.domBullet.style.left = this.bulletX + 'vw';

        
        const bulletId = document.getElementById('board');
        bulletId.appendChild(this.domBullet);
    }
    updateBullet(){
        const dx = this.targetX - this.bulletX;
        const dy = this.targetY - this.bulletY;

        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const normDX = dx / magnitude
        const normDY = dy / magnitude

        this.targetX += normDX * this.speed
        this.targetY += normDY * this.speed
        this.bulletX += normDX * this.speed
        this.bulletY += normDY * this.speed

        this.domBullet.style.left = this.bulletX + 'vw'
        this.domBullet.style.bottom = this.bulletY + 'vh'

    }
}
       


class Zombie{
    constructor(){
        this.positionX = Math.random() * (100 - 0);
        this.positionY = Math.random() * (100 - 0);
        this.width = 3.5;
        this.heigth = 7;
        this.health = 2
        this.speed = Math.random() * (1.2 - 0.6);

        this.domZombie = null
        this.createZombie()
        
    }

    createZombie(){
        this.domZombie = document.createElement('img');
        this.domZombie.className = 'zombie'

        this.domZombie.style.bottom = this.positionY + 'vh'
        this.domZombie.style.left = this.positionX + 'vw'
        this.domZombie.style.height = this.heigth + 'vh'
        this.domZombie.style.width = this.width + 'vw'
        this.domZombie.setAttribute('src', './img/zombie_test.gif')
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie);
    }
    zombieMouvement(player){
        const distX = player.positionX - this.positionX;
        const distY = player.positionY - this.positionY;
        const distance = Math.sqrt(distX * distX + distY * distY)

        const vx = (distX / distance) * this.speed;
        const vy = (distY / distance) * this.speed;
        const angle = Math.atan2(distY, distX) * (180 / Math.PI)

        this.positionX += vx;
        this.positionY += vy

        this.domZombie.style.transform = `rotate(${angle}deg)`
        this.domZombie.style.left = this.positionX + 'vw';
        this.domZombie.style.bottom = this.positionY + 'vh'
    }
    checkCollisionBullet(bullet){
        const distance = Math.sqrt((this.positionX - bullet.bulletX) ** 2 + (this.positionY - bullet.bulletY) ** 2);
        if(distance <= collisionDistance){
            return true;
        }
        return false
    }

}

class ZombieBoss{
    constructor(){
        this.positionX = Math.random() * (100 - 0);
        this.positionY = Math.random() * (100 - 0);
        this.width = 7;
        this.heigth = 14;
        this.health = 10;
        this.speed = 0.5;

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
        this.domZombie2.setAttribute('src', './img/zombie_test.gif')
        
        const zombieId = document.getElementById('board')
        zombieId.appendChild(this.domZombie2);
    }
    bossZombieMouvement(player){
        const distX = player.positionX - this.positionX;
        const distY = player.positionY - this.positionY;
        const distance = Math.sqrt(distX * distX + distY * distY)

        const vx = (distX / distance) * this.speed;
        const vy = (distY / distance) * this.speed;
        const angle = Math.atan2(distY, distX) * (180 / Math.PI);

        this.positionX += vx;
        this.positionY += vy

        this.domZombie2.style.transform = `rotate(${angle}deg)`
        this.domZombie2.style.left = this.positionX + 'vw';
        this.domZombie2.style.bottom = this.positionY + 'vh'
    }
    checkCollisionBullet(bullet){
        const distance = Math.sqrt((this.positionX - bullet.bulletX)  ** 2 + (this.positionY - bullet.bulletY) ** 2);
        if(distance <= collisionDistance){
            return true;
        }
        return false
    }
}   




class Bonus{

    constructor(){
        this.positionX = Math.random() * (95 - 1);
        this.positionY = Math.random() * (95 - 1);
        this.width = 2.5;
        this.heigth = 5;
        
        this.domBonus = null

        this.createBonus()
    }

    createBonus(){
        this.domBonus = document.createElement('img');
        this.domBonus.className = 'bonus'

        this.domBonus.style.bottom = this.positionY + 'vh'
        this.domBonus.style.left = this.positionX + 'vw'
        this.domBonus.style.height = this.heigth + 'vh'
        this.domBonus.style.width = this.width + 'vw'
        
        this.domBonus.setAttribute('src', './img/bonus.png')
        const bonusId = document.getElementById('board')
        bonusId.appendChild(this.domBonus);
    }
}


class Timer{
    constructor(){
        this.positionX = 98
        this.positionY = 1

        this.domTimer = null
        this.createTimer();
    }
    createTimer(){
        this.domTimer = document.createElement('board');
        this.domTimer.id = 'timer';
        
        this.domTimer.style.bottom = this.positionY + 'vh'
        this.domTimer.style.left = this.positionX + 'vw'

        const timerId = document.getElementById('board');
        timerId.appendChild(this.domTimer);
    }
}


//Event listener 
const game = new Game();
game.start()