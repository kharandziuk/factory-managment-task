const { assert } = require('chai')

const solution = (input) => {
  return { productionCycle: 2 }
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
  assert.deepEqual(result, { productionCycle: 4 })
})
