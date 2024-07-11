class Time {
    constructor(timeStr) {
        const [hr, min] = timeStr.split(":");
        this.hr = parseInt(hr);
        this.min = parseInt(min);
    }

    static #format(num) {
        return num.toString().padStart(2, "0");
    }

    show24() {
        return `${Time.#format(this.hr)}:${Time.#format(this.min)}`;
    }

    show12() {
        const meridian = this.hr >= 12 ? "pm" : "am";
        const displayHr = this.hr > 12 ? this.hr - 12 : this.hr;

        return `${Time.#format(displayHr)}:${Time.#format(this.min)}${meridian}`;
    }

    static print(message, start, end) {
        return `
            <tr>
                <td>${message}</td>
                <td>${start.show12()}</td>
                <td>${end.show12()}</td>
                <td>${end.sub(start).show24()}</td>
            </tr>
        `;
    }

    #toMin() {
        return this.hr * 60 + this.min;
    }

    static #toTime(mins) {
        const newHr = Math.floor(mins / 60), newMin = mins % 60;
        return new Time(`${newHr}:${newMin}`);
    }

    add(time) {
        const a = this.#toMin();
        const b = time.#toMin();
        const sum = a + b;
        return Time.#toTime(sum);
    }

    sub(time) {
        const a = this.#toMin();
        const b = time.#toMin();
        const diff = a - b;
        return Time.#toTime(diff);
    }

    greaterThanEqual(time) {
        return this.#toMin() >= time.#toMin();
    }
}
