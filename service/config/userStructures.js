const fn = (db) => {
    const users = {
        "tableName": "users",
        "displayName": "Users Records",
        "description": "System User",
        "columns": [
          { "name": "user_id", "display": "User Id", "type": "number", "sequence": "user_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "user_name", "display": "Username", "type": "text", "mandatory": true, "unique": true },
          { "name": "user_user_id", "display": "Parent User", "type": "number" },
          { "name": "user_fname", "display": "First Name", "type": "text", "mandatory": true },
          { "name": "user_lname", "display": "Surname", "type": "text", "mandatory": true },
          { "name": "user_email", "display": "Email", "type": "text", "mandatory": false },
          { "name": "user_timestamp", "display": "Created Date", "type": "timestamp" },
          { "name": "user_status", "display": "Current Status", "type": "text", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PENDING"] },
          { "name": "user_password", "display": "Password Hash", "type": "text", "mandatory": true },
          { "name": "user_user_pics", "display": "User Photo", "type": "picture" },
        ]
      }
      const user_audit = {
        "tableName": "user_audits",
        "displayName": "User Audit",
        "description": "User Login Audit",
        "columns": [
          { "name": "user_id", "display": "User Id", "type": "number"},
          { "name": "user_timestamp", "display": "Created Date", "type": "timestamp" },
          { "name": "user_status", "display": "Current Status", "type": "text", "lov": ["SUCCESS", "FAILED"] }
        ]
      }
      const roles = {
        "tableName": "roles",
        "displayName": "Roles",
        "description": "Roles in the system",
        "columns": [
          { "name": "role_id", "display": "Role Id", "type": "number", "sequence": "role_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "role_name", "display": "Role Name", "type": "text", "mandatory": true },
          { "name": "role_desc", "display": "Role Description", "type": "text", "mandatory": true }
        ]
      }
      const user_roles = {
        "tableName": "user_roles",
        "displayName": "User Roles",
        "description": "Connect user to their roles",
        "columns": [
          { "name": "urol_id", "display": "User Role Id", "type": "number", "sequence": "urol_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "urol_user_id", "display": "User", "type": "number", "mandatory": true, "ref": "users" },
          { "name": "urol_role_id", "display": "Role", "type": "number", "mandatory": true, "ref": "roles" },
          { "name": "urol_status", "display": "Status", "type": "text", "mandatory": true },
          { "name": "urol_timestamp", "display": "Created Date", "type": "timestamp", "mandatory": true },
        ]
      }
      const logins = {
        "tableName": "logins",
        "displayName": "Login Audit Records",
        "description": "Audit details for login",
        "columns": [
          { "name": "login_user_id", "display": "User Id", "type": "number", "mandatory": true, "ref": "users" },
          { "name": "login_timestamp", "display": "Timestamp", "type": "timestamp", "mandatory": true },
          { "name": "login_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["SUCCESS", "FAILURE", "ERROR"] },
          { "name": "login_message", "display": "Message", "type": "text" },
        ]
      }
    
      const settings = {
        "tableName": "settings",
        "displayName": "Settings table",
        "key": "cate_id",
        "display": "cate_name",
        "description": "Settings Table",
        "columns": [
          { "name": "sett_id", "display": "Setting ID", "type": "number", "sequence": "cate_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "sett_user_id", "display": "User ID", "type": "number", "mandatory": true, "unique": true, "ref": "users" },
          { "name": "sett_company_name", "display": "Company Name", "type": "text" },
          { "name": "sett_company_logo", "display": "Logo", "type": "picture" },
          { "name": "sett_company_motto", "display": "Motto", "type": "text" },
          { "name": "sett_company_email", "display": "Email", "type": "text" },
          { "name": "sett_company_phone", "display": "Phone", "type": "text" },
          { "name": "sett_indt_id", "display": "Industry", "type": "text", "lov": ["Food and Beverage", "Clothing", "Local Spa", "Beauty Products", "Retail"] }
        ]
      }
    
      const tableConfiguration = [
        { "path": "user-page", "table": users },
        { "path": "user-page", "table": user_audit },
        { "path": "roles-page", "table": roles },
        { "path": "user-roles-catalog", "table": user_roles },
        { "path": "logins-page", "table": logins },
        { "path": "settings-page", "table": settings },
      ]
    
      return tableConfiguration;
}

module.exports = {
    userStructures: fn
}