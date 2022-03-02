class Calculator{
    R = 8.3144598
    c = 299792458
    G = 6.6743015 * Math.pow(10, -11)
    k = 1.380649 * Math.pow(10, -23)
    fieldVals = {}
    fieldInputs = {}
    fieldChooseInputs = {}
    fieldToCalc = ""
    constructor(mainClass, fields, pattern, info){
        this.main = document.querySelector("." + mainClass);
        this.main.classList.add("calcFormula");
        this.fields = fields;
        this.pattern = pattern;
        this.info = info;


        this.main.innerHTML = `<div class="buttons"></div>
                                <div class="fields"></div>

                                <button class="calcBtn">
                                    Посчитать
                                </button>
                                
                                ${this.generateInfo()}
                                `;
    
        for(let field in fields){
            if(this.fieldToCalc == "") this.fieldToCalc = field;
            const button = document.createElement("button");
            button.classList.add("btn", field);
            button.innerHTML = field;
            this.main.querySelector(".buttons").appendChild(button)
            this.pattern = this.pattern.replace("%" + field, this.getField(field));
        }

        this.main.querySelector(".fields").innerHTML = this.pattern;

        for(let field in fields){
            this.fieldVals[field] = 0;
            this.fieldInputs[field] = this.main.querySelector(".fields .field[data--type='"+field+"']");
            this.fieldChooseInputs[field] = this.main.querySelector(".buttons .btn." + field);
        }

        for(let i in this.fieldChooseInputs){
            if(i == this.fieldToCalc) this.fieldChooseInputs[i].classList.add("active");
            this.fieldChooseInputs[i].addEventListener("click", this.chooseVal.bind(this));
        }

        for(let i in this.fieldInputs){
            this.fieldInputs[i].addEventListener("input", this.updateVal.bind(this));
            if(i == this.fieldToCalc){
                this.fieldInputs[i].setAttribute("readonly", true);
            }
        }

        this.main.querySelector(".calcBtn").addEventListener("click", this.calc.bind(this));
    }

    generateInfo(){
        let d = "";
        let ind = 0;
        for(let field in this.fields){
            d += `<p class="info_">${field} - ${this.info[ind]}</p>`;
            ind++;
        }

        return d;
    }

    getField(field){
        // const fieldInp = document.createElement("input");       
        // fieldInp.classList.add("field");
        // fieldInp.setAttribute("type", "number");
        // fieldInp.setAttribute("data--type", field);
        // fieldInp.setAttribute("placeholder", field);
        // this.main.querySelector(".fields").appendChild(fieldInp);
        return `<input type="number" placeholder="${field}" data--type="${field}" class="field">`;
    }

    calc(e){
        this.fieldInputs[this.fieldToCalc].value = this.fields[this.fieldToCalc](this);

        this.fieldVals[this.fieldToCalc] = this.fields[this.fieldToCalc](this);
    }
    get(fieldName){
        return this.fieldVals[fieldName] === undefined ? 0 : Math.floor(this.fieldVals[fieldName]);
    }

    updateVal(e){
        this.fieldVals[e.target.getAttribute("data--type")] = e.target.value;
    }

    chooseVal(e){
        for(let field in this.fields){
            if(field == e.target.innerHTML){
                this.fieldToCalc = field;
                this.fieldInputs[field].setAttribute("readonly", true);
                this.fieldChooseInputs[field].classList.add("active");
            }
            else{
                this.fieldChooseInputs[field].classList.remove("active");
                this.fieldInputs[field].removeAttribute("readonly");
            }
        };
    }
}
