import { Page } from 'puppeteer';
import { DateObject } from './types/basicTypes';
import { PredictionDataSource, DayDataPrediction } from './types/predictionTypes';

export class MatchPredictionProvider {
    private predictionDataSource: PredictionDataSource;

    constructor(predictionSource: PredictionDataSource) {
        this.predictionDataSource = predictionSource
    }

    async getMatchPredictions(scrappedPage: Page, matchDate: DateObject) {
        return await this.predictionDataSource.getData(scrappedPage, matchDate)
    }
}