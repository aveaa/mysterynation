const Discord = require('discord.js');
const client = new Discord.Client();
const emojis = {error:'454975930922827786'};

client.on('ready', () => {
  client.user.setStatus('online');
  client.user.setPresence({ game: { name: `за тобой | ${process.env.PREFIX}help`, type: 3 } }).catch();
  client.user.setUsername(`Meow`);
  client.user.setAvatar(`https://cdn.discordapp.com/avatars/421030089732653057/84d590ce13493ed42abe6bc31e0eee9d.png?size=2048`);
  console.log('[Meow] Успешная авторизация.');
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(process.env.PREFIX) !== 0) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	let ayy = client.emojis.get(emojis.error);
	
	if(command === "ping") {
    const m = await message.channel.send("Пинг?");
    m.edit(`Понг! Моя задержка: ${m.createdTimestamp - message.createdTimestamp}ms. Задержка API: ${Math.round(client.ping)}ms`);
    } else if(command === "help") {
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
      },
{
        name: `${process.env.PREFIX}joke`,
        value: "Выдать шутку"
      },
{
        name: `${process.env.PREFIX}avatar [@упоминание]`,
        value: "Выдать аватарку пользователя"
      },
	     {
        name: `${process.env.PREFIX}checkinvite`,
        value: "Просмотреть, у кого в статусе есть инвайт-ссылка"
      },
	     {
        name: `${process.env.PREFIX}invite`,
        value: "Выдать ссылку на приглашение бота"
      }
    ]
  }
});
		} else if(command === "warn") {
	    let err = false;
    ['MANAGE_MESSAGES'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		if (reason.length < 1) return message.reply('причина, -__-').catch(console.error);
  		if (message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
			let accepting = message.channel.send(`Вы уверены, что хотите выписать предупреждение пользователю?\n\n**Напишите \`да\`, чтобы подтведить.**`);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
        collector.on('collect', msg => {
            if (['да', 'ага', 'кнш', 'конечно', 'конешно', 'давай', 'йес', 'yes', 'y', 'aga', 'go', 'da', 'го'].includes(msg.content.toLowerCase())) {
                message.delete();
                try {
                    let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        // .setDescription(`**Пользователь:** ${user.user}\n**Модератор:** ${message.author}\n**Причина:**\n\n${reason}`)
                        .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
                        .setFooter(client.user.Username);
                    if (reason !== null && typeof reason !== undefined && reason !== '') embed.addField('Причина', `${reason}`);
                    message.channel.send(`${member.user}`, {embed}).then(() => {
                        message.channel.stopTyping(true)
                    });
                } catch (Exception) {message.channel.send({embed: embed_error('Ошибка варна.')})}
            }
            console.log(collector);
            collector.stop();
        });
	} else if(command === "mute") {
	    let err = false;
    ['MANAGE_MESSAGES'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
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
    		.setFooter(client.user.Username)
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter(client.user.Username)
    		.setTimestamp();

    		const channel1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter(client.user.Username)
    		.setTimestamp();

    		const modlog1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter(client.user.Username)
    		.setTimestamp();

  		if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('У меня нету прав MANAGE_ROLES').catch(console.error);

  		if (member.roles.has(muteRole.id)) {
    		member.removeRole(muteRole).then(() => {
      		message.channel.send({embed: channel1}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно размутить: " + e));
  		} else {
   	 		member.addRole(muteRole).then(() => {
      		message.channel.send({embed: channel}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно выдать мут: " + e));
  		}
	} else if(command === "kick") {
    let err = false;
    ['KICK_MEMBERS'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
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

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		message.channel.send({embed: channel}).catch(console.error);
   } else if(command === "ban") {
    let err = false;
    ['BAN_MEMBERS'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
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

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter("MysteryNation")
    		.setTimestamp();

    		message.channel.send({embed: channel}).catch(console.error);
   } else if(command === "eval") {
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
   } else if (command === "idban") {
   let err = false;
    ['BAN_MEMBERS'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
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

      		client.channels.get("435060105487187968").send({embed: modlog}).catch(console.error);
   } else if(command === "joke") {
  	let items = ['Падает комп с виндой с 16-го этажа и думает: Вот сейчас бы зависнуть',
        'Ты кто по гороскопу?\n- Рыба\n- А я пиво',
        'Вчера отвёл душу... Сегодня не могу вспомнить куда!?..',
        'Если вы нашли ошибку в тексте бота, выделите её мышкой и нажмите Alt+F4',
        'У кошки четыpе ноги: вход, выход, земля и питание',
        'Я, я свидетель! А что случилось?',
        'Что же вы так убиваетесь? Вы же так никогда не убьётесь!',
        'Ты умрешь, а я нет',
        'В начале о главном. Главный — в порядке.',
        'Мы не продаём алкоголь и сигареты лицам, не достигшим ничего',
        'Не пугайтесь, это только усугубит положение',
        'Я добрый, просто я людей ненавижу',
        'Сшил дырки — получилась сетка',
        'Мир несовершенен',
        'Фонарик на солнечной батарее',
        'Колобок повесился',
        'Буратино утонул',
        'Лечу от вирусов по фотографии вашего компьютера',
        'Засолим огурцы по самые помидоры!',
        'Если болт нужно забить аккуратно, его вкручивают',
        'Искусство — это не ЧТО, а КАК',
        'Оптимизм — это недостаток информации',
        'Если ласточки ползают по земле и блюют — это к концу света',
        'Вратарь ловко овладел мячом. Мяч придётся заменить.',
        'Выйди из комы и зайди как полагается!',
        'Смотри, как он трогательно спит, совсем как дохлый',
        'А это — человек. Сейчас он будет пытаться изменить свою жизнь. Смотрите, как он забавно надеется на лучшее.',
        'Реестр запрещённых сайтов попал в реестр запрещённых сайтов, поскольку содержит информацию о запрещённых сайтах.',
        '"Нужно пораньше в магазин приехать, чтобы мало народа было, и быстро всё купить, и в очередях не стоять", — подумал весь город.',
        '— Вам понятно как работает фрезер или объяснить на пальцах?',
        'Чтобы выделятся из серой массы необязательно красить волосы в красный цвет и носить кольцо в носу. Достаточно просто не быть говном.',
        'По мнению Госдепа и ЕС, эти русские совсем обнаглели: плюнешь в морду — драться лезут.',
        'Когда поёт Тимати замолкают даже соловьи, потому что даже они не могут петь и блевать одновременно.',
        'Меня мучает один вопрос: в связи с чем эти ледяные штуки называются «сосульки», а карамельные конфетки — «леденцы»? Почему не наоборот?',
        'Вдруг откуда ни возьмись, ниоткуда не взялось.',
        'Я начал с нуля, а затем многократно приумножил свои знания.',
        'Навязчивость — худшее из качеств, вы со мной согласны? Давайте обсудим? Почему не хотите? Может, я к вам на колени сяду?',
        'Приняли хорошо. Выгнали не сразу, били без злости, да и догоняли лениво.',
        'Бесит, когда люди идут нахуй недостаточно быстро.',
        '— А ты давно кактус на холодильнике поливала?\n— Это хлеб.',
        'Медведь проживший с цыганами 10 лет, не впадал в спячу, чтобы у него ничего не спиздили.',
        'Учитель рисования просто обожал свой предмет. Поэтому на каждом уроке дети рисовали его предмет.',
        'Сегодня видел объявление «Продам принтер», написанное от руки. Что-то здесь не так.',
        'Жопа велосипедиста, въехавшего в рекламный щит, 17 минут была лицом компании AVON.',
        'В Молдавии за второго ребёнка правительство выделяет мешок цемента. Но потратить его можно только на образование',
        'Как объяснить соседям, что лифт и так наш, поэтому метить его не надо?',
        '— Здравствуй, Дедушка Мороз, борода из ваты! Ты подарки нам принёс?\n— Нет, идите нахуй.',
        'Вчера во дворе хулиганы избили оптимиста Василия до полужизни.',
        'Трёхлетний малыш, слепивший прямоугольный песочный \'куличик\', неожиданно для себя нарушил 15 патентов Apple.',
        'Родился сам — помоги другому',
        'Мне, конечно, нравятся дети, но целого я бы не съел',
        'Больной, просыпайтесь! Пора принимать снотворное!',
        'Я иногда так нерешителен. Или нет?',
        'Самки пенопласта откладывают яйца в коробки из-под бытовой техники',
        'Если труп обвести цветными мелками — будет атмосфера праздника!',
        'Серая неплодородная почва из пяти букв? Бетон.',
        'Труп врага всегда хорошо пахнет',
        '— Пап, это кальян. Через него нельзя гнать самогон.',
        'Добро - это когда плохому человеку делаешь плохо',
        'Если вопрос правильно поставить, он может долго простоять.',
        'Мальчик, не до конца завязавший шнурки, не до конца сошёл с эскалатора',
        'Сколько в людях ни разочаровывайся — всё равно удивят',
        'А файл с заявлением на увольнение назывался ПНХ.doc',
        'Начни с себя и на себе остановись',
        'Планшеты от Микрософт — самые лучшие планшеты среди планшетов от Микрософт!',
        'Ну и запросы у вас — сказала база данных и повисла',
        'Пишу про всех гадости',
        'Судя по вашим охуевшим лицам, вы слегка удивлены',
        'Человек может всё, пока не начнёт что-то делать',
        'Ёж — птица гордая, пока не пнёшь — не полетит',
        'Люди, считающие, что деньги могут всё — сами могут сделать всё за деньги',
        'Кpасота сосёт мир',
        'Жизнь одна — проеби её ярко!',
        'Не всякий лось перекусит рельсу',
        'Как-то раз один мальчик пошёл за водкой. Вниз по социальной лестнице.',
        'Пингвины — это растолстевшие ласточки',
        'Если у вас нет Интернета, то у кого-то их два',
        'Выдавил из себя раба — убери за собой!',
        'Одни с годами умнеют, другие становятся старше',
        'Лифт не работает. Ближайший лифт — в соседнем доме.',
        'Кролики думали, что они трахаются, а на самом деле их разводили',
        'В слове «гребля» первые две буквы означают «грyппoвая»',
        'Добро пожаловать отсюда',
        'Пойдём со мной. Ты пожалеешь, но тебе понравится',
        'Кто с чем к нам придёт, тот без того и останется',
        'Ваш раздел D:\\ перепорнен.',
        'В тебе сидит говно, но ты называешь это характером',
        'Если в кране нет воды — значит это подъёмный кран',
        'Мисс Таиланд на хую вертела все обвинения в свой адрес',
        'Набирая песок для новой кошки, маленький Петя нашел старую',
        'Сын борца сумо всю жизнь мечтал обнять отца',
        'Жить на белом свете — не политкорректно',
        'С улицы пришёл кусок грязи, утверждает, что мой ребёнок',
'Табличка с надписью «Осторожно! Убьёт!» осторожно убила человека'];
    let item = items[Math.floor(Math.random()*items.length)];
    message.channel.send({embed: {
  color: 3447003,
  description: item
}});
   } else if(command === "avatar") {
		let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` Вы не упомянули пользователя.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
            const embed = new Discord.RichEmbed()
                .setTitle(`Аватарка пользователя ${member.user.tag}`)
                .setImage(member.user.avatarURL)
                .setFooter(client.user.Username)
                .setDescription('Если изображение не загружается, тыкните на него');
            message.channel.send({embed});
} else if(command === "checkinvite") {
	let err = false;
    ['MANAGE_MESSAGES'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.\n\nЕсли вы считаете, что это не так, напишите <@178404926869733376>`
}});
	const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));

		const send = new Discord.RichEmbed()
            .setTitle('Проверка ссылки в статусе:')
            .setDescription(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Никто не имеет ссылки на приглашение в качестве названия игры.")
            .setFooter(client.user.Username);
		
		const okkkk = new Discord.RichEmbed()
            .setTitle('Уведомление:')
            .setDescription(`${message.author}, проверьте свои личные сообщения`)
            .setFooter(client.user.Username);
		
	message.author.send({embed: send});
		message.channel.send({embed: okkkk});
} else if(command === "invite") {
	message.channel.send(`Ссылка на приглашение бота: https://discordapp.com/oauth2/authorize?client_id=440897025106509824&scope=bot&permissions=136`);
	} else {
	message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` Данной команды не существует.`
}});
	}
});

client.login(process.env.BOT_TOKEN);
process.env.BOT_TOKEN = process.env.POSLANIYE
