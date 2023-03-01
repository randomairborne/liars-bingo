function do_solve() {
    let input = document.getElementById("to_solve");
    let output = document.getElementById("solved");
    let code = Array.from(input.value);
    output.style.color = "black";
    if (code.length != 6) {
        output.innerText = "Requires 6 characters";
        output.style.color = "red";
        return;
    }
    let first = [code[0], code[1], code[2]];
    let second = [code[3], code[4], code[5]];
    let first_digit = 0;
    let second_digit = 0;
    for (let i = 0; i < first.length; i++) {
        let bit = first[i];
        first_digit = first_digit << 1;
        if (bit.toUpperCase() == 'R') {
            first_digit = first_digit | 1;
        }
    }
    for (let i = 0; i < second.length; i++) {
        let bit = second[i];
        second_digit = second_digit << 1;
        if (bit.toUpperCase() == 'R') {
            second_digit = second_digit | 1;
        }
    }
    console.log(((10 * first_digit) + second_digit).toString());
    output.innerText = ((10 * first_digit) + second_digit).toString();
}
