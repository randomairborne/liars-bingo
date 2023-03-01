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
        if (bit.toUpperCase() == 'R' || bit == '1') {
            first_digit = first_digit | 1;
        }
    }
    for (let i = 0; i < second.length; i++) {
        let bit = second[i];
        second_digit = second_digit << 1;
        if (bit.toUpperCase() == 'R' || bit == '1') {
            second_digit = second_digit | 1;
        }
    }
    console.log(((10 * first_digit) + second_digit).toString());
    output.innerText = ((10 * first_digit) + second_digit).toString();
}

const Color = Object.freeze({
    Red: Symbol("red"),
    Black: Symbol("black"),
});

function gen_bingo() {
    let rows = []
    let output = document.getElementById("rows");
    for (let i = 0; i < 63; i++) {
        let offset = 1;
        let row = [];
        for (let x = 0; x < 6; x++) {
            let color;
            if ((i & offset) === 0) { color = Color.Black; } else { color = Color.Red; };
            offset <<= 1;
            row.push({ color: color });
        }
        rows.push(row);
    }
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let ri = 0; ri < row.length; ri++) {
            let original_color = row[ri].color;
            let flipped_color;
            if (row[ri].color == Color.Red) {
                flipped_color = Color.Black;
            } else {
                flipped_color = Color.Red;
            };
            row[ri].color = flipped_color;
            let val = get_row_value(row);
            row[ri] = { color: original_color, num: val };
        }
    }
    for (let i = 0; i < rows.length; i++) {
        let entry = output.insertRow(0);
        for (let x = 0; x < rows[i].length; x++) {
            let cell = entry.insertCell(x);
            if (rows[i][x].color == Color.Red) {
                cell.style.color = "red";
            }
            cell.innerText = rows[i][x].num;
        }
    }
}

function get_row_value(row) {
    let tens = 0;
    let ones = 0;
    let pretens = [row[0], row[1], row[2]];
    let preones = [row[3], row[4], row[5]];
    for (let i = 0; i < pretens.length; i++) {
        tens <<= 1;
        if (pretens[i].color == Color.Red) {
            tens |= 1;
        }
    }
    for (let i = 0; i < preones.length; i++) {
        ones <<= 1;
        if (preones[i].color == Color.Red) {
            ones |= 1;
        }
    }
    return (tens * 10) + ones;
}

function do_all() {
    do_solve();
    gen_bingo();
}