import { Session } from './class/Session.js'
import { browser } from './server.js'

const users = [];
let receivedMessages = [];
let userStateMap = new Map();
// Função para inicializar o manipulador de mensagens do VenomBot
export function initializeMessageHandler(venombot) {
    
    async function assignUserToSession(userNumber)
    {
        const context = await browser.createIncognitoBrowserContext()
        const browserPage = await context.newPage()
        const userClass = new Session(browserPage, userNumber)
        users.push(userClass)
        
        await acessarPaginaDesejada(browserPage, userClass)
    }

    async function acessarPaginaDesejada(currentBrowser, userClass, browserPage) {

        try {
            // URL da página desejada
            const url = 'https://uniaodosunlockers.com.br/';

            // Acessar a página
            await currentBrowser.goto(url);

            // Aguarde até que o seletor específico esteja disponível na página
            await currentBrowser.waitForSelector('span[style="box-sizing: border-box; font-weight: bolder;"]');

            // Extrair o texto do elemento
            const texto = await currentBrowser.$eval('span[style="box-sizing: border-box; font-weight: bolder;"]', element => element.textContent);

            // Fechar o navegador após o acesso bem-sucedido
            // await browser.close();

            const closePopupHandle = await currentBrowser.$('span.cursor-pointer.position-absolute');
            setTimeout(async () => {
                await closePopupHandle.click({ button: 'left' });

            }, 8000);

            const navBarElementHandle = await currentBrowser.$('body > header > div.header-middle.position-relative > div > nav > button');
            setTimeout(async () => {
                await navBarElementHandle.click({ button: 'left' });
            }, 10000);

            const loginButton = await currentBrowser.$('#navbarToggler1 > div > div > div.modal-header.d-block.p-2 > div > div > div > a.nav-link.flex-grow-1.nav-login.border-0');
            setTimeout(async () => {
                await loginButton.click({ button: 'left' });

            }, 13000);

        async function handleLoginSet() {
                await venombot.sendText({ to: userClass.id, message: "insira o nome de usuario" });
                userClass.setLoginStep(1);
            };

           
            const userNameFieldHandle = await currentBrowser.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');

            setTimeout(async () => {
                await userNameFieldHandle.click({ button: 'left' });

                
                handleLoginSet();

            }, 17000);

            return texto;
        } catch (error) {
            console.error("Erro ao acessar a página:", error);
            return null;
        }
    }


    venombot.onMessage(async (message) => {

        receivedMessages.push(message);
        if (message.isGroupMsg) return;
            
        const userId = message.from;

        if (message.body.toLowerCase() === 'acessar') {  
            userStateMap.set(userId, true);
            await assignUserToSession(message.from);

            const texto = await acessarPaginaDesejada(browser);
            console.log("Texto encontrado na página:", texto);
            venombot.sendText({ to: message.from, message: "iniciando servidor aguarde..." });
        }

        
        const hasAccessed = userStateMap.has(userId) && userStateMap.get(userId);

        // Se o usuário não acessou, envia a mensagem de boas-vindas
        if (!hasAccessed) {
            await venombot.sendText({ to: message.from, message: "BEM VINDO AO SERVIDOR DA UDU\npara iniciar o servidor digite *acessar*" });
        }

        for(let i = 0; i < users.length; i++) 
        {
            const user = users[i]

            if(user.id === message.from)
            {
                if(user.getLoginStep() === 2)
                {
                

                    const passwordFieldHandle = await user.browserPage.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(2) > div.input-group > input')
                    setTimeout(async () => {
                        await passwordFieldHandle.type(message.body)
                    }, 3000)

                    /* if(page !== undefined) await user.browserPage.evaluate((mensagem) => {
                        const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(2) > div.input-group > input');
                        inputElement.value = mensagem;
                    }, message.body); */

                    console.log("[ LOGIN ] Senha digitada: ", message.body)

                    const fifthElementHandle = await user.browserPage.$('button.btn.btn-primary.w-100.loginbuttons');
                    setTimeout(async () => {
                        await fifthElementHandle.click({ button: 'left' });
                        
                    }, 4000);

                    


                    try {
                        await user.browserPage.waitForNavigation();
                        // Resto do seu código aqui
                    } catch (error) {
                        console.error('Erro ao esperar pela navegação:', error);
                    }

                    const novaURL = user.browserPage.url();
                    if (novaURL === 'https://uniaodosunlockers.com.br/main/lgin/success') {
                        await venombot.sendText({ to: user.id, message: "Login realizado com sucesso!" });
                       

                        setTimeout(async () => {

                            const primeiroElementoHandle = await user.browserPage.$('div > div > div.modal-header > button');
                            if (primeiroElementoHandle) {
                                await primeiroElementoHandle.click();
                                console.log('Elemento clicado com sucesso!');
                                await main();
                            } else {
                                console.log('Elemento não encontrado. Continuando...');
                                await main();
                            }

                               
                            }, 5000);
                        
                        
                        user.setLoginStep(0);
                    }
                    else {
                        await venombot.sendText({ to: user.id, message: "Falha no login..." });
                        await venombot.sendText({ to: user.id, message: "insira o nome de usuario" });
                        LG();
                        user.setLoginStep(0);
                        

                        
                        
                    }

                    async function main (){

                            const elementoPai = await user.browserPage.$('body > header > div.header-top > div > nav > div > li > a');
                            const primeiroElementoHandle2 = await user.browserPage.$('div.border.rounded.ordertheme.p-2.m-1[data-value="2"]');
                              
                            

                        setTimeout(async () => {
                            await elementoPai.hover();
                            console.log("segundo elemento clicado com sucesso!");
                            await primeiroElementoHandle2.click();
                            console.log("terceiro elemento clicado com sucesso!");

                            setTimeout(async () => {
                                const primeiroElementoHandle4 = await user.browserPage.$('div > div > div.modal-header > button');
                                await primeiroElementoHandle4.click();
                                await enviarOutraMensagem4();
                                }, 2000);

                            
                            console.log("encaminhando");
                  
                        }, 3000);

                    }
                }

                async function LG () {
                    const inputElement = await user.browserPage.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input'); // Selecione o elemento
                    await inputElement.click({ clickCount: 3 }); // Seleciona todo o texto no campo
                    await inputElement.press('Backspace');
                    
                    const inputElement2 = await user.browserPage.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(2) > div.input-group > input'); // Selecione o elemento
                    await inputElement2.click({ clickCount: 3 }); // Seleciona todo o texto no campo
                    await inputElement2.press('Backspace');
                    // Remove o texto selecionado
                    setTimeout(async () => {
                    user.setLoginStep(1);
                }, 3000);
                }

                if(user.getLoginStep() === 1)
                {
                    
                    
                    
                    const userFieldHandle = await user.browserPage.$('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)
                    }, 3000)

                    console.log("[ LOGIN ] Usuário digitado: ", message.body)

                    await venombot.sendText({ to: user.id, message: "insira sua senha" });
                    user.setLoginStep(2);
                }


                        const mensagemChave1 = "1";
                        const mensagemChave2 = "2";
                        const mensagemChave3 = "3";
                        const mensagemChave4 = "4";
                        const mensagemChave5 = "5";
                        const mensagemChave6 = "6";
                        const mensagemChave7 = "7";
                        const mensagemChave8 = "8";

                if(user.getLoginStep() === 3)
            {           
                        

                        if (message.body === mensagemChave1) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            colocarCredito();
            
                        } else if (message.body === mensagemChave4) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            iremoval();
                        
            
            
                        } else if (message.body === mensagemChave3) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            ikey();
            
                        } else if (message.body === mensagemChave2) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            HellocomSinal();
                            await venombot.sendText({ to: user.id, message: 'Escolha uma opção:\n1- Hello com Sinal iPhone 6s/6s+/SE 1a Ger - 22.73 Crédito\n2- Hello com Sinal iPhone 7/7+ - 40.4 Crédito\n3- Hello com Sinal iPhone 8/8+ - 75.75 Crédito\n4- Hello com Sinal iPhone X - 118.68 Crédito\n ----------------- \n5- Jailbreak iKey Prime 6s ao X iOS 15/16/17 - 10 Crédito\n ----------------- \n6- Jailbreak iRemoval PRO 6s ao X iOS 15/16/17 - 10 Crédito\n ----------------- \n7- Passcode iOS 15/16 iPhone 6 ao X - 45 Crédito\n ----------------- \n8- Bypass Hello Sem Sinal iPhone 6g ao X - 45 Crédito ' }) 
                            
            
                        } else if (message.body === mensagemChave5) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            unlocktool();
            
                        } else if (message.body === mensagemChave6) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            user.setPhoenixStep(1);
                               
                        } else if (message.body === mensagemChave7) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            historico();
                               
                        } else if (message.body === mensagemChave8) {
                            console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                            await venombot.sendText({ to: user.id, message: 'aguarde...' });
                            user.setLoginStep(0);
                            box();
                               
                        } else {
                            await venombot.sendText({ to: user.id, message: 'opção invalida...' });
                            console.error("A página não está definida.");
                        }
                        
                };
                
                const iniciocredito = "inicio";

                if(user.getLoginStep() === 4)
                {
                    await venombot.sendText({ to: user.id, message: 'voltando ao inicio' });
                    if (message.body === iniciocredito) {

                        user.setLoginStep(6);
                    
                    } else if (message.body !== iniciocredito) { 
                        if (user.browserPage !== undefined) await user.browserPage.evaluate((mensagem) => {
                        const inputElement = document.querySelector('#amount');
                        inputElement.value = mensagem;
                    }, message.body);

                    console.log("[ valor ] valor digitado digitado: ", message.body)

                    await venombot.sendText({ to: user.id, message: "aguarde..." });
                    
                    
            setTimeout(async () => {
                const click1 = await user.browserPage.$('#COOKIELAW > div > span');
                await click1.click({ button: 'left' });

            }, 3000);

            
            setTimeout(async () => {
                const click2 = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.container > div > div > form:nth-child(2) > div.card-app.col-lg-5.p-0.m-auto > div > div > div.d-actionbar-mobile.justify-content-between > div:nth-child(2) > button');
                await click2.click({ button: 'left' });
                setTimeout(async () => {
                await venombot.sendText({ to: user.id, message: "digite seu cpf sem pontos e traços" });
                user.setLoginStep(5);
                }, 8000);
                }, 5000);
                    }}
            
                if(user.getLoginStep() === 5)
                {
                    
                    if (message.body === iniciocredito) {
                        await venombot.sendText({ to: user.id, message: 'voltando ao inicio' });
                        user.setLoginStep(6);
                    
                    } else if (message.body !== iniciocredito) {

                    setTimeout(async () => {
                    const userFieldHandle = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.container > div > div > div.card-app > div.bg-white > div > div:nth-child(3) > div > div > table > tbody > tr > td > div > form > div.form-row > div > input')

                    await userFieldHandle.type(message.body)
                    }, 3000)

                    console.log("[ CPF ] cpf digitado: ", message.body)

                    await venombot.sendText({ to: user.id, message: "aguarde..." });

            setTimeout(async () => {
                const clique1 = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.container > div > div > div.card-app > div.bg-white > div > div:nth-child(3) > div > div > table > tbody > tr > td > div > form > input');
                await clique1.click({ button: 'left' });
                

            }, 3000);

            async function frameNavigatedHandler(frame) {
                // Obtenha a URL atual do frame navegado
                const novaURL1 = frame.url();
                console.log('Nova URL:', novaURL1);
              
                // Verifique se a URL corresponde ao que você está procurando
                if (novaURL1.startsWith('https://app.galaxpay.com.br/uniaodosunlockers/cobranca/')) {
                   
                    // Agora você pode clicar no elemento desejado
                    setTimeout(async () => {
                        await venombot.sendText({ to: user.id, message: "aguarde gerando pix copia e cola" });
                        const click1 = await frame.$('#pix > div > div.form-group.m-t-20 > div > a');
                        if (click1) {
                            await click1.click();
                            console.log('Elemento clicado com sucesso!');
                            user.setLoginStep(0)
                            await enviarpix()
                            
                            // Remova o ouvinte de evento framenavigated após o clique bem-sucedido
                            user.browserPage.removeListener('framenavigated', frameNavigatedHandler);
            
                        } else {
                            console.error('Elemento não encontrado.');
                            

                        }
                    }, 10000);                                    
                } else { 
                    setTimeout(async () => {
                    const novaURL = user.browserPage.url();
                    if (novaURL.startsWith('https://uniaodosunlockers.com.br/viewinvoice/')) {
                        user.browserPage.removeListener('framenavigated', frameNavigatedHandler);
                    await venombot.sendText({ to: user.id, message: "CPF invalido, redirecionando ao valor..." });
                    user.getLoginStep(0);
                    await user.browserPage.goto("https://uniaodosunlockers.com.br/");
                    colocarCredito();
                    console.error('CPF invalido');
                    } }, 10000); 
                    
                    
                
                    ;}
            };
                    user.browserPage.on('framenavigated', frameNavigatedHandler);
                    await user.browserPage.waitForNavigation();

                    }}

                if(user.getLoginStep() === 6)
                {
                    const mensagemChave = 'inicio';
                    if (message.body === mensagemChave) {
        
                        console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                        await user.browserPage.goto("https://uniaodosunlockers.com.br/main");
                        const primeiroElementoHandle = await user.browserPage.$('div > div > div.modal-header > button');
                    
                        setTimeout(async () => {
                        
                                // Clicar no primeiro elemento
                                await primeiroElementoHandle.click();
                                console.log("Primeiro elemento clicado com sucesso!");
                                user.setLoginStep(3);
                                console.log("encaminhando");

                            }, 4000);

                         setTimeout(async () => {
                            await user.browserPage.waitForSelector('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
    
                            const valor = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
                            const valor1 = await user.browserPage.evaluate(element => element.textContent, valor);
                            await venombot.sendText({ to: user.id, message: 'saldo: ' + valor1 });
                            await venombot.sendText({ to: user.id, message: "Escolha uma opção:\n1. *COLOCAR CRÉDITOS*\n2. *UDU FLASH TOOL*\n3. *IKEY PRIME*\n4. *IREMOVAL PRO*\n5. *ATIVAÇÃO UNLOCKTOOL*\n6. *PHOENIX FRP*\n\n  ---HISTORIOCO DE PEDIDOS---  \n\n7. *SERVIÇOS VIA IMEI | SN | ECID*\n8. *LINCEÇAS DE BOX E CREDITOS* " });
                            
                        
                        }, 1000);
                        
                        
                        // Aqui você pode prosseguir com o restante do seu código
                    } else {
                        console.error("error");
                    }


                }

                const iremoval1 = "1"
                const iremoval2 = "2"
                const iremoval3 = "3"
                const iremoval4 = "4"
                const iremoval5 = "5"

                if(user.getIremovalStep() === 1)
                {
                    console.log("[ SERVIÇO ] serviço escolhido ", message.body);

            if (message.body === iremoval1) {
                const iremovalclique2 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="52"]');
                await iremovalclique2.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'aguarde...' });
                await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                setTimeout(async () => {
                    user.setIremovalStep(2);
                    }, 3000);

            

            } else if (message.body === iremoval2) {
                
                const iremovalclique3 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="53"]');
                await iremovalclique3.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'aguarde...' });
                await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                setTimeout(async () => {
                    user.setIremovalStep(2);
                    }, 3000);


            } else if (message.body === iremoval3) {
                const iremovalclique4 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="54"]');
                await iremovalclique4.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'aguarde...' });
                await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                setTimeout(async () => {
                    user.setIremovalStep(2);
                    }, 3000);
                

            } else if (message.body === iremoval4) {
                const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="55"]');
                await iremovalclique5.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'aguarde...' });
                await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                setTimeout(async () => {
                    user.setIremovalStep(2);
                    }, 3000);
                
            } else if (message.body === iremoval5) {
                const iremovalclique6 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="56"]');
                await iremovalclique6.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'aguarde...' });
                await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                setTimeout(async () => {
                    user.setIremovalStep(2);
                    }, 3000);
                
                } else if (message.body === iniciocredito) {
                    console.log("[ PALAVRA CHAVE ] CHAVE digitado: ", message.body);
                        await user.browserPage.goto("https://uniaodosunlockers.com.br/main");
                        const primeiroElementoHandle = await user.browserPage.$('div > div > div.modal-header > button');
                    
                        setTimeout(async () => {
                        
                                // Clicar no primeiro elemento
                                await primeiroElementoHandle.click();
                                console.log("Primeiro elemento clicado com sucesso!");
                                user.setLoginStep(3);
                                console.log("encaminhando");

                            }, 4000);

                         setTimeout(async () => {
                            await user.browserPage.waitForSelector('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
    
                            const valor = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
                            const valor1 = await user.browserPage.evaluate(element => element.textContent, valor);
                            await venombot.sendText({ to: user.id, message: 'saldo: ' + valor1 });
                            await venombot.sendText({ to: user.id, message: "Escolha uma opção:\n1. *COLOCAR CRÉDITOS*\n2. *UDU FLASH TOOL*\n3. *IKEY PRIME*\n4. *IREMOVAL PRO*\n5. *ATIVAÇÃO UNLOCKTOOL*\n6. *PHOENIX FRP*\n\n  ---HISTORIOCO DE PEDIDOS---  \n\n7. *SERVIÇOS VIA IMEI | SN | ECID*\n8. *LINCEÇAS DE BOX E CREDITOS* " });
                            
                        
                        }, 1000);
                
                } 
            
            }

                

                if(user.getIremovalStep() === 2)
                {
                    const userFieldHandle = await user.browserPage.$('#imei_custom')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)
                        elementoPresente5();
                        user.setIremovalStep(0);
                        console.log("[ IMEI ] IMEI digitado: ", message.body);
                        
                        
                    }, 1000)
                    
                    

                    
                }

               

                const ikey1 = "1"
                const ikey2 = "2"
                const ikey3 = "3"
                const ikey4 = "4"
                const ikey5 = "5"
                const ikey6 = "6"
                const ikey7 = "7"
                const ikey8 = "8"


                if(user.getIkeyStep() === 1){

                    console.log("[ SERVIÇO ] serviço escolhido ", message.body);

                    if (message.body === ikey1) {
                        const ikeyclique2 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="43"]');
                        await ikeyclique2.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
        
                    
        
                    } else if (message.body === ikey2) {
                        
                        const iremovalclique3 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="44"]');
                        await iremovalclique3.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
        
        
                    } else if (message.body === ikey3) {
                        const iremovalclique4 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="45"]');
                        await iremovalclique4.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
                        
        
                    } else if (message.body === ikey4) {
                        const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="46"]');
                        await iremovalclique5.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
                        
                    } else if (message.body === ikey5) {
                        const iremovalclique6 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="47"]');
                        await iremovalclique6.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
        
                    } else if (message.body === ikey6) {
                        const iremovalclique6 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="48"]');
                        await iremovalclique6.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
        
                    } else if (message.body === ikey7) {
                        const iremovalclique6 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="49"]');
                        await iremovalclique6.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
        
                    } else if (message.body === ikey8) {
                        const iremovalclique6 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="50"]');
                        await iremovalclique6.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira o serial do aparelo.' });
                        setTimeout(async () => {
                            user.setIkeyStep(2);
                            }, 3000);
        
                    }

                }

                if(user.getIkeyStep() === 2){
                    const userFieldHandle = await user.browserPage.$('#imei_custom')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)
                        elementoPresente5();
                        user.setIkeyStep(0);
                        console.log("[ IMEI ] IMEI digitado: ", message.body);

                        
                    }, 1000)
                    
                    
                
                }

                const hello1 = "1"
                const hello2 = "2"
                const hello3 = "3"
                const hello4 = "4"
                const hello5 = "5"
                const hello6 = "6"
                const hello7 = "7"
                const hello8 = "8"

                if(user.getHelloStep() === 1){

                    console.log("[ SERVIÇO ] serviço escolhido ", message.body);

                    if (message.body === hello1) {
                        const ikeyclique2 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="2"]');
                        await ikeyclique2.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
        
                    
        
                    } else if (message.body === hello2) {
                        
                        const iremovalclique3 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="3"]');
                        await iremovalclique3.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
        
        
                    } else if (message.body === hello3) {
                        const iremovalclique4 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="4"]');
                        await iremovalclique4.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
                        
        
                    } else if (message.body === hello4) {
                        const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="5"]');
                        await iremovalclique5.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
                        
                    } else if (message.body === hello5) {
                        const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="35"]');
                        await iremovalclique5.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
                        
                    } else if (message.body === hello6) {
                        const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="37"]');
                        await iremovalclique5.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
                        
                    } else if (message.body === hello7) {
                        const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="39"]');
                        await iremovalclique5.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
                        
                    } else if (message.body === hello8) {
                        const iremovalclique5 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="41"]');
                        await iremovalclique5.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira a ECID do aparelo.' });
                        setTimeout(async () => {
                            user.setHelloStep(2);
                            }, 3000);
                        
                    }
                }

                if(user.getHelloStep() === 2){

                    const userFieldHandle = await user.browserPage.$('#imei_custom')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)
                        elementoPresente5();
                        user.setHelloStep(0);
                        console.log("[ IMEI ] IMEI digitado: ", message.body);

                        
                    }, 1000)
                    
                    

                }

                
                


                const unlock1 = "1"
                const unlock2 = "2"
                const unlock3 = "3"


                if(user.getUnlockStep() === 1){

                    if (message.body === unlock1) {
                        const ikeyclique2 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="7"]');
                        await ikeyclique2.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira seu email...' });
                        setTimeout(async () => {
                            user.setUnlockStep(2);
                            }, 3000);
        
                    
        
                    } else if (message.body === unlock2) {
                        
                        const iremovalclique3 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="8"]');
                        await iremovalclique3.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira seu email...' });
                        setTimeout(async () => {
                            user.setUnlockStep(3);
                            }, 3000);
        
        
                    } else if (message.body === unlock3) {
                        const iremovalclique4 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="9"]');
                        await iremovalclique4.click({ button: 'left' });
                        await venombot.sendText({ to: user.id, message: 'aguarde...' });
                        await venombot.sendText({ to: user.id, message: 'insira seu email...' });
                        setTimeout(async () => {
                            user.setUnlockStep(4);
                            }, 3000);
                        
        
                    }
                }

                if(user.getUnlockStep() === 2){

                    const userFieldHandle = await user.browserPage.$('#customfield27')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ EMAIL ] EMAIL digitado: ", message.body);
                        await venombot.sendText({ to: user.id, message: 'insira seu Usuario...' });
                        user.setUnlockStep(5);
                        
                    }, 3000)

                }

                if(user.getUnlockStep() === 3){

                    const userFieldHandle = await user.browserPage.$('#customfield29')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ EMAIL ] EMAIL digitado: ", message.body);
                        await venombot.sendText({ to: user.id, message: 'insira seu Usuario...' });
                        user.setUnlockStep(6);
                        
                    }, 3000)

                }

                if(user.getUnlockStep() === 4){

                    const userFieldHandle = await user.browserPage.$('#customfield31')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ EMAIL ] EMAIL digitado: ", message.body);
                        await venombot.sendText({ to: user.id, message: 'insira seu Usuario...' });
                        user.setUnlockStep(7);
                        
                    }, 3000)

                }

                if(user.getUnlockStep() === 5){

                    const userFieldHandle = await user.browserPage.$('#customfield28')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ USUARIO ] USUARIO digitado: ", message.body);
                        user.setUnlockStep(0);
                        await elementoPresente5();
                        
                    }, 3000)

                }

                if(user.getUnlockStep() === 6){

                    const userFieldHandle = await user.browserPage.$('#customfield30')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ USUARIO ] USUARIO digitado: ", message.body);
                        user.setUnlockStep(0);
                        await elementoPresente5();
                        
                    }, 3000)

                }

                if(user.getUnlockStep() === 7){

                    const userFieldHandle = await user.browserPage.$('#customfield32')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ USUARIO ] USUARIO digitado: ", message.body);
                       
                        user.setUnlockStep(0);
                        await elementoPresente5();
                        
                    }, 3000)

                }

                if(user.getPhoenixStep() === 1){

                    

                    await user.browserPage.goto("https://uniaodosunlockers.com.br/resellerplaceorder/server");
               
                    const click1 = await user.browserPage.$('#service_id_chosen');
                    setTimeout(async () => {
                    await click1.click({ button: 'left' });
                    const Phoenixclique2 = await user.browserPage.$('li.active-result.group-option[data-option-array-index="2"]');
                    await Phoenixclique2.click({ button: 'left' });

                    setTimeout(async () => {
                    const elementoNumero = await user.browserPage.$('#ctotal');
                    const numeroExtraido = await user.browserPage.evaluate(elemento => elemento.textContent, elementoNumero);

                    const numeroDaPagina = parseFloat(numeroExtraido);
                    await venombot.sendText({ to: user.id, message: `insira a quantidade de créditos\n1 crédito = ${numeroDaPagina}` });
                     }, 3000)

                    user.setPhoenixStep(2);
                     }, 2000);

                        
                        
                        
                }

                if(user.getPhoenixStep() === 2){

                    const elementoNumero = await user.browserPage.$('#ctotal');
                    const numeroExtraido = await user.browserPage.evaluate(elemento => elemento.textContent, elementoNumero);

                    const numeroDaPagina = parseFloat(numeroExtraido);
                    const numeroDoUsuario = parseFloat(message.body);


                        const userFieldHandle = await user.browserPage.$('#qnt')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ CREDITOS ] VALOR digitado: ", message.body);
                        
                        if (userFieldHandle) {
                            // Multiplica o valor da mensagem por 5.1
                            const resultadoMultiplicacao = numeroDaPagina * numeroDoUsuario;
    
                            // Envia o resultado da multiplicação para o usuário
                            await venombot.sendText({ to: user.id, message: `O valor total será: ${resultadoMultiplicacao}` });
                            await venombot.sendText({ to: user.id, message: 'insira seu Email' });
                            user.setPhoenixStep(3);
                        } else {
                            console.error("Campo não encontrado na página.");
                        }

                        
                        
                    }, 3000)

                }

                if(user.getPhoenixStep() === 3){
                    
                    const userFieldHandle = await user.browserPage.$('#customfield393')
                    setTimeout(async () => {
                        await userFieldHandle.type(message.body)

                        console.log("[ EMAIL ] EMAIL digitado: ", message.body);
                        await elementoPresente5();
                        
                    }, 3000)
            }
                

            }

            async function elementoPresente5(){ 
                
                    const cookie = await user.browserPage.$('#COOKIELAW > div > span');
                    if (cookie) {
                        await cookie.click();
                        console.log('Elemento clicado com sucesso!');
                        fazerpedido5();
                    } else {
                        console.log('Elemento não encontrado. Continuando...');
                        fazerpedido5();
                    }
                
                    // Marque a variável como true para indicar que o cookie foi clicado
                    
                
                };

                async function fazerpedido5() {
                    try{
                    const fazerpedido0 = await user.browserPage.$('#serviceDetails2 > div.row.h-100 > div.col-lg-5.placeorder-field.d-flex.col-left.flex-column.h-100 > div > div.d-actionbar-mobile.d-block > div > button');
                    setTimeout(async () => {                       
                    await fazerpedido0.click({ button: 'left' });
                    
                     setTimeout(async () => {
                     await final5();
                     }, 5000)
        
                   }, 3000)} catch (error) {
                    console.error("Erro ao enviar a mensagem:", error);
                    }};
                
                    async function final5() {
                    const relatorio = await user.browserPage.$('div.alert.addedtocart.alert-danger');
                    
                    if (relatorio) {
                        // Se o elemento estiver presente, envie uma mensagem
                        console.log('Elemento encontrado! Enviando mensagem...');
                        await venombot.sendText({ to: user.id, message: 'O usuário não tem crédito suficiente' });
                        await venombot.sendText({ to: user.id, message: 'voltando ao inicio' });
                        user.setLoginStep(3);
                        await user.browserPage.goto("https://uniaodosunlockers.com.br/main");


                        const primeiroElementoHandle = await user.browserPage.$('div > div > div.modal-header > button');
                    
                        setTimeout(async () => {
                        
                                // Clicar no primeiro elemento
                                await primeiroElementoHandle.click();
                                console.log("Primeiro elemento clicado com sucesso!");
                                 
                            }, 4000);

                        setTimeout(async () => {
                        await user.browserPage.waitForSelector('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');

                        const valor = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
                        const valor1 = await user.browserPage.evaluate(element => element.textContent, valor);
                        await venombot.sendText({ to: user.id, message: 'saldo: ' + valor1 });
                        await venombot.sendText({ to: user.id, message: "Escolha uma opção:\n1. *COLOCAR CRÉDITOS*\n2. *UDU FLASH TOOL*\n3. *IKEY PRIME*\n4. *IREMOVAL PRO*\n5. *ATIVAÇÃO UNLOCKTOOL*\n6. *PHOENIX FRP*\n\n  ---HISTORIOCO DE PEDIDOS---  \n\n7. *SERVIÇOS VIA IMEI | SN | ECID*\n8. *LINCEÇAS DE BOX E CREDITOS* " });

                    }, 1000);
                    } else {
                        // Se o elemento não estiver presente, envie outra mensagem
                        console.log('Elemento não encontrado. Enviando outra mensagem...');
                        await venombot.sendText({ to: user.id, message: 'solicitação feita com sucesso...\n verifique o status no historico.' });
                        await venombot.sendText({ to: user.id, message: 'voltando ao inicio' });
                        user.setLoginStep(3);
                        await user.browserPage.goto("https://uniaodosunlockers.com.br/main");

                        const primeiroElementoHandle = await user.browserPage.$('div > div > div.modal-header > button');
                    
                        setTimeout(async () => {
                        
                                // Clicar no primeiro elemento
                                await primeiroElementoHandle.click();
                                console.log("Primeiro elemento clicado com sucesso!");
                                 
                            }, 4000);
                        
                            setTimeout(async () => {
                                await user.browserPage.waitForSelector('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
        
                                const valor = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
                                const valor1 = await user.browserPage.evaluate(element => element.textContent, valor);
                                await venombot.sendText({ to: user.id, message: 'saldo: ' + valor1 });
                                await venombot.sendText({ to: user.id, message: "Escolha uma opção:\n1. *COLOCAR CRÉDITOS*\n2. *UDU FLASH TOOL*\n3. *IKEY PRIME*\n4. *IREMOVAL PRO*\n5. *ATIVAÇÃO UNLOCKTOOL*\n6. *PHOENIX FRP*\n\n  ---HISTORIOCO DE PEDIDOS---  \n\n7. *SERVIÇOS VIA IMEI | SN | ECID*\n8. *LINCEÇAS DE BOX E CREDITOS* " });
        
                            }, 1000);
                    
                    }};

            async function enviarpix() {

                await user.browserPage.waitForSelector('body > div > div > div.col-reset-ambos.w-clearfix.w-col.w-col-7.w-col-stack > div.bloco-qr > div.row-qr.w-row > div.col-reset-ambos.centalizar.w-col.w-col-6.w-col-small-small-stack > div.t1.codeigo-tx.oculto-desktop');
                const textoElemento = await user.browserPage.$('body > div > div > div.col-reset-ambos.w-clearfix.w-col.w-col-7.w-col-stack > div.bloco-qr > div.row-qr.w-row > div.col-reset-ambos.centalizar.w-col.w-col-6.w-col-small-small-stack > div.t1.codeigo-tx.oculto-desktop');
                const qrcode = await user.browserPage.evaluate(element => element.textContent, textoElemento);
                await venombot.sendText({ to: user.id, message: qrcode });
                await venombot.sendText({ to: user.id, message: "digite *inicio* após finalizar o pagemento" });
                user.setLoginStep(6);

            }

            async function enviarOutraMensagem4() {
                try {

                   
                    

                    await user.browserPage.waitForSelector('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
                    const valor = await user.browserPage.$('body > div.bg-gray > div > div:nth-child(3) > div.client-area > div > div > div > div > div.row > div.col-lg-8.mb-4.bottom-space > div.row > div.col-md-6.col-left > div > div.d-row > h4 > span.counter');
                    const valor1 = await user.browserPage.evaluate(element => element.textContent, valor);

                    await user.browserPage.waitForSelector('div > div > div.modal-header.d-block.p-2 > div > div:nth-child(3) > strong');
                    const textoElemento = await user.browserPage.$('div > div > div.modal-header.d-block.p-2 > div > div:nth-child(3) > strong');
                    const textoExtraido = await user.browserPage.evaluate(element => element.textContent, textoElemento);
                    const mensagemAntes = "*Seja bem-vindo*: ";
                    const mensagemCompleta = mensagemAntes + '\n' + textoExtraido + '\n' +' saldo: ' + valor1 ;
                    await venombot.sendText({ to: user.id, message: mensagemCompleta });
                    await venombot.sendText({ to: user.id, message: "Escolha uma opção:\n1. *COLOCAR CRÉDITOS*\n2. *UDU FLASH TOOL*\n3. *IKEY PRIME*\n4. *IREMOVAL PRO*\n5. *ATIVAÇÃO UNLOCKTOOL*\n6. *PHOENIX FRP*\n\n  ---HISTORIOCO DE PEDIDOS---  \n\n7. *SERVIÇOS VIA IMEI | SN | ECID*\n8. *LINCEÇAS DE BOX E CREDITOS* " });
                    user.setLoginStep(3);
                    // Envia as opções disponíveis para o cliente após enviar a mensagem com o texto extraído
                      
    
    
    
                } catch (error) {
                    console.error("Erro ao enviar a mensagem:", error);
                }
            }
        
            async function colocarCredito() {
                setTimeout(async () => {
                    const firstElementHandle1 = await user.browserPage.$('body > header > div.header-middle.position-relative > div > nav > button');
                    await firstElementHandle1.click({ button: 'left' });
            
                }, 2000);
            
                setTimeout(async () => {
                    const secondElementHandle1 = await user.browserPage.$('#navbarToggler1 > div > div > div.modal-body.overflow-auto.h-100.p-0 > ul > li.nav-item.dropdown.profile > div.dropdown-menu.dropdown-menu-right.my-account > a:nth-child(2)');
                    await secondElementHandle1.click({ button: 'left' });
                    await venombot.sendText({ to: user.id, message: "digite o valor que vai depoisitar\nou digite *inicio* para voltar" });
                    user.setLoginStep(4);
                }, 3000);
            
            }
                           
            async function iremoval() {
            
                await user.browserPage.goto("https://uniaodosunlockers.com.br/resellerplaceorder/imei");
               
                const click1 = await user.browserPage.$('#service_id_chosen');
                setTimeout(async () => {
                await click1.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'Escolha uma opção:\n1- iOS 15/16 iPhone 8  /  8 Plus - *135* Crédito\n2- iOS 15/16 iPhone X - *180* Crédito\n3- iOS 15 iPads Celular - *97* Crédito\n4- iOS 15 iPhone 6S / 6S+ / SE 1st Gen (A1723) - *58* Crédito\n5- iOS 15 iPhone 7 / 7 Plus - *97* Crédito ' }) 
                user.setIremovalStep(1);        
                }, 2000);
            }
             
            async function ikey() {

                await user.browserPage.goto("https://uniaodosunlockers.com.br/resellerplaceorder/imei");
               
                const click1 = await user.browserPage.$('#service_id_chosen');
                setTimeout(async () => {
                await click1.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'Escolha uma opção:\n1- iPads 2017 a 2019 Com rede [SOMENTE IPAD COM CHIP] - 119 Crédito\n2- iPads entre 2013 e 2016 Com rede [SOMENTE IPAD COM CHIP] - 69 Crédito\n3- iPhone 5s | Meid & GSM Bypass Com Sinal - 32 Crédito\n4- iPhone 6/6+ | Meid & GSM Bypass Com Sinal - 59 Crédito\n5- iPhone 6s/6s+/SE | iOS 15/16 - 74 Crédito\n6- iPhone 7/7+ | iOS 15/16 - 110 Crédito\n7- iPhone 8/8+ | iOS 15/16 - 145 Crédito\n8- iPhone X | iOS 15/16 - 172 Crédito ' })                        
                user.setIkeyStep(1);
            }, 2000);

            }

            async function HellocomSinal() {

                await user.browserPage.goto("https://uniaodosunlockers.com.br/resellerplaceorder/imei");
               
                const click1 = await user.browserPage.$('#service_id_chosen');
                setTimeout(async () => {
                await click1.click({ button: 'left' });
                user.setHelloStep(1);
            }, 2000);

            }
            
            async function unlocktool() {

                await user.browserPage.goto("https://uniaodosunlockers.com.br/resellerplaceorder/server");
               
                const click1 = await user.browserPage.$('#service_id_chosen');
                setTimeout(async () => {
                await click1.click({ button: 'left' });
                await venombot.sendText({ to: user.id, message: 'Escolha uma opção:\n1- Ativação 1 ano / Renovação - 230 Crédito\n2- Ativação 3 meses / Renovação - 100 Crédito\n3- Ativação 6 meses / Renovação - 155 Crédito ' })               
                user.setUnlockStep(1);
            }, 2000);

            }

            async function historico() {
                await user.browserPage.goto("https://uniaodosunlockers.com.br/orders/imei/status/all");

                
                const orders = await user.browserPage.$$('tr.status4, tr.status3'); // Seleciona todos os elementos <tr> com a classe status3

// Array para armazenar as informações das 5 primeiras orderid
const firstFiveOrdersInfo = [];

// Loop pelas ordens e extrair as informações
for (let i = 0; i < orders.length && firstFiveOrdersInfo.length < 5; i++) {
    const order = orders[i];
    const orderIdElement = await order.$('td.col-orderid input[type="hidden');
    const orderId = await (await orderIdElement.getProperty('value')).jsonValue();

    const orderStatusElement = await order.$('td:nth-child(2) > div');
    const orderStatus = await (await orderStatusElement.getProperty('textContent')).jsonValue();

    const serviceNameElement = await order.$('td:nth-child(3) > div > a');
    const serviceName = await (await serviceNameElement.getProperty('textContent')).jsonValue();

    const creditElement = await order.$('td.col-credit > div');
    const credit = await (await creditElement.getProperty('textContent')).jsonValue();

    const dateElement = await order.$('td.col-date.nowrap > div');
    const date = await (await dateElement.getProperty('textContent')).jsonValue();

    const ecidElement = await order.$('td:nth-child(6)');
    const ecid = await (await ecidElement.getProperty('textContent')).jsonValue();

    const statuselement = await order.$('td:nth-child(7)');
    const status = await (await statuselement.getProperty('textContent')).jsonValue();

    // Adiciona as informações da ordem ao array
    const orderInfo = {
        orderId: orderId,
        orderStatus: orderStatus.trim(),
        serviceName: serviceName.trim(),
        credit: credit.trim(),
        date: date.trim(),
        ecid: ecid.trim(),
        status: status.trim(),

    };

    firstFiveOrdersInfo.push(orderInfo);
}

// Constrói a mensagem a ser enviada para o usuário
let message = 'As informações das primeiras 5 ordens:\n';
for (const orderInfo of firstFiveOrdersInfo) {
    const statusWithAsterisks = `*${orderInfo.orderStatus.trim()}*`;
    message += `
Order ID: ${orderInfo.orderId}
Status: ${statusWithAsterisks}
Service Name: ${orderInfo.serviceName}
Credit: ${orderInfo.credit}
Date: ${orderInfo.date}
ECID | SN | IMEI: ${orderInfo.ecid}
STATUS: ${orderInfo.status}\n`;
};

// Envie a mensagem para o usuário
await venombot.sendText({ to: user.id, message: message });
await venombot.sendText({ to: user.id, message: "digite *inicio* para voltar..." });
user.setLoginStep(6);
            }

            async function box() {
                
                await user.browserPage.goto("https://uniaodosunlockers.com.br/orders/action/newserver/status/all");

                setTimeout(async () => {

                    const tbody = await user.browserPage.$('tbody');

                    if (tbody) {
                        const orders = await tbody.$$('tr.status3, tr.status4');
                    
                        const firstFiveOrdersInfo = [];
                    
                        for (let i = 0; i < orders.length && firstFiveOrdersInfo.length < 5; i++) {
                            const order = orders[i];
                    
                            const orderIdElement = await order.$('.col-orderid input[type="hidden"]');
                            const orderId = await (await orderIdElement.getProperty('value')).jsonValue();
                    
                            const orderStatusElement = await order.$('.order-status span');
                            const orderStatus = await (await orderStatusElement.getProperty('textContent')).jsonValue();
                    
                            const orderServiceElement = await order.$('td:nth-child(3) div');
                            const orderService = await (await orderServiceElement.getProperty('textContent')).jsonValue();
                    
                            const orderCreditElement = await order.$('.col-credit div');
                            const orderCredit = await (await orderCreditElement.getProperty('textContent')).jsonValue();
                    
                            const orderDateElement = await order.$('.col-date div');
                            const orderDate = await (await orderDateElement.getProperty('textContent')).jsonValue();
                    
                            const orderInfo = {
                                orderId: orderId,
                                orderStatus: orderStatus.trim(), // Remove espaços extras
                                orderService: orderService.trim(), // Remove espaços extras
                                orderCredit: orderCredit.trim(), // Remove espaços extras
                                orderDate: orderDate.trim(), // Remove espaços extras
                            };
                    
                            firstFiveOrdersInfo.push(orderInfo);
                        }

                    // Preparando as informações para envio
                    let message = 'As informações das primeiras 5 ordens:\n';

                    for (const orderInfo of firstFiveOrdersInfo) {
                        const statusWithAsterisks = `*${orderInfo.orderStatus.trim()}*`;
                        message += `
                Order ID: ${orderInfo.orderId}
                Status do Serviço: *${statusWithAsterisks}*
                Serviço: ${orderInfo.orderService}
                Crédito: ${orderInfo.orderCredit}
                Data: ${orderInfo.orderDate}
                \n`;
                    }

                    // Enviando a mensagem para o usuário
                    await venombot.sendText({ to: user.id, message: message });
                    await venombot.sendText({ to: user.id, message: "digite *inicio* para voltar..." });
                    user.setLoginStep(6);
                    

                    
                } }, 2000);
            }
          
        }
    });

    

};