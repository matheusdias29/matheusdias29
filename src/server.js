import puppeteer from 'puppeteer';
import { VenomBot } from './venom.js'
// import { stages, getStage } from './stages.js'
let receivedMessages = [];
let page;
 

const main = async () => {
  const venombot = await VenomBot.getInstance().init({
    session: 'udu auto',
    headless: true,
    useChrome: false,
  });

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
              await inserirUltimaMensagemNaPagina(page);
            }, 30000);}
           
            
    
          });

          
    
}; 


async function acessarPaginaDesejada (currentBrowser, venombot) {
  
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

   
      const fourthElementHandle = await page.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');

      setTimeout(async () => {
        await fourthElementHandle.click({ button: 'left' });
               
      }, 17000);
   
  
      return texto;
    } catch (error) {
      console.error("Erro ao acessar a página:", error);
      return null;
    }
  }



 async function inserirUltimaMensagemNaPagina(page) {
  try {
    // Obter a última mensagem recebida
    const ultimaMensagem = receivedMessages[receivedMessages.length - 1].body;

    // Inserir a última mensagem no elemento desejado da página
    await page.evaluate((mensagem) => {
      // Encontrar o elemento desejado e definir o valor da mensagem
      const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');
      inputElement.value = mensagem;
    }, ultimaMensagem);
  } catch (error) {
    console.error("Erro ao inserir a última mensagem na página:", error);
  }
}

  



main();
