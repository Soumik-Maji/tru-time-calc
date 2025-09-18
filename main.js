const resetElm = document.getElementById("reset");

const gapHrElm = document.getElementById("gap-hr");
const gapMnElm = document.getElementById("gap-mn");
const totalHrElm = document.getElementById("total-hr");
const totalMnElm = document.getElementById("total-mn");

const morningStartElm = document.getElementById("morning-start");
const startElm = document.getElementById("start");
const endElm = document.getElementById("end");

const btnElm = document.getElementById("btn");
const outputElm = document.getElementById("outputs");

btnElm.addEventListener("click", () => {

    // INPUT VALIDATION
    if (resetElm.value === "" ||
        gapHrElm.value === "" || gapMnElm.value === "" ||
        totalHrElm.value === "" || totalMnElm.value === "" ||
        morningStartElm.value === "" ||
        startElm.value === "" ||
        endElm.value === ""
    ) {
        outputElm.innerHTML = "<span class='error'>Incomplete inputs</span>";
        return;
    }

    // gap & total VALIDATION
    const gapHrVal = parseInt(gapHrElm.value);
    const gapMnVal = parseInt(gapMnElm.value);

    if (gapHrVal < 0 || gapHrVal > 23 ||
        gapMnVal < 0 || gapMnVal > 59
    ) {
        outputElm.innerHTML = `<span class='error'>Invalid time gap input.
        Hour should be 0 <= <span class='inp'>${gapHrVal}</span> <= 23 and minute should be 0 <= <span class='inp'>${gapMnVal}</span> <= 59</span>`;
        return;
    }

    const totalHrVal = parseInt(totalHrElm.value);
    const totalMnVal = parseInt(totalMnElm.value);

    if (totalHrVal < 0 || totalHrVal > 23 ||
        totalMnVal < 0 || totalMnVal > 59
    ) {
        outputElm.innerHTML = `<span class='error'>Invalid total duration input.
        Hour should be 0 <= <span class='inp'>${totalHrVal}</span> <= 23 and minute should be 0 <= <span class='inp'>${totalMnVal}</span> <= 59</span>`;
        return;
    }

    // INPUTS TO TIME OBJECT
    const reset = Time.create(resetElm.value);
    const gap = Time.create(`${gapHrVal}:${gapMnVal}`);
    const total = Time.create(`${totalHrVal}:${totalMnVal}`);
    let morningStart = Time.create(morningStartElm.value);
    let start = Time.create(startElm.value);
    let end = Time.create(endElm.value);

    // MAKING TIME RELATIVE TO RESET
    morningStart = Time.toResetRelative(morningStart, reset);
    start = Time.toResetRelative(start, reset);
    end = Time.toResetRelative(end, reset);

    if (start.time > end.time) {
        outputElm.innerHTML = `<span class='error'>
        Start time <span class='inp'>${Time.fromResetRelative(start, reset).show12()}</span> is after end time <span class='inp'>${Time.fromResetRelative(end, reset).show12()}</span><br>
        Check the inputs or change day reset time (under CONSTANTS) and try again.
        </span>`;
        return;
    }

    // CALCULATIONS
    let outputStr = "";
    const actual = end.sub(start);

    if (actual.time >= total.time) { // no need to calculate if total achieved
        outputStr = `
            ${actual.show24()} hours covered.<br>
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
        ` + getRow("Actual", start, end, reset);

        let fillerDuration = total.sub(actual);
        let morningEnd = Time.create(morningStart.time); // keeping morning duration at zero

        // if morning start + approverBenefitDuration < start then add morning time
        const approverBenefitDuration = Time.create("00:40");  // 40 min
        if (morningStart.add(approverBenefitDuration).time < start.time) {
            morningEnd = morningStart.add(fillerDuration);

            if (morningEnd.time >= start.time)
                morningEnd = start.sub(gap);
            outputStr += getRow("Morning", morningStart, morningEnd, reset);
        }
        const morningDuration = morningEnd.sub(morningStart);
        fillerDuration = fillerDuration.sub(morningDuration);   // update the filler duration
        if (fillerDuration.time > 0) {
            const eveningStart = end.add(gap);
            const eveningEnd = eveningStart.add(fillerDuration);
            outputStr += getRow("Evening", eveningStart, eveningEnd, reset);
        }
        outputStr += "</table>"
    }
    outputElm.innerHTML = outputStr;
});

function getRow(message, st, ed, reset) {
    return `
        <tr>
            <td>${message}</td>
            <td>${Time.fromResetRelative(st, reset).show12()}</td>
            <td>${Time.fromResetRelative(ed, reset).show12()}</td>
            <td>${ed.sub(st).show24()}</td>
        </tr>
    `;
}
