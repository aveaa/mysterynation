/* Forked */

// Подключение Discord.js
const Discord = require('discord.js');
// Подключение request
const request = require("request");
// Подключение rgbcolor
const rgbcolor = require('rgbcolor');
// Подключение get-image-colors
const getImageColors = require('get-image-colors');
// Подключение util
const { inspect } = require("util");
// Подключение vm
const vm = require("vm");
// Создание нового контекста
const codeContext =  {};
vm.createContext(codeContext);
// Создание клиента Discord
const client = new Discord.Client({ autofetch: [
    'MESSAGE_CREATE',
    'MESSAGE_UPDATE',
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
]});
// Основные роли, предоставляющие некоторые права
const rule = {
    moder: "429635427746578442"
};
// Массив людей, обходящих основные права бота
const creators = ['178404926869733376'];
// Люди, которые уже обращались к боту. Используется для создания кд в 15 секунд
const commandCooldown = new Set();
// Каналы, в которых бот имеет право выполнять все команды
const botFullRights = ['429615603100286978', '440727601212817408'];
// Основные каналы
const channels = {'errs': '439803765470789652'};


// безразмерная пустота " ⃠ "


/** @namespace process.env.PREFIX */
/** @namespace process.env.BOT_TOKEN */
/** @namespace process.env.WEB_MEMORY */
/** @namespace process.env.MEMORY_AVAILABLE */
/** @namespace process.env.POSLANIYE */
/** @namespace process.env.DYNO */
/** @namespace process.env.PORT */


//Подбор формы слова в зависимости от числительного
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

//Провека, является строка числом или нет
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//Генератор случайного числа между min и max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Функция, добавляющая несколько реакций под сообщением
async function multipleReact(message, arr) {
    if (arr !== []) {
        await message.react(arr.shift()).catch(console.error).then(function () {multipleReact(message,arr).catch(console.error);});
    }
}

//Функция, возвращая обьект RichEmbed, который стилизирован под ошибку
function embed_error(text) {
    let error_emoji = client.emojis.find("name", "error");
    return new Discord.RichEmbed()
        .setTitle('Ошибка')
        .setColor('#C34E4E')
        .setFooter(message.guild.name)
        .setDescription(`${error_emoji} ${text}`);
}

//Функция, которая добавляет команду
function add_command(aliases, onlyInBotChat, message, command, args, access_type, access_params, command_function, pattern = null, description = null) {
    if (onlyInBotChat) {
        if (!botFullRights.includes(message.channel.id)) return;
    }
    if (typeof aliases !== 'object')
        return console.error('Error: command aliases aren\'n array');
    let embed;
    let error = false;
    if (!creators.includes(message.author.id))
    if (access_type === 'rules') {
        let rights_arr = [];
        let err = false;
        access_params.forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
                rights_arr.push(item);
            }
        });
        if (err === true) {
            let a = '';
            let required = 'которые требуются';
            let rigths = rights_arr.join('`, `');
            if (access_params.length === 1) {
                a = 'а';
                required = 'которое требуется';
            }
            embed = embed_error(`${message.author} (\`${message.author.tag}\`), извините, но у Вас нет прав${a} \`${rigths}\`, ${required} для выполнения данной команды\n\nЕсли Вы считаете, что это не так - обратитесь к <@421030089732653057>`);
            error = true;
        }
    } else if (access_type === 'roles') {
        if (!message.member.roles.some(r=>access_params.includes(r.id))) {
            let a = 'ни одной из ролей';
            let roles = '';
            let required = 'которые требуются';
            access_params.forEach(function (item, number, arr) {
                if (number === arr.size-2)
                roles = roles + message.guild.roles.get(item) + 'или ';
                else
                roles = roles + message.guild.roles.get(item) + ', ';
            });
            if (access_params.length === 1) {
                a = 'роли';
                required = 'которая требуется';
            }
            embed = embed_error(`${message.author} (\`${message.author.tag}\`), извините, но у Вас нет ${a} ${roles}${required} для выполнения данной команды\n\nЕсли Вы считаете, что это не так - обратитесь к <@421030089732653057>`);
            error = true;
        }
    } else if (access_type === 'creat') {
        embed = embed_error(`${message.author} (\`${message.author.tag}\`), извините, но Вы должны быть создателем бота для выполнения данной команды\n\nЕсли Вы считаете, что это не так - обратитесь к <@421030089732653057>`);
        error = true;
    }
    if (!error && pattern !== 'hid') {
        let cmd = '';
        if (pattern !== null)
            cmd = cmd + `\`${aliases[0]} ${pattern}\``;
        else
            cmd = cmd + `\`${aliases[0]}\``;

        if (description !== null)
            cmd = cmd + ` — ${description}`;
        help_commands.push(cmd);
    }
    if (!aliases.includes(command)) return;
    if (error) return message.channel.send({embed});
    if (!message.member.roles.some(r=>[rule.game_admin, rule.ban_hammer].includes(r.id)))
    if (!commandCooldown.has(message.author.id)) {
        commandCooldown.add(message.author.id);
        setTimeout(() => {
            commandCooldown.delete(message.author.id);
        }, 10000);
    } else {
        return message.channel.send('Хэй-хэй, '+message.author+', остынь! Тебе нужно немного подождать, чтоб еще раз обратится ко мне :D');
    }
    command_function();
}


String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

client.on('ready', () => {
	console.log('//------------------//');
    console.log('Бот запущен успешно.');
    console.log('- Авторизован как ' + client.user.tag);
    console.log('- Бот является участником ' + client.guilds.size + ' ' + declOfNum(client.guilds.size, ['сервера', 'серверов', 'серверов']));
    console.log('//------------------//');
    });
	client.user.setPresence({ game: { name: `по сторонам`, type: 3 } }).catch();
});

client.on("guildMemberAdd", member => {
    const embed = new Discord.RichEmbed()
        .setTitle('Приветствую тебя на нашем укромном уголочке!')
        .setColor("#3B024D")
        .setDescription("На нашем сервере ты сможешь пообщаться или найти новых друзей для совместной игры.\n" +
        "***Мы рады, что вы решили посетить нас.***\n" +
        "P.S - По всем вопросам, обращаться к модератору .\n" +
        `На данный момент на сервере **${member.guild.memberCount} ${declOfNum(member.guild.memberCount, ['человек', 'человека', 'человек'])}**\n\nhttps://discord.io/gspace/`)
        .setFooter(message.guild.name)
        .setTimestamp();
    member.send({embed});
});

client.on("message", async message => {
    //Игнорирование некоторых типов каналов
    if (['dm', 'group', 'category', 'voice'].includes(message.channel.type)) return;

    //Авто-покидание чужих серверов
    if (!['429334342188269604'].includes(message.guild.id)) {
        message.guild.leave().catch();
        return;
    }

    //Игнорирование ботов
	if(message.author.bot) return;

    //Проверка на содержания сообщением префикса, создание констант args и command
    if(message.content.indexOf(process.env.PREFIX) !== 0) return;
	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  	//Массив, содержащий в себе все команды, которые доступны пользователю
  	help_commands = [''];

  	/*----- START COMMANDS -----*/
    add_command(['скажи', 'say', 's'], false, message, command, args, 'roles', [rule.moder], function () {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        const embed = embed_error(`${message.author}, неизвестная ошибка отправки сообщения в чат`);
        let msg = message.channel.send(sayMessage).catch(()=>{message.reply({embed});});
    }, '[текст]', 'написать сообщение от имени бота');

    add_command(['очистить', 'clear', 'del', 'clr'], false, message, command, args, 'rules', ['MANAGE_MESSAGES'], function () {
        if (message.mentions.members.first()) {
            let msgs = message.channel.fetchMessages({limit:98}).then(messages => messages.filter().channel.bulkDelete(messages));

        } else {
            let content = message.content.slice(process.env.PREFIX.length + 8);
            let messagecount = parseInt(args[0]);
            let msc = messagecount;
            if (messagecount > 2 && messagecount < 99) {
                message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
                let lol = declOfNum(msc, ['сообщение', 'сообщения', 'сообщений']);
                message.channel.send(`Удалено ${msc} ${lol}!`).then(msg => {msg.delete(5000)});
                message.delete();
            } else {
                const embed = embed_error(`${message.author}, ошибка очистки сообщений, \`${content}\` либо меньше чем 2, либо больше чем 99, либо не является числом`);
                message.channel.send(embed);
            }
        }

    }, '[99 > кол-во > 2 или упоминание]', 'очистить определенное количество сообщений');

    add_command(['аватарка', 'avatar', 'av', 'ав'], false, message, command, args, 'e', null, function() {
        let member = message.mentions.members.first();
        const error = embed_error(`${message.author}, человек, у которого вы пыталисть взять аватарку не является участником сервера`);
        if (!member)
            return message.channel.send({embed: error});
        let colors = getImageColors(message.mentions.users.first().avatarURL).then(color => {
            let c = color.map(col => col.hex());
            const embed = new Discord.RichEmbed()
                .setTitle(`Аватарка пользователя ${member.user.tag}`)
                .setImage(member.user.avatarURL)
                .setFooter(message.guild.name)
                .setColor(c[0])
                .setDescription('Аватарка предоставлена по запросу '+ message.author + ' (`'+message.author.tag+'`)');
            message.channel.send({embed});
            message.delete();
        });
    }, '[пользователь]', 'отобразить аватарку пользователя');

    add_command(['remote_say', 'rs'], false, message, command, args, 'roles', [rule.moder], function () {
        if (message.channel.id = undefined) {
            const error = embed_error('Ошибка отправки сообщения.');
            return message.channel.send({error});
        }
        let new_args = args;
        const chat = new_args.shift();
        const sayMessage = new_args.join(" ");
        message.guild.channels.get(chat).send(sayMessage).catch(()=>{message.reply('ты ебобо?');});
        message.delete().catch(O_o=>{});
    }, 'hid');

    add_command(['статус', 'status', 'presence', 'пресенс'], false, message, command, args, 'creat', null, function () {
        let new_args = args;
        if (new_args[0].toLowerCase() === 'играет' && new_args[1].toLowerCase() === 'в') {
            new_args[0] = 'играет в';
            new_args.splice(1, 1);
        }
        let type = new_args.shift();
        let real_type;
        if (['играет в', 'играет', 'play', 'playing', '0'].includes(type.toLowerCase()))
            real_type = 0;
        else if (['слушает', 'hear', 'hearing', '2'].includes(type.toLowerCase()))
            real_type = 2;
        else if (['смотрит', 'watch', 'watching', '3'].includes(type.toLowerCase()))
            real_type = 3;
        else return message.channel.send(`Ошибка. Тип \`${type.replace(/` /g, "\'")}\` не существует`);
        const status = new_args.join(" ");
        client.user.setPresence({ game: { name: status, type: real_type } }).catch();
        let status_word;
        if (real_type === 0)
            status_word = 'Играет в';
        else if (real_type === 2)
            status_word = 'Слушает';
        else if (real_type === 3)
            status_word = 'Смотрит';

        const embed = new Discord.RichEmbed()
            .setTitle('Статус изменен на:')
            .setDescription(`${status_word} **${status.replace(/` /g, "\\\'")}**`)
            .setFooter(message.guild.name);
        message.channel.send({embed});
        message.delete();
    }, '[тип] [текст]', 'сменить Presence бота');
	
	add_command(['чекнуть_инвайты', 'checkinvite'], false, message, command, args, 'roles', [rule.moder], function () {
		
    const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));

		const send = new Discord.RichEmbed()
            .setTitle('Проверка ссылки в статусе:')
            .setDescription(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Никто не имеет ссылки на приглашение в качестве названия игры.")
            .setFooter(message.guild.name);
		
		const okkkk = new Discord.RichEmbed()
            .setTitle('Уведомление:')
            .setDescription(`${message.author}, проверьте свои личные сообщения`)
            .setFooter(message.guild.name);
		
	message.author.send({embed: send});
		message.channel.send({embed: okkkk});
        message.delete();
    }, '', 'узнать, у кого есть ссылка на сервер в статусе');

    add_command(['eval', 'emulate', 'terminal', 'эмулировать', 'эвал', 'терминал', 'evaluate'], false, message, command, args, 'creat', null, function () {
	    const code = args.join(" ");
        const token = client.token.split("").join("[^]{0,2}");
        const rev = client.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let output = eval(code);
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) {
                //Отправляет пользователю данные эмуляции.
                message.author.send(`\`\`\`js\n${output}\n\`\`\``);
                //Ставит реакцию (выполнено).
                message.react("✅")
            } else {
                message.author.send(`${output}`, {split:"\n", code:"js"});
            }
        } catch (error) {
            //Захватывает ошибку и говорит об этом.
            message.channel.send(`Произошла ошибка \`\`\`js\n${error}\`\`\``);
            //Ставит реакцию (Ошибка).
            message.react("❎")
        }

        function clean(text)  {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
    }, 'hid');

    add_command(['руны', 'runic', 'runic_translate', 'рунический', 'рунический_перевод'], true, message, command, args, 'e', null, function () {
        let text = args.join(" ");
        let new_text = '';
        for(let x = 0, sym=''; sym = text.charAt(x); x++) {
            if (sym !== undefined)
                switch (sym.toLowerCase()) {
                    case 'a':
                        new_text += 'ᚨ';
                        break;
                    case 'b':
                        new_text += 'ᛒ';
                        break;
                    case 'c':
                        new_text += 'ᚲ';
                        break;
                    case 'd':
                        new_text += 'ᛞ';
                        break;
                    case 'e':
                        new_text += 'ᛖ';
                        break;
                    case 'f':
                        new_text += 'ᚠ';
                        break;
                    case 'g':
                        new_text += 'ᚷ';
                        break;
                    case 'h':
                        new_text += 'ᚺ';
                        break;
                    case 'i':
                        new_text += 'ᛁ';
                        break;
                    case 'j':
                        new_text += 'ᛃ';
                        break;
                    case 'k':
                        new_text += 'ᚴ';
                        break;
                    case 'l':
                        new_text += 'ᛚ';
                        break;
                    case 'm':
                        new_text += 'ᛗ';
                        break;
                    case 'n':
                        new_text += 'ᚾ';
                        break;
                    case 'o':
                        new_text += 'ᛟ';
                        break;
                    case 'p':
                        new_text += 'ᛈ';
                        break;
                    case 'q':
                        new_text += 'ᛩ';
                        break;
                    case 'r':
                        new_text += 'ᚱ';
                        break;
                    case 's':
                        new_text += 'ᛋ';
                        break;
                    case 't':
                        new_text += 'ᛏ';
                        break;
                    case 'u':
                        new_text += 'ᚢ';
                        break;
                    case 'v':
                        new_text += 'ᚡ';
                        break;
                    case 'w':
                        new_text += 'ᚹ';
                        break;
                    case 'x':
                        new_text += 'ᛪ';
                        break;
                    case 'y':
                        new_text += 'ᚤ';
                        break;
                    case 'z':
                        new_text += 'ᛉ';
                        break;
                    case '`':
                        new_text += '\'';
                        break;
                    case undefined:
                        break;
                    default:
                        new_text += sym;
                }
        }
        const embed = new Discord.RichEmbed()
            .setTitle('📝 Транслитератор текста в рунический алфавит')
            .setDescription(`Оригинал: \` `+ text.replace(/` /g, "\'") +` \`\nРезультат: \` `+ new_text.replace(/` /g, "\'") +` \`\n\nПеревод был проведён по запросу ${message.author}`);
        message.channel.send({embed});
        message.delete();
    }, '[текст]', 'транслитерировать текст в рунический алфавит');

    add_command(['ping', 'пинг'], true, message, command, args, 'e', null, function () {
    const embed = new Discord.RichEmbed()
        .setTitle('Пинг?')
        .setColor(color);
    message.channel.send({embed}).then(m => {
        const embed_req = new Discord.RichEmbed()
            .setTitle('Понг!')
            .setDescription(`\nОсновной сервер: ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI сервер: ${Math.round(client.ping)}ms`)
            .setColor(color);
        m.edit({embed: embed_req});
    });
    }, '', 'проверка запроса на сервер');

    add_command(['думоть', 'think', 'думать'], true, message, command, args, 'e', null, function () {
        let question = args.join(' ');
        if (question.trim() === '') return;
        message.channel.send(`Думою над вопросом \` ${question.replace(/` /g, "\'")} \`, который задал ${message.author}\n\n⠀⠰⡿⠿⠛⠛⠻⠿⣷ \n` +
            '⠀⠀⠀⠀⠀⠀⣀⣄⡀⠀⠀⠀⠀⢀⣀⣀⣤⣄⣀⡀ \n' +
            '⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠛⠛⣿⣿⣿⡛⠿⠷ \n' +
            '⠀⠀⠀⠀⠀⠘⠿⠿⠋⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇ \n' +
            '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁ \n' +
            '\n' +
            '⠀⠀⠀⠀⣿⣷⣄⠀⢶⣶⣷⣶⣶⣤⣀ \n' +
            '⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠈⠙⠻⠗ \n' +
            '⠀⠀⠀⣰⣿⣿⣿⠀⠀⠀⠀⢀⣀⣠⣤⣴⣶⡄ \n' +
            '⠀⣠⣾⣿⣿⣿⣥⣶⣶⣿⣿⣿⣿⣿⠿⠿⠛⠃ \n' +
            '⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄ \n' +
            '⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁ \n' +
            '⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁ \n' +
            '⠀⠀⠛⢿⣿⣿⣿⣿⣿⣿⡿⠟ \n' +
            '⠀⠀⠀⠀⠀⠉⠉⠉');
        message.delete();
    }, '[вопрос]', 'хорошо обдумоть вопрос');

    add_command(['статистка', 'stats', 'аптайм', 'uptime'], false, message, command, args, 'creat', null, function () {
        const embed = new Discord.RichEmbed()
            .setTitle('Статистика')
            .setThumbnail(client.user.avatarURL);
        embed.addField('Пинг', client.ping, true);
        embed.addField('ОЗУ', process.env.WEB_MEMORY + 'мб / ' + process.env.MEMORY_AVAILABLE + 'мб', true);
        embed.addField('Сервер', process.env.DYNO, true);
        embed.addField('Порт', process.env.PORT, true);
        message.author.send(embed);
        message.delete();
    }, 'hid');

    add_command(['invites', 'приглашения'], false, message, command, args, 'e', null, function () {
        message.guild.fetchInvites().then(invites => {
            let invites_list = '';
            invites.filter(invite => invite.inviter.id === message.author.id).forEach((item) => {
                invites_list = invites_list + item.code + ' – ';
                if (item.temporary) {invites_list = invites_list + 'до ' + item.expiresAt + ', '} else {invites_list = invites_list + '∞ срок действия, '}
                invites_list = invites_list + ' ' + item.uses + ' ' + declOfNum(item.uses, ['использование', 'использования', 'использований']) + '\n';
            });
            const embed = new Discord.RichEmbed()
                .setTitle('Ваши ссылки-приглашения:')
                .setDescription(invites_list)
                .setFooter(message.guild.name);
            message.author.send({embed});
            message.delete();
        });
    }, '', 'увидеть свои ссылки-приглашения');
	
	add_command(['us'], false, message, command, args, 'roles', [rule.moder], function () {
        if (message.guild.members.get === undefined) {
            return message.channel.send({embed: embed_error(`Ошибка отправки сообщения`)});
        }
        let new_args = args;
        const userse = new_args.shift();
        const UsersayMessage = new_args.join(" ");
        console.log(userse);
               message.guild.members.get(userse).send(UsersayMessage);message.delete();
    }, 'hid');

    /*----- END COMMANDS -----*/

    //Команда help. Все остальные команды должны быть определены до неё.
    add_command(['help', 'h', 'he', 'hel', 'помощь', 'помощ', 'помащ', 'помащь', 'памоги', 'помаги', 'помоги', 'памаги', 'хелп', 'хэлп'], false, message, command, args, 'e', null, function () {
        let limit = 8;
        let all_pages = Math.ceil(help_commands.length/limit);
        let current_page = parseInt(args[0]);
        if (current_page > all_pages || current_page < 1 || !isNumeric(args[0]))
            current_page = 1;
        let curr_commands = help_commands.slice(1+((current_page-1)*limit), (limit+1)+((current_page-1)*limit)).join('\n');
        let all_commands = '';
        if (!botFullRights.includes(message.channel.id))
            all_commands = '***Внимание!*** В этом списке отображены команды, которые доступны в этом чате. Чтобы получить доступ ко всем командам, идите в <#418096126957453337>\n';
        let newPage = '';
        if (current_page < all_pages)
            newPage = `\n\n**Для просмотра следующей страницы напишите \`${process.env.PREFIX}${command} ${current_page+1}\`**`;

        const embed = new Discord.RichEmbed()
            .setTitle(`Помощь`)
            .setDescription(`Данные предоставлены, учитывая права ${message.member} (\`${message.author.tag}\`) в чате ${message.channel.toString()} (\`#${message.channel.name}\`)\n`+
                `${all_commands}\n\`[...]\` — обязательный параметр,\n\`<...>\` — не обязательный параметр.\n\n`+
                `${curr_commands}${newPage}`)
            .setFooter(`Страница ${current_page}/${all_pages}`)
            .setThumbnail('https://cdn.discordapp.com/attachments/416813030702055425/424645334556344342/Help.png');
        message.channel.send({embed});
    }, 'hid');

});

//Авторизация бота токеном.
client.login(process.env.BOT_TOKEN).catch(console.error);
//Защита от кражи токена.
process.env.BOT_TOKEN = process.env.POSLANIYE;
