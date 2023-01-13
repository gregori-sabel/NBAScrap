import { describe, expect, jest, it } from '@jest/globals';
import { formatDateBR, toDateObject } from '../../src/utils/dateHandlers'

describe('BR Date Formatter', () => {
  it('Formats date correctly', () => {
    const expected = '10/01/2023'

    const actual = formatDateBR({
      day: '10',
      month: '01',
      year: '2023'
    })

    expect(expected).toBe(actual)
  })

})

describe('DateObject Converter', () => {
  it('Converts to a valid DateObject', () => {
    const expected = {
      day: '31',
      month: '12',
      year: '1974'
    }
    const actual = toDateObject(new Date('12/31/1974'))

    expect(expected).toEqual(actual)
  })
})