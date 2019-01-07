create table ps_sample_sales (
row_id text,
order_id text,
order_date text,
ship_date text,
ship_mode text,
customer_id text,
customer_name text,
customer_segment text,
country text,
city text,
state text,
postcode text,
region text,
product_id text,
category text,
sub_category text,
product_name text,
sales text,
quantity text,
discount text,
profit text
);

create table sample_sales (
row_id integer,
order_id text,
order_date text,
ship_date text,
ship_mode text,
customer_id text,
customer_name text,
customer_segment text,
country text,
city text,
state text,
postcode integer,
region text,
product_id text,
category text,
sub_category text,
product_name text,
sales float,
quantity integer,
discount float,
profit float
);


copy sample_sales from '/Users/hc834bq/dev/dyna2/data/samplestore.csv' delimiter ',' csv


select * from staffs

insert into product_categories (cate_name, cate_desc, owner_user_id, "createdAt", "updatedAt")
select category, category, 11, now(), now() from (
select distinct category from sample_sales) x

;
create table lt_products as 
select product_name, cate_id - 56 supl_id, cate_id, (sales + sales * discount)/quantity prod_list_price, 11, (sales - profit) / quantity prod_unit_price from sample_sales, product_categories where category = cate_name;


insert into products (prod_name, prod_desc, prod_supl_id, prod_cate_id, prod_units_on_order, prod_discontinued, prod_sku, prod_unit_price, owner_user_id, "createdAt", "updatedAt", prod_list_price)


(select product_name, product_name, supl_id, cate_id, 1000, 'In Stock', 123, avg(prod_unit_price), 11, now(), now(), avg(prod_list_price) from lt_products group by product_name, supl_id, cate_id)



select product_name prod_name, product_name, prod_desc,  from lt_products limit 10

select * from product_categories

select * from suppliers



-- inventories first

insert into inventories (inv_prod_id, inv_purchase_date, inv_expiry_date, inv_units_in_stock, owner_user_id, "createdAt", "updatedAt")
select prod_id, now()-interval '100 days', now() + interval '100 days', 10000, 11, now(), now() from products where prod_id <= 8

-- then receipts

insert into receipts (recp_staff_id, recp_uuid, recp_latitude, recp_longitude, recp_customer, recp_customer_email, recp_timestamp, owner_user_id, "createdAt", "updatedAt")
select  case when region = 'West' then 9 when region = 'East' then 10 else 13 end,
	order_id, case when region = 'West' then 2.9925 when region = 'East' then 3.0733 else 3.1390 end, case when region = 'West' then 101.5415 when region = 'East' then 101.5185 else 101.6869 end, 
	customer_name, customer_name||'@something.com', to_date(order_date,'DD/MM/YYYY'),11, Now(), now() from 
	(select distinct order_id, region, customer_name, order_date from sample_sales) x;

select region, count(*) from sample_sales group by region limit 100

-- then sales

select * from sample_sales limit 100

insert into sales (sale_inv_id, sale_price, sale_cost, sale_recp_id, sale_status, sale_total_purchase, owner_user_id, "createdAt", "updatedAt")
select inv_id, sales, sales - profit, recp_id, 'SOLD', quantity, 11, now(), now() from sample_sales, inventories, receipts, products p where product_name = prod_name and order_id = recp_uuid and inv_prod_id = prod_id
and p.owner_user_id = 11




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
-- expiring stocks

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

-- lets load in some random sales data
-- this is for each of the 

----
-- Inventory Optimisation
----
-- Days of Supply: current sales (last month) vs current inventory
-- Inventory Turn
   -- Monthly: total sold vs total avg inventory
-- Stock Sales Ratio
   -- Monthly: products
-- Inventory Count Sheet
   -- Giant list of product vs current count
-- Inventory Expiration Count (monthly)
-- Inventory Lookup



---
-- Business Process
---
-- Profitable and Non-profitable products
-- Dashboard on Profitable areas and potential
-- Product Sales
-- Product Backlog

-- Current manufacturing process?