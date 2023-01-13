
import { describe, expect, test, jest, it } from '@jest/globals';
import puppeteer from 'puppeteer';

import { Espn } from "../../src/resultSources/espn";


describe('Espn', () => {

  const espn = new Espn();


  jest.setTimeout(10000)
  it('gets results from Espn', async () => {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const expected = await espn.getData(page, { day: '10', month: '01', year: '2023' })
    await browser.close();

    const actual = { "date": "10/01/2023", "games": [{ "home": { "name": "76ers", "points": "147" }, "away": { "name": "Pistons", "points": "116" } }, { "home": { "name": "Heat", "points": "112" }, "away": { "name": "Thunder", "points": "111" } }, { "home": { "name": "Raptors", "points": "132" }, "away": { "name": "Hornets", "points": "120" } }, { "home": { "name": "Jazz", "points": "116" }, "away": { "name": "Cavaliers", "points": "114" } }] }

    expect(expected).toEqual(actual)
  })


})