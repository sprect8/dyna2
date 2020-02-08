module.exports = {
    survey: (app, sharedPersistenceMapping) => {
        app.get('/survey/:id', async function(req, res) {
            let query = req.params.id;
          
            // find if feedback already provided; if not show the details for customer feedback!
            // 
            console.log("Hello");
            let recp = await sharedPersistenceMapping["receipts"].findOne({ where: { "recp_uuid": query } })
            let survey = require('./backend/surveys')
          
            console.log(query, "Bob");
          
            if (!recp) {
              // survey not exists
              res.send(survey.getNoSurvey())
              return;
            }
          
            if (recp.recp_customer_rating > 0) {
              // survey already completed
              res.send(survey.getSurveyCompleted());
              return;
            }
            let companyObj = await sharedPersistenceMapping["settings"].findOne({ where: {"sett_user_id": recp.owner_user_id}});
            res.send(survey.getSurvey(query, companyObj, recp));
          });
          
          // response for survey
          app.post('/survey-response', async function(req, res) {
            // get the uuid of the survey
            // populate the 6 fields  
            console.log(req.body);
          
            let surveyId = req.body.surveyId;
            let q1 = req.body.q1;
            let q2 = req.body.q2;
            let q3 = req.body.q3;
            let q4 = req.body.q4;
            let q5 = req.body.q5;
            let text = req.body["feedback-text"];
          
            let recp = await sharedPersistenceMapping["receipts"].findOne({ where: { "recp_uuid": surveyId } })
            
          
            // confirm surveyId exists
            // confirm that survey response not yet provided
          
            if (recp && !recp.recp_customer_rating) {
              let result = {
                recp_customer_rating:+q1,
                recp_customer_rating1:+q2,
                recp_customer_rating2:+q3,
                recp_customer_rating3:+q4,
                recp_customer_rating4:+q5,
                recp_customer_comment:text
              }
          
              let r = recp.update(result)
              console.log(r);
            }
          
            let survey = require('./backend/surveys')
          
            res.send(survey.getThankyou());
          
          });
    }
}