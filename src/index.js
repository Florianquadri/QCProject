import * as d3 from 'd3';

console.log("hello");

const divTest = d3.select("#testDonnees");
//prendre colonne BQ, PriceUSD
d3.csv('/btc.csv')
    .then(function (data) {

        const tabPrixBTC = data.map((d, i) => {
            let prixArrondi = Math.round(d.PriceUSD);
            let infosSelect = { date: d.time, prix_btc: prixArrondi, marketCap: d.CapMrktCurUSD }
            return infosSelect;
        })
        //j'enlève la dernière case du tableau car le prix, non actualisé, = 0
        tabPrixBTC.pop();
        //affiche le avant-après
        console.log(data)
        console.log(tabPrixBTC)

        //1 : créer marges et taille SVG

        const margin = {
            top: 10, right: 40, bottom: 10, left: 40
        },
            width = 500 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        let monSVG = divTest.append('svg');
        /*         monSVG.call(axeYDate)
                monSVG.call(axeXPrix) */
        monSVG.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("+margin.left + "," + margin.top + ")")

        //2 : créer échelles
        const echellePrix = d3.scaleLinear()
            .domain([0, 100000])
            .range([0, height])

        const echelleDate = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width])

        //3 : creation axes

        const axeYDate = d3.axisBottom(echelleDate);
        const axeXPrix = d3.axisLeft(echellePrix);

    })
    .catch(function (err) {

    })
