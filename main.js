let mode = "PMT"
let input_PMT = checkInput(document.getElementById("input-value-PMT").value)
let input_RATE = checkInput(document.getElementById("input-value-RATE").value)
let input_NPER = checkInput(document.getElementById("input-value-NPER").value)
let input_PV = checkInput(document.getElementById("input-value-PV").value)
let input_FV = checkInput(document.getElementById("input-value-FV").value)
let begin_or_end = "BEGIN"

function radioSelected(selected) {
    showAllInputs()
    hideInput("input-"+selected)
    document.getElementById("button-calculate").innerText = "CALCULATE " + selected
}

function hideInput(element_to_hide) {
    document.getElementById(element_to_hide).classList.add("hidden")
}

function showAllInputs() {
    document.getElementById("input-PMT").classList.remove("hidden")
    document.getElementById("input-RATE").classList.remove("hidden")
    document.getElementById("input-NPER").classList.remove("hidden")
    document.getElementById("input-PV").classList.remove("hidden")
    document.getElementById("input-FV").classList.remove("hidden")
}

function calculatePMT() {
    let calculated_PMT = (input_FV + input_PV * Math.pow(1 + input_RATE/100, input_NPER)) * input_RATE/100 / (1 - Math.pow(1 + input_RATE/100, input_NPER))

    if (begin_or_end === "BEGIN") {
        calculated_PMT = calculated_PMT / (1 + input_RATE/100)
    }

    return calculated_PMT
}

function calculatePV() {
    let calculated_PV = input_PMT / (input_RATE/100) * (1 / Math.pow(1 + input_RATE/100, input_NPER) - 1) - input_FV / Math.pow(1 + input_RATE/100, input_NPER)

    if (begin_or_end === "BEGIN") {
        calculated_PV = input_PMT / (input_RATE/100) * (1 / Math.pow(1 + input_RATE/100, input_NPER) - 1) * (1 + input_RATE/100) - input_FV / Math.pow(1 + input_RATE/100, input_NPER)
    }

    return calculated_PV
}

function calculateFV() {  
    let calculated_FV = input_PMT / (input_RATE/100) * (1 - Math.pow(1 + input_RATE/100, input_NPER)) - input_PV * Math.pow(1 + input_RATE/100, input_NPER)

    if (begin_or_end === "BEGIN") {
        calculated_FV = input_PMT / (input_RATE/100) * (1 - Math.pow(1 + input_RATE/100, input_NPER)) * (1 + input_RATE/100) - input_PV * Math.pow(1 + input_RATE/100, input_NPER)
    }

    return calculated_FV
}


function printError() {
    document.getElementById("answer").textContent = "ERROR: PLEASE INSPECT INPUTS"
}

function printAnswer(answer) {
    answer = answer.toFixed(2)
    answer = answer.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    document.getElementById("answer").textContent = mode + " = " + answer
}

function checkInput (input_value){
    if (input_value === "") {
        return 0
    }
    else {
        return parseInt(input_value)
    }
}

function refreshInputs() {
    input_RATE = checkInput(document.getElementById("input-value-RATE").value)
    input_NPER = checkInput(document.getElementById("input-value-NPER").value)
    input_PV = checkInput(document.getElementById("input-value-PV").value)
    input_FV = checkInput(document.getElementById("input-value-FV").value)
    input_PMT = checkInput(document.getElementById("input-value-PMT").value)
}

function calculate() {
    const rbs = document.querySelectorAll('input[name="radio-buttons"]')
    let answer = 0
    
    for (const rb of rbs) {
        if (rb.checked) {
            mode = rb.value
        }
    }

    const rbs2 = document.querySelectorAll('input[name="radio-buttons-2"]')
    
    for (const rb2 of rbs2) {
        if (rb2.checked) {
            begin_or_end = rb2.value
        }
    }

    refreshInputs()
    
    if (mode === "PMT") {
        answer = calculatePMT()
    } else if (mode === "PV") {
        answer = calculatePV()
    } else {
        answer = calculateFV()
    }

    if (isNaN(answer)) {
        printError()
    } else {
        printAnswer(answer)
    }
}