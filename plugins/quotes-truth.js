import { truth } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix }) => {
    m.reply(await truth())
}

handler.help = ['truth']
handler.tags = ['quotes', 'fun']
handler.command = /^(truth)$/i
handler.limit = true;
handler.register = true;

export default handler;