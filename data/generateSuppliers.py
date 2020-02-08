from datetime import date, timedelta
from random import randint

# devy_id | devy_prod_id | devy_supl_id | devy_request_date | devy_delivery_date | devy_status | devy_comment | owner_user_id | createdAt | updatedAt 

userId = 1
deliveryIds = [1,2,3]
devId = 5

badDelivery = 3


prodIds = [ 2569
 ,   2570
 ,   2571
 ,   2572
 ,   2573
 ,   2574
 ,   2575
 ,   2576
 ,   2577
 ,   2578
 ,   2579
 ,   2580
 ,   2581
 ,   2582
 ,   2583
 ,   2584
 ,   2585
 ,   2586
 ,   2587
 ,   2588] # 20 product ids to loop through

query = """insert into deliveries (devy_id, devy_prod_id, devy_supl_id, devy_request_date, devy_delivery_date, devy_status, devy_comment, owner_user_id, "createdAt", "updatedAt") values(%s, %s, %s, to_date('%s', 'YYYY-MM-DD'), to_date('%s', 'YYYY-MM-DD'), '%s', '%s', %s, now(), now());"""

# we have weekly supplies given by our different suppliers
# each one delivers on the same day
# we use following distribution:
# 80% on time, 10% late, 8% very late, 2% business impacting
# the BAD delivery will have the following breakdown
# 70% on time, 20% late, 5% very late, 5% business impacting

start = date(2019, 1, 1)

end = date(2020, 1, 1)

week = timedelta(days=4)

mydate = start
count = 0
cx = {}
while mydate < end:
    for dev in deliveryIds:
        prodId = prodIds[count%len(prodIds)]
        count += 1

        status = randint(0, 100)

        delta = None

        statId = "ON TIME"
        if (dev == badDelivery) :
            if (status >= 95):
                statId = "BUSINESS IMPACTING"
                delta = timedelta(days=3)
            elif (status >= 90):
                statId = "VERY LATE"
                delta = timedelta(days=2)
            elif (status >= 70):
                statId = "LATE"
                delta = timedelta(days=1)
            
        else:
            if (status >= 98):
                statId = "BUSINESS IMPACTING"
                delta = timedelta(days=3)
            elif (status >= 90):
                statId = "VERY LATE"
                delta = timedelta(days=2)
            elif (status >= 80):
                statId = "LATE"
                delta = timedelta(days=1)
        delivered = mydate

        if delta:
            delivered += delta

        if not cx.has_key(statId):
            cx[statId] = 0
        
        cx[statId] = cx[statId] + 1

        print (query % (str(count +devId), str(prodId), str(dev), str(mydate), str(delivered), statId, statId, userId))
    
    mydate = mydate + week

        

