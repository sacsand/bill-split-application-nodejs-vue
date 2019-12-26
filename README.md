# bill-split-application-nodejs-vue

## Application Based on following requirement

The end result will be a  public web app (no login or authentication needed ) that helps to split the bill payments among a group of friends. 

Scenario : 

Every evening set of friends goes to a bar and end of the drinks one of the friends will settle the bill for all. Another day another friend will pay the bill etc. But there is no specific order on that.  After a few days, they will use this app (website) to split the amount they spent. 

Input, 
They will input a JSON as follows.

amount = total bill for the day
paid_by = name of the user who paid the bill and this will be unique
friends = names of the friends who came to the bar on the given day (Name will appear multiple times in case a friend bring outsider )




{"data":[
{"day":1,
"amount":50,
"paid_by":"tanu",
"friends":["cristal","tanu"]
},
{"day":2,
"amount":100,
"paid_by":"kasun",
"friends":["cristal","tanu","shakeel"]
},
{"day":3,
"amount":100,
"paid_by":"shakeel",
"friends":["shakeel","tanu","shakeel"]
}
]}


Input method : 

Either copy and paste the json in the text area of the website OR upload a .txt file that contains the json

output 

A result page that displays:
 Total number of days
 Total amount spent by all friends
 How much each friend has spent. (If I bring someone outside of the circle, then it comes under my account )
 How much each user owes to others.  (If there are minus values the ignore them)
 Automatically generated a settlement combination.   

Sample settlement combination

(Example: If tanu give 100 to kasun and  shakeel give 20 to kasun all will be settled then the output will be ).

Tanu->cristal = 100
shakeel->cristal = 20


