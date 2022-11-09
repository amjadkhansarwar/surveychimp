import { Router } from 'express';
import { addSurvey, addResponseToSurvey, getSurveyById, getSurveyAll } from '@surveychimp/surveychimp-lib';
import { body, param, validationResult } from 'express-validator';
import { nextTick } from 'process';

const router = Router();

/////////// route for get all surveys ///////////

router.get(
    '/survey/all',
    async (req, res, next) => {
        try {         
            const survey = await getSurveyAll();
            res.json(survey);
        } catch (err) {
            next(err);
        }
    });

router.get(
    '/survey/:surveyId',
    param("surveyId").isMongoId(),
    async (req, res, next) => {
        try {
            //validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //do stuff if valid input data
            const survey = await getSurveyById(req.params.surveyId);
            res.json(survey);
        } catch (err) {
            next(err);
        }

    });

router.post('/survey',
    body("recipient.name").isString().isLength({ "min": 3 }).withMessage("Du måste skriva minst 3 tecken"),
    body("recipient.mobileNumber").isMobilePhone("sv-SE").withMessage("Skriv in ett mobilnummer, t.ex. 070 123 12 12"),
    async (req, res, next) => {
        try {
            //validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const survey = await addSurvey(req.body);
            res.json(survey);
        } catch (err) {
            next(err);
        }
    });
///////


router.patch('/survey/:surveyId',
    param("surveyId").isMongoId(),
    body("rating").isNumeric().withMessage("Rating måste vara ett nummer"),
    body("comment").isString().optional(),

    async (req, res, next) => {
        try {
            //validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const survey = await addResponseToSurvey(req.params.surveyId, req.body);
            res.json(survey);
        } catch (err) {
            console.log(err);
            next(err);
        }
    });


router.get('/api/todos', (req, res) => res.status(200).send());

router.get('/api/healtcheck', (req, res) => res.status(200).send({ message: 'App is runnug on satuts 200' }));

export default router;