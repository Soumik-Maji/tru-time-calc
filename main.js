const startElm = document.getElementById("start");
const endElm = document.getElementById("end");
const btnElm = document.getElementById("btn");
const outputElm = document.getElementById("outputs");

btnElm.addEventListener("click", () => {
    // INPUTS
    const start = new Time(startElm.value);
    const end = new Time(endElm.value);

    // OUTPUT STRING
    let outputStr = Time.print("Actual", start, end);

    // CONSTANTS
    const gap = new Time("00:05");
    const totalDuration = new Time("10:00"); // 10 hrs

    // CALCULATIONS
    const actualDuration = end.sub(start);
    // if(actualDuration.greaterThan)
    /*
        CHECK IF ACTUAL DURARION IS >= 10 HR THEN SKIP EVERYTING.
    */

    let fillerDuration = totalDuration.sub(actualDuration);

    const morningStart = new Time("09:00"); // hard start at 9am
    let morningEnd = morningStart.add(fillerDuration);
    if (morningEnd.greaterThan(start)) {
        morningEnd = start.sub(gap);
        const morningDuration = morningEnd.sub(morningStart);
        outputStr = Time.print("Morning", morningStart, morningEnd) + "\n" + outputStr;

        fillerDuration = fillerDuration.sub(morningDuration);
        const eveningStart = end.add(gap);
        const eveningEnd = eveningStart.add(fillerDuration);
        outputStr += "\n" + Time.print("Evening", eveningStart, eveningEnd);
    }
    else {
        /*
            if morning end is less than actual start & compensates the total duration
        */
        outputStr = Time.print("Morning", morningStart, morningEnd) + "\n" + outputStr;
    }

    outputElm.innerText = outputStr;
});

btnElm.click();
