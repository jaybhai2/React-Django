import namor from 'namor'

const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newStock = () => {
  const statusSector = Math.random()
  return {
    ticker: namor.generate({ words: 1, numbers: 0 }),
    company: namor.generate({ words: 1, numbers: 0 }),
   
    pe: Math.floor(Math.random() * 30),
    price: Math.floor(Math.random() * 30),
    sector:
        statusSector > 0.66
        ? 'Tech'
        : statusSector > 0.33
        ? 'Energy'
        : 'Food',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newStock(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
