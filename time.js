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
        let meridian = "am", displayHr = this.hr;
        if (displayHr >= 12) {
            displayHr -= 12;
            meridian = "pm";
        }
        return `${Time.#format(displayHr)}:${Time.#format(this.min)}${meridian}`;
    }

    add(time) {
        const a = this.hr * 60 + this.min;
        const b = time.hr * 60 + time.min;
        const sum = a + b;
        const newHr = Math.floor(sum / 60), newMin = sum % 60;
        return new Time(`${newHr}:${newMin}`);
    }

    sub(time) {
        const a = this.hr * 60 + this.min;
        const b = time.hr * 60 + time.min;
        const sum = a - b;
        const newHr = Math.floor(sum / 60), newMin = sum % 60;
        return new Time(`${newHr}:${newMin}`);
    }

    greaterThanEqual(time) {    // RECTIFY THIS FUNCTION TO WORK FOR >=
        // return ((this.hr > time.hr) || (this.hr === time.hr && this.min > time.min));
        if (this.hr > time.hr)
            return true;
        else if (this.hr === time.hr && this.min > time.min)
            return true;
    }

    static print(message, start, end) {
        return `${message}⫸ ${start.show12()} - ${end.show12()} → ${end.sub(start).show24()}`;
    }
}
