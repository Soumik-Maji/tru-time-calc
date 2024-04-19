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
        let nextDay = "";
        if (this.hr >= 24) {
            this.hr -= 24;
            nextDay = "Next Day";
        }
        return `${nextDay} ${Time.#format(this.hr)}:${Time.#format(this.min)}`;
    }

    show12() {
        let meridian = "am", nextDay = "";
        if (this.hr >= 24) {
            this.hr -= 24;
            nextDay = "Next Day";
        }
        if (this.hr >= 12) {
            this.hr -= 12;
            meridian = "pm";
        }
        return `${nextDay} ${Time.#format(this.hr)}:${Time.#format(this.min)} ${meridian}`;
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

}
