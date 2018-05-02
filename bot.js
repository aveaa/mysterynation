const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  client.user.setStatus('online');
  client.user.setPresence({ game: { name: `за MysteryNation`, type: 3 } }).catch();
  console.log('[MysteryNation] Успешная авторизация.');
});

client.on("message", async message => {

	const ayy = client.emojis.find("name", "error");


  if(message.author.bot) return;
  if(message.content.indexOf(process.env.PREFIX) !== 0) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

    if(command === "ping") {
    const m = await message.channel.send("Пинг?");
    m.edit(`Понг! Моя задержка: ${m.createdTimestamp - message.createdTimestamp}ms. Задержка API: ${Math.round(client.ping)}ms`);
    }
  if(command === "help") {
		message.channel.send(`Для помощи по командам, напишите ${process.env.PREFIX}commands`);
    }
    if(command === "commands") {
		message.reply('проверьте свои личные сообщения..');
        message.author.send({embed: {
    color: 2378990,
    fields: [{
        name: `${process.env.PREFIX}kick [@упоминание] [причина]`,
        value: "Кикнуть пользователя"
      },
	  {
        name: `${process.env.PREFIX}ban [@упоминание] [причина]`,
        value: "Забанить пользователя"
      },
	  {
        name: `${process.env.PREFIX}mute [@упоминание] [причина]`,
        value: "Заблокировать/разблокировать чат пользователю"
      },
	  {
        name: `${process.env.PREFIX}warn [@упоминание] [причина]`,
        value: "Выдать предупреждение пользователю"
      },
	  {
        name: `${process.env.PREFIX}idban [ID]`,
        value: "Забанить пользователя (по ID)"
      }
    ]
  }
});
		}
	if(command === "warn") {
	    if(!message.member.roles.some(r=>["Модератор"].includes(r.name)) )
          return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		if (reason.length < 1) return message.reply('причина, -__-').catch(console.error);
  		if (message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
		message.delete();
		
  		const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был выдан варн модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const author = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был выдан варн модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const member = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был выдан варн модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был выдан варн модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    	message.channel.send({embed: channel});
    	message.author.send({embed: author});
    	message.member.send({embed: member});
    	client.channels.get("123123").send({embed: channel});
	}
	if(command === "mute") {
	    if(!message.member.roles.some(r=>["Модератор"].includes(r.name)) )
          return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		let muteRole = message.guild.roles.find('name', 'Muted');
  		if (!muteRole) return message.reply('Я не могу найти роль Muted').catch(console.error);
  		if (reason.length < 1) return message.reply('причина, -__-').catch(console.error);
  		if (message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
  		const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const author = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const member = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const channel1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const author1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const member1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const modlog1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

  		if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('У меня нету прав MANAGE_ROLES').catch(console.error);

  		if (member.roles.has(muteRole.id)) {
    		member.removeRole(muteRole).then(() => {
      		message.channel.send({embed: channel1}).catch(console.error);
      		message.author.send({embed: author1}).catch(console.error);
      		message.member.send({embed: member1}).catch(console.error);
      		client.channels.get("123123").send({embed: modlog1}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно размутить: " + e));
  		} else {
   	 		member.addRole(muteRole).then(() => {
      		message.channel.send({embed: channel}).catch(console.error);
      		message.author.send({embed: author}).catch(console.error);
      		message.member.send({embed: member}).catch(console.error);
      		client.channels.get("123123").send({embed: modlog}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно выдать мут: " + e));
  		}
	}
	if(command === "kick") {
    if(!message.member.roles.some(r=>["Модератор"].includes(r.name)) )
      return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("вы не сказали кого кикнуть");
    if(!member.kickable) 
      return message.reply("я не могу кикнуть его(её), у меня есть хоть права?");
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("а причину написать?");
    await member.kick(reason)
      .catch(error => message.reply(`Прости, я не могу кикнуть: ${error}`));
	const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const author = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const member = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		message.channel.send({embed: channel}).catch(console.error);
      		message.author.send({embed: author}).catch(console.error);
      		message.member.send({embed: member}).catch(console.error);
      		client.channels.get("123123").send({embed: modlog}).catch(console.error);
   }
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Модератор"].includes(r.name)) )
      return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("вы не сказали кого забанить");
    if(!member.bannable) 
      return message.reply("я не могу забанить его(её), у меня есть хоть права?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("а причину написать?");
    
    await member.ban(reason)
      .catch(error => message.reply(`прости, я не могу забанить: ${error}`));
	const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const author = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const member = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		message.channel.send({embed: channel}).catch(console.error);
      		message.author.send({embed: author}).catch(console.error);
      		message.member.send({embed: member}).catch(console.error);
      		client.channels.get("123123").send({embed: modlog}).catch(console.error);
   }
   if (command === "eval") {
    if(message.author.id !== "178404926869733376") return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
   }
   if (command === "idban") {
   if(!message.member.roles.some(r=>["Модератор"].includes(r.name)) )
      return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
   let member = message.mentions.members.first();
   if (!client.fetchUser(args[0])) return message.channel.send('Ошибка');
    user = args[0];
    message.guild.ban(args[0])
        .then(user => console.log(`Пользователь ${user.username || user.id || user} в гильдии ${message.guild.name} был успешно забанен.`))
        .catch(console.error);

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен (по ID) модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

      		client.channels.get("123123").send({embed: modlog}).catch(console.error);
      	}
});

client.login(process.env.BOT_TOKEN);
process.env.BOT_TOKEN = process.env.POSLANIYE
