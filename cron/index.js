// cron job - 
// > f_monthly_stock_expiry
// > f_monthly_sales
// > f_daily_sales
// > f_daily_product
// > f_daily_inventories


// select sum(inv_units_in_stock) total_inv_available, inv_prod_id, to_char(now(), 'YYYYMMDD') date_id, to_char(now(), 'YYYYMM') month_id from inventories where owner_user_id = 11 group by inv_prod_id;
// select sum(sale_price) price, sum(sale_cost) cost_of_goods_sold, sum(sale_total_purchase) total_inv_sold, inv_prod_id prod_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMMDD') date_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMM') month_id from sales, receipts, inventories where sale_inv_id = inv_id and sale_recp_id = recp_id group by prod_id, date_id, month_id


var sqlInv = `insert into f_daily_inventories  
select sum(inv_units_in_stock) total_inv_available, inv_prod_id, to_char(now(), 'YYYYMMDD')::int date_id, to_char(now(), 'YYYYMM')::int month_id, owner_user_id from inventories group by inv_prod_id, owner_user_id`

var sqlProd = `insert into f_daily_product 
select sum(sale_price) price, sum(sale_cost) cost_of_goods_sold, sum(sale_total_purchase) total_inv_sold, inv_prod_id prod_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMMDD')::int date_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMM')::int month_id, a.owner_user_id from sales a, receipts b, inventories where sale_inv_id = inv_id and sale_recp_id = recp_id group by prod_id, date_id, month_id, a.owner_user_id`

var sqlSales = `insert into f_daily_sales
select sum(total_inv_available), a.date_id, a.month_id, sum(total_inv_sold), sum(price), sum(cost_of_goods_sold), a.owner_user_id from f_daily_inventories a, f_daily_product b where a.date_id = b.date_id and a.owner_user_id = b.owner_user_id 
group by a.date_id, a.month_id, a.owner_user_id`


// monthly stock expiry
// monthly sales