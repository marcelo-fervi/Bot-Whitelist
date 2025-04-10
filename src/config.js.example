export default {
    "sql": {
        "host": "",
        "user": "",
        "password": "",
        "database": "",
        "port": 3306
    },

    "channels": {
        "welcome_channel": "", // canal de mensagem de bem vindo
        "exit_channel": "" // canal de mensagem de log de saida
    },

    "atendimento": {
        "category": "1035799140212416532", // categoria aonde a call de atendimento será criada
        "staff": "1035799111041036389" // Aqui vc coloca o id do cargo que vai poder usar o comando de atendimento
    },

    "idservidor": {
        "id": "480122179808133137", // Aqui vc coloca o id do seu discord
    },

    "connect": {
        "link": "https://cfx.re/join/", // Aqui vc coloca o link do botão do conexão
        "players": "128", // aqui vc coloca a quantidade de players que sua key do fivem suporta
        "ipvps": "127.0.0.1:30120" // aqui vc coloca o ip da sua vps / exemplo: ipdavps:30120 tem que ser nesse padrão
    },

    "automatico": {
        "authrole": "1035799124215349258", // id do cargo que a verificação vai dar ao usuario
        "automessage": "" // id do canal que vai receber em 1 em 1 hora um msg automatica
    },

    "whitelist": {
        "imageurl": "https://cdn.discordapp.com/attachments/1025959186732953651/1036356477373382767/banner-whitelist-embed.png", // Aqui vc coloca o link da imagem que vai aparecer la na allowlist
        //"channelRole": "1155988188242911382", // canal aonde será recebido o id
        "WhitelistIsOpen": true, // Coloque como "false" caso queira que a whitelist seja desabilitada
        "simultaneousWhitelist": 20, // limite de quantas whitelist podem serem feitas ao mesmo tempo
        "category": "505500854162292756", // categoria aonde o canal de whitelist será criado
        "resultApproval": "1121150826707169441", // canal aonde o resultado POSITIVO será postado
        "resultReject": "1121150859439509504", // canal aonde o resultado NEGATIVO será postado
        "staff": "1156021035011952651", // cargo necessario para aprovar / reprovar whitelists
        "channel": "1156020473960865873", // canal aonde será enviado as whitelist para serem lidas
        "waiting_role": "", // cargo que será recebido quando o membro fizer a wl (aguardado resultado da whitelist)
        "approved_role": "1135965242090848376", // cargo que será recebido quando o membro for aprovado na wl (aguardado liberação de ID ou HEX)
        "questions": [
            {
                id: '01',
                question: 'Qual o seu ID da Whitelist?',
                time: 5,
                maxLength: 256,
                isWhitelistId: true,
            },
            {
                id: '02',
                question: 'Qual o nome e sobrenome do seu personagem?\n``Lembre-se de usar nomes registráveis em cartório!``',
                time: 5,
                maxLength: 256
            },
            {
                id: '03',
                question: 'Qual a idade do seu personagem?',
                time: 5,
                maxLength: 256
            },
            {
                id: '04',
                question: 'Qual o seu nome e sobrenome na Vida Real?',
                time: 5,
                maxLength: 256
            },
            {
                id: '05',
                question: 'Qual a sua idade na Vida Real?',
                time: 5,
                maxLength: 256
            },
            {
                id: '06',
                question: 'Você concorda em seguir todas as regras e diretrizes estabelecidas pelo servidor?',
                time: 5,
                maxLength: 256
            },
            {
                id: '07',
                question: 'Você entende que a quebra das regras do servidor pode resultar em punições, incluindo banimento?',
                time: 5,
                maxLength: 256,
            },
            {
                id: '08',
                question: 'O que é Roleplay pra você?',
                time: 5,
                maxLength: 256
            },
            {
                id: '09',
                question: 'Explique o que é ter amor a vida?',
                time: 5,
                maxLength: 256
            },
            {
                id: '10',
                question: 'O que significa Power Gaming?',
                time: 5,
                maxLength: 256,
            },
            {
                id: '11',
                question: 'Como você planeja contribuir para a narrativa geral e a imersão do servidor?',
                time: 5,
                maxLength: 256,
            },
            
            {
                id: '12',
                question: 'Qual é a história de fundo do seu personagem? (*Não mate pai e mãe, sei que é chato, mas conta muito na aprovação*)',
                time: 15,
                minLength: 128,
                maxLength: 4000,
                history: true // UTILIZE SOMENTE O HISTORY: TRUE CASO SEJA REALMENTE A HISTORIA DO PERSONAGEM! SÓ PODE SER UTILIZADO 
            }
        ]
    },

    "liberation": {
        "rename": "1035799181375328276", // canal aonde será enviado o discord, id e nome do personagem para renomear o membro do discord!
        "channel": "1035799152115843092", // canal aonde o membro vai enviar hex // id para liberação
        "addRole": "1035799121182871602", // cargo que será entregue quando o ID for liberado!
        "removeRole": "1035799124215349258", // cargo que será removido quando o ID for liberado!
        "table": "whitelist",
        "column": "is_whitelisted",
        "identifier": "id"
    },

    "ticket": {
        "category": "1035799141156130877", // categoria aonde o canal de texto de ticket será criado
        "staff": "1035799111041036389", // cargo que terá acesso ao ticket
        "table": "discord", // tabela aonde ficará registrado todas as informações sobre tickets
        "categories": [
            {
                label: '📁 Suporte',
                description: 'Tickets para você tirar suas dúvidas.',
                value: 'Tirar dúvidas',
            },
            {
                label: '💎 Dúvidas Gemas',
                description: 'Tire suas dúvidas sobre nosso sistema de gemas.',
                value: 'Realizar uma Dúvidas sobre Gemas',
            },
            {
                label: '🚨 Denúncia',
                description: 'Viu algo de errado e tem como comprovar? Denúncie.',
                value: 'Realizar uma Denúncia',
            },
            {
                label: '📝 Solicitar FAC/ORG',
                description: 'Solicite a posse de uma facção ou organização.',
                value: 'Realizar uma Solicitação de FAC/ORG',
            }
        ]
    },

    "allowlistcategories": {
        "categories": [{
            label: 'Allowlist Normal',
            description: 'Enviar uma Allowlist Normal para análise.',
            emoji: '<:905497149658234930:1038291371590701117>',
            value: 'Allowlist Normal',
        }]
    },

    "suggestion": {
        "suggestionChannels": [
            "1173671214452056214"
        ]
    }
}