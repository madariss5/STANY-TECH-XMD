const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0hYVTVmdVRlM1U5M0dEaEtqRHZLM0FhekNZNEtJQzNuSkFOcE5IcERuVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNW53UFVGTmd0ZkFuUEg2T1E4MVI1akpSR05ITjA5Mzc2TUZUbm1UK0dtYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTGJtSklLR3NSWkRvZngzRUtYN3hJNytweGJaUUJUWnBVRDJUMWxiVUVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUOEJySWN5Z2VqRFNOMk5PZENhaDlSZVlDVkV0VHkzZjZySDNUT2FhcDFVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitJSGxwOElxcWRkbFRQdGJ2YTFyQktvSVBCQkRCYlUrRk9rNnVWSyt5a1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZjY0oxeHY4ajhVV21MaWlYbDZBY1FNazNGclg1ZXc3WGVnZzlzVTkxQTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0NhL09LNVg2aFBFVEhGZ1B0dWFseVgyc2U1Qm9ITHNUTXBpcFZGZFEzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaStjRnc0S3p6NmNTTzZHNHV2SDZ5djREY2JBaWNHNm5jK1ZTY2R6clQwUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVYQ1pVOGdzazRuS0NUZTQ2SkRucnovUHE3eUE5WlVtYUx5K24xWFRZZHBwbTFPYUFvODFQUS9JOVdGeGNxNXJOREVDUmkzRElXTHJGUGp5K2s2bkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDMsImFkdlNlY3JldEtleSI6IjlTY290U05WUlpMVTBMei84Yk1UV1REZEYyMlJETmdsU0JQZVRRY25aYmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1QjgzQUVBQ0E5NDJDNjRFNjk3RjdBMERDMEYyQzVFOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQwNDk5MjIzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBFNDg3MjhGQkUyQzU1NDU3Nzc5RjlBOTE1MUVBMUJCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA0OTkyMjN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0U4OTc4Nzk4NDVGNDEwRjZDRjBEMjA5OTUwMDdCOUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MDQ5OTIyNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMF9yUDJJbVdSLXE5ODVjZVg2WTNudyIsInBob25lSWQiOiI3YmU0YjFhNi1kNGYwLTQ1MmMtOGNmZi0yN2EyYWM5YTU0YjEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkJGRDBPSG83dkxUcFhXZXpVeU5aOWx3U29FPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InAxVEtqK1g5OVJtakdNMUs1bkhFUEVxUkJUUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJIWTZUOUM3RCIsIm1lIjp7ImlkIjoiNDkxNTU2MjM3ODM0Mzo1NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJEYWRkeSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHZQeVMwUWl0TDN2UVlZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNzJWMTFsSVp2YWxKdkYyNjJiTVh3MzRuS2dSTjlLbzNDT2d3KzRINGVScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicFVKc1U5b0EySHdHbW9ZckVRR3d0UWZkSys1cjNlVHhYY21EWEdKbVcyQXJPVHo0OVcvM1AwZ2N3RlJOc05HMDBiaUcxa0g3dE9xbmkvQzVZUlZ6REE9PSIsImRldmljZVNpZ25hdHVyZSI6Im5aU2R0WmJpOTdvM1l3dWN1V24rb3dOODJUTzU5RHJpWXNHM0NxNnFwRkE5YUF6SW96MlpwUDUzMjdRL243OUQrWTJ1VnRYV29hOTIxSmFMMnkvUURBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDkxNTU2MjM3ODM0Mzo1NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlOWxkZFpTR2IycFNieGR1dG16RjhOK0p5b0VUZlNxTndqb01QdUIrSGtiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNDk5MjIyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUV6QiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Martin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4915563151347",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝔹𝕃𝔸ℂ𝕂𝕊𝕂𝕐-𝕄𝔻',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
