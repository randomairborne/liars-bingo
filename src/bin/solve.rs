use std::io::Write;

fn main() {
    loop {
        print!("Input 6-character Liar's Bingo colors: ");
        std::io::stdout().flush().ok();
        let mut buf = String::with_capacity(7);
        std::io::stdin().read_line(&mut buf).unwrap();
        let code = buf.trim();
        if code.len() != 6 {
            println!("Input was wrong length");
            continue;
        }
        let (first, second) = code.split_at(3);
        let mut first_digit = 0;
        let mut second_digit = 0;
        for bit in first.chars() {
            first_digit = first_digit << 1;
            if bit.to_ascii_uppercase() == 'R' {
                first_digit = first_digit | 1;
            }
        }
        for bit in second.chars() {
            second_digit = second_digit << 1;
            if bit.to_ascii_uppercase() == 'R' {
                second_digit = second_digit | 1;
            }
        }
        println!("{}", (10 * first_digit) + second_digit);
    }
}
