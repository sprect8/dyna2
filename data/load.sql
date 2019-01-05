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
select category, category, 1, now(), now() from (
select distinct category from sample_sales) x

;
create table lt_products as 
select product_name, cate_id supl_id, cate_id, (sales + sales * discount)/quantity prod_list_price, 1, (sales - profit) / quantity prod_unit_price from sample_sales, product_categories where category = cate_name;


insert into products (prod_name, prod_desc, prod_supl_id, prod_cate_id, prod_units_on_order, prod_discontinued, prod_sku, prod_unit_price, owner_user_id, "createdAt", "updatedAt", prod_list_price)


(select product_name, product_name, supl_id, cate_id, 1000, 'In Stock', 123, avg(prod_unit_price), 1, now(), now(), avg(prod_list_price) from lt_products group by product_name, supl_id, cate_id)



select product_name prod_name, product_name, prod_desc,  from lt_products limit 10

select * from product_categories

select * from suppliers



-- inventories first

insert into inventories (inv_prod_id, inv_purchase_date, inv_expiry_date, inv_units_in_stock, owner_user_id, "createdAt", "updatedAt")
select prod_id, now()-interval '100 days', now() + interval '100 days', 10000, 1, now(), now() from products where prod_id <= 8

-- then receipts

insert into receipts (recp_staff_id, recp_uuid, recp_latitude, recp_longitude, recp_customer, recp_customer_email, recp_timestamp, owner_user_id, "createdAt", "updatedAt")
select  case when region = 'West' then 1 when region = 'East' then 2 else 3 end,
	order_id, case when region = 'West' then 2.9925 when region = 'East' then 3.0733 else 3.1390 end, case when region = 'West' then 101.5415 when region = 'East' then 101.5185 else 101.6869 end, 
	customer_name, customer_name||'@something.com', to_date(order_date,'DD/MM/YYYY'),1, Now(), now() from 
	(select distinct order_id, region, customer_name, order_date from sample_sales) x;

select region, count(*) from sample_sales group by region limit 100

-- then sales

select * from sample_sales limit 100

insert into sales (sale_inv_id, sale_price, sale_cost, sale_recp_id, sale_status, sale_total_purchase, owner_user_id, "createdAt", "updatedAt")
select inv_id, sales, sales - profit, recp_id, 'SOLD', quantity, 1, now(), now() from sample_sales, inventories, receipts, products where product_name = prod_name and order_id = recp_uuid and inv_prod_id = prod_id 

