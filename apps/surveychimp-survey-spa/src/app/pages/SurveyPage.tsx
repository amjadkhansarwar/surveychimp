import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getSurveyById from '../../api/getSurveyById';
import { ISurvey } from '@surveychimp/surveychimp-lib';
import RatingComponent from '../components/RatingStar';
import RatingStar4 from '../components/RatingStar4'
import console from 'console';

const SurveyPage = () => {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState<ISurvey>()

    useEffect(() => {
        if (surveyId) {
            getSurveyById(surveyId).then(survey => {
                setSurvey(survey);
            })
        } else {
            //Visa upp att id saknas
        }
    }, [])


    return (<>
        <h1>Survey</h1>
        <p>{survey?.recipient.name}</p>
        
        {process.env.NX_RATING_STARS_FEATURE === 'false' ? <RatingComponent /> : <RatingStar4 />}
    </>)
}

export default SurveyPage;