const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  client.user.setStatus('online');
  client.user.setPresence({
	  game: {
		  name: `--help`,
		  type: 1
	  }
  });
  console.log('Успешная авторизация.');
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(process.env.PREFIX) !== 0) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	let ayy = client.emojis.get("458543533868056577");
	
	if(command === "waifu") {
  	let items = ['http://eclipsedev.cf/img/nya/1.jpg', 'http://eclipsedev.cf/img/nya/2.jpg', 'http://eclipsedev.cf/img/nya/3.jpg', 'http://eclipsedev.cf/img/nya/4.jpg', 'http://eclipsedev.cf/img/nya/5.jpg', 'http://eclipsedev.cf/img/nya/6.jpg', 'http://eclipsedev.cf/img/nya/7.jpg', 'http://eclipsedev.cf/img/nya/8.jpg', 'https://pp.userapi.com/c834203/v834203782/1108ef/LiRMsL_nnLE.jpg', 'https://pp.userapi.com/c841523/v841523428/215f0/FF8t57wG5p8.jpg', 'https://pp.userapi.com/c847220/v847220978/2f43e/ZijJ4cbVve4.jpg', 'https://pp.userapi.com/c847218/v847218201/3f6ee/U1xr8Vb_t7E.jpg', 'https://pp.userapi.com/c845020/v845020487/47d53/im0qyQ0H2ow.jpg', 'https://pp.userapi.com/c824602/v824602630/12bd58/Gaoy8CGcsnw.jpg', 'https://sun1-3.userapi.com/c840426/v840426086/80afb/VBZXzo7wJUI.jpg'];
    let item = items[Math.floor(Math.random()*items.length)];
    const embed = new Discord.RichEmbed()
                .setTitle(`Только никому про это. :0`)
                .setImage(item)
                .setFooter(client.user.tag)
message.author.send({embed});
		message.channel.send(`Тсс, ${message.author}.. Загляни в ЛС.`);
} else if(command === "ping") {
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
        name: `${process.env.PREFIX}idunban [ID]`,
        value: "Разбанить пользователя (по ID)"
      },
{
        name: `${process.env.PREFIX}joke`,
        value: "Выдать шутку"
      },
{
        name: `${process.env.PREFIX}avatar`,
        value: "Выдать аватарку пользователя"
      },
	     {
        name: `${process.env.PREFIX}checkinvite`,
        value: "Просмотреть, у кого в статусе есть инвайт-ссылка"
      },
	     {
        name: `${process.env.PREFIX}invite`,
        value: "Выдать ссылку на приглашение бота"
      },
	     {
        name: `${process.env.PREFIX}hug`,
        value: "Обнять пользователя"
      },
	     {
        name: `${process.env.PREFIX}kiss`,
        value: "Поцеловать пользователя"
      },
	     {
        name: `${process.env.PREFIX}waifu`,
        value: "???"
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
  description: ayy + ` У вас нету прав для доступа к этой команде.`
}});
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		if (reason.length < 1) return message.reply('причина, -__-').catch(console.error);
  		if (message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
                    let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
		        .addField('Тип команды', `Варн`, true)
                        .setFooter(client.user.tag)
                        .addField('Причина', `${reason}`);
                    message.channel.send({embed});
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
  description: ayy + ` У вас нету прав для доступа к этой команде.`
}});
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		let muteRole = message.guild.roles.find('name', 'Muted');
  		if(!muteRole) return try {
      muteRole = await message.guild.createRole({
        name: "Muted",
        color: "#1a1a1a",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }
  		if(reason.length < 1) return message.reply('причина, -__-').catch(console.error);
  		if(message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
		
		let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение:')
                        .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
		        .addField('Тип команды:', `Мут`, true)
                        .setFooter(client.user.tag)
                        .addField('Причина', `${reason}`);
		
		let embed1 = new Discord.RichEmbed()
                        .setTitle('Предупреждение:')
                        .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
		        .addField('Тип команды:', `Размут`, true)
                        .setFooter(client.user.tag)
                        .addField('Причина', `${reason}`);
		
  		const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был заблокирован чат модератором ${message.author.tag}, причина: ${reason}`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		const channel1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		const modlog1 = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователю ${member.user.tag} был разблокирован чат модератором ${message.author.tag}`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

  		if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('У меня нету прав MANAGE_ROLES').catch(console.error);

  		if (member.roles.has(muteRole.id)) {
    		member.removeRole(muteRole).then(() => {
      		message.channel.send({embed: embed1}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно размутить: " + e));
  		} else {
   	 		member.addRole(muteRole).then(() => {
      		message.channel.send({embed: embed}).catch(console.error);
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
  description: ayy + ` У вас нету прав для доступа к этой команде.`
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
		
		let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
		        .addField('Тип команды', `Кик`, true)
                        .setFooter(client.user.tag)
                        .addField('Причина', `${reason}`);
		
	const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был кикнут модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		message.channel.send({embed: embed}).catch(console.error);
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
  description: ayy + ` У вас нету прав для доступа к этой команде.`
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
	   
	   let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
		        .addField('Тип команды', `Бан`, true)
                        .setFooter(client.user.tag)
                        .addField('Причина', `${reason}`);
	   
	const channel = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был забанен модератором ${message.author.tag}, причина: "${reason}"`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

    		message.channel.send({embed: embed}).catch(console.error);
   } else if(command === "unban") {
	   message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` Неплохо. Но это не так работает. >> --idunban [ID]`
}});
   } else if(command === "eval") {
    if(message.author.id !== "178404926869733376") return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.`
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
  description: ayy + ` У вас нету прав для доступа к этой команде.`
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
    		.setDescription(`Пользователь ${member.user.tag} был забанен (по ID) модератором ${message.author.tag}`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

      		message.channel.send({embed: modlog}).catch(console.error);
   } else if (command === "idunban") {
   let err = false;
    ['ADMINISTRATOR'].forEach(function (item) {
                if (!message.member.hasPermission(item, false, true, true)) {
                    err = true;
                }
            });
    if (err) return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.`
}});
   let member = message.mentions.members.first();
   if (!client.fetchUser(args[0])) return message.channel.send('Ошибка');
    user = args[0];
    message.guild.unban(args[0])
        .then(user => console.log(`Пользователь ${user.username || user.id || user} в гильдии ${message.guild.name} был успешно разбанен.`))
        .catch(console.error);

    		const modlog = new Discord.RichEmbed()
    		.setTitle('Предупреждение:')
    		.setColor("#ee83ac")
    		.setDescription(`Пользователь ${member.user.tag} был разбанен (по ID) модератором ${message.author.tag}`)
    		.setFooter(client.user.tag)
    		.setTimestamp();

      		message.channel.send({embed: modlog}).catch(console.error);
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
    message.channel.send(item);
   } else if(command === "hug") {
	   let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: `Использование команды: ${process.env.PREFIX}hug [@упоминание]`
}});
  	let items = ['https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
        'https://media.giphy.com/media/143v0Z4767T15e/giphy.gif',
        'https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif',
'https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif'];
    let item = items[Math.floor(Math.random()*items.length)];
    const embed = new Discord.RichEmbed()
                .setTitle(`${message.author.tag} обнял ${member.user.tag}`)
                .setImage(item)
                .setFooter(client.user.tag);
            message.channel.send({embed});
   } else if(command === "kiss") {
	   let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: `Использование команды: ${process.env.PREFIX}kiss [@упоминание]`
}});
  	let items = ['https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
        'https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif',
        'https://media.giphy.com/media/oHZPerDaubltu/giphy.gif',
'https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif'];
    let item = items[Math.floor(Math.random()*items.length)];
    const embed = new Discord.RichEmbed()
                .setTitle(`${message.author.tag} поцеловал ${member.user.tag}`)
                .setImage(item)
                .setFooter(client.user.tag);
            message.channel.send({embed});
   } else if(command === "avatar") {
		let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: `Использование команды: ${process.env.PREFIX}avatar [@упоминание]`
}});
            const embed = new Discord.RichEmbed()
                .setTitle(`Аватарка пользователя ${member.user.tag}`)
                .setImage(member.user.avatarURL)
                .setFooter(client.user.tag)
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
  description: ayy + ` У вас нету прав для доступа к этой команде.`
}});
	const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));

		const send = new Discord.RichEmbed()
            .setTitle('Проверка ссылки в статусе:')
            .setDescription(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Никто не имеет ссылки на приглашение в качестве названия игры.")
            .setFooter(client.user.tag);
		
		const okkkk = new Discord.RichEmbed()
            .setTitle('Уведомление:')
            .setDescription(`${message.author}, проверьте свои личные сообщения`)
            .setFooter(client.user.tag);
		
	message.author.send({embed: send});
		message.channel.send({embed: okkkk});
} else if(command === "invite") {
	message.channel.send(`Ссылка на приглашение бота: https://discordapp.com/oauth2/authorize?client_id=455607886710571008&scope=bot&permissions=136`);
	} else {
	client.channels.get("455824800154255370").send(`${message.author.tag} на сервере ${message.guild.name} ввёл неверную команду.`);
	}
});

client.login(process.env.BOT_TOKEN);
