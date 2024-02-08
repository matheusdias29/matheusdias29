let receivedMessages = [];
let page;
let loginStep;
let opcoesEnviadas = false;

// Função para inicializar o manipulador de mensagens do VenomBot
export function initializeMessageHandler(venombot, browser) {
    venombot.onMessage(async (message) => {
        receivedMessages.push(message);

        if (message.isGroupMsg) return;

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
                        const tempoAguardarSegundoClique = 3000;
                        setTimeout(async () => {
                            // Encontrar o segundo elemento desejado
                            const segundoElementoHandle = await page.$('body > header > div.header-middle.position-relative > div > nav > button');
                            if (segundoElementoHandle) {
                                try {
                                    // Clicar no segundo elemento
                                    await segundoElementoHandle.click();
                                    console.log("Segundo elemento clicado com sucesso!");

                                    // Aguardar 8 segundos antes do terceiro clique
                                    const tempoAguardarTerceiroClique = 4000;
                                    setTimeout(async () => {
                                        // Encontrar o terceiro elemento desejado
                                        const terceiroElementoHandle = await page.$('div > div > div.modal-body.overflow-auto.h-100.p-0 > ul > li.nav-item.dropdown.profile > div.dropdown-menu.dropdown-menu-right.my-account > a:nth-child(2)');
                                        if (terceiroElementoHandle) {
                                            try {
                                                // Clicar no terceiro elemento
                                                await terceiroElementoHandle.click();
                                                console.log("Terceiro elemento clicado com sucesso!");
                                                await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "qual valor quer depositar?" });
                                                loginStep = 3
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
                  



            } catch (error) {
                console.error("Erro ao enviar a mensagem:", error);
            }
        }

        async function extrairqrtext(page, selector) {
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

        async function enviarpix() {
            try {
                const qrcodetext = await extrairqrtext(page, 'body > div > div > div.col-reset-ambos.w-clearfix.w-col.w-col-7.w-col-stack > div.bloco-qr > div.row-qr.w-row > div.col-reset-ambos.centalizar.w-col.w-col-6.w-col-small-small-stack > div.t1.codeigo-tx.oculto-desktop');
                await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: qrcodetext });
                /* await verificarMensagens() */
                // Envia as opções disponíveis para o cliente após enviar a mensagem com o texto extraído
                  



            } catch (error) {
                console.error("Erro ao enviar a mensagem:", error);
            }
        }

        if(loginStep === 4)
        {
            if(page !== undefined) await page.evaluate((mensagem) => {
                const inputElement = document.querySelector('body > div.bg-gray > div > div:nth-child(3) > div.container > div > div > div.card-app > div.bg-white > div > div:nth-child(3) > div > div > table > tbody > tr > td > div > form > div.form-row > div > input');
                inputElement.value = mensagem;
            }, message.body);

            console.log("[ CPF ] cpf digitado: ", message.body)

            const oitavoElementHandle = await page.$('body > div.bg-gray > div > div:nth-child(3) > div.container > div > div > div.card-app > div.bg-white > div > div:nth-child(3) > div > div > table > tbody > tr > td > div > form > input');
            setTimeout(async () => {
                await oitavoElementHandle.click({ button: 'left' });
                await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "aguarde gerando pix copia e cola" });

            }, 3000);
            
            
            
            page.on('framenavigated', async frame => {
                // Obtenha a URL atual do frame navegado
                const novaURL1 = frame.url();
                console.log('Nova URL:', novaURL1);
            
                // Verifique se a URL corresponde ao que você está procurando
                if (novaURL1.startsWith('https://app.galaxpay.com.br/uniaodosunlockers/cobranca/')) {
                    // Agora você pode clicar no elemento desejado
                    setTimeout(async () => {
                    const elementoHandle = await frame.$('#pix > div > div.form-group.m-t-20 > div > a');
                    if (elementoHandle) {
                        await elementoHandle.click();
                        console.log('Elemento clicado com sucesso!');
                        await enviarpix()

                    } else {
                        console.error('Elemento não encontrado.');
                    }
                }, 15000);}
                });
                
                    await page.waitForNavigation();
                    
    
   
            
            
            
        }

        if(loginStep === 3)
        {
            if(page !== undefined) await page.evaluate((mensagem) => {
                const inputElement = document.querySelector('#amount');
                inputElement.value = mensagem;
            }, message.body);

            console.log("[ VALOR ] valor digitado: ", message.body)

            await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "aguarde..." });

            const sextoElementHandle = await page.$('#COOKIELAW > div > span');
            setTimeout(async () => {
                await sextoElementHandle.click({ button: 'left' });

            }, 3000);

            const setimoElementHandle = await page.$('body > div.bg-gray > div > div:nth-child(3) > div.container > div > div > form:nth-child(2) > div.card-app.col-lg-5.p-0.m-auto > div > div > div.d-actionbar-mobile.justify-content-between > div:nth-child(2) > button');
            setTimeout(async () => {
                await setimoElementHandle.click({ button: 'left' });
                await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "digite seu cpf sem pontos e traços" });

            }, 5000);
            
            loginStep = 4;
        }
        
        if(loginStep === 2)
        {
            if(page !== undefined) await page.evaluate((mensagem) => {
                const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(2) > div.input-group > input');
                inputElement.value = mensagem;
            }, message.body);

            console.log("[ LOGIN ] Senha digitada: ", message.body)

            const fifthElementHandle = await page.$('button.btn.btn-primary.w-100.loginbuttons');
            setTimeout(async () => {
                await fifthElementHandle.click({ button: 'left' });

            }, 3000);

            await page.waitForNavigation()

            
            const novaURL = page.url();
            if (novaURL === 'https://uniaodosunlockers.com.br/main/lgin/success') {
                await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "Login realizado com sucesso!" });
                await enviarOutraMensagem4() 
                loginStep = 0;
            } 
            else {
                await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "Falha no login" });
                loginStep = 1;
            }
        }
        if(loginStep === 1)
        {
            if(page !== undefined) await page.evaluate((mensagem) => {
                const inputElement = document.querySelector('div > div:nth-child(1) > div.fieldoflogin > div:nth-child(1) > div > input');
                inputElement.value = mensagem;
            }, message.body);

            console.log("[ LOGIN ] Usuário digitado: ", message.body)

            await venombot.sendText({ to: receivedMessages[receivedMessages.length - 1].from, message: "insira sua senha" });
            loginStep = 2;
        }

        if (message.body.toLowerCase() === 'acessar') {
            const texto = await acessarPaginaDesejada(browser);
            console.log("Texto encontrado na página:", texto);
            venombot.sendText({ to: message.from, message: "iniciando servidor aguarde..." });
            

            
            async function acessarPaginaDesejada(currentBrowser, receivedMessages, initializeMessageHandler) {

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
                        loginStep = 1;
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

          

            



            




        }
    });
};