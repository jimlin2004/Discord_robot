const discord = require("discord.js");
const client = new discord.Client({
   intents: [ discord.Intents.FLAGS.GUILDS, 
            discord.Intents.FLAGS.GUILD_MESSAGES ]
})
const {token} = require("./token.json");

client.on("ready", () => {
   console.log(`logged in as ${client.user.tag}`); 
});

client.on("message", msg => {
   if (msg.content.substring(0, 1) == '$') {
      let args = msg.content.substring(1).split(' ');
      let cmd = args[0];
      if (cmd == "hi") {
         msg.reply("HI!!!");
      } 
   }
   
});

client.login(token);