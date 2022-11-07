export default {
    "sql": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "",
        "database": "aréa 51",
        "port": 3306
    },

    "channels": {
        "welcome_channel": "1035799179286544404", // canal de mensagem de bem vindo
        "exit_channel": "1035799179286544404" // canal de mensagem de log de saida
    },

    "atendimento": {
        "category": "1035799140212416532", // categoria aonde a call de atendimento será criada
        "staff": "1035799111041036389" // Aqui vc coloca o id do cargo que vai poder usar o comando de atendimento
    },

    "idservidor": {
        "id": "978048527244591176", // Aqui vc coloca o id do seu discord
    },

    "connect": {
        "link": "https://cfx.re/join/4xk8yo", // Aqui vc coloca o link do botão do conexão
        "players": "2048", // aqui vc coloca a quantidade de players que sua key do fivem suporta
        "ipvps": "45.141.214.79:30120" // aqui vc coloca o ip da sua vps / exemplo: ipdavps:30120 tem que ser nesse padrão
    },

    "automatico": {
        "authrole": "1035799124215349258", // id do cargo que a verificação vai dar ao usuario
        "automessage": "1035799142171164712" // id do canal que vai receber em 1 em 1 hora um msg automatica
    },

    "whitelist": {
        "imageurl": "https://cdn.discordapp.com/attachments/1025959186732953651/1036356477373382767/banner-whitelist-embed.png", // Aqui vc coloca o link da imagem que vai aparecer la na allowlist
        "channelRole": "1035799152115843092", // canal aonde será recebido o id
        "WhitelistIsOpen": true, // Coloque como "false" caso queira que a whitelist seja desabilitada
        "simultaneousWhitelist": 20, // limite de quantas whitelist podem serem feitas ao mesmo tempo
        "category": "1035799138127851591", // categoria aonde o canal de whitelist será criado
        "result": "1035799150735925254", // canal aonde o resultado será postado
        "staff": "1035799111041036389", // cargo necessario para aprovar / reprovar whitelists
        "channel": "1035800757129195531", // canal aonde será enviado as whitelist para serem lidas
        "waiting_role": "1035799123183534150", // cargo que será recebido quando o membro fizer a wl (aguardado resultado da whitelist)
        "approved_role": "1035799122244022352", // cargo que será recebido quando o membro for aprovado na wl (aguardado liberação de ID ou HEX)
        "questions": [
            {
                id: '01',
                question: 'Nome e idade do seu personagem e seu nome e Idade (RL)\n``Lembre-se de usar nomes registráveis em cartório.``',
                time: 5,
                caracteres: 256
            },
            {
                id: '02',
                question: 'Por que você faz Roleplay?',
                time: 5,
                caracteres: 256
            },
            {
                id: '03',
                question: 'Aponte 3 qualidades e 3 defeitos do seu personagem:',
                time: 5,
                caracteres: 256
            },
            {
                id: '04',
                question: 'Pretende entrar para trabalhar no legal ou ilegal? E porque?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '05',
                question: 'Em quais situações você chamaria um Admin dentro da cidade?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '06',
                question: 'Descreva como você orientaria algum player com problemas no microfone?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '07',
                question: 'Caso precise dizer em algum momento que você está com problemas externos, como você diria isso sem quebrar a imersão de outro player?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '08',
                question: 'Cite algumas formas de como quebrar a imersão de outro player:',
                time: 5,
                caracteres: 256,
            },
            {
                id: '09',
                question: 'O que é “falar fora de rp”? Cite 2 exemplos;',
                time: 5,
                caracteres: 256,
            },
            {
                id: '10',
                question: 'O que você diria e como você agiria após alguém falar “fora de rp” com você?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '11',
                question: 'Detalhe algum motivo que te levaria a fazer alguma cobrança:',
                time: 5,
                caracteres: 256,
            },
            {
                id: '12',
                question: 'Se algum player te agredisse sem motivos, o que você faria posteriormente?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '13',
                question: 'Em uma abordagem de sequestro, como você iria colaborar com os sequestradores? E o que não se deve fazer ao ser sequestrado?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '14',
                question: 'Um policial dá voz para que você pare o veículo, mas você está armado e com drogas, como se comportaria numa abordagem dessas?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '15',
                question: 'Ao sofrer um acidente de carro e ser levado até o hospital, o que você diria ao médico sobre o que está sentindo?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '16',
                question: 'Fazer Roleplay é gerar Roleplay. Cite 2 formas de gerar Roleplay com outro player.',
                time: 5,
                caracteres: 256,
            },
            {
                id: '17',
                question: 'Qual o significado do Roleplay pra você?',
                time: 5,
                caracteres: 256,
            },
            {
                id: '18',
                question: 'Conte um pouco da história do seu personagem:',
                time: 10,
                caracteres: 4000,
                history: true // UTILIZE SOMENTE O HISTORY: TRUE CASO SEJA REALMENTE A HISTORIA DO PERSONAGEM! SÓ PODE SER UTILIZADO 
            }
        ]
    },

    "liberation": {
        "rename": "1035799181375328276", // canal aonde será enviado o discord, id e nome do personagem para renomear o membro do discord!
        "channel": "1035799152115843092", // canal aonde o membro vai enviar hex // id para liberação
        "addRole": "1035799121182871602", // cargo que será entregue quando o ID for liberado!
        "removeRole": "1035799124215349258", // cargo que será removido quando o ID for liberado!
        "table": "vrp_users",
        "column": "whitelisted",
        "identifier": "id"
    },

    "ticket": {
        "category": "1035799141156130877", // categoria aonde o canal de texto de ticket será criado
        "staff": "1035799111041036389", // cargo que terá acesso ao ticket
        "table": "discord", // tabela aonde ficará registrado todas as informações sobre tickets
        "categories": [{
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
}