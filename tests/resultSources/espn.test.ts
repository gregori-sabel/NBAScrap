
import { describe, expect, jest, it } from '@jest/globals';
import puppeteer from 'puppeteer';

import { EspnResultSource } from "../../src/resultSources/EspnResultSource";

describe('Espn', () => {

  const espn = new EspnResultSource();

  it('Parses URL correctly', () => {
    const actual = espn.getMatchDateURL({ day: '10', month: '01', year: '2023' })
    const expected = 'https://www.espn.com.br/nba/resultados/_/data/20230110'
    expect(expected).toBe(actual)
  })

  jest.setTimeout(10000)
  it('gets results from Espn', async () => {

    const browser = await puppeteer.launch({ headless: true });
    try {
      const expected = await espn.getData(browser, { day: '10', month: '01', year: '2023' })
      const actual = { "date": "10/01/2023", "games": [{ "home": { "name": "76ers", "points": "147" }, "away": { "name": "Pistons", "points": "116" } }, { "home": { "name": "Heat", "points": "112" }, "away": { "name": "Thunder", "points": "111" } }, { "home": { "name": "Raptors", "points": "132" }, "away": { "name": "Hornets", "points": "120" } }, { "home": { "name": "Jazz", "points": "116" }, "away": { "name": "Cavaliers", "points": "114" } }] }
      expect(expected).toEqual(actual)
    } finally {
      await browser.close();
    }
  })
})