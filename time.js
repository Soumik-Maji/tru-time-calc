class Time {
    static #isAllowed = false;
    #min;

    constructor(timeStr) {
        if (!Time.#isAllowed)
            throw new Error("Cannot create Time object using 'new'. Use the 'create()' function instead.");
        Time.#isAllowed = false;

        const timeCheckRegex = /^(?:[01]?\d|2[0-3]):(?:[0-5]?\d)$/;
        if (typeof timeStr === "string" && timeCheckRegex.test(timeStr)) {
            const [hr, min] = timeStr.split(":").map(item => parseInt(item));
            this.#min = hr * 60 + min;
        } else if (typeof timeStr === "number" && timeStr >= 0) {
            this.#min = timeStr;
        } else {
            throw new Error(`${timeStr} is invalid time format.`);
        }
        return this;
    }

    get time() {
        return this.#min;
    }

    // OBJECT CREATION
    static create(timeStr) {
        Time.#isAllowed = true;
        return new Time(timeStr);
    }

    // DISPLAY
    static #format(num) {
        return num.toString().padStart(2, "0");
    }

    show24() {
        const hr24 = Math.floor(this.#min / 60);
        const min24 = this.#min % 60;
        return `${Time.#format(hr24)}:${Time.#format(min24)}`;
    }

    show12() {
        const hr24 = Math.floor(this.#min / 60);
        const min24 = this.#min % 60;

        const meridian = hr24 >= 12 ? "pm" : "am";
        const displayHr = hr24 === 0 ? 12 : (hr24 > 12 ? hr24 - 12 : hr24);

        return `${Time.#format(displayHr)}:${Time.#format(min24)} ${meridian}`;
    }

    // ARITHMETIC LOGIC
    add(time) {
        const minSum = this.#min + time.#min;
        return Time.create(minSum);
    }

    sub(time) {
        const minSub = this.#min - time.#min;
        return Time.create(minSub);
    }
}
