let cookingSteps = {
    preparation: {
        title: "¡Agua hirviendo!",
        instructions: "Hierve 600ml de agua~",
        nextStep: "Próxima etapa"
    },
    boiling: {
        title: "¡Poner el buldak en agua hirviendo!",
        instructions: "Pon los fideos en agua hirviendo y cuécelos a fuego lento durante 5 minutos.",
        time: 5*60,
        nextStep: "Próxima etapa"
    },
    sauceStep: {
        title: "¡Cocina terminada!",
        instructions: "Tirar el agua y quedan 8 cucharadas de agua. Poner salsa líquida y saltear 30 segundos más",
        time: 30,
        nextStep: "Próxima etapa"
    },
    finishingTouch: {
        title: "¡Poner el buldak en agua hirviendo!",
        instructions: "Añadir los copos, remover bien y servir. Buen Provecho, mi amor.",
        nextStep: "Cerrar"
    }
}

let currentCookingStep = "preparation";

let countdownCounter;
let countdownInterval; 
let audioInterval;
let audioDelay=2000;

function secToMinAndSecTxt(sec) {
    let minute = Math.floor(sec / 60);
    let second = sec % 60;

    return minute > 0 ? `${minute}:${second == 0 ? '00' : second}` : second;
}

window.addEventListener("load", (event) => {
    let title = document.querySelector("#title");
    let instructions = document.querySelector("#instructions");
    let countdownContainer= document.querySelector(".countdown-container");
    let countdownDisplay = document.querySelector("#countdown-display");
    let countdownButton = document.querySelector("#countdown-button");
    let nextStepButton = document.querySelector("#button");
    let snoozeButton = document.querySelector("#snooze-button");
    let audio = document.querySelector("#audio");

    function resetCountdownArea() {
        countdownDisplay.style.display = "none";
        countdownButton.style.display = "block";
    }

    function audioRepeat() {
        audio.play();
    }

    function countdown() {
        let minute = Math.floor(countdownCounter / 60);
        let second = countdownCounter % 60;
        console.log(countdownCounter)
        

        countdownDisplay.textContent = minute > 0 ? `${minute}:${second == 0 ? '00' : second}` : second;

        // decrement time by one second with each interval as set in the setInterval call `1000`
        countdownCounter--;
        // clear the interval if the minutes and seconds are both set to 0
        if (minute == 0 && second == 0) {
            nextStepButton.style.display = "block";
            instructions.style.display = "block";
            audio.play();

            clearInterval(countdownInterval)
            countdownDisplay.textContent = "¡Listo!"
            audioInterval = setInterval(audioRepeat, audioDelay);
        }

      }

    nextStepButton.addEventListener("click", (e)=> {
        console.log(currentCookingStep)
        let currentData = {}

        switch (currentCookingStep) {
            case "preparation":
                currentData = cookingSteps.boiling;
                countdownContainer.style.display = "flex";
                countdownDisplay.textContent = secToMinAndSecTxt(cookingSteps.boiling.time)
                nextStepButton.style.display = "none";

                currentCookingStep = "boiling";
                break;
            case "boiling":
                currentData = cookingSteps.sauceStep;
                resetCountdownArea();
                countdownDisplay.textContent = secToMinAndSecTxt(cookingSteps.sauceStep.time)
                nextStepButton.style.display = "none";

                currentCookingStep = "sauceStep";
                break;
            case "sauceStep":
                currentData = cookingSteps.finishingTouch;
                countdownContainer.style.display = "none";
                resetCountdownArea();

                currentCookingStep = "finishingTouch";
                break;
            case "finishingTouch":
                currentData = cookingSteps.preparation;

                currentCookingStep = "preparation";
                break;
            default:
                console.log("Erreur switch bouton")
                break; 
        }

        title.textContent = currentData.title  
        instructions.textContent =  currentData.instructions
        button.textContent = currentData.nextStep
    })

    countdownButton.addEventListener("click", (e)=> {
        if (currentCookingStep == "boiling") {
            countdownCounter = 1; //cookingSteps.boiling.time-1;
        }
        else if (currentCookingStep == "sauceStep") {
            countdownCounter = 1 ;//cookingSteps.sauceStep.time-1;
        }
        
        instructions.style.display = "none";
        countdownDisplay.style.display = "block";
        countdownButton.style.display = "none";
        countdownInterval = setInterval(countdown, 1000);
        snoozeButton.style.display = "block";

    })

    snoozeButton.addEventListener("click", (e)=> {
        if(audioInterval) {
            clearInterval(audioInterval);
            audioInterval = null;
            snoozeButton.style.display = "none";
        }
    })

    console.log("page is fully loaded");
});