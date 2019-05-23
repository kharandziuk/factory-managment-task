const { assert } = require('chai')
const moment = require('moment')

const countRanges = (ranges) => {
  const { count } = ranges
    .sort((a, b) => a[0] - b[0])
    .reduce(({offset, count}, next)  => {
      console.log(offset, count, next)
      if(areRangesIntersect([-1, offset], next)) {
        return { offset: next[1], count }
      } else {
        return { offset: next[1], count: count + 1 }
      }
    },
    {
      count: 0,
      offset: -1
    })
  return count
}

const solution = (input) => {
  const ranges = parse(input)
  return { productionCycle: countRanges(ranges) }
}

const parse = (input) => {
  const firstDate = moment.min(
      (input.map(el => moment(el.startingDay)))
  )

  return input.map(({startingDay, duration}) => {
    var offsetInDays = moment.duration(moment(startingDay).diff(firstDate))
        .asDays()
    return [offsetInDays, offsetInDays + duration - 1]
  })
}

it('can solve the first sample input', () =>{
  const result = solution([
      {
        "startingDay": "2018-01-02T00:00:00.000Z",
        "duration": 5
      },
      {
        "startingDay": "2018-01-09T00:00:00.000Z",
        "duration": 7
      },
      {
        "startingDay": "2018-01-15T00:00:00.000Z",
        "duration": 6
      },
      {
        "startingDay": "2018-01-09T00:00:00.000Z",
        "duration": 3
      }
  ])
  assert.deepEqual(result, { productionCycle: 2 })
})

it('can solve the second sample input', () =>{
  const result = solution([
      {
        "startingDay": "2018-01-03T00:00:00.000Z",
        "duration": 5
      },
      {
        "startingDay": "2018-01-09T00:00:00.000Z",
        "duration": 2
      },
      {
        "startingDay": "2018-01-24T00:00:00.000Z",
        "duration": 5
      },
      {
        "startingDay": "2018-01-16T00:00:00.000Z",
        "duration": 9
      },
      {
        "startingDay": "2018-01-11T00:00:00.000Z",
        "duration": 6
      }
  ])
  assert.deepEqual(result, { productionCycle: 3 })
})

it('can parser the input', () =>{
  const result = parse([
      {
        "startingDay": "2018-01-01T00:00:00.000Z",
        "duration": 5
      },
      {
        "startingDay": "2018-01-05T00:00:00.000Z",
        "duration": 3
      },
  ])
  assert.deepEqual(result, [
      [0, 4],
      [4, 6]
  ])
})

const areRangesIntersect = (a, b) => {
  const minRange = a[0] < b[0] ? a : b
  const maxRange = (minRange == a ? b : a)
  return !(minRange[1] < maxRange[0])
}

it('areRangesIntersect: yes', () => {
  const result = areRangesIntersect([1, 2], [2, 3])
  assert.isTrue(result)
})

it('areRangesIntersect: no', () => {
  const result = areRangesIntersect([1, 2], [3, 4])
  assert.isFalse(result)
})

it('countRanges: with intersection', () => {
  const result = countRanges([[1, 2], [2, 3]])
  assert.equal(result, 1)
})

it('countRanges: 1', () => {
  const result = countRanges([[1, 2]])
  assert.equal(result, 1)
})

it('countRanges: 0', () => {
  const result = countRanges([])
  assert.equal(result, 0)
})

it('countRanges: wo intersection', () => {
  const result = countRanges([[1, 2], [3, 4]])
  assert.equal(result, 2)
})

it('countRanges: wo intersection', () => {
  const result = countRanges([
    [ 0, 4 ], [ 6, 7 ], [ 21, 25 ], [ 13, 21 ], [ 8, 13 ]
  ])
  assert.equal(result, 3)
})


