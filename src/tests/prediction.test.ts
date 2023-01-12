
import {describe, expect, test} from '@jest/globals';
import puppeteer from 'puppeteer';

import { Espn } from "../espn";


describe('sum module', () => {

  const espn = new Espn();

  test('1+1 = 2', () => {
    espn.getData
    expect(1+1).toBe(2)
  })

  test('gets results from Espn', async () => {
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const gamesData = await espn.getData(page, { day: '10', month: '01', year: '2022'})
    console.log(gamesData)
    
    await browser.close();
  })


})