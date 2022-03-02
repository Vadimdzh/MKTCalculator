class Charts{

    processes = []
    lid = 1

    canvases = []
    constructor(){
        this.addIsoBtn = document.querySelectorAll('.addIso');

        this.pV = document.getElementById("pV");
        this.pVctx = this.pV.getContext('2d');
        
        this.pT = document.getElementById("pT");
        this.pTctx = this.pT.getContext('2d');

        this.VT = document.getElementById("VT");
        this.VTctx = this.VT.getContext('2d');

        this.canvases = [this.pV, this.pT, this.VT];

        

        this.canvases.forEach(canvas => {
            canvas.width = 300;
            canvas.height = 300;
        })

        this.addIsoBtn.forEach(el => {

            el.addEventListener('click', (e) => {
                this.processes.push({process_type: e.target.getAttribute('p-type'), startValue: 0, endValue: 0});

                const action = document.createElement('div');

                action.classList.add('action');
                action.innerHTML = `${this.lid}) ${e.target.innerHTML} - const <br><br>
                <input type="number" id="as${this.processes.length-1}" i-type="startValue" class="field field_iso" placeholder="${e.target.innerHTML}1"> -> <input type="number" id="ae${this.processes.length-1}" i-type="endValue" class="field field_iso" placeholder="${e.target.innerHTML}2">`;
                

                document.querySelector(".actions").appendChild(action);
                this.lid++;

                this.reEvent();
            })
        });
    }

    reEvent(){
        document.querySelectorAll(".field_iso").forEach(el => {
            el.removeEventListener('input', this.ActionChange.bind(this));
            el.addEventListener("input", this.ActionChange.bind(this));
        })
    }

    ActionChange(e){
        if(Number.isInteger(parseInt(e.target.value))){
            const id = parseInt(e.target.getAttribute('id').substring(2));
        
            this.processes[id][e.target.getAttribute('i-type')] = parseInt(e.target.value);

            this.reDraw();
        }
    }

    drawpV(process){
        const pType = process.process_type;
        const angle = pType == 'p' ? 0 : pType == 'V' ? 90 : 45;
        
        let maxProcess = Math.max(...this.processes.map(el => el.startValue > el.endValue ? el.startValue : el.endValue)),
        mashtab = 300/maxProcess;

        ctx.beginPath();
        ctx.moveTo();


    }

    drawpT(process){

    }

    drawVT(process){

    }

    reDraw(){
        this.canvases.forEach((canvas, ind) => {
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle= current_theme == 'light' ? 'black' : 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawArrow(ctx, 2, 300, 2, 0);
            ctx.lineWidth = '5';
            ctx.strokeStyle = current_theme == 'light' ? 'white' : 'black';
            
            drawArrow(ctx, 2, 298, 300, 300);
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '18px Verdana';
            ctx.fillStyle = current_theme == 'light' ? 'white' : 'black';
            ctx.fillText(ind == 0 ? 'p' : ind == 1 ? 'p' : 'V', 15, 10);
            ctx.fillText(ind == 0 ? 'V' : ind == 1 ? 'T' : 'T', 290, 285);
        })
        this.processes.forEach(process => {
            console.log(process);
            this.drawpV(process);
            this.drawpT(process);
            this.drawVT(process);
        })
    }
}