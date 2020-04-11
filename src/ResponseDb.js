const {SendMessage, OnTyping } = require('../TwitterDM');
const db = require('./database/db');
exports.ResponseDb  = {
    'Oi': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'oi': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'olá': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'Olá': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'Ola': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'ola': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'Oie': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
    'hey': (id, ReceivedMessage, name) => wellcome(id, ReceivedMessage, name),
        1(id){   
            SendMessage(id, '👉 Para reservar uma refeição preencha esse formulario 👆\nhttps://docs.google.com/forms/d/e/1FAIpQLSeE-7odVla00ZdWumyrxllU06Qo-ebJ67Va7y3WRbmdzoAL2w/viewform');
    },
        2(id){
            SendMessage(id, '👉 Para gerar a sua GRU acesse: \nhttp://gru.sertao.ifrs.edu.br/');
    },
        '3': async function _3(id){
            SendMessage(id, '[Essa funcionalidade ainda não está completa]');
            try{
                const  cpf  = await db('users').where('id', id).select('*');
                if(!cpf[0].cpf){
                  throw "err";
                }else{
                SendMessage(id, `seu cpf é: ${cpf[0].cpf}`)
                }
              }catch{
                SendMessage(id, 'para consultar o seus creditos você precisa usar o comando "/registrar [seu cpf]" \nna proxima vez que vc for consultar o seu cpf já estará salvo')
              }
    },
        4(id){   
            SendMessage(id, 'Para acessar ao restaurante é necessário realizar o cadastro, de segunda a sexta, das 14h às 16h, junto ao DAE. ✔️');
            setTimeout(()=>{OnTyping(id)}, 1000);
            setTimeout(()=>{SendMessage(id, 'Os discentes do ensino superior, servidores e visitantes, após a realização do cadastro, deverão proceder a emissão e o pagamento da GRU correspondente ao número de refeições que deseja adquirir. A GRU e o comprovante de pagamento deverão ser entregues ao DAE.')}, 11000);
            setTimeout(()=>{OnTyping(id)}, 12000);
            setTimeout(()=>{SendMessage(id, 'Para um adequado planejamento e organização das refeições, solicita-se que sejam feitas Reservas prévias das refeições. 📢 Também, solicita-se que todos respeitem o Regulamento do Restaurante e observem aos Avisos. 👁‍🗨')}, 20000);
    },
        '/help': function help(id){
            SendMessage(id, 'comandos:\n/registrar [seu cpf]')
    },
        '/registrar': async function Register(id, ReceivedMessage, name){
            const cpf = ReceivedMessage.split(" ")[1]
            try{
              await db('users').insert({
                id,
                cpf
              });
              SendMessage(id, `Usuario @${name} registrado \n id: ${id} \n cpf: ${cpf}`);
            }catch(error){
              SendMessage(id, `erro ao registrar\n mensagem: "${error}"\n tente novamente se o erro persistir envie um print dessa mensagem para @pedroaf0`)
            }
    },
    default(id){
      SendMessage(id, 'Não entendi 🤷🏻‍♂️')
    }
}
function wellcome(id, ReceivedMessage, name) {
    SendMessage(id, `${ReceivedMessage}! @${name} 👋`);
    setTimeout(()=>{OnTyping(id)}, 1000);
    setTimeout(()=>{SendMessage(id, 'O q vc precisa?\n1. Reservar refeição 📝 🍽\n2. Gerar GRU 💸\n3. Consultar credito 💵\n4. Como utilizar o R.U sem ser estudante? 🤷🏻‍♂️')}, 11000);
    setTimeout(()=>{OnTyping(id)}, 12000);
    setTimeout(()=>{SendMessage(id, 'Responda somente com o numero ✍️ !')}, 15000);
}