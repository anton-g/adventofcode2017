const input = '2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14'

let banks = input
  .split('\t')
  .map(i => parseInt(i, 10))

const redistribute = banks => {
  const indexOfMax = arr => arr.reduce((idxMax, curr, idx, arr) => curr > arr[idxMax] ? idx : idxMax, 0)
  const nextIdx = (idx, arr) => idx + 1 >= arr.length ? 0 : idx + 1
  const isEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((el, idx) => el === arr2[idx])

  let previous = []
  let steps = 1
  let loopStartIdx = 0
  while (true) {
    previous.push(banks.slice())
  
    let idx = indexOfMax(banks)
    let bank = banks[idx]
    banks[idx] = 0
    while (bank > 0) {
      idx = nextIdx(idx, banks)
      banks[idx] += 1
      bank--
    }

    if (previous.some(arr => isEqual(arr, banks))) {
      loopStartIdx = previous.findIndex(el => isEqual(el, banks))
      break
    }
    
    steps++
  }

  let loopLength = steps - loopStartIdx
  return {
    steps,
    loopLength
  }
}

const result = redistribute(banks)

result