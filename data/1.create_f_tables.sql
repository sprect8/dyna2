drop table f_daily_inventories;
drop table f_daily_product;
drop table f_daily_sales;

create table f_daily_inventories (date_id integer not null, prod_id integer not null,
month_id integer not null, total_inv_available float not null, owner_user_id integer not null);

CREATE INDEX idx_fdi_month 
ON f_daily_inventories(month_id);

CREATE INDEX idx_fdi_date 
ON f_daily_inventories(date_id);

CREATE INDEX idx_fdi_owner 
ON f_daily_inventories(owner_user_id);


create table f_daily_product (date_id integer not null, prod_id integer not null,
month_id integer not null, price float not null,  
cost_of_goods_sold float not null, total_inv_sold integer not null, owner_user_id integer not null);

CREATE INDEX idx_fdp_month 
ON f_daily_product(month_id);

CREATE INDEX idx_fdp_date 
ON f_daily_product(date_id);

CREATE INDEX idx_fdp_owner 
ON f_daily_product(owner_user_id);


create table f_daily_sales (date_id integer not null, 
month_id integer not null, total_inv_available float not null, price float not null,
cost_of_goods_sold float not null, total_inv_sold integer not null, owner_user_id integer not null);

CREATE INDEX idx_fds_month 
ON f_daily_product(month_id);

CREATE INDEX idx_fds_date 
ON f_daily_product(date_id);

CREATE INDEX idx_fds_owner 
ON f_daily_product(owner_user_id);
