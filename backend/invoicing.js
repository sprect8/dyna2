const invoiceTemplate = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Receipt for Review</title>
    
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
            
            <tr class="heading">
                <td>
                    Item
                </td>
                
                <td>
                    Price
                </td>
            </tr>
            
            %ITEMS%

            <tr class="total">
                <td></td>
                
                <td>
                   Total: $%TOTAL%
                </td>
            </tr>
        </table>
        We would love to hear from you, <a href="https://dyna2.herokuapp.com/survey/%LINK%">Click Here</a> to do a 5 minute survey
    </div>
</body>
</html>`

function populateSalesData(invoiceTemplate, receiptObj) {
    let inv = invoiceTemplate

    inv = inv.replace(/%INV_NUMBER%/g, receiptObj.recp_uuid);
    inv = inv.replace(/%TIMESTAMP%/g, new Date().toISOString());

    inv = inv.replace(/%LINK%/g, receiptObj.recp_uuid);


    let items = [];
    let total = 0;
    receiptObj.sales.map(x => {
        total = total + (+x.price) * (+x.quantity);
        items.push(`<tr class="item">
        <td>
            ${x.name}
        </td>
        
        <td>
            $${x.price}x${x.quantity} ($${+x.price * +x.quantity})
        </td>
    </tr>`)
        return 
    });
    if (items.length > 0)
      items[items.length - 1] = items[items.length - 1].replace(/"item"/g, '"item last"');
    
    inv = inv.replace(/%TOTAL%/g, total)
    inv = inv.replace(/%ITEMS%/g, items.join("\n"))

    let name = "";

    if (receiptObj.recp_customer) {
        name += receiptObj.recp_customer
    }

    if (receiptObj.recp_customer_email) {
        name += "<br>" + receiptObj.recp_customer_email
    }

    inv = inv.replace(/%CUSTOMER DETAILS%/g, name);

    return inv;
}

function populateCompanyDetails(invoiceTemplate, companyObj) {
 

    let inv = invoiceTemplate;
    
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

    return inv;
}

module.exports = {
    getEmail : (to, receiptObj, companyObj) => {
        let iv = invoiceTemplate;

        iv = populateCompanyDetails(iv, companyObj
            /*{"sett_company_logo":"logo", 
            "sett_company_name":"Victa Corporation",
            "sett_company_motto":"We Are All",
            "sett_company_phone":"123123123",
            "sett_company_email":"hello@victacorp.com"
        }*/);
        /*let receipt =
        {
            "recp_uuid": "23423ABCD23423423421323",
            "recp_customer": "Victa",
            "recp_customer_email": "victa@email.com"
        }
        receipt.sales = [
            {"name": "Toothbrush", "price": 3.23, "quantity": 4},
            {"name": "Toothpaste", "price": 4.23, "quantity": 1},
            {"name": "Bottle", "price": 13.23, "quantity": 2},
            {"name": "Rice", "price": 13.23, "quantity": 1},
        ];*/

        iv = populateSalesData(iv, /*receipt*/receiptObj);
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('admin@dynapreneur.com');
        var to_email = new helper.Email(to);
        var content = new helper.Content('text/html', iv);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });
        return iv;
    },
    sendMail : (to, receiptObj, companyObj) => {
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('admin@dynapreneur.com');
        var to_email = new helper.Email(to);
        var subject = 'Your Receipt';
        let total = 0;
        let c = `Invoice from 
        -----------------------------
        Inv No: ${receiptObj.recp_uuid}
        Time: ${new Date().toISOString()}
        -----------------------------
        ${
            receiptObj.sales.map(x => {
                total = total + x.price * x.quantity;
                return x.name + "\t$" + x.price + "\t" + x.quantity
            })
            }  
        -----------------------------
        Thank You
        `

        var content = new helper.Content('text/html', c);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });
    }
}