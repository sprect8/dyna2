
// how satisfied are you with the product/service price?
// how satisfied are you with the product/service quality?
// how satisfied are you with your purchase overall?
// how satisfied are you with the 
// how likely are you to recommend our product/service to your friends? [1 - 5]
// do you have any additional comments, suggestions, etc?


const invoiceTemplate = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Voice, Your Survey</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    h3 {
        color: gray
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <form method="post" action="/survey-response">
    <input type="hidden" id="surveyId" name="surveyId" value="%UUID%">
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                                %COMPANY IMAGE%                                
                            </td>
                            
                            <td>
                                Invoice #: %INV_NUMBER%<br>
                                Created: %TIMESTAMP%<br>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                %COMPANY DETAILS%
                            </td>
                            
                            <td>
                                %CUSTOMER DETAILS%
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        Hi %USERNAME%, 
        <br>
        Thanks for taking the time to give us feedback; we are always aiming to improve our service and product offerings.
        <br>
        <br>
        <h3>1. How satisfied are you with the price of the product/services offered by us?</h3>
        <input type="radio" name="q1" id="q1-1" value="1"><label for="q1a1">Unsatisfied</label> |
        <input type="radio" name="q1" id="q1-2" value="2" checked><label for="q1a2">Ok</label> |
        <input type="radio" name="q1" id="q1-3" value="3"><label for="q1a3">Very Satisfied</label>

        <h3>2. How satisfied are you with the quality of the product/services offered by us?</h3> 
        <input type="radio" name="q2" id="q2-1" value="1"><label for="q2a1">Unsatisfied</label> |
        <input type="radio" name="q2" id="q2-2" value="2" checked><label for="q2a2">Ok</label> |
        <input type="radio" name="q2" id="q2-3" value="3"><label for="q2a3">Very Satisfied</label>

        <h3>3. How satisfied are you with the purchase overall?</h3>
        <input type="radio" name="q3" id="q3-1" value="1"><label for="q3a1">Unsatisfied</label> |
        <input type="radio" name="q3" id="q3-2" value="2" checked><label for="q3a2">Ok</label> |
        <input type="radio" name="q3" id="q3-3" value="3"><label for="q3a3">Very Satisfied</label>

        <h3>4. How well did you feel you were served?</h3>
        <input type="radio" name="q4" id="q4-1" value="1"><label for="q4a1">Unsatisfied</label> |
        <input type="radio" name="q4" id="q4-2" value="2" checked><label for="q4a2">Ok</label> |
        <input type="radio" name="q4" id="q4-3" value="3"><label for="q4a3">Very Satisfied</label>

        <h3>5. How likely would you recommend our services to your friends/family?</h3>
        <input type="radio" name="q5" id="q5-1" value="1"><label for="q5a1">Very Unlikely</label> |
        <input type="radio" name="q5" id="q5-2" value="2"><label for="q5a2">Unlikely</label> |
        <input type="radio" name="q5" id="q5-3" value="3" checked><label for="q5a3">Maybe</label> |
        <input type="radio" name="q5" id="q5-4" value="4"><label for="q5a4">Likely</label> |
        <input type="radio" name="q5" id="q5-5" value="5"><label for="q5a5">Very Likely</label>

        <h3>6. Do you have any additional suggestions, comments, feedback?</h3>

        <textarea style="width:100%" rows="5" id="feedback-text" name="feedback-text"></textarea>

        <br>
        Thanks again for your time. Your feedback is very important to us!
        <br>
        <input type="submit" value="Send Feedback">
    </div>
    </form>
</body>
</html>`

const completed = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Voice, Your Survey</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    h3 {
        color: gray
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        The Survey you selected has already been completed; thank you so much for providing feedback
    </div>
</body>
</html>`

const thankyou = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Voice, Your Survey</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    h3 {
        color: gray
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        Thank you for providing feedback to us it is very much appreciated. Your feedback is valuable to us and we will use it to improve our product and services!
    </div>
</body>
</html>`

const noSurvey = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Voice, Your Survey</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    h3 {
        color: gray
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        We're sorry; the survey request form no longer exists for the selected survey. Thank you for your time and have a great day!
    </div>
</body>
</html>`

function populateCompanyDetails(invoiceTemplate, companyObj, receiptObj) {
 

    let inv = invoiceTemplate;
    inv = inv.replace(/%INV_NUMBER%/g, receiptObj.recp_uuid);
    inv = inv.replace(/%TIMESTAMP%/g, receiptObj.recp_timestamp);
   
    if (companyObj.sett_company_logo) {
        inv = inv.replace(/%COMPANY IMAGE%/g, "<img src='/logo/"+ companyObj.sett_id +"' style='width:100%; max-width:100px'>");
    }
    else {
        inv = inv.replace(/%COMPANY IMAGE%/g, "")
    }

    let details = "";

    if (companyObj.sett_company_name) {
        details += companyObj.sett_company_name + "<br>"
    }
    if (companyObj.sett_company_motto) {
        details += companyObj.sett_company_motto + "<br>"
    }
    if (companyObj.sett_company_phone) {
        details += companyObj.sett_company_phone + "<br>"
    } 
    if (companyObj.sett_company_email) {
        details += companyObj.sett_company_email + "<br>"
    }

    inv = inv.replace(/%COMPANY DETAILS%/g, details);

    let name = "";

    if (receiptObj.recp_customer) {
        name += receiptObj.recp_customer
    }

    if (receiptObj.recp_customer_email) {
        name += "<br>" + receiptObj.recp_customer_email
    }

    inv = inv.replace(/%CUSTOMER DETAILS%/g, name);

    inv = inv.replace(/%USERNAME%/g, receiptObj.recp_customer && receiptObj.recp_customer !== "Not Defined" ? receiptObj.recp_customer : "")

    return inv;
}


module.exports = {
    getSurvey : (surveyId, companyObj, receiptObj) => {
        let iv = populateCompanyDetails(invoiceTemplate, companyObj, receiptObj);
        iv = iv.replace(/%UUID%/g, surveyId);
        return iv;
    },
    getNoSurvey: () => {
        return noSurvey;
    },
    getSurveyCompleted: () => {
        return completed;
    },
    getThankyou: () => {
        return thankyou
    }
}