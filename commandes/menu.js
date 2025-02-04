const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu", categorie: "menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────😃𝗦𝗧𝗔𝗡𝗬-𝗧𝗘𝗖𝗛-𝗫𝗠𝗗😃────
┴ ╭─────────────
│❒⁠⁠⁠⁠│ *ADMIN* : ${s.OWNER_NAME}
│❒│⁠⁠⁠⁠ *CALENDER* : ${date}
│❒│⁠⁠⁠⁠ *PREFIX* : ${s.PREFIXE}
│❒⁠⁠⁠⁠│⁠⁠⁠ *MODE* : ${mode} mode
│❒│⁠⁠⁠⁠ *COMMANDS* : ${cm.length} 
│❒│⁠⁠⁠⁠ *SPACE* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❒│⁠⁠⁠⁠ *CHROME* : ${os.platform()}
│❒│⁠⁠⁠⁠ *THEME* : *©𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™*
  ╰──────────────
©𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷-𝚂𝚄𝙿𝙿𝙾𝚁𝚃™\n`;
    let menuMsg = `
*𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷-𝚇𝙼𝙳-𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂* 
`;
    for (const cat in coms) {
        menuMsg += `____✫ *${cat}* ✫____`;
        for (const cmd of coms[cat]) {
            menuMsg += `
❚🔥👉${cmd}`;
        }
        menuMsg += `
  ♡___________♡\n`
    }

    menuMsg += `

⏣CREATED BY ©𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™ 
*❒⁠⁠⁠⁠——————————❒⁠⁠⁠⁠——————————❒⁠⁠⁠⁠*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*popkid*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
