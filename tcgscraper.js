// ==UserScript==
// @name         TGC Order Scraper
// @namespace    http://tampermonkey.net/
// @version      2025-02-17
// @description  Scrape order info from TCGPlayer Order History
// @author       Dan Sztanga
// @match        https://store.tcgplayer.com/myaccount/orderhistory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tcgplayer.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //loop through oderWrap elements to pull general order info into object
    const ordersHTML = [...document.getElementsByClassName("orderWrap")].map(e => {
        let orderData = {
            orderDate: e.querySelector('span[data-aid="spn-sellerorderwidget-orderdate"]').innerText,
            orderNumber: e.querySelectorAll('.orderTitle')[2].parentElement.innerText.replace('ORDER NUMBER\n', ''),
            cardSeller: e.querySelector('span[data-aid="spn-sellerorderwidget-vendorname"]').innerText.replace('\n', ''),
            subTotal: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[1].innerText.replace('Subtotal:\t', ''),
            orderShipping: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[2].innerText.replace('Shipping:\t', ''),
            orderTax: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[3].innerText.replace(/Sales Tax \([A-Za-z][A-Za-z]\):\t/, ''),
            orderTotal: e.querySelectorAll('table[data-aid="tbl-sellerorderwidget-productsinorder"] > tbody tr')[4].innerText.replace('Total:\t', ''),
            orderCards: []
        };
        //loop through HTML table elements in each orderWrap to scrape card info into array
        orderData.orderCards = [...e.querySelectorAll("table.orderTable > tbody tr")].map(j => ({
            cardName: j.querySelector('.orderHistoryItems').innerText.replace(/\n.*/, ''),
            setName: j.querySelector('.orderHistoryItems').innerText.replace(/.*\n/, ''),
            cardQty: j.querySelector('td.orderHistoryQuantity').innerText,
            priceEach: j.querySelector('td.orderHistoryPrice').innerText,
            cardCond: e.querySelector('td.orderHistoryDetail').innerText.replace(/.*\nCondition: /, ''),
            cardFinish: e.querySelector('td.orderHistoryDetail').innerText.includes('Foil') ? 'Foil' : 'Non-foil'
        }));
        return orderData;
    });

    console.log(ordersHTML);
})();