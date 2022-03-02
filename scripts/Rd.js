let GID = 1;
(async () => {
    // init blocks

    const startElementInput = document.querySelector(".startElementNumber"),
    startMassInput = document.querySelector(".startMass"),
    elementMass = document.querySelector(".previewMass"),
    elementNumber = document.querySelector(".previewNumber"),
    elementSymbol = document.querySelector(".previewSymbol"),
    calcBtn = document.querySelectorAll(".calcBtn");


    let table = {};
    let currentNumber = 0,
    currentMass = 0;
    let PeriodicPath = "https://vadimdzh.github.io/MKTCalculator/assets/PeriodicTableJSON.json";
    const response = await fetch(PeriodicPath);
    table = await response.json();
    const elements = table.elements;
    // let GID = 1;
    // console.log(elements);

    startElementInput.addEventListener("input", (e) => {
        const number = e.target.value;
        if(number < 0 || number > 119 || number === undefined || number == "") return;
        else{
            const element = elements.find(el => el.number == number);
            
            currentNumber = number;
            currentMass = Math.round(element.atomic_mass);
            startMassInput.value = currentMass;
            drawElement(currentNumber, currentMass, element.symbol);
        }
        
        
    })

    function drawElement(number, mass, symbol){
        elementMass.innerText = Math.round(mass);
        elementNumber.innerText = number;
        elementSymbol.innerText = symbol;
    }
    startMassInput.addEventListener("input", (e) => {
        if(e.target.value < 1) return;
        currentMass = e.target.value;
        elementMass.innerText = e.target.value;
    })

    let index = 1;

    function doAlpha(element){
        if(element.number <= 2 || element.atomic_mass <= 4) return element;
        const inElement = elements.find(el => el.number == element.number),
        nNumber = element.number - 2,
        nMass = Math.round(element.atomic_mass) - 4;

        const div = document.createElement('div');
        div.innerHTML = `<b>${GID})</b>
                    <div class="element">
                        <div class="elementData">
                            <p class="mass">${Math.round(element.atomic_mass)}</p>
                            <p class="periodicNumber">${element.number}</p>
                        </div>
                        <div class="elementSymbol">
                            ${element.symbol}
                        </div>
                    </div>

                    <div class="action">
                        <img rtype="Alpha" src="assets/Alpha_${localStorage.getItem("theme") == null ? 'black' : localStorage.getItem("theme") == 'light' ? 'black' : 'white'}.png" alt="" class="actionImage">
                    </div>

                    <div class="element">
                        <div class="elementData">
                            <p class="mass">${nMass}</p>
                            <p class="periodicNumber">${nNumber}</p>
                        </div>
                        <div class="elementSymbol">
                            ${elements.find(el => el.number == nNumber).symbol}
                        </div>
                    </div>

                    <b>+</b>

                    <div class="element">
                        <div class="elementData">
                            <p class="mass">4</p>
                            <p class="periodicNumber">2</p>
                        </div>
                        <div class="elementSymbol">
                            He
                        </div>
                    </div>`;
        div.classList.add("calcBlock");
        document.querySelector(".calcData").appendChild(div);
        index++;
        return {atomic_mass: nMass, number: nNumber, symbol: elements.find(el => el.number == nNumber).symbol};
    }

    function doBeta(element){
        if(element.number == 119) return element;
        const inElement = elements.find(el => el.number == element.number),
        nNumber = parseInt(element.number) + 1,
        nMass = Math.round(element.atomic_mass);

        const div = document.createElement('div');
        console.log(elements, nNumber, element.number);
        console.log(elements.find(el => el.number == nNumber));
        div.innerHTML = `<b>${GID})</b>
                    <div class="element">
                        <div class="elementData">
                            <p class="mass">${Math.round(element.atomic_mass)}</p>
                            <p class="periodicNumber">${element.number}</p>
                        </div>
                        <div class="elementSymbol">
                            ${element.symbol}
                        </div>
                    </div>

                    <div class="action">
                        <img src="assets/Beta.png_${localStorage.getItem("theme") == null ? 'black' : localStorage.getItem("theme") == 'light' ? 'black' : 'white'}" alt="" rtype="Beta" class="actionImage">
                    </div>

                    <div class="element">
                        <div class="elementData">
                            <p class="mass">${nMass}</p>
                            <p class="periodicNumber">${nNumber}</p>
                        </div>
                        <div class="elementSymbol">
                            ${elements.find(el => el.number == nNumber).symbol}
                        </div>
                    </div>

                    <b>+</b>

                    <div class="element">
                        <div class="elementData">
                            <p class="mass">0</p>
                            <p class="periodicNumber">-1</p>
                        </div>
                        <div class="elementSymbol">
                            e
                        </div>
                    </div>`;
        div.classList.add("calcBlock");
        document.querySelector(".calcData").appendChild(div);
        index++;
        return {atomic_mass: nMass, number: nNumber, symbol: elements.find(el => el.number == nNumber).symbol};
    }

    calcBtn.forEach(el => {
        el.addEventListener("click", (e) => {
            index = 1;
            let lastElement = {atomic_mass: currentMass, number: currentNumber, symbol: elements.find(el => el.number == currentNumber).symbol};
            let isSave = document.querySelector(".saveElement").checked;
            let nEL = undefined;
            if(e.target.getAttribute("r-type") == 'Alpha'){
                nEL = doAlpha(lastElement);
            }
            else{
                nEL = doBeta(lastElement);
            }

            if(isSave){
                currentMass = nEL.atomic_mass;
                currentNumber = nEL.number;
                startElementInput.value = currentNumber;
                startMassInput.value = currentMass;
                drawElement(currentNumber, currentMass, nEL.symbol);
            }

            GID++;
        })
    })

    
})();
