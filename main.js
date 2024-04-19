const startElm = document.getElementById("start");
const endElm = document.getElementById("end");
const btnElm = document.getElementById("btn");
const outputElm = document.getElementById("outputs");

btnElm.addEventListener("click", () => {
    const start = new Time(startElm.value);
    const end = new Time(endElm.value);

    const gap = new Time("00:20");
    const totalTime = new Time("10:00");

    const morningStart = new Time("09:00"),
        morningEnd = start.sub(gap);

    const actualDuration = end.sub(start),
        morningDuration = morningEnd.sub(morningStart),
        totalDuration = actualDuration.add(morningDuration),
        timeLeft = totalTime.sub(totalDuration);

    const eveningStart = end.add(gap),
        eveningEnd = eveningStart.add(timeLeft).add(new Time("00:01"));

    outputElm.innerText = `
    Morning: ${morningStart.show12()} - ${morningEnd.show12()} ~ ${morningDuration.show24()}
    Actual: ${start.show12()} - ${end.show12()} ~ ${actualDuration.show24()}
    Evening: ${eveningStart.show12()} - ${eveningEnd.show12()} ~ ${eveningEnd.sub(eveningStart).show24()}
    `;
});
