import { Page } from 'puppeteer';
import { DateObject } from './types/basicTypes';
import { ResultsDataSource, DayDataResult } from './types/resultTypes';

export async function getMatchResults(
    resultsDataSource: ResultsDataSource,
    scrappedPage: Page,
    matchDate: DateObject): Promise<DayDataResult> {
    return await resultsDataSource.getData(
        scrappedPage,
        matchDate
    );
}
