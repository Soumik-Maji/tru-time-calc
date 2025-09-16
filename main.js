const resetElm = document.getElementById("reset");
const gapElm = document.getElementById("gap");
const totalElm = document.getElementById("total");
const morningStartElm = document.getElementById("morning-start");
const startElm = document.getElementById("start");
const endElm = document.getElementById("end");
const btnElm = document.getElementById("btn");
const outputElm = document.getElementById("outputs");

btnElm.addEventListener("click", () => {
    // VALIDATION
    if (resetElm.value === "" ||
        gapElm.value === "" ||
        totalElm.value === "" ||
        morningStartElm.value === "" ||
        startElm.value === "" ||
        endElm.value === ""
    ) {
        outputElm.innerText = "Incomplete inputs";
        return;
    }

    // INPUTS TO TIME OBJECT
    const reset = Time.create(resetElm.value);
    const gap = Time.create(gapElm.value);
    const total = Time.create(totalElm.value);
    const morningStart = Time.create(morningStartElm.value);
    const start = Time.create(startElm.value);
    const end = Time.create(endElm.value);

    // RESETTING TIME IF REQURIED AS PER reset TIME


    // CALCULATIONS
    const actual = end.sub(start);

    if (actual.time >= total.time) { // no need to calculate if total achieved
        outputStr = `
            ${end.sub(start).show24()} hours covered.<br>
            You have done enough already.<br>
            Take some rest!
        `;
    }
    else {
        outputStr = `
            <table>
            <tr>
                <th>Timings</th>
                <th>Start</th>
                <th>End</th>
                <th>Duration</th>
            </tr>
        ` + getRow("Actual", start, end);

        let fillerDuration = total.sub(actual);
        let morningEnd = Time.create(morningStart.time); // keeping morning duration at zero

        // if morning start + approverBenefitDuration < start then add morning time
        const approverBenefitDuration = Time.create("00:40");  // 40 min
        if (morningStart.add(approverBenefitDuration).time < start.time) {
            morningEnd = morningStart.add(fillerDuration);

            if (morningEnd.time >= start.time)
                morningEnd = start.sub(gap);
            outputStr += getRow("Morning", morningStart, morningEnd);
        }
        const morningDuration = morningEnd.sub(morningStart);
        fillerDuration = fillerDuration.sub(morningDuration);   // update the filler duration
        if (fillerDuration.time > 0) {
            const eveningStart = end.add(gap);
            const eveningEnd = eveningStart.add(fillerDuration);
            outputStr += getRow("Evening", eveningStart, eveningEnd);
        }
        outputStr += "</table>"
    }
    outputElm.innerHTML = outputStr;
});

function getRow(message, start, end) {
    return `
        <tr>
            <td>${message}</td>
            <td>${start.show12()}</td>
            <td>${end.show12()}</td>
            <td>${end.sub(start).show24()}</td>
        </tr>
    `;
}

// -- TEST --
btnElm.click();
