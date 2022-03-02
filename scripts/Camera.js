class Camera{

    GUID = 0
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    getPosition(){
        return {x: this.x, y: this.y};
    }

    move(position){
        this.x += position.x === undefined ? 0 : position.x;
        this.y += position.y === undefined ? 0 : position.y;

        // this.translate({x: position.x === undefined ? 0 : position.x, y: position.y === undefined ? 0 : position.y})
        
        // this.availableSquares = this.filterSquares();
    }

    moveTo(position){
        // this.translate({x: position.x === undefined ? this.x : position.x - this.x, y: position.y === undefined ? this.y : position.y - this.y})
        this.x = position.x === undefined ? this.x : position.x;
        this.y = position.y === undefined ? this.y : position.y;
        
        // this.availableSquares = this.filterSquares();

        if(this.y < -274) this.y = -274;
        else if(this.y > 274) this.y = 274;
        if(this.x > 170) this.x = 170;
        else if(this.x < -2200) this.x = -2200;
    }

    translate(ctx){
        ctx.translate(this.x, this.y);
    }

}