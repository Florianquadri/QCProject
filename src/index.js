import * as d3 from 'd3';

console.log("hello");

const divTest = d3.select("#testDonnees");
//prendre colonne BQ, PriceUSD
d3.csv('/btc.csv')
.then(function (data) {

 const tabPrixBTC = data.map((d,i) => {
     let prixArrondi = Math.round(d.PriceUSD);
     let infosSelect = {date: d.time, prix_btc : prixArrondi, marketCap: d.CapMrktCurUSD}
    return infosSelect;
}) 
//j'enlève la dernière case du tableau car le prix, non actualisé, = 0
tabPrixBTC.pop();
//affiche le avant-après
console.log(data)
console.log(tabPrixBTC)
})
.catch (function (err) {

})
console.log("oyuyou")