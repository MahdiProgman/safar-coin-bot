import http from 'http';
import express, { application, Request, Response } from 'express';
import { Context, Telegraf } from 'telegraf';
import { APP_DOMAIN, PORT, TG_TOKEN, TG_WEBHOOK } from './config/config.js';
import path from 'path';

const api = express();
const server : http.Server = http.createServer(api);
const bot : Telegraf = new Telegraf(TG_TOKEN);
const users : number[] = [];

api.use(express.static(path.join(__dirname, '../public')));
api.set('view engine', 'ejs');

(async ()=> {
    await bot.telegram.setWebhook(TG_WEBHOOK)
    .then(()=> console.log('set TG webhook is success!'))
    .catch(()=> console.log('set TG webhook is failed!'));
})();

console.log(`${APP_DOMAIN}/app`);
bot.start(async (ctx) => {
    await ctx.sendPhoto(`${APP_DOMAIN}/image/photo.jpg`, {
        caption : `
        سلام <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> عزیز
        اینجا قراره پولدار شی و عشق کنی و تا ابد واسه صفر کوین ساک میزنی
        <b>پس بیا و پولدار شو عوضی انگشت کن!</b>
        `,
        parse_mode : 'HTML',
        reply_markup : {
            inline_keyboard : [
                [
                    {
                        text : 'بزن رو این فقط اگه میشه آروم انگشت کن اوکی؟🥰',
                        web_app : {
                            url : `${APP_DOMAIN}/app`
                        }
                    }
                ]
            ]
        }
    });
    await ctx.sendMessage('HabibCoin Ft. SafarCoin Comming soon...');
    if(users.indexOf(ctx.from.id) !== -1) users.push(ctx.from.id);
});
bot.command('send', async (ctx) => {
    if(ctx.from.id == 6216020974 || ctx.from.id == 931255100){
        const msg = ctx.message.text.split('/send')[1];
        users.forEach(async (usrID : number) => {
            await bot.telegram.sendMessage(usrID, msg);
        });

        await ctx.sendMessage('پیام به همه ی کاربران ارسال شد✅');
    }
});

api.get('/app', (req : Request, res : Response) => {
    res.render('app');
});
api.use(bot.webhookCallback('/webhook'));

server.listen(PORT, ()=> {
    console.log(`Server Is Running On Port ${PORT}`);
});