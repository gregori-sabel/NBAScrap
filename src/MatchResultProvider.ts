import { Browser, Page } from 'puppeteer';
import { DateObject } from './types/basicTypes';
import { ResultDataSource, DayDataResult } from './types/resultTypes';

export class MatchResultProvider {
    private resultDataSource: ResultDataSource;

    constructor(resultSource: ResultDataSource) {
        this.resultDataSource = resultSource
    }

    async getMatchResults(scrappedPage: Browser, matchDate: DateObject): Promise<DayDataResult> {
        return await this.resultDataSource.getData(scrappedPage, matchDate);
    }
}