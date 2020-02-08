from datetime import date, timedelta
from random import randint

"""
-- inventory count
create table f_monthly_inventory(
	user_id integer,
	prod_id integer,
	total integer,
	month integer,
	year integer,
	load_src integer,
	load_timestamp timestamp,
	unique(user_id, prod_id, month, year)
);

-- number of sales over a given month
create table f_monthly_sales(
	user_id integer,
	prod_id integer,
	total integer,
	month integer,
	year integer,
	load_src integer,
	load_timestamp timestamp,
	unique(user_id, prod_id, month, year)
);
"""

insQuery = "insert into f_monthly_inventory values (%s, %s, %s, %s, %s, 1, now());"

prodId = [1900, 2000, 3000]
userId = 1
badId = 2000
# generate for the list of items which represent our types and inventory (which I won't even bother mapping to properly for the demo)
# enter 12 months of data

for mon in range(1, 13):
    for pId in prodId:
        vbad = randint(40, 80)
        
        if (badId == pId):
            vbad = randint(20, 40)
        print insQuery % (str(userId), str(pId), str(vbad), mon, '2019') 