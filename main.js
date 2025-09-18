const resetElm = document.getElementById("reset");
const gapElm = document.getElementById("gap");
const totalElm = document.getElementById("total");
const morningStartElm = document.getElementById("morning-start");
const startElm = document.getElementById("start");
const endElm = document.getElementById("end");
const btnElm = document.getElementById("btn");
const outputElm = document.getElementById("outputs");

btnElm.addEventListener("click", () => {

    // INPUT VALIDATION
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

    const hr24 = 1440;    // 24*60
    let outputStr = getRow("Actual", start, end);

    // DATA VALIDATION & RESET


    // if ((start.time < hr24 && end.time < start.time) // start less than 2400 but end less than start
    // ) {
    //     outputStr = `
    //     reset: ${reset.show12}
    //     start: ${start.show12}
    //     end: ${end.show12}
    //     End time cannot be less than Start time.
    //     `;
    // }

    // CALCULATIONS
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
        ` + outputStr;

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

function applyReset(time, reset) {
    let mins = time.time;
    if (mins < reset.time)
        mins += 24 * 60; // Add 24 hours if before reset time
    return Time.create(mins - reset.time);
}

function getRow(message, st, ed) {
    return `
        <tr>
            <td>${message}</td>
            <td>${st.show12()}</td>
            <td>${ed.show12()}</td>
            <td>${ed.sub(st).show24()}</td>
        </tr>
    `;
}

// btn.click();

const s = Time.create("23:46");
const e = Time.create("01:46");
const r = Time.create("04:00");
console.log(s.show24(), e.show24(), r.show24());

const a = Time.toResetRelative(s, r);
const b = Time.toResetRelative(e, r);
console.log(a.show24(), b.show24());

console.log(b.sub(a).show24());
console.log(e.sub(s).show24());


/*
    11:12pm = 23:12
    01:46am = 25:46
*/
