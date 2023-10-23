const is_luhn_valid = (card_number) => {
  let sum = 0
  let cc = card_number.toString().split('').map(Number)
  const isOdd = cc.length & 1 //true o false

  for (let i = 0; i < cc.length; i++) {
    let digit = cc[i]

    if (!((i & 1) ^ isOdd)) {
      digit *= 2
      digit > 9 ? digit -= 9 : null
    }

    sum += digit
  }

  return (sum % 10) === 0
}

const calculate_luhn_checksum = (card_number) => {
  let sum = 0
  let digits = card_number.toString().split('').map(Number)

  for (let i = digits.length - 1; i >= 0; i -= 2) {
    digits[i] *= 2;
    digits[i] > 9 ? digits[i] -= 9 : null
  }

  for (let i = 0; i < digits.length; i++) {
    sum += digits[i]
  }

  return (sum * 9) % 10
}

const getRandom = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1))
}


export const useGen = () => {
  
  const generateCvv = () => {
    let cvv = getRandom(10, 999)
    while (cvv > 999) {
      cvv = getRandom(10, 999)
    }
    return cvv.toString().padStart(3, '0')
  }

  const generateMonth = () => {
    let month = getRandom(1, 12)
    while (month > 12) {
      month = getRandom(1, 12)
    }
    return month.toString().padStart(2, '0')
  }

  const generateYear = () => {
    let year = getRandom(2023, 2032)
    while (year > 2025) {
      year = getRandom(2023, 2032)
    }
    return year
  }

  const format_bin = (bin) => {
    let bin_format = bin + ""
    while (bin_format.length < 16) {
      bin_format += 'x'
    }
    return bin_format
  }

  const generateCardNumber = (bin) => {
    let card_number = bin.split('')
    for (let i = 0; i < card_number.length - 1; i++) {
      if (card_number[i] === 'x') {
        card_number[i] = getRandom(0, 9)
      }
    }
    card_number.pop()
    card_number = card_number.join('')
    card_number += calculate_luhn_checksum(card_number)

    if (!is_luhn_valid(card_number)) {
      generateCardNumber(data)
    }

    return card_number
  }

  const generateCC = (data) => {

    let generate = ""

    for (let i = 0; i < data.cantidad; i++) {

      let cc = ""
      cc = generateCardNumber(data.bin) + (
        data.isDate ?
          "|" + (
            data.month ? data.month : generateMonth()) + "|" + (data.year ? data.year : generateYear()
          ) : ""
        ) + (
        data.isCVV ?
          "|" + (data.cvv ? (data.cvv).padStart(3, '0') : generateCvv()
          ) : ""
        )

      generate += cc + "\n"
    }

    return generate
  }

  return {
    generateCC,
    format_bin
  }

}
