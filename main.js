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
    const totalDuration = new Time("10:01"); // 10 hrs normal & 1 min for safety

    // CALCULATIONS
    const actualDuration = end.sub(start);

    if (actualDuration.greaterThanEqual(totalDuration)) // no need to calculate if total achieved
        outputStr = "You have done enough already. Take some rest!";
    else {
        outputStr = `
            <table>
            <tr>
                <th>Timings</th>
                <th>Start</th>
                <th>End</th>
                <th>Duration</th>
            </tr>
        ` + outputStr;

        let fillerDuration = totalDuration.sub(actualDuration);

        const morningStart = new Time("09:00"); // hard start at 9am
        let morningEnd = new Time("09:00"); // keeping morning duration at zero

        // if morning start + approverBenefitDuration < start then add morning time
        const approverBenefitDuration = new Time("00:30");  // 30 min
        if (!morningStart.add(approverBenefitDuration).greaterThanEqual(start)) {
            morningEnd = morningStart.add(fillerDuration);

            if (morningEnd.greaterThanEqual(start))
                morningEnd = start.sub(gap);
            outputStr += Time.print("Morning", morningStart, morningEnd);
        }
        const morningDuration = morningEnd.sub(morningStart);
        fillerDuration = fillerDuration.sub(morningDuration);
        if (fillerDuration.greaterThanEqual(new Time("00:01"))) {   // if any filler is left
            const eveningStart = end.add(gap);
            const eveningEnd = eveningStart.add(fillerDuration);
            outputStr += Time.print("Evening", eveningStart, eveningEnd);
        }
    }
    outputElm.innerHTML = outputStr;
});
