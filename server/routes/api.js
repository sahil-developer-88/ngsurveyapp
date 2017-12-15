const express = require('express');

const router = express.Router();
var _=require('lodash');

// var con=require("../config/connection");
 
// db connection
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "bd48c23cc1fdb1",
  password: "8827dcb2",
  database: "heroku_b033252ef556848"
}); 
 
con.connect(function(err) {
    if (err)            
    {                      
        throw err;
    }
    else
    {
        console.log("Connected!");
    }    
});


/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.post('/login', (req,res)=>{
    
    
    
    var email=req.body.email;
    var password=req.body.password;

    
    var sql="SELECT * FROM users WHERE email='"+email+"' and password='"+password+"' and userType=1";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(req.session);
        if(result.length > 0)
        {
            req.session.loginSession=true;
            req.session.loginDetails=result;
            res.json(1);   // login details are correct and session has been set. user will be login now.
        }
        else
        {
            res.json(0); // login details are wrong.
        }
    });
});

// to check user is login or not
router.get('/isLogin',(req,res)=>{
    if(req.session.loginSession == true)
    {
        res.json(true);
    }
    else
    {
        res.json(false);
    }
});

// to logout from app
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.json(true);
});







// to get survey details in site page at frontend
router.get('/getSurveyDataAtFrontendApi',(req,res)=>{
    var surveyDetails={surveyDetails:[],surveyItems:[], customInputFields:[]};
    var getSurveyFieldsQuery="select * from manage_survey_fields";
    con.query(getSurveyFieldsQuery,(err, result)=>{
        if(err)
            throw err;
        if(result.length > 0)
        {            
            // surveyDetails={company: result[0].company, companyStatus: result[0].companyStatus};
            
            var getSurveyItemsQuery="select * from manage_survey_items where itemStatus=1";
            con.query(getSurveyItemsQuery,(surveyItemsErr,surveyItems)=>{                
                if(surveyItemsErr)
                    throw surveyItemsErr;
                if(surveyItems.length > 0)
                {
                    _.forEach(surveyItems,(item,index)=>{
                        surveyDetails.surveyItems.push(item.itemName);
                    });  
                    
                }
                else
                {
                    surveyDetails['surveyItems']=[];
                }


                surveyDetails.surveyDetails={
                    companyFieldName: result[0].companyFieldName, 
                    companyStatus: result[0].companyStatus,
                    firstNameFieldName: result[0].firstNameFieldName,
                    lastNameFieldName: result[0].lastNameFieldName,
                    nameStatus: result[0].nameStatus,
                    userEmailFieldName: result[0].userEmailFieldName,
                    userEmailStatus: result[0].userEmailStatus,
                    phoneNumberFieldName: result[0].phoneNumberFieldName,
                    phoneNumberStatus: result[0].phoneNumberStatus,
                    yearlyAdvBudget: result[0].yearlyAdvBudget,
                    currency: result[0].currency,
                    verySatisfiedStatus: result[0].verySatisfiedStatus,
                    satisfiedStatus: result[0].satisfiedStatus,
                    somewhatSatisfiedStatus: result[0].somewhatSatisfiedStatus,
                    neutralStatus: result[0].neutralStatus,
                    somewhatDissatisfiedStatus: result[0].somewhatDissatisfiedStatus,
                    neutralStatus: result[0].neutralStatus,
                    somewhatDissatisfiedStatus: result[0].somewhatDissatisfiedStatus,
                    dissatisfiedStatus: result[0].dissatisfiedStatus,
                    veryDissatisfiedStatus: result[0].veryDissatisfiedStatus,
                    comments: result[0].commentsField,
                    genderFieldName:result[0].genderFieldName,
                    genderStatus: result[0].genderStatus
                };


                // query to get custom input field items
                var getCustomInputFieldsQuery="select * from manage_custom_input_fields where inputFieldStatus=1";
                con.query(getCustomInputFieldsQuery,(customFieldsError,customFieldsRecords)=>{
                    if(customFieldsRecords.length > 0)
                    {   
                        surveyDetails.customInputFields=customFieldsRecords;
                    }
                    // console.log(surveyDetails.customInputFields);
                    // console.log(JSON.stringify(surveyDetails));
                    res.send(surveyDetails);
                });
            });
        }
        else
        {
            res.json(surveyDetails);
        }
    });
});



// to get survey details in manage survey page at backend
router.get('/getSurveyDataApi',(req,res)=>{
    var surveyDetails={surveyDetails:[],surveyItems:[], customInputFields:[]};
    var getSurveyFieldsQuery="select * from manage_survey_fields";
    con.query(getSurveyFieldsQuery,(err, result)=>{
        if(err)
            throw err;
        if(result.length > 0)
        {            
            // surveyDetails={company: result[0].company, companyStatus: result[0].companyStatus};
            
            var getSurveyItemsQuery="select * from manage_survey_items where itemStatus=1";
            con.query(getSurveyItemsQuery,(surveyItemsErr,surveyItems)=>{                
                if(surveyItemsErr)
                    throw surveyItemsErr;
                if(surveyItems.length > 0)
                {
                    _.forEach(surveyItems,(item,index)=>{
                        surveyDetails.surveyItems.push(item.itemName);
                    });  
                    
                }
                else
                {
                    surveyDetails['surveyItems']=[];
                }


                surveyDetails.surveyDetails={
                    companyFieldName: result[0].companyFieldName, 
                    companyStatus: result[0].companyStatus,
                    firstNameFieldName: result[0].firstNameFieldName,
                    lastNameFieldName: result[0].lastNameFieldName,
                    nameStatus: result[0].nameStatus,
                    userEmailFieldName: result[0].userEmailFieldName,
                    userEmailStatus: result[0].userEmailStatus,
                    phoneNumberFieldName: result[0].phoneNumberFieldName,
                    phoneNumberStatus: result[0].phoneNumberStatus,
                    yearlyAdvBudget: result[0].yearlyAdvBudget,
                    currency: result[0].currency,
                    verySatisfiedStatus: result[0].verySatisfiedStatus,
                    satisfiedStatus: result[0].satisfiedStatus,
                    somewhatSatisfiedStatus: result[0].somewhatSatisfiedStatus,
                    neutralStatus: result[0].neutralStatus,
                    somewhatDissatisfiedStatus: result[0].somewhatDissatisfiedStatus,
                    neutralStatus: result[0].neutralStatus,
                    somewhatDissatisfiedStatus: result[0].somewhatDissatisfiedStatus,
                    dissatisfiedStatus: result[0].dissatisfiedStatus,
                    veryDissatisfiedStatus: result[0].veryDissatisfiedStatus,
                    comments: result[0].commentsField,
                    genderFieldName: result[0].genderFieldName,
                    genderStatus: result[0].genderStatus
                };


                // query to get custom input field items
                var getCustomInputFieldsQuery="select * from manage_custom_input_fields";
                con.query(getCustomInputFieldsQuery,(customFieldsError,customFieldsRecords)=>{
                    if(customFieldsRecords.length > 0)
                    {
                        // surveyDetails.customInputFields=customFieldsRecords;
                        _.forEach(customFieldsRecords,(customFieldRecord,customFieldRecordIndex)=>{
                            surveyDetails.customInputFields.push({
                                id: customFieldRecord.id,
                                customInputField:customFieldRecord.inputFieldName, customInputFieldStatus: customFieldRecord.inputFieldStatus});
                        });
                    }
                    console.log(surveyDetails.customInputFields);
                    res.send(surveyDetails);
                });
            });
        }
        else
        {
            res.json(surveyDetails);
        }
    });
});




// to update survey info at backend
router.post('/updateSurveyInfo',(req,res)=>{


var itemsNotFound=[];
var updateStatusSurveyFields=0;
var updateStatusSurveyItems=0;
var updateStatusCustomInputFields=0;
var result={updationResult:0,customInputFieldsRecords:[]};
// this.surveyData={"surveyDetails":{"company":"company name","companyStatus":1,"userName":"Name","userNameStatus":1,"userEmail":"User Email","userEmailStatus":1,"phoneNumber":"Phone Number","phoneNumberStatus":1,"yearlyAdvBudget":"Yearly Advertising Budget","currency":"$","somewhatSatisfiedStatus":1,"neutralStatus":1,"somewhatDissatisfiedStatus":1,"dissatisfiedStatus":1,"veryDissatisfiedStatus":1,"comments":"Your Comments"},"surveyItems":["Display Advertising","Video Advertising","Search Engine Advertising","Print Advertising","Magazine Advertising","TV Advertising"]};









// update survey fields

    var updateSurveyFieldsQuery="update manage_survey_fields set companyFieldName='"+req.body.companyFieldName+"', companyStatus="+req.body.companyStatus+", firstNameFieldName='"+req.body.firstNameFieldName+"', lastNameFieldName='"+req.body.lastNameFieldName+"', nameStatus="+req.body.nameStatus+", userEmailFieldName='"+req.body.userEmailFieldName+"', userEmailStatus="+req.body.userEmailStatus+", phoneNumberFieldName='"+req.body.phoneNumberFieldName+"', phoneNumberStatus="+req.body.phoneNumberStatus+", yearlyAdvBudget='"+req.body.yearlyAdvBudget+"', currency='"+req.body.currency+"', somewhatSatisfiedStatus="+req.body.somewhatSatisfiedStatus+", neutralStatus="+req.body.neutralStatus+", somewhatDissatisfiedStatus="+req.body.somewhatDissatisfiedStatus+", dissatisfiedStatus="+req.body.dissatisfiedStatus+", veryDissatisfiedStatus="+req.body.veryDissatisfiedStatus+", commentsField='"+req.body.comments+"', genderFieldName='"+req.body.genderFieldName+"', genderStatus="+req.body.genderStatus+"";

    con.query(updateSurveyFieldsQuery,(updateSurveyFieldsErr,updateSurveyFieldsRes)=>{
        if(updateSurveyFieldsErr)
            throw updateSurveyFieldsErr;

        
        if(updateSurveyFieldsRes.affectedRows > 0 && updateSurveyFieldsRes.changedRows > 0)
        {
            updateStatusSurveyFields=1;
            // survey update successfully.
        }
        else if(updateSurveyFieldsRes.affectedRows > 0 && updateSurveyFieldsRes.changedRows == 0)
        {
            // no updation found.
            
        }
        else
        {
            // survey updation failure
            res.json(0);
        }






    // UPDATE SURVEY FIELDS



    // get survey items from manage_survey_items table and compare it with every item coming from json
    var getSurveyItemsQuery="select *,(select count(id) from manage_survey_items where itemStatus=1) as itemsCount from manage_survey_items";
    con.query(getSurveyItemsQuery, (surveyItemsQueryErr,surveyItemsQuery)=>{
        if(surveyItemsQueryErr)
        throw surveyItemsQueryErr;

        var tempIncValue=0;
        var itemsCount=surveyItemsQuery[0].itemsCount;
        _.forEach(req.body.items,(surveyItemsJsonValue,surveyItemsJsonIndex)=>{
            
            _.forEach(surveyItemsQuery,(surveyItemsQueryValue,surveyItemsQueryIndex)=>{
                if(surveyItemsJsonValue.item == surveyItemsQueryValue.itemName && surveyItemsQueryValue.itemStatus == 1)
                {
                    tempIncValue++;
                }
                

            });
        });
        console.log(tempIncValue+' '+itemsCount+' '+req.body.items.length+' '+updateStatusSurveyFields);
        if(tempIncValue == itemsCount && req.body.items.length == itemsCount)
        {
            // no updation made in survey fields and survey items.
            console.log('survey items matched');
            
            // res.json(2);
        }
        else
        {
            updateStatusSurveyItems=1;
            console.log('values not matched');
            // update all survey items by status=0
            var updateAllSurveyItemsQuery="update manage_survey_items set itemStatus=0";
            con.query(updateAllSurveyItemsQuery,(updateAllSurveyItemsErr,updateAllSurveyItems)=>{
                if(updateAllSurveyItemsErr)
                    throw updateAllSurveyItemsErr;

                
            });

            console.log('updated items: ');
            
                
                // console.log(surveyItemsQuery);
                _.forEach(req.body.items,(surveyItemJson,surveyItemJsonIndex)=>{
                    var status=0;
                    
                    _.forEach(surveyItemsQuery,(surveyItemQuery,surveyIndexQuery )=>{
                           
                        // items found in table are updated with status=1 otherwise they will be inserted in table.
                        if(surveyItemJson.item == surveyItemQuery.itemName)
                        {
                            
                            // update with itemStatus=1
                            var updateItemQuery="update manage_survey_items set itemStatus=1 where itemName='"+surveyItemJson.item+"'";
                            con.query(updateItemQuery,(updateItemErr,updateItemRes)=>{
                                if(updateItemErr)
                                    throw updateItemErr;
                                        if(updateItemRes.affectedRows > 0 && updateItemRes.changedRows > 0)
                                        {
                                            // survey update successfully.
                                            console.log('udpated');
                                        }
                                        else
                                        {
                                            console.log('updation failure error');
                                        }
                                
                            });
                            status=1;
                            
                        }
                        else
                        {
                            if(surveyItemsQuery.length-1 == surveyIndexQuery)
                            {
                                if(status == 0)
                                {
                                    itemsNotFound.push(surveyItemJson.item);
                                }
                            }
                        }
                    });
                });
                
                // insert new items that were not found in manage_survey_items table.
                _.forEach(itemsNotFound,(itemsNotFoundValue,itemsNotFoundIndex)=>{
                    
                    var insertSurveyItemQuery="insert into manage_survey_items (itemName, itemStatus) values('"+itemsNotFoundValue+"',1)";
                    con.query(insertSurveyItemQuery,(insertSurveyItemQueryErr,insertSurveyItemQueryResult)=>{
                        if(insertSurveyItemQueryErr)
                            throw insertSurveyItemQueryErr;
                        if(insertSurveyItemQueryResult)
                        {
                            // not found items in table are now inserted in table.
                            console.log('item inserted successfully');
                        }
                    });
                });  
                // res.json(1);
        }


        // start updation of custom input fields
        
 // match previous custom input fields with new custom input fields.
if(req.body.customInputFields.length > 0)
{
    

        var getCustomInputFieldsQuery="select * from manage_custom_input_fields";
            con.query(getCustomInputFieldsQuery,(customInputFieldError,customInputFieldDbRecords)=>{
                if(customInputFieldDbRecords.length>0)
                {
                    var jsonRecordCount=0;
                    _.forEach(customInputFieldDbRecords,(singleCustomInputDbRecord,singleCustomInputDbIndex)=>{
                        if(req.body.customInputFields[singleCustomInputDbIndex].customInputField != singleCustomInputDbRecord.inputFieldName || req.body.customInputFields[singleCustomInputDbIndex].customInputFieldStatus != singleCustomInputDbRecord.inputFieldStatus)
                        {
                            updateStatusCustomInputFields=1;
                            // update custom input field where id matches
                            var updateCustomInputFieldStatusQuery="update manage_custom_input_fields set inputFieldStatus="+req.body.customInputFields[singleCustomInputDbIndex].customInputFieldStatus+", inputFieldName='"+req.body.customInputFields[singleCustomInputDbIndex].customInputField+"' where id="+singleCustomInputDbRecord.id+"";
                            con.query(updateCustomInputFieldStatusQuery,(customInputUpdationError,customInputUpdation)=>{
                                if(customInputUpdationError)
                                    throw customInputUpdationError;
                                if(customInputUpdation.affectedRows > 0 && customInputUpdation.changedRows > 0)
                                {
                                    console.log('custom input field updation successful');
                                    
                                }  
                                else
                                {
                                    console.log('custom input field updation status error');
                                }


                            });
                        }
                        jsonRecordCount++;

                    });

                    // add new records of custom input fields.
                    if(req.body.customInputFields[jsonRecordCount])
                    {
                        updateStatusCustomInputFields=1;
                        _.forEach(req.body.customInputFields,(extraCustomInputField,extraCustomInputFieldIndex)=>{
                            if(extraCustomInputFieldIndex >= jsonRecordCount)
                            {
                                var insertCustomInputFieldQuery="insert into manage_custom_input_fields(inputFieldName,inputFieldStatus) values('"+extraCustomInputField.customInputField+"',"+extraCustomInputField.customInputFieldStatus+")";
                                    con.query(insertCustomInputFieldQuery,(customInputFieldInsertionError,customInputFieldInsertion)=>{
                                        // insertion of custom input fields.
                                        if(customInputFieldInsertionError)
                                            throw customInputFieldInsertionError;
                                        
                                        console.log('insertion: '+extraCustomInputField.customInputField);
                                    });
                            }
                        });
                    }

                    
                }

                console.log(updateStatusSurveyFields+' '+updateStatusSurveyItems+' '+updateStatusCustomInputFields);
                if(updateStatusSurveyFields == 0 && updateStatusSurveyItems == 0 && updateStatusCustomInputFields == 0)
                {
                    // no custom input field updated.
                    res.json(2);
                }
                else if(updateStatusSurveyFields == 1 && updateStatusSurveyItems == 0 && updateStatusCustomInputFields == 0)
                {
                    // no custom input field updated.
                    res.json(1);
                }
                else if(updateStatusSurveyFields == 0 && updateStatusSurveyItems == 1 && updateStatusCustomInputFields == 0)
                {
                    // no custom input field updated.
                    res.json(1);
                }
                else if(updateStatusSurveyFields == 1 && updateStatusSurveyItems == 1 && updateStatusCustomInputFields == 0)
                {
                    // no custom input field updated.
                    res.json(1);
                }
                else if(updateStatusSurveyFields == 0 && updateStatusSurveyItems == 0 && updateStatusCustomInputFields == 1)
                {
                    // no custom input field updated.
                    res.json(1);
                }
                else
                {
                    if(updateStatusSurveyFields == 1 && updateStatusSurveyItems == 1 && updateStatusCustomInputFields == 1)
                    {
                        // no custom input field updated.
                        res.json(1);
                    }
                }
            });  // end updation of custom input fields.

    
}
else
{
    console.log('no custom input field updated.');
    if(updateStatusSurveyFields == 0 && updateStatusSurveyItems == 0)
    {
        // result.updationResult=2;
        res.json(2);
    }
    else
    {
        // result.updationResult=1;
        res.json(1);
    }
}


    });
    // end updation of survey items



        
    });



    
});


// router.get('/getSurveyDataApi',(req,res)=>{
//     var getSurveyFieldsQuery="select * from manage_survey_fields limit 1";
//     var surveyDetails={surveyData:[]};
//     var company='', first_name='',lastName='',userEmail='',phoneNumber='',yearlyAdvBudget='', currency='',verySatisfiedStatus='',satisfiedStatus='',somewhatSatisfiedStatus='',neutralStatus='', somewhatDissatisfiedStatus='', dissatisfiedStatus='', veryDissatisfiedStatus='', comments='';
    

//     console.log('company: '+company);
//     con.query(getSurveyFieldsQuery,(getSurveyFieldsErr,getSurveyFieldsRes)=>{
//         if(getSurveyFieldsRes.length > 0)
//         {
//             _.forEach(getSurveyFieldsRes,(surveyFieldRes,surveyFieldResIndex)=>{
//                 if(surveyFieldRes.companyStatus == 1)
//                 {
//                     company=surveyFieldRes.company;
//                 }
//                 if(surveyFieldRes.nameStatus == 1)
//                 {
//                     first_name=surveyFieldRes.first_name;
//                     lastName=surveyFieldRes.lastName;                    
//                 }
//                 if(surveyFieldRes.userEmailStatus == 1)
//                 {
//                     userEmail=surveyFieldRes.userEmail;
//                 }
//                 if(surveyFieldRes.phoneNumberStatus == 1)
//                 {
//                     phoneNumber=surveyFieldRes.phoneNumber;
//                 }
//                 if(surveyFieldRes.yearlyAdvBudgetStatus == 1)
//                 {
//                     yearlyAdvBudget=surveyFieldRes.yearlyAdvBudget;
//                 }
//                 currency=surveyFieldRes.currency;
//                 verySatisfiedStatus=surveyFieldRes.verySatisfiedStatus;
//                 satisfiedStatus=surveyFieldRes.satisfiedStatus;
//                 somewhatSatisfiedStatus=surveyFieldRes.somewhatsatisfied;
//                 neutralStatus=surveyFieldRes.neutralStatus;
//                 somewhatDissatisfiedStatus=surveyFieldRes.somewhatDissatisfiedStatus;
//                 dissatisfiedStatus=surveyFieldRes.dissatisfiedStatus;
//                 veryDissatisfiedStatus=surveyFieldRes.veryDissatisfiedStatus;                
//                 comments=surveyFieldRes.comments;


//             });
//         }
//     });
// });

// to save userinfo in site page at frontend.
router.post('/saveUserInfoApi',(req,res)=>{
    // var userInfo={ "company": "afdas", "firstName": "asfdsa", "lastName": "asfdsa", "userEmail": "safdas2@gmail.com", "phoneNumber": "4353453453", "gender": "female", "address": "safdsa", "city": "asfdas", "zipCode": "asfdsa", "country": "AS", "yearlyAdvBudget": "25000", "items": [ { "item": "Display Advertising_Neutral Status" }, { "item": "Video Advertising_Neutral Status" }, { "item": "Search Engine Advertising_Neutral Status" }, { "item": "Print Advertising_Neutral Status" } ], "comments": "sadfsafas" };


    // var insertSurveyItemsQuery="insert into ";
    
    var company,firstName,lastName,userEmail,phoneNumber, gender;
    var checkEmail="select email from users where email='"+req.body.userEmail+"'";
    con.query(checkEmail,(emailErr,emailInfo)=>{
        if(emailErr)
        {
            res.json(0);
            throw emailErr;
        }
        
        if(emailInfo.length == 0)
        {
            // check companyStatus if it is 1, then company name should be inserted otherwise it shoud be stored as empty in table.
            if(req.body.companyStatus == 0)
            {
                company='';
            }
            else
            {
                company=req.body.company;
            }

            // check emailStatus if it is 1, then email should be inserted otherwise it shoud be stored as empty in table.
            if(req.body.userEmailStatus == 0)
            {
                email='';
            }
            else
            {
                email=req.body.userEmail;
            }

            // check name status if it is 1, then name should be inserted otherwise it shoud be stored as empty in table.
            if(req.body.nameStatus == 0)
            {
                firstName='';
                lastName='';
            }
            else
            {
                firstName=req.body.firstName;
                lastName=req.body.lastName;
            }

            // check phone number status if it is 1, then phone number should be inserted otherwise it shoud be stored as empty in table.
            if(req.body.phoneNumberStatus == 0)
            {
                phoneNumber=0;
            }
            else
            {
                phoneNumber=req.body.phoneNumber;
            }


            if(req.body.genderStatus == 0)
            {
                gender='';
            }
            else
            {
                gender=req.body.gender;
                
            }
            


            var insertUserInfoQuery="insert into users(company, firstName, lastName, email, phoneNumber, gender, address, city, zipCode, country, yearlyAdvBudget, comments, userType) values('"+company+"','"+firstName+"','"+lastName+"', '"+email+"', "+phoneNumber+", '"+gender+"', '"+req.body.address+"','"+req.body.city+"','"+req.body.zipCode+"','"+req.body.country+"','"+req.body.yearlyAdvBudget+"','"+req.body.comments+"', 0)";
            console.log('query print');
            console.log(insertUserInfoQuery);
    
            con.query(insertUserInfoQuery,(userInfoErr, userInfoRecord)=>{
                if(userInfoErr)
                {
                    res.json(0);
                    console.log('error');
                    throw userInfoErr;
                }
                
                if(userInfoRecord)
                {

                    // res.json(1);
                    console.log('user info inserted successfully.');
                    // save survey items into users_survey table
                    if(req.body.items.length>0)
                    {

                        
                        getSurveyItemsQuery="select id,itemName from manage_survey_items where itemStatus=1";
                        con.query(getSurveyItemsQuery,(err,DbSurveyItems)=>{
                            if(err)
                            {
                                console.log('survey items error');
                                throw err;
                            }
                            _.forEach(req.body.items,(JsonSurveyItem,index)=>{
                                var splittedItem=JsonSurveyItem.item.split("_");
                                // console.log(splittedItem[splittedItem.length-1]);
                                _.forEach(DbSurveyItems,(DbSurveyItem,DbSurveyItemIndex)=>{
                                    if(DbSurveyItem.itemName == splittedItem[0])
                                    {
                                        saveDbSurveyQuery="insert into users_survey(userId,surveyItemId,surveyStatusName) values("+userInfoRecord.insertId+","+DbSurveyItem.id+",'"+splittedItem[splittedItem.length-1]+"')";
                                        con.query(saveDbSurveyQuery,(err,savedRecord)=>{
                                            if(err)
                                            {
                                                console.log('survey item error');
                                                throw err;
                                            }
                                            if(savedRecord)
                                            {
                                                console.log('survey items saved successfully.');
                                            }
                                        })
                                    }
                                });
                            });

                            

                        });
                        
                    }

                    // save custom input fields data
                    if(req.body.customInputFields.length > 0)
                    {
                        _.forEach(req.body.customInputFields,(customInputField,customInputFieldIndex)=>{
                            var customInputFieldDataSaveQuery="insert into users_custom_input_fields_data(userId, inputFieldId, inputFieldValue) values("+userInfoRecord.insertId+", "+customInputField.id+",'"+customInputField.inputField+"')";
                            con.query(customInputFieldDataSaveQuery,(customInputSaveError,customInputRecords)=>{
                                if(customInputSaveError)
                                    throw customInputSaveError;
                                if(customInputRecords)
                                {
                                    console.log('custom input fields data saved successfully.');
                                }
                            });
                        });
                    }

                    res.json(1);
                }

            });
            
        }
        else
        {
            res.json(2);
            console.log('email already exists.');
        }
    });
    
});
// to show data in users info page at backend.
router.get('/usersInfoApi',(req,res)=>{
    // var usersInfo={usersDetails:[]};
    
    var usersInfo=[];
    var surveyDetails=[];
    var customInputDetails=[];
    var usersDetailsQuery="select * from users where userType=0";
    con.query(usersDetailsQuery,(err,usersData)=>{
        if(usersData.length > 0)
        {
            
            var usersSurveyQuery="select * from users_survey";
            con.query(usersSurveyQuery,(err,surveyRecords)=>{
                if(err)
                {
                    throw err;
                }
                if(surveyRecords.length > 0)
                {
                    var getCustomFieldsQuery="select m.inputFieldName as customInputFieldNames, u.inputFieldValue as customInputFieldValues, u.userId as userId from users_custom_input_fields_data u, manage_custom_input_fields m where u.inputFieldId = m.id";
                    con.query(getCustomFieldsQuery,(customFieldErr,customFieldRecords)=>{
                        if(customFieldErr)
                        throw customFieldErr;

                        var manageSurveyItemsQuery="select * from manage_survey_items";
                        con.query(manageSurveyItemsQuery,(err,manageSurveyRecords)=>{
                        if(err)
                        {
                            throw err;
                        }
                        
                            if(manageSurveyRecords.length>0)
                            {
                                
                                _.forEach(usersData,(singleUserRecord,singleUserIndex)=>{
                                    
                                    var surveyItemDetails=[];
                                    var customInputDetails=[];
                                    
                                        
                                        if(customFieldRecords.length > 0)
                                        {
                                            _.forEach(customFieldRecords,(customFieldRecord,customFieldIndex)=>{
                                                // customInputDetails.push({customInputFieldName: customFieldRecord.customInputFieldNames, customInputFieldValue: customFieldRecord.customInputFieldValues});
                                                if(customFieldRecord.userId == singleUserRecord.id)
                                                {
                                                    customInputDetails.push({customInputFieldName: customFieldRecord.customInputFieldNames, customInputFieldValue: customFieldRecord.customInputFieldValues});
                                                }
                                                
                                            });
                                            
                                        }
                                        _.forEach(surveyRecords,(singleSurveyRecord,surveyErr)=>{
                                            
                                            if(singleUserRecord.id == singleSurveyRecord.userId)
                                            {
                                                
                                                _.forEach(manageSurveyRecords,(singleManageSurveyRecord,surveyErr)=>{
                                                    if(singleManageSurveyRecord.id == singleSurveyRecord.surveyItemId)
                                                    {
                                                        surveyItemDetails.push({itemName:singleManageSurveyRecord.itemName, itemStatus:singleSurveyRecord.surveyStatusName});
                                                    }
                                                });
                                                
                                            }
                                            
                                        });
                                        // console.log(surveyItemDetails);

                                        // check input fields wheather they are empty or not.
                                        var firstName, lastName, email, company, phoneNumber, comments, gender;
                                        if(singleUserRecord.firstName == '')
                                        {
                                            firstName='Not Required';
                                        }
                                        else
                                        {
                                            firstName=singleUserRecord.firstName;
                                        }

                                        // last name
                                        if(singleUserRecord.lastName == '')
                                        {
                                            lastName='Not Required';
                                        }
                                        else
                                        {
                                            lastName=singleUserRecord.lastName;
                                        }

                                        // email
                                        if(singleUserRecord.email == '')
                                        {
                                            email='Not Required';
                                        }
                                        else
                                        {
                                            email=singleUserRecord.email;
                                        }

                                        // company
                                        if(singleUserRecord.company == '')
                                        {
                                            company='Not Required';
                                        }
                                        else
                                        {
                                            company=singleUserRecord.company;
                                        }

                                        // phone number
                                        if(singleUserRecord.phoneNumber == 0)
                                        {
                                            phoneNumber='Not Required';
                                        }
                                        else
                                        {
                                            phoneNumber=singleUserRecord.phoneNumber;
                                        }

                                        // comments
                                        if(singleUserRecord.comments == '')
                                        {
                                            comments='No Comment';
                                        }
                                        else
                                        {
                                            comments=singleUserRecord.comments;
                                        }

                                        // gender
                                        if(singleUserRecord.gender == '')
                                        {
                                            gender='Not Required';
                                        }
                                        else
                                        {
                                            gender=singleUserRecord.gender;
                                        }
                                        usersInfo.push({
                                            userId:singleUserRecord.id,
                                            firstName:firstName,
                                            lastName:lastName,
                                            gender:gender,
                                            email:email,
                                            company:company,
                                            city:singleUserRecord.city,
                                            zipCode:singleUserRecord.zipCode,
                                            country:singleUserRecord.country,
                                            address:singleUserRecord.address,
                                            phoneNumber:phoneNumber,
                                            yearlyAdvBudget:singleUserRecord.yearlyAdvBudget,
                                            comments:comments,
                                            items:surveyItemDetails,
                                            customInputFieldsData:customInputDetails
                                        });
                                        
                                    
                                    
                                });
                                console.log(usersInfo);
                                res.json(usersInfo);
                            }
                            else
                            {
                                // empty.
                                res.json(usersInfo);
                            }
                        
                        });
                        
                        // surveyDetails=surveyRecords;
                    });
                }
                else
                {
                    // no survey record exists.
                    res.json(usersInfo);    // empty.
                    console.log('no survey record');
                    

                } 
                
            });
       // });
        }
        else
        {
            res.json(usersInfo);    // empty.
            console.log('no user record');
        }
    // });
    });

});

// to get charts data in backend
router.get('/getChartsDataApi',(req,res)=>{
    
    
    var advBudgetList=["25000", "25000 - 50000", "50000 - 75000", "75000 - 100000", "100000"];
    var data={yearlyAdvBudgetAndUsersCount:[],genderCount:[],lineChartData:[]};
    var yearlyAdvBudgetQuery="select yearlyAdvBudget from users where userType=0";
    con.query(yearlyAdvBudgetQuery,(err,queryRecords)=>{
        if(queryRecords.length > 0)
        {
            _.forEach(advBudgetList,(singleAdvBudgetValue,singleAdvBudgetIndex)=>{
                var usersCountValue=0;
                _.forEach(queryRecords,(singleQueryRecord,singleQueryRecordIndex)=>{
                    if(singleAdvBudgetValue == singleQueryRecord.yearlyAdvBudget)
                    {
                        usersCountValue += 1;
                    }
                    if(queryRecords.length-1 == singleQueryRecordIndex)
                    {
                        data.yearlyAdvBudgetAndUsersCount.push({name:singleAdvBudgetValue,value:usersCountValue});
                    }
                })
            });
            console.log(data.yearlyAdvBudgetAndUsersCount);
            
        }
        
        var genderQuery="select (select count(*) from users where gender='male')as maleCount, (select count(*) from users where gender='female')as femaleCount from users limit 1";
        con.query(genderQuery,(genderErr,genderRecords)=>{
            if(genderErr)
                throw genderErr;
            if(genderRecords.length > 0)
            {
                var totalPersons=genderRecords[0].maleCount + genderRecords[0].femaleCount;
                var malePercentage=genderRecords[0].maleCount/totalPersons*100;
                var femalePercentage=genderRecords[0].femaleCount/totalPersons*100;
                data.genderCount=[{name: 'Male', value: malePercentage},
                    {name: 'Female', value: femalePercentage}
                ];
            }
            console.log(data.genderCount);
            res.json(data);


// queries to get line chart data.
            var getDistinctCountriesQuery="SELECT DISTINCT country from users where userType=0";
            con.query(getDistinctCountriesQuery,(distinctCountriesErr,distinctCountriesRecords)=>{
                if(distinctCountriesErr)
                    return distinctCountriesErr; //lineChartData
                if(distinctCountriesRecords.length > 0)
                {
                    var tempDistinctCountries=[];
                    console.log('line chart records');

                    // console.log(distinctCountriesRecords);
                    _.forEach(distinctCountriesRecords,(distinctCountriesRecord)=>{
                        tempDistinctCountries.push(distinctCountriesRecord.country);
                    });
                    // query to get data corresponding to distinct countries.
                    // var getDataDistinctCountriesQuery="select country, createdDate from users where country in(tempDistinctCountries)";
                    // con.query(getDataDistinctCountriesQuery,(dataDistinctCountriesErr,dataDistinctCountriesRecords)=>{
                    //     if(dataDistinctCountriesErr)
                    //         return dataDistinctCountriesErr;
                    //     if(dataDistinctCountriesRecords.length > 0)
                    //     {
                    //         _.forEach(tempDistinctCountries,(tempDistinctCountry,tempDistinctCountryIndex)=>{

                    //         });
                    //     }
                    // });
                }
                
                

            });
        });
    });
});



module.exports = router;