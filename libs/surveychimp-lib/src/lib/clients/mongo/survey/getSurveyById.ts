import SurveyModel, { ISurvey } from './SurveyModel';

export const getSurveyById = async (surveyId: string) => {
    const survey = SurveyModel.findById(surveyId);
    if (!survey) {
        throw "404";
    }


    return survey;
}


export const getSurveyAll = async () => {
    const surveyAll = SurveyModel.find({}).exec();
    console.log(surveyAll);

    if (!surveyAll) {
        throw "404";
    }
    

    return surveyAll;
}