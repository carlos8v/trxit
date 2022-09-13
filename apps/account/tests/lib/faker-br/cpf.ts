type CPFOptions = {
  format?: boolean
  customFormat?: (cpf: string) => string
}

function rng(x: number): number {
  return Math.round(Math.random() * x)
}

function mod(x: number, y: number): number {
  return Math.round(x - Math.floor(x / y) * y)
}

function sumNumbers(xs: number[]): number {
  return xs
    .slice()
    .reverse()
    .reduce((acc, a, b) => acc + a * (b + 2), 0)
}

function format(cpf: string) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

const defaultCPFOptions: CPFOptions = {
  format: true
}

export default function cpf(cpfOptions: CPFOptions = {}) {
  const opts = Object.assign({}, defaultCPFOptions, cpfOptions)

  let index = 0
  const numbers = new Array(11)

  for (const _ of numbers) {
    if (index < 9) {
      numbers[index] = rng(9)
    } else {
      const last = 11 - mod(sumNumbers(numbers.filter((n) => !!n)), 11)
      numbers[index] = last > 9 ? 0 : last
    }

    index++
  }

  let result = numbers.join('')

  if (opts.customFormat) return opts.customFormat(result)
  return opts.format ? format(result) : result
}
