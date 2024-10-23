/*
 * NAME: XMYULA-MD
 * AUTHOR: XM4ZE
 */

import { spawn } from "child_process";
import _0x14557a from "path";
import { clear } from "console";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
const vF = p => {
  return new Promise(p2 => setTimeout(p2, p));
};
import _0x3d91e0 from "cfonts";
import _0xdc2066 from "chalk";
console.clear();
const vDirname = dirname(fileURLToPath(import.meta.url));
const vF2 = async () => {
  const v = [_0x14557a.join(vDirname, "main.js"), ...process.argv.slice(2)];
  const vSpawn = spawn(process.argv[0], v, {
    stdio: ["inherit", "inherit", "inherit", "ipc"]
  });
  vSpawn.on("exit", p3 => {
    console.error("❎ Exited with code:", p3);
    if (p3 === "." || p3 === 1 || p3 === 0) {
      vF2();
    }
  });
};
await vF(2000);
_0x3d91e0.say("\n\nAssisten-YuLa Bot\n", {
  font: "tiny",
  align: "center",
  gradient: ["red", "blue"]
});
_0x3d91e0.say("Simple Whatsapp Bot Use QR Code & Pairing Code\nWith Baileys Library\n\nInstagram: https://instagram.com/maximusstore.id\nFacebook: https://facebook.com/maximusstoreindonesia\nWhatsApp: wa.me/6281283516246\n\n", {
  font: "console",
  align: "center",
  colors: ["blue"]
});
console.log(_0xdc2066.bold.green("\nTerima kasih telah menggunakan sc ini."));
vF2();
