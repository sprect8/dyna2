// cron job - 
// > f_monthly_stock_expiry
// > f_monthly_sales
// > f_daily_sales
// > f_daily_product
// > f_daily_inventories


// select sum(inv_units_in_stock) total_inv_available, inv_prod_id, to_char(now(), 'YYYYMMDD') date_id, to_char(now(), 'YYYYMM') month_id from inventories where owner_user_id = 11 group by inv_prod_id;
// select sum(sale_price) price, sum(sale_cost) cost_of_goods_sold, sum(sale_total_purchase) total_inv_sold, inv_prod_id prod_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMMDD') date_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMM') month_id from sales, receipts, inventories where sale_inv_id = inv_id and sale_recp_id = recp_id group by prod_id, date_id, month_id


var sqlInv = `insert into f_daily_inventories  
select sum(inv_units_in_stock) total_inv_available, inv_prod_id, to_char(current_date - 1, 'YYYYMMDD')::int date_id, 
to_char(current_date - 1, 'YYYYMM')::int month_id, owner_user_id from inventories group by inv_prod_id, owner_user_id`

var sqlProd = `insert into f_daily_product 
select sum(sale_price) price, sum(sale_cost) cost_of_goods_sold, sum(sale_total_purchase) total_inv_sold, 
inv_prod_id prod_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMMDD')::int date_id,
to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMM')::int month_id, a.owner_user_id from sales a, receipts b, 
inventories 
where sale_inv_id = inv_id and sale_recp_id = recp_id and to_date(recp_timestamp, 'YYYY-MM-DD') >= current_date - 1
group by prod_id, date_id, month_id, a.owner_user_id`

// monthly sales
/*create table f_monthly_sales(
	user_id integer,
	prod_id integer,
	total integer,
	month integer,
	year integer,
	load_src integer,
	load_timestamp timestamp,
	unique(user_id, prod_id, month, year)
);*/

var sqlSales = `insert into f_daily_sales
select sum(total_inv_available) total_inv_available, a.date_id, a.month_id, sum(total_inv_sold) total_inv_sold, sum(price) price, 
sum(cost_of_goods_sold) cost_of_goods_sold, a.owner_user_id from f_daily_inventories a, f_daily_product b 
where a.date_id = b.date_id and a.owner_user_id = b.owner_user_id 
and a.date_id = to_char(current-date - 1, 'YYYY-MM-DD')
group by a.date_id, a.month_id, a.owner_user_id`

var monthlySales = `insert into f_monthly_sales
select owner_user_id user_id, prod_id, sum(total_inv_sold) total, month_id, (date_id/10000)::int date_id, 1, now()
from f_daily_product group by owner_user_id, prod_id, date_id, month_id`

var monthlyExpiring = `insert into tmp_f_monthly_stock_expiring
select owner_user_id user_id, inv_prod_id prod_id, 0 inv_id, 
sum(case when date_id < now() then inv_units_in_stock else 0 end) expired,
sum(case when date_id between now() and current_date + 30 then inv_units_in_stock else 0 end) expiring_30,
sum(case when date_id between current_date + 30 and  current_date + 60 then inv_units_in_stock else 0 end) expiring_60,
to_char(date_id, 'MM')::int "month",
to_char(date_id, 'YYYY')::int "year", 
1 load_src,
now() load_timestamp from (
select to_date(inv_expiry_date, 'YYYY-MM-DD') date_id,
inv_prod_id, inv_id, owner_user_id, inv_units_in_stock
from 
inventories
where inv_units_in_stock > 0
) x
group by owner_user_id, prod_id, "month", "year"
order by prod_id`
// monthly stock expiry
/*
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

*/





    
const CronJob = require('cron').CronJob;

module.exports = {
    startCron: (db) => {
        const job = new CronJob('00 00 00 * * *', function() {
            db.query(sqlInv);
            db.query(sqlProd);
            db.query(sqlSales);
        });        
        job.start();

        const job2 = new CronJob('* * 1 * *', function() {
            db.query(monthlyExpiring);
            db.query(monthlySales);
        });
        job2.start();
        
    }
}