class Time {
    static #isAllowed = false;
    #min;

    constructor(timeStr) {
        if (!Time.#isAllowed)
            throw new Error("Cannot create Time object using 'new'. Use the 'create()' function instead.");
        Time.#isAllowed = false;

        // skipping time string validation as input generally come from HTML time input & inputs I provide as string from main.js
        const [hr, min] = timeStr.split(":").map(item => parseInt(item));
        this.#min = hr * 60 + min;
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

    static #internalCreate(mins) {
        Time.#isAllowed = true;
        const tmp = new Time("00:00");
        tmp.#min = mins;
        return tmp;
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
        const displayHr = hr24 > 12 ? hr24 - 12 : hr24;

        return `${Time.#format(displayHr)}:${Time.#format(min24)} ${meridian}`;
    }

    // ARITHMETIC LOGIC
    add(time) {
        const minSum = this.#min + time.#min;
        return Time.#internalCreate(minSum);
    }

    sub(time) {
        const minSub = this.#min - time.#min;
        return Time.#internalCreate(minSub);
    }
}
