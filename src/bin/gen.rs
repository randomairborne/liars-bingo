use Number::*;

fn main() {
    let mut rows: Vec<Row> = Vec::new();
    for i in 0..64u8 {
        let mut row = Row {
            values: [Number::Black(0); 6],
        };
        let mut offset = 1;
        for item in row.values.iter_mut() {
            *item = if i & offset == 0 { Black(0) } else { Red(0) };
            offset = offset << 1;
        }
        rows.push(row);
    }
    for row in rows.iter_mut() {
        let mut rcopy = row.clone();
        for (i, value) in row.values.iter_mut().enumerate() {
            rcopy.values[i] = -rcopy.values[i];
            value.set(rcopy.get_val());
            rcopy.values[i] = -rcopy.values[i];
        }
    }
    for row in rows {
        println!("{row}");
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Hash, Debug)]
pub struct Row {
    values: [Number; 6],
}

impl Row {
    pub fn get_val(&self) -> u8 {
        let mut tens = 0;
        let mut ones = 0;
        let (pretens, preones) = self.values.split_at(3);
        for num in pretens {
            tens = tens << 1;
            if let Red(_val) = num {
                tens = tens | 1;
            }
        }
        for num in preones {
            ones = ones << 1;
            if let Red(_val) = num {
                ones = ones | 1;
            }
        }
        (tens * 10) + ones
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Hash, Debug)]
pub enum Number {
    Red(u8),
    Black(u8),
}

impl Number {
    pub fn set(&mut self, v: u8) {
        match self {
            Red(o) => *o = v,
            Black(o) => *o = v,
        }
    }
}

impl std::ops::Neg for Number {
    type Output = Self;
    fn neg(self) -> Self::Output {
        match self {
            Red(v) => Black(v),
            Black(v) => Red(v),
        }
    }
}

impl std::fmt::Display for Number {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Red(v) => write!(f, "\u{001b}[31m{:width$}\u{001b}[0m", v, width = 2),
            Black(v) => write!(f, "{:width$}", v, width = 2),
        }
    }
}

impl std::fmt::Display for Row {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for val in self.values {
            write!(f, "{val} ")?;
        }
        Ok(())
    }
}
