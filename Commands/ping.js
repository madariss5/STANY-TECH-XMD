"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "test", reaction: "🧒", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*⭕𝚂𝚃𝙰𝙽𝚈 𝚃𝙴𝙲𝙷 𝚇𝙼𝙳 𝙸𝚂 𝙾𝙽𝙻𝙸𝙽𝙴⭕* 🙏 \n\n ' + "𝚃𝙷𝙴 𝙱𝙾𝚃 𝙲𝙰𝙽𝚃 𝚂𝙻𝙴𝙴𝙿⏰⭕";
    let d = '                                                                           𝗛𝗘𝗔𝗟𝗧𝗛 𝗦𝗧𝗔𝗧𝗨𝗦✨';
    let varmess = z + d;
    var mp4 = 'https://telegra.ph/file/ce58cf8c538b1496fda33.mp4';
    await zk.sendMessage(dest, { video: { url: mp4 }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
