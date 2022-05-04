const discord = require("discord.js");
const client = new discord.Client({
   intents: [ discord.Intents.FLAGS.GUILDS, 
            discord.Intents.FLAGS.GUILD_MESSAGES ]
})
const {token} = require("./json/token.json");
const RPN_module = require("./js/RPN.js");
const course = require("./json/course.json");
const keep_alive = require("./sever.js");

client.on("ready", () => {
   console.log(`logged in as ${client.user.tag}`); 
});

client.on("message", (msg) => {
   if (msg.content.substring(0, 1) == '$') {
      let args = msg.content.substring(1).split(' ');
      let cmd = args[0];
      let args_num = args.length;
      if (cmd == "hi") {
         msg.reply("HI!!!");
      } 
      else if (cmd == "call") {
         if (parseInt(args[args_num - 1]) > 10)
            msg.reply("次數太多，現在限定10以內");
         else {
            let str = "";
            for (let i = 1; i < (args_num - 1); i++)
               str += args[i] + ' ';
            for (let i = 0; i < parseInt(args[args_num - 1]); i++)
               msg.reply(str);
         }
      }
      else if (cmd == "calculate") {
         let RPN = new RPN_module(args);
         let ans = RPN.calculate();
         try {
            msg.reply(ans.toString());
         }
         catch (error) {
            msg.reply("錯誤");
         }
      }
      else if (cmd == "subject") {
         msg.reply(course[args[1]]);
      }
   }
   
});

// keep_alive();
client.login(token);