import { Page } from 'puppeteer';
import { DateObject } from './types/basicTypes';
import { PredictionDataSource, DayDataPrediction } from './types/predictionTypes';

export async function getMatchPredictions(
    predictionDataSource: PredictionDataSource,
    scrappedPage: Page,
    matchDate: DateObject): Promise<DayDataPrediction> {
    return await predictionDataSource.getData(
        scrappedPage,
        matchDate
    );
}
