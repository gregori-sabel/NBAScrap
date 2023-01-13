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
        "./src/temp/results/" + dayResultData.date.replaceAll('/', '-') + '-results' + '.json',
        JSON.stringify(dayResultData),
        handleFileSavingError
    );
}

export function savePredictionsFile(dayPredictionData: DayDataPrediction) {
    fileSystem.writeFile(
        "./src/temp/predictions/" + dayPredictionData.date.replaceAll('/', '-') + '-predictions' + '.json',
        JSON.stringify(dayPredictionData),
        handleFileSavingError);
}