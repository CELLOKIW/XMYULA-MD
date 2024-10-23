process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import "./config.js";
import { createRequire } from "module";
import _0x498eda, { join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
global.__filename = function f(p = import.meta.url, p2 = platform !== "win32") {
  if (p2) {
    if (/file:\/\/\//.test(p)) {
      return fileURLToPath(p);
    } else {
      return p;
    }
  } else {
    return pathToFileURL(p).toString();
  }
};
global.__dirname = function f2(p3) {
  return _0x498eda.dirname(global.__filename(p3, true));
};
global.__require = function f3(p4 = import.meta.url) {
  return createRequire(p4);
};
import * as _0x2f3b28 from "ws";
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from "fs";
import _0x3abead from "yargs";
import { spawn } from "child_process";
import _0x56aacc from "lodash";
import { clear } from "console";
import _0x2f5ce2 from "cfonts";
import _0x5f3ff2 from "syntax-error";
import { tmpdir } from "os";
import _0x9a492c from "chalk";
import { format } from "util";
import { makeWASocket, protoType, serialize } from "./lib/simple.js";
import { Low, JSONFile } from "lowdb";
import _0x4c9741 from "pino";
import { mongoDB, mongoDBV2 } from "./lib/mongoDB.js";
const {
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  PHONENUMBER_MCC
} = await import("@adiwajshing/baileys");
const {
  CONNECTING
} = _0x2f3b28;
const {
  chain
} = _0x56aacc;
const v = process.env.PORT || process.env.SERVER_PORT || 3000;
protoType();
serialize();
global.API = (p5, p6 = "/", p7 = {}, p8) => (p5 in global.APIs ? global.APIs[p5] : p5) + p6 + (p7 || p8 ? "?" + new URLSearchParams(Object.entries({
  ...p7,
  ...(p8 ? {
    [p8]: global.APIKeys[p5 in global.APIs ? global.APIs[p5] : p5]
  } : {})
})) : "");
global.timestamp = {
  start: new Date()
};
const v2 = global.__dirname(import.meta.url);
global.opts = new Object(_0x3abead(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp("^[" + (opts.prefix || "â€ŽxzXZ/i!#$%+Â£Â¢â‚¬Â¥^Â°=Â¶âˆ†Ã—Ã·Ï€âˆšâœ“Â©Â�?:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");
global.db = new Low(/https?:\/\//.test(opts.db || "") ? new cloudDBAdapter(opts.db) : /mongodb(\+srv)?:\/\//i.test(opts.db) ? opts.mongodbv2 ? new mongoDBV2(opts.db) : new mongoDB(opts.db) : new JSONFile((opts._[0] ? opts._[0] + "_" : "") + "database.json"));
global.loadDatabase = async function f4() {
  if (global.db.READ) {
    return new Promise(p9 => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this);
        p9(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    banned: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();
global.authFile = "" + (opts._[0] || "sessions");
console.log("Load AuthFile from " + authFile);
const {
  state,
  saveCreds
} = await useMultiFileAuthState(global.authFile);
const {
  version,
  isLatest
} = await fetchLatestBaileysVersion();
console.log("using WA v" + version.join(".") + ", isLatest: " + isLatest);
const v3 = process.argv.includes("--pairing");
const v4 = {
  version: version,
  logger: _0x4c9741({
    level: "silent"
  }),
  printQRInTerminal: !v3,
  browser: global.browser,
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, _0x4c9741().child({
      level: "silent",
      stream: "store"
    }))
  }
};
global.conn = makeWASocket(v4);
conn.isInit = false;
if (!opts.test) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write().catch(console.error);
    }
  }, 60000);
}
if (opts.server) {
  (await import("./server.js")).default(global.conn, v);
}
async function f5(p10) {
  const {
    receivedPendingNotifications: _0x2dba17,
    connection: _0x30d616,
    lastDisconnect: _0x474796,
    isOnline: _0x155ab2,
    isNewLogin: _0x6d64a0
  } = p10;
  if (_0x6d64a0) {
    conn.isInit = true;
  }
  if (_0x30d616 == "connecting") {
    console.log(_0x9a492c.redBright("Mengaktifkan Bot, Mohon tunggu sebentar..."));
  }
  if (_0x30d616 == "open") {
    console.log(_0x9a492c.green("Tersambung"));
  }
  if (_0x155ab2 == true) {
    console.log(_0x9a492c.green("Status Aktif"));
  }
  if (_0x155ab2 == false) {
    console.log(_0x9a492c.red("Status Mati"));
  }
  if (_0x2dba17) {
    console.log(_0x9a492c.yellow("Menunggu Pesan Baru"));
  }
  if (_0x30d616 == "close") {
    console.log(_0x9a492c.red("koneksi terputus & mencoba menyambung ulang..."));
  }
  global.timestamp.connect = new Date();
  if (_0x474796 && _0x474796.error && _0x474796.error.output && _0x474796.error.output.statusCode !== DisconnectReason.loggedOut) {
    console.log(_0x9a492c.red("Connecting..."));
    await global.reloadHandler(true);
  }
  if (global.db.data == null) {
    await global.loadDatabase();
  }
}
process.on("uncaughtException", console.error);
let v5 = true;
let v6 = await import("./handler.js");
global.reloadHandler = async function (p11) {
  try {
    const v7 = await import("./handler.js?update=" + Date.now()).catch(console.error);
    if (Object.keys(v7 || {}).length) {
      v6 = v7;
    }
  } catch (_0xdf1f00) {
    console.error(_0xdf1f00);
  }
  if (p11) {
    const v8 = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(v4, {
      chats: v8
    });
    v5 = true;
  }
  if (!v5) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }
  conn.welcome = "*@user*\n*𝚑𝚊𝚜 𝚓𝚘𝚒𝚗𝚎𝚍 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙*\n\n𝙱𝚎𝚏𝚘𝚛𝚎 𝚝𝚑𝚊𝚝, 𝚍𝚘𝚗𝚝 𝚏𝚘𝚛𝚐𝚎𝚝 𝚝𝚘 𝚛𝚎𝚊𝚍 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙 𝚛𝚞𝚕𝚎𝚜";
  conn.bye = "*@user* *𝚑𝚊𝚜 𝚕𝚎𝚏𝚝 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙*";
  conn.spromote = "@user sekarang admin!";
  conn.sdemote = "@user sekarang bukan admin!";
  conn.sDesc = "Deskripsi telah diubah ke \n@desc";
  conn.sSubject = "Judul grup telah diubah ke \n@subject";
  conn.sIcon = "Icon grup telah diubah!";
  conn.sRevoke = "Link group telah diubah ke \n@revoke";
  conn.handler = v6.handler.bind(global.conn);
  conn.participantsUpdate = v6.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = v6.groupsUpdate.bind(global.conn);
  conn.onDelete = v6.deleteUpdate.bind(global.conn);
  conn.connectionUpdate = f5.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn);
  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  v5 = false;
  return true;
};
const v9 = global.__dirname(join(v2, "./plugins/index"));
const vF = p12 => /\.js$/.test(p12);
global.plugins = {};
async function f6() {
  for (let v10 of readdirSync(v9).filter(vF)) {
    try {
      let v11 = global.__filename(join(v9, v10));
      const v12 = await import(v11);
      global.plugins[v10] = v12.default || v12;
    } catch (_0x24c1ca) {
      conn.logger.error(_0x24c1ca);
      delete global.plugins[v10];
    }
  }
}
f6().then(p13 => console.log(Object.keys(global.plugins))).catch(console.error);
global.reload = async (p14, p15) => {
  if (vF(p15)) {
    let v13 = global.__filename(join(v9, p15), true);
    if (p15 in global.plugins) {
      if (existsSync(v13)) {
        conn.logger.info("re - require plugin '" + p15 + "'");
      } else {
        conn.logger.warn("deleted plugin '" + p15 + "'");
        return delete global.plugins[p15];
      }
    } else {
      conn.logger.info("requiring new plugin '" + p15 + "'");
    }
    let v_0x5f3ff2 = _0x5f3ff2(readFileSync(v13), p15, {
      sourceType: "module",
      allowAwaitOutsideFunction: true
    });
    if (v_0x5f3ff2) {
      conn.logger.error("syntax error while loading '" + p15 + "'\n" + format(v_0x5f3ff2));
    } else {
      try {
        const v14 = await import(global.__filename(v13) + "?update=" + Date.now());
        global.plugins[p15] = v14.default || v14;
      } catch (_0x25b685) {
        conn.logger.error("error require plugin '" + p15 + "\n" + format(_0x25b685) + "'");
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([v15], [v16]) => v15.localeCompare(v16)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(v9, global.reload);
await global.reloadHandler();
async function f7() {
  let v17 = await Promise.all([spawn("ffmpeg"), spawn("ffprobe"), spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]), spawn("convert"), spawn("magick"), spawn("gm"), spawn("find", ["--version"])].map(p16 => {
    return Promise.race([new Promise(p17 => {
      p16.on("close", p18 => {
        p17(p18 !== 127);
      });
    }), new Promise(p19 => {
      p16.on("error", p20 => p19(false));
    })]);
  }));
  let [v18, v19, v20, v21, v22, v23, v24] = v17;
  console.log(v17);
  let v25 = global.support = {
    ffmpeg: v18,
    ffprobe: v19,
    ffmpegWebp: v20,
    convert: v21,
    magick: v22,
    gm: v23,
    find: v24
  };
  Object.freeze(global.support);
  if (!v25.ffmpeg) {
    conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
  }
  if (v25.ffmpeg && !v25.ffmpegWebp) {
    conn.logger.warn("Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)");
  }
  if (!v25.convert && !v25.magick && !v25.gm) {
    conn.logger.warn("Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)");
  }
}
f7().then(() => conn.logger.info("☑️ Quick Test Done")).catch(console.error);
import _0x2b01f7 from "readline";
const v26 = String.fromCharCode(8206);
const v27 = v26.repeat(4001);
const vF2 = p21 => {
  return new Promise(p22 => setTimeout(p22, p21));
};
const v28 = _0x2b01f7.createInterface({
  input: process.stdin,
  output: process.stdout
});
const vF3 = p23 => new Promise(p24 => v28.question(p23, p24));
if (v3 && !conn.authState.creds.registered) {
  console.clear();
  await vF2(7000);
  console.clear();
  _0x2f5ce2.say("\nPAIRING CODE\n", {
    font: "tiny",
    align: "left",
    gradient: ["red", "blue"]
  });
  console.log(_0x9a492c.bold.white("━━━━━━━━━━━ https://github.com/XM4ZE ━━━━━━━━━━━"));
  console.log(_0x9a492c.bold.green("\n\nMasukan nomor kamu :"));
  let v29 = await vF3(_0x9a492c.bgBlack(_0x9a492c.greenBright("> ")));
  v29 = v29.replace(/[^0-9]/g, "");
  if (!Object.keys(PHONENUMBER_MCC).some(p25 => v29.startsWith(p25))) {
    console.log(_0x9a492c.bold.red("MASUKAN NOMORMU DENGAN BENAR AWALI DENGAN 62 !!!"));
    console.log(_0x9a492c.bold.green("\nMasukan nomor :"));
    v29 = await vF3(_0x9a492c.bgBlack(_0x9a492c.greenBright(">")));
    v29 = v29.replace(/[^0-9]/g, "");
  }
  let v30 = await conn.requestPairingCode(v29);
  v30 = v30?.match(/.{1,4}/g)?.join("-") || v30;
  console.log(_0x9a492c.bold.green("Kode tautan kamu : "), _0x9a492c.bold.yellow(v30));
  v28.close();
  }
