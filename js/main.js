


class player{
    constructor(){
    this.positonX = 50;
    this.positonY = 50;
    this.width = 5;
    this.heigth = 5;
    
    this.domPlayer = null
    
    creatPlayer()
    }
    creatPlayer(){
    this.domPlayer = document.createElement('div')

    this.domPlayer.id = 'player'
    this.domPlayer.style.height = this.heigth + 'vh';
    this.domPlayer.style.width = this.width + 'vw';
    this.domPlayer.style.bottom = this.positonY + 'vh';
    this.domPlayer.style.left = this.positonX + 'vw';
    
    const playerId = document.getElementById('board');
    playerId.appendChild(this.domPlayer);
    }
    moveUp(){
        if(this.positonY === 100 - this.heigth ){
            return
        }else {
            this.positionY++;
            this.domPlayer.style.bottom = this.positonY + 'vh';
        }
    }
    moveDown(){
        if(this.positonY === 0 + this.heigth){
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

class zombie{
    constructor(){
        this.positonX = 50;
        this.positonY = 50;
        this.width = 5;
        this.heigth = 5;
        
        this.domElement = null
    }
}
const player = new player()
