class Time {
    static #HOUR24 = 1440; // 24*60 - kind of a final value (DO NOT CHANGE)
    static #isAllowed = false;
    #min;

    constructor() {
        if (!Time.#isAllowed)
            throw new Error("Cannot create Time object using 'new'. Use the 'create()' function instead.");
        Time.#isAllowed = false;

        return this;
    }

    get time() {
        return this.#min;
    }

    // OBJECT CREATION
    static create(timeStr) {
        Time.#isAllowed = true;
        const obj = new Time();

        if (typeof timeStr === "string") {
            const timeCheckRegex = /^(?:[01]?\d|2[0-3]):(?:[0-5]?\d)$/;
            if (timeCheckRegex.test(timeStr)) {
                const [hr, min] = timeStr.split(":").map(item => parseInt(item));
                obj.#min = hr * 60 + min;
            } else
                throw new Error(`${timeStr} is invalid time format.`);
        }
        else if (typeof timeStr === "number") {
            if (timeStr >= 0 && timeStr < Time.#HOUR24) // between 0 & 24 hour
                obj.#min = timeStr;
            else
                throw new Error(`0 <= ${timeStr} < ${Time.#HOUR24}. Time provided as minutes is not in valid range.`);
        }
        else
            throw new Error(`Wrong time input.`);

        return obj;
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
    add(other) {
        const minSum = this.#min + other.#min;
        return Time.create(minSum);
    }

    sub(other) {
        const minSub = this.#min - other.#min;
        return Time.create(minSub);
    }

    // RESET RELATIVE LOGIC
    static toResetRelative(timeObj, reset) {
        let normalizedTime = timeObj.#min - reset.#min;
        if (normalizedTime < 0)
            normalizedTime += Time.#HOUR24;
        return Time.create(normalizedTime);
    }

    static fromResetRelative(timeObj, reset) {
        let normalizedTime = timeObj.#min + reset.#min;
        if (normalizedTime >= Time.#HOUR24)
            normalizedTime -= Time.#HOUR24;
        return Time.create(normalizedTime);
    }
}
