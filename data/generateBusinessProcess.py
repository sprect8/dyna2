from datetime import date, timedelta
from random import randint

"""
create table f_monthly_stock_expiry (
	user_id integer,
	prod_id integer,
	inv_id integer,	
	expired integer,
	expiring_30 integer,
	expiring_60 integer,
	month integer,
	year integer,
	load_src integer,
	load_timestamp timestamp,
	unique(user_id, prod_id, inv_id, month, year)
);
"""

insQuery = "insert into f_monthly_stock_expiry values (%s, %s, %s, %s, %s, %s, %s, %s, 1, now());"

prodId = [5569, 5570, 5580]
userId = 11
badId = 5580
# generate for the list of items which represent our types and inventory (which I won't even bother mapping to properly for the demo)
# enter 12 months of data

for mon in range(1, 13):
    for pId in prodId:
        bad = randint(0, 3)
        vbad = randint(0, 3)
        
        if (badId == pId):
            bad = randint(3, 20)
            vbad = randint(3, 10)
        good = 100 - bad - vbad
        print insQuery % (str(userId), str(pId), str(123), str(vbad), str(bad), str(good), mon, '2017') 