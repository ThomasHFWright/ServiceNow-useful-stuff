//Source: https://community.servicenow.com/thread/147831

/*
The actual script include can be way found below. These are the functions, and an associated glideajax examples, of what you can call with this.
getNowDateTimeDiff

This ajax function will allow you to calculate the date/time difference between a field on the form and the now date/time. You can specify a return type - "dttype" to get the result in seconds, minutes, hours, or days. See the comment below for the parameter values.
var cdt = g_form.getValue('due_date'); //First Date/Time field  
var dttype = 'minute'; //this can be day, hour, minute, second. By default it will return seconds.  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getNowDateTimeDiff');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.addParam('sysparm_difftype', dttype);  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  
}  

getDateTimeDiff

This ajax function will allow you to send in two different glide date/time fields and return a calculation of their date/time difference in seconds, minutes, hours, or days.
var cdt = g_form.getValue('due_date'); //First Date/Time field  
var sdt = g_form.getValue('expected_start'); //Second Date/Time field  
var dttype = 'minute'; //this can be day, hour, minute, second. By default it will return seconds.  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getDateTimeDiff');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.addParam('sysparm_sdt', sdt);  
ajax.addParam('sysparm_difftype', dttype);  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  
}  

getDateTimeBeforeNow

This ajax function will take a glide date/time field and return the amount of time till the now date/time. A positive number will represent prior to now, and negative will be how much time after now. This is pretty much a duplicate of the first one "getNowDateTimeDiff" but it gives you the opposite in positive, negative numbers. Positive = before, negative = after.
var cdt = g_form.getValue('due_date'); //first Date/Time field  
var dttype = 'minute'; //this can be day, hour, minute, second. By default it will return seconds.  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getDateTimeBeforeNow');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.addParam('sysparm_difftype', dttype);  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  
}  

getDateTimeBeforeNowBool

This ajax function will return a true or false if the date/time field is before the now date/time. This made it simpler, rather than having to do more processing on the client side, just evaluate true/false. Makes it simple.
var cdt = g_form.getValue('due_date'); //first Date/Time field  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getDateTimeBeforeNowBool');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  
}  

getNowDateTime

This function returns the date and time of right now.
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getNowDateTime');  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  

getNowDate

This function returns the date of right now.
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getNowDate');  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  

getNowTime

This function returns the time of right now.
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name','getNowTime');  
ajax.getXML(doSomething);  
  
function doSomething(response){  
var answer = response.responseXML.documentElement.getAttribute("answer");  
alert(answer);  

addDateTimeAmount

With this ajax function you can add more time to a glide date/time field. You can add seconds, minutes, hours, days, weeks, months, and years. If you want to take time away, use a negative number in the addtime variable.

Limitation:

One limitation that I have found so far is in the return date/time format. The added-to-time new date/time is returned in the standard internal date/time format. I am trying to figure out how to return it based on the user defined date/time format. Still a work in progress.

var cdt = g_form.getValue('due_date'); //Choose the field to add time from  
var addtime = 3; //The amount of time to add  
var addtype = 'day'; //The time type.  Can be second, minute, hour, day, week, month, year.  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name', 'addDateTimeAmount');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.addParam('sysparm_addtime', addtime);  
ajax.addParam('sysparm_addtype', addtype);  
ajax.getXML(doSomething);  
  
  
function doSomething(response){  
    var answer = response.responseXML.documentElement.getAttribute("answer");  
    //You could then take the new Date/Time answer and set the value of another field.  
    // g_form.setValue('expected_start', answer);   
    alert(answer);  
}  

addDateAmount

This is a function to add time to a Glide Date field. You can add days, weeks, months, or years.
var cdt = g_form.getValue('some_date'); //Choose the field to add time from  
var addtime = 3; //The amount of time to add  
var addtype = 'day'; //The time type.  Can be day, week, month, year.  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name', 'addDateAmount');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.addParam('sysparm_addtime', addtime);  
ajax.addParam('sysparm_addtype', addtype);  
ajax.getXML(doSomething);  
  
  
function doSomething(response){  
    var answer = response.responseXML.documentElement.getAttribute("answer");  
    alert(answer);  
}  

addTimeAmount

This is a function to add time to a Glide Time field. You can add seconds, minutes, hours.


var cdt = g_form.getValue('some_time_field'); //Choose the field to add time from  
var addtime = 3; //The amount of time to add  
var addtype = 'day'; //The time type.  Can be second, minute, hour.  
  
var ajax = new GlideAjax('ClientDateTimeUtils');  
ajax.addParam('sysparm_name', 'addTimeAmount');  
ajax.addParam('sysparm_fdt', cdt);  
ajax.addParam('sysparm_addtime', addtime);  
ajax.addParam('sysparm_addtype', addtype);  
ajax.getXML(doSomething);  
  
  
function doSomething(response){  
    var answer = response.responseXML.documentElement.getAttribute("answer");  
    alert(answer);  
}  
*/

var ClientDateTimeUtils = Class.create();
ClientDateTimeUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

//Takes a Single Date/Time Field and returns its time difference from nowDateTime().
//params = sysparm_fdt (the first date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)
getNowDateTimeDiff: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day
var diff = gs.dateDiff(gs.nowDateTime(), firstDT, true);
var timediff = this._calcDateDiff(diffTYPE, diff);
//return "getNowDateTimeDiff: FIRST DT: " + firstDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;
return timediff;
},

//Diff the amount of time between two different Date/Time fields
//params = sysparm_fdt (the first date/time field), sysparm_sdt (second date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)
getDateTimeDiff: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
var secondDT = this.getParameter('sysparm_sdt'); // Second Date-Time Field
var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day
var diff = gs.dateDiff(firstDT, secondDT, true);
var timediff = this._calcDateDiff(diffTYPE, diff);
//return "getDateTimeDiff: FIRST DT: " + firstDT + " -SECOND DT: " + secondDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;
return timediff;
},

//Takes your date/time field and returns the amount of time before now. A positive is time before now, a negative number is after now.
//params = sysparm_fdt (the first date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)
getDateTimeBeforeNow: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day
var diff = gs.dateDiff(firstDT, gs.nowDateTime(), true);
var timediff = this._calcDateDiff(diffTYPE, diff);
//return "getDateTimeBeforeNow: FIRST DT: " + firstDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;
return timediff;
},

//Returns true if it is before now, and false if it is after now.
//params = sysparm_fdt (the first date/time field)
getDateTimeBeforeNowBool: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
var diff = gs.dateDiff(firstDT, gs.nowDateTime(), true);
var answer = '';
if (diff >= 0){answer = 'true';}
else {answer = 'false';}
return answer;
},

//Returns the Date/Time of right now.
getNowDateTime: function(){
var now = gs.nowDateTime(); //Now Date/Time
return now;
},

//Returns the Date right now.
getNowDate: function(){
var now = GlideDate();; //Now Date
return now.getLocalDate();
},

//Returns the Time of right now.
getNowTime: function(){
var now = GlideTime();; //Now Time
var modnow = now.getLocalTime().toString().split(' ');
return modnow[1];
},

//Takes a date/time field and adds time to it.
//params = sysparm_fdt (the first date/time field), sysparm_addtype (type of time to add - second, minute, hour, day, week, month, year), sysparm_addtime (amount of time to add based on the type).
addDateTimeAmount: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
var addTYPE = this.getParameter('sysparm_addtype'); //What to add - second (addSeconds()), minute (need to add conversion), hour (need to add conversion), day (addDays()), week (addWeeks()), month (addMonths()), year (addYears())
var addTIME = this.getParameter('sysparm_addtime'); //How much time to add
var day = GlideDateTime(firstDT);

if(addTYPE == 'second'){day.addSeconds(addTIME);}
else if (addTYPE == 'minute'){day.addSeconds(addTIME*60);}
else if (addTYPE == 'hour'){day.addSeconds(addTIME*(60*60));}
else if (addTYPE == 'day'){day.addDays(addTIME);}
else if (addTYPE == 'week'){day.addWeeks(addTIME);}
else if (addTYPE == 'month'){day.addMonths(addTIME);}
else if (addTYPE == 'year'){day.addYears(addTIME);}
else {day.addDays(addTIME);}

//return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + day;
return day;
},

//Takes a glide date field and adds time to it.
//params = sysparm_fdt (the first date/time field), sysparm_addtype (type of time to add - day, week, month, year),sysparm_addtime (amount of time to add based on the type).
addDateAmount: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date Field
var addTYPE = this.getParameter('sysparm_addtype'); //What to add - day (addDays()), week (addWeeks()), month (addMonths()), year (addYears())
var addTIME = this.getParameter('sysparm_addtime'); //How much time to add
var day = GlideDate();
day.setValue(firstDT);

if(addTYPE == 'day'){day.addDays(addTIME);}
else if (addTYPE == 'week'){day.addWeeks(addTIME);}
else if (addTYPE == 'month'){day.addMonths(addTIME);}
else if (addTYPE == 'year'){day.addYears(addTIME);}
else {day.addDays(addTIME);}

//return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + day;
return day;
},

addTimeAmount: function(){
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
var addTYPE = this.getParameter('sysparm_addtype'); //What
var addTIME = this.getParameter('sysparm_addtime'); //How much time to add
var time = GlideTime();
time.setValue(firstDT);

if(addTYPE == 'second'){time.addSeconds(addTIME);}
else if (addTYPE == 'minute'){time.addSeconds(addTIME*60);}
else if (addTYPE == 'hour'){time.addSeconds(addTIME*(60*60));}
else {time.addSeconds(addTIME);}

var modtime = time.toString().split(' ');
//return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + time;
return modtime[1];
},

//Private function to calculate the date difference return result in second, minute, hour, day.
_calcDateDiff: function(diffTYPE, seconds){
var thisdiff;
if (diffTYPE == "day"){thisdiff = seconds/86400;}
else if (diffTYPE == "hour"){thisdiff = seconds/3600;}
else if (diffTYPE == "minute"){thisdiff = seconds/60;}
else if (diffTYPE == "second"){thisdiff = seconds;}
else {thisdiff = seconds;}
return thisdiff;
}


});