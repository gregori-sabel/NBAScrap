import fileSystem from 'fs';
import { DayDataPrediction } from "../types/predictionTypes";
import { DayDataResult } from "../types/resultTypes";

function handleFileSavingError(error: NodeJS.ErrnoException) {
    if (error) {
        return console.error(error)
    }
    console.log("The file was saved!")
}

export function saveResultsFile(dayResultData: DayDataResult) {
    fileSystem.writeFile(
        "./src/temp/results/" + dayResultData.date.replaceAll('/', '-') + '-res-' + '.json',
        JSON.stringify(dayResultData, null, 2),
        handleFileSavingError
    );
}

export function savePredictionsFile(dayPredictionData: DayDataPrediction, siteName: string) {
    fileSystem.writeFile(
        "./src/temp/predictions/" + dayPredictionData.date.replaceAll('/', '-') + '-pred-' + siteName + '.json',
        JSON.stringify(dayPredictionData, null, 2),
        handleFileSavingError);
}