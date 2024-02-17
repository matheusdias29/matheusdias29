import { VenomBot } from './venom.js'
import puppeteer from 'puppeteer';

import { initializeMessageHandler } from './funcoes.js'


// import { stages, getStage } from './stages.js

export const venombot = await VenomBot.getInstance().init({
    session: 'udu auto',
    headless: true,
    useChrome: false,
});

export const browser = await puppeteer.launch({
    headless: false,
});

const main = async () => {
    /* const venombot = await VenomBot.getInstance().init({
    session: 'udu auto',
    headless: true,
    useChrome: false,
    }); */



    // Inicializa o manipulador de mensagens fora da função main
    initializeMessageHandler(venombot);
};

main();