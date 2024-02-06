import puppeteer from 'puppeteer';
import { VenomBot } from './venom.js'



// import { stages, getStage } from './stages.js'
let receivedMessages = [];
let page;
let primeiraMensagem = '';
let segundaMensagem = '';
let timerAtivo = true;
let codigoExecutado = false;
let browser;
let ultimaMensagemArmazenada = '';

const venombot = await VenomBot.getInstance().init({
    session: 'udu auto',
    headless: true,
    useChrome: false,
  });

const main = async () => {
  /* const venombot = await VenomBot.getInstance().init({
    session: 'udu auto',
    headless: true,
    useChrome: false,
  }); */

  const browser = await puppeteer.launch({
    headless: false,
  });

  // Inicializa o manipulador de mensagens fora da função main
  initializeMessageHandler(venombot, browser);



};

// Função para inicializar o manipulador de mensagens do VenomBot
const initializeMessageHandler = (venombot, browser) => {
  venombot.onMessage(async (message) => {
    receivedMessages.push(message);
   
    if (message.isGroupMsg) return;

    
      
      
    
        if (message.body.toLowerCase() === 'acessar') {
            const texto = await acessarPaginaDesejada(browser);
            console.log("Texto encontrado na página:", texto);
            venombot.sendText({ to: message.from, message: "iniciando servidor aguarde..." });
            setTimeout(async () => {
              await inserirUltimaMensagemNaPagina(page, receivedMessages);
            }, 10000);
            
            
          
           
    



async function acessarPaginaDesejada (currentBrowser, receivedMessages, initializeMessageHandler) {
  
  try {

    // Abrir uma nova página
   page = await currentBrowser.newPage();

    // URL da página desejada
    const url = 'https://uniaodosunlockers.com.br/';

    // Acessar a página
    await page.goto(url);

    // Aguarde até que o seletor específico esteja disponível na página
    await page.waitForSelector('span[style="box-sizing: border-box; font-weight: bolder;"]');

    // Extrair o texto do elemento
    const texto = await page.$eval('span[style="box-sizing: border-box; font-weight: bolder;"]', element => element.textContent);

    // Fechar o navegador após o acesso bem-sucedido
    // await browser.close();

    const firstElementHandle = await page.$('span.cursor-pointer.position-absolute');
    setTimeout(async () => {
      await firstElementHandle.click({ button: 'left' });
      
    }, 8000);

    const secondElementHandle = await page.$('body > header > div.header-middle.position-relative > div > nav > button');
    setTimeout(async () => {
      await secondElementHandle.click({ button: 'left' });
    }, 10000);

    const thirdElementHandle = await page.$('#navbarToggler1 > div > div > div.modal-header.d-block.p-2 > div > div > div > a.nav-link.flex-grow-1.nav-login.border-0');
    setTimeout(async () => {
      await thirdElementHandle.click({ button: 'left' });
      
    }, 13000);

   
    const enviarMensagem = async () => {
      await venombot.sendText({ to: message.from, message: "insira o nome de usuario" });
  };
  
  const fourthElementHandle = await page.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');
  
  setTimeout(async () => {
      await fourthElementHandle.click({ button: 'left' });
      
      // Chame a função enviarMensagem aqui dentro do setTimeout
      enviarMensagem();
      
  }, 17000);

  
    
      return texto;
    } catch (error) {
      console.error("Erro ao acessar a página:", error);
      return null;
    }
  }

  async function enviarOutraMensagem() {
    try {
        // Substitua "Mensagem a ser enviada" pela mensagem desejada
        await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "insira sua senha" });
    } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
    }
}

async function enviarOutraMensagem2() {
  try {
      // Substitua "Mensagem a ser enviada" pela mensagem desejada
      await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "login sucess" });
  } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
  }
}

async function extrairTextoDoElemento(page, selector) {
  try {
      // Aguarde até que o seletor específico esteja disponível na página
      await page.waitForSelector(selector);

      // Extrair o texto do elemento
      const texto = await page.$eval(selector, element => element.textContent);
      return texto;
  } catch (error) {
      console.error("Erro ao extrair texto do elemento:", error);
      return null;
  }
}

async function enviarOutraMensagem4() {
  try {
    const textoExtraido = await extrairTextoDoElemento(page, 'div > div > div.modal-header.d-block.p-2 > div > div:nth-child(3) > strong');
    const mensagemAntes = "*seja bem vindo*";
    const mensagemCompleta = mensagemAntes + textoExtraido;
    await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: mensagemCompleta });
await verificarMensagens()
    // Envia as opções disponíveis para o cliente após enviar a mensagem com o texto extraído
    /* await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "Escolha uma opção:\n1. Colocar crédito\n2. Fazer registro" }); */

    // Recebe a mensagem com a opção escolhida pelo cliente
    
      /* console.log("Mensagem recebida:", message.body); */ // Mostra a mensagem recebida no console
    
      // Verifica se a mensagem contém a opção escolhida pelo cliente
      

  } catch (error) {
    console.error("Erro ao enviar a mensagem:", error);
  }
}

let opcoesEnviadas = false;

async function verificarMensagens() {
  while (true) {
      // Verifica se há mensagens recebidas
      if (receivedMessages.length > 0) {
          const message = receivedMessages[receivedMessages.length - 1];
          
          if (!opcoesEnviadas) {
              await venombot.sendText({ to: message.from, message: "Escolha uma opção:\n1. Colocar crédito\n2. Fazer registro" });
              opcoesEnviadas = true;
          }
          
          if (message.body.toLowerCase() === '1') {
              console.log("Opção escolhida: Colocar crédito");
              await venombot.sendText({ to: message.from, message: "Aguarde..." });
              colocarCredito();
              break; // Sai do loop após processar a mensagem
          } else if (message.body.toLowerCase() === '2') {
              console.log("Opção escolhida: Fazer registro");
              iniciarBlocoFazerRegistro();
              break; // Sai do loop após processar a mensagem
          } else {
              console.log("Opção inválida.");
          }
          
          // Remove a mensagem processada da lista
          receivedMessages.pop();
      }

      // Aguarda um curto período antes de verificar novamente
      await new Promise(resolve => setTimeout(resolve, 1000));
  }
};



async function enviarOutraMensagem3() {
  try {
      // Substitua "Mensagem a ser enviada" pela mensagem desejada
      await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "falha no loguin" });
  } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
  }
}

  async function inserirUltimaMensagemNaPagina(page) {
    try {
        if (codigoExecutado) {
            return;
        }

        const ultimaMensagem = receivedMessages[receivedMessages.length - 1].body;
        
        if (primeiraMensagem === '') {
            primeiraMensagem = ultimaMensagem; // Armazena a primeira mensagem
        } else {
            // Verifica se a última mensagem é diferente da primeira mensagem armazenada
            if (ultimaMensagem !== primeiraMensagem) {
                // Inserir a última mensagem no primeiro elemento desejado da página
                await page.evaluate((mensagem) => {
                    const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');
                    inputElement.value = mensagem;
                }, ultimaMensagem);

                // Atualiza a segunda mensagem armazenada apenas se ainda não foi definida
                if (segundaMensagem === '') {
                    segundaMensagem = ultimaMensagem;
                }

                // Define o timer como inativo após inserir a mensagem no site
                codigoExecutado = true;

                // Envia a outra mensagem após inserir o texto no primeiro campo
                await enviarOutraMensagem();
                
            }
        }
    
    } catch (error) {
        console.error("Erro ao inserir a última mensagem na página:", error);
    }
}



async function inserirSegundaMensagemNaPagina(page) {
  try {
      const ultimaMensagem = receivedMessages[receivedMessages.length - 1].body;

      // Verifica se a última mensagem é diferente da segunda mensagem armazenada e da primeira mensagem
      if (ultimaMensagem !== segundaMensagem && ultimaMensagem !== primeiraMensagem) {
          // Inserir a última mensagem no segundo elemento desejado da página
          await page.evaluate((mensagem) => {
              const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(2) > div.input-group > input');
              inputElement.value = mensagem;
          }, ultimaMensagem);

          // Atualiza a segunda mensagem armazenada
          segundaMensagem = ultimaMensagem;
          timerAtivo = false;

          // Verifica se a página mudou
          setTimeout(async () => {
            const novaURL = page.url();
            if (novaURL === 'https://uniaodosunlockers.com.br/main/lgin/success') {
                await enviarOutraMensagem2(venombot, receivedMessages[receivedMessages.length - 1], "login sucess");
                await enviarOutraMensagem4(venombot, receivedMessages[receivedMessages.length - 1], "login sucess");
            } else {
                await enviarOutraMensagem3(venombot, receivedMessages[receivedMessages.length - 1], "falha no login");
            }
        }, 7000);
      }
  } catch (error) {
      console.error("Erro ao inserir a segunda mensagem na página:", error);
  }
}

function startTimer() {
  const timerInterval = setInterval(async () => {
      // Verifica se o timer deve continuar
      if (!timerAtivo) {
          clearInterval(timerInterval); // Para o intervalo do timer

          // Insira aqui o trecho de código que deseja executar após o timer ser desativado
          const fifthElementHandle = await page.$('button.btn.btn-primary.w-100.loginbuttons');
          setTimeout(async () => {
              await fifthElementHandle.click({ button: 'left' });
          
            }, 3000);

          return; // Sai da função
      }

      // Verifica se há uma nova mensagem
      if (receivedMessages.length > 0) {
          // Obtém a última mensagem recebida
          const ultimaMensagem = receivedMessages[receivedMessages.length - 1].body;

          // Verifica se a última mensagem é diferente da primeira mensagem armazenada
          if (ultimaMensagem !== primeiraMensagem) {
              
              // Inserir a última mensagem no primeiro campo desejado da página
              await inserirUltimaMensagemNaPagina(page);
              // Inserir a segunda mensagem no segundo campo desejado da página
              await inserirSegundaMensagemNaPagina(page);
          }
      }
  }, 1000); // Verificar a cada 1 segundo
}

// Inicia o timer
startTimer();

async function colocarCredito() {
  const primeiroElementoHandle = await page.$('div > div > div.modal-header > button');
    if (primeiroElementoHandle) {
        // Definir o tempo em milissegundos para aguardar antes do primeiro clique (por exemplo, 5000 ms = 5 segundos)
        const tempoAguardarPrimeiroClique = 5000;

        // Aguardar o tempo especificado antes de clicar no primeiro elemento
        setTimeout(async () => {
            try {
                // Clicar no primeiro elemento
                await primeiroElementoHandle.click();
                console.log("Primeiro elemento clicado com sucesso!");

                // Aguardar 5 segundos antes do segundo clique
                const tempoAguardarSegundoClique = 5000;
                setTimeout(async () => {
                    // Encontrar o segundo elemento desejado
                    const segundoElementoHandle = await page.$('body > header > div.header-middle.position-relative > div > nav > button');
                    if (segundoElementoHandle) {
                        try {
                            // Clicar no segundo elemento
                            await segundoElementoHandle.click();
                            console.log("Segundo elemento clicado com sucesso!");

                            // Aguardar 8 segundos antes do terceiro clique
                            const tempoAguardarTerceiroClique = 8000;
                            setTimeout(async () => {
                                // Encontrar o terceiro elemento desejado
                                const terceiroElementoHandle = await page.$('div > div > div.modal-body.overflow-auto.h-100.p-0 > ul > li.nav-item.dropdown.profile > div.dropdown-menu.dropdown-menu-right.my-account > a:nth-child(2)');
                                if (terceiroElementoHandle) {
                                    try {
                                        // Clicar no terceiro elemento
                                        await terceiroElementoHandle.click();
                                        console.log("Terceiro elemento clicado com sucesso!");
                                        await insertLastMessageToPage(page)
                                    } catch (error) {
                                        console.error("Erro ao clicar no terceiro elemento:", error);
                                    }
                                } else {
                                    console.error("Terceiro elemento não encontrado!");
                                }
                            }, tempoAguardarTerceiroClique);
                        } catch (error) {
                            console.error("Erro ao clicar no segundo elemento:", error);
                        }
                    } else {
                        console.error("Segundo elemento não encontrado!");
                    }
                }, tempoAguardarSegundoClique);
            } catch (error) {
                console.error("Erro ao clicar no primeiro elemento:", error);
            }
        }, tempoAguardarPrimeiroClique);
    } else {
        console.error("Primeiro elemento não encontrado!");
            }
        }



        async function insertLastMessageToPage(page) {
    try {
        // Verifica se há uma nova mensagem
        if (receivedMessages.length > 0) {
            // Obtém a última mensagem recebida
            const lastMessage = receivedMessages[receivedMessages.length - 1].body;

            // Verifica se a última mensagem é diferente da última mensagem armazenada
            if (lastMessage !== ultimaMensagemArmazenada) {
                // Inserir a última mensagem na página da web
                await page.evaluate((mensagem) => {
                    const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');
                    inputElement.value = mensagem;
                }, lastMessage);

                // Atualiza a última mensagem armazenada
                ultimaMensagemArmazenada = lastMessage;
                console.log('Última mensagem inserida na página:', lastMessage);
            }
        }
    } catch (error) {
        console.error('Erro ao inserir a última mensagem na página:', error);
    }
}
      
      


}
});
}; 




main();
