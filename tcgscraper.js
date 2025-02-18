// ==UserScript==
// @name         TGC Order Scraper
// @namespace    http://tampermonkey.net/
// @version      2025-02-06
// @description  Scrape order info from TCGPlayer Order History
// @author       Dan Sztanga
// @match        https://store.tcgplayer.com/myaccount/orderhistory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tcgplayer.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const orders = [...document.getElementsByClassName("orderWrap")];

    const ordersHTML = [...document.getElementsByClassName("orderWrap")].map(e => ({
        orderDate: e.querySelector('span[data-aid="spn-sellerorderwidget-orderdate"]').innerText,
        orderNumber: e.querySelectorAll('.orderTitle')[2].parentElement.innerText.replace('ORDER NUMBER\n', ''),
        cardName: e.querySelectorAll('.orderHistoryItems')[1].innerText.replace(/\n.*/, ''),
        setName: e.querySelectorAll('.orderHistoryItems')[1].innerText.replace(/.*\n/, ''),
        cardQty: e.querySelector('td.orderHistoryQuantity').innerText,
        priceEach: e.querySelector('td.orderHistoryPrice').innerText,
        priceTotal: '',
        oderShipping: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[2].innerText.replace('Shipping:\t', ''),
        orderTax: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[3].innerText.replace(/Sales Tax \([A-Za-z][A-Za-z]\):\t/, ''),
        cardCond: e.querySelector('td.orderHistoryDetail').innerText.replace(/.*\nCondition: /, ''),
        cardFinish: e.querySelector('td.orderHistoryDetail').innerText.includes('Foil') ? 'foil' : 'non-foil',
        orderTotal: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[4].innerText.replace('Total:\t', '')
    }));
    
    console.log(orders);
    console.log(ordersHTML);

})();

