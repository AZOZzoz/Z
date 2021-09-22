const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server is up.')
});

app.listen(3000, () => {
  console.log('server started');
});

///////////////////////////////////////
const Discord = require("discord.js");
const client = new Discord.Client();

const request = require('request');
const prefix = "*"; // البرافيكس
const GUILDID = '834599713399111680'; // اي دي السيرفر  
const CHANNELID = '860674217338077184'; // اي دي الروم


client.on("ready", () => {
  console.log(`${client.user.tag}`);
   console.log(`${client.guilds.cache.size} Servers`);
  console.log(`${client.users.cache.size} Members`);
   console.log(`${client.channels.cache.size} Channels`);
  console.log(`[ ${client.guilds.cache.map(g => g.name).join(", \n ")} ]`);
  client.user.setActivity(`${prefix}help | Quran-BOT`, { type: "WATCHING" });
});

const ytdl = require('ytdl-core');// CODE BY KAHRBAA كههربا
const url = 'https://www.youtube.com/watch?v=M6z0Qql4-qo'; // هنا فديو الخاص ب القرأن الكريم كامل // CODE BY KAHRBAA 

client.on('ready', async () => {
  console.log('تـم تشغيل القرأن الكريم');
  // CODE BY KAHRBAA كههربا
  voiceStay(GUILDID, CHANNELID);
  function voiceStay(guildid, channelid) {
    if (!guildid) throw new Error('ـاكد انك حطط ايدي السيرفر');
    if (!channelid) throw new Error('تـاكد انك حطط ايدي الروم');

    let guild = client.guilds.cache.get(guildid);
    const voiceChannel = guild.channels.cache.get(channelid);;
    if (!voiceChannel) {
      return
    }// CODE BY KAHRBAA كههربا
    voiceChannel.join()
      .then(connection => {
        const stream = ytdl(url, { filter: 'audioonly' }); // CODE BY KAHRBAA كههربا
        const dispatcher = connection.play(stream);
        dispatcher.on('end', () => { // CODE BY KAHRBAA كههربا 
          voiceChannel.leave();

        });
      });
  }
});

client.on('message', message => {
  if (message.content.startsWith(prefix + "again")) {// CODE BY KAHRBAA كههربا
    if (message.author.bot) return;
    if (!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
      voiceStay(GUILDID, CHANNELID);
  function voiceStay(guildid, channelid) {
    if (!guildid) throw new Error('ـاكد انك حطط ايدي السيرفر');
    if (!channelid) throw new Error('تـاكد انك حطط ايدي الروم');

    let guild = client.guilds.cache.get(guildid);
    const voiceChannel = guild.channels.cache.get(channelid);;
    if (!voiceChannel) {
      return
    }// CODE BY KAHRBAA كههربا
    voiceChannel.join()
      .then(connection => {
        const stream = ytdl(url, { filter: 'audioonly' }); // CODE BY KAHRBAA كههربا
        const dispatcher = connection.play(stream);
        dispatcher.on('end', () => { // CODE BY KAHRBAA كههربا 
          voiceChannel.leave();
        });
      });
    message.channel.send({// CODE BY KAHRBAA كههربا
      embed: new Discord.MessageEmbed()
        .addField(`starting again.`, true)

    })
  }}
});



client.login(process.env.token);