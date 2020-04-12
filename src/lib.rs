// use wasm_bindgen::prelude::*;

pub fn isPrime(num: i32) -> bool {
  if num == 2 {
      // 2 is prime
      return true;
  } else if num % 2 == 0 {
      // evens aren't prime
      return false;
  } else if num <= 1 {
      // negatives, zero, and one aren't prime
      return false;
  }

  // Brute force the rest,
  // But stop at square root because math!
  let max = (num as f32).sqrt().ceil() as i32;
  for i in 2..=max {
      if num % i == 0 {
          return false;
      }
  }

  true
}

#[no_mangle]
pub fn calcPrimeSum(max: i32) -> i32 {
  let mut sum = 0;

  for i in 0..=max {
      if isPrime(i) {
          sum += i;
      }
  }

  sum
}

// #[wasm_bindgen]
// extern "C" {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet(name: &str) {
//     alert(&format!("Hello, {}!", name));
// }