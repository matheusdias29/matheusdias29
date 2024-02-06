import { page } from './server.js';


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
                                        verificarEManejarMensagens()
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
        
        
        
          









export { colocarCredito };