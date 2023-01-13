import { Page } from 'puppeteer';
import { DateObject } from './types/basicTypes';
import { ResultsDataSource, DayDataResult } from './types/resultTypes';

export class MatchResultProvider {
    private resultDataSource: ResultsDataSource;

    constructor(resultSource: ResultsDataSource) {
        this.resultDataSource = resultSource
    }

    async getMatchResults(
        scrappedPage: Page,
        matchDate: DateObject): Promise<DayDataResult> {
        return await this.resultDataSource.getData(
            scrappedPage,
            matchDate
        );
    }
}