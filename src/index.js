import * as d3 from 'd3';

console.log("hello");
//prendre colonne BQ, PriceUSD
d3.csv('/btc.csv')

    .then(function (data) {

        const tabPrixBTC = data.map((d, i) => {
            let prixArrondi = Math.round(d.PriceUSD);
            //je reformate les variables dates
            //            let infosSelect = { date: d3.timeParse("%Y-%m-%d")(d.time), prix_btc: prixArrondi, marketCap: d.CapMrktCurUSD }
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
            top: 20, right: 50, bottom: 20, left: 50
        },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;


        const divTest = d3.select("#testDonnees");
        let monSVG = divTest.append('svg');
        /*         monSVG.call(axeYDate)
                monSVG.call(axeXPrix) */
        monSVG.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "gAAppend")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        //2 : créer échelles
        const echellePrix = d3.scaleLinear()
            .domain([0, d3.max(tabPrixBTC, function (d) { return d.prix_btc })])
            .range([height, 0])

        console.log(tabPrixBTC[tabPrixBTC.length - 1].date)

        let prixStartBTC = tabPrixBTC[0].date;
        let prixStartSepare = prixStartBTC.split('-');
        console.log(prixStartSepare)
        let prixEndBTC = tabPrixBTC[tabPrixBTC.length - 1].date;
        let prixEndSepare = prixEndBTC.split('-');

        const echelleDate = d3.scaleTime()
            //.domain(d3.extent(tabPrixBTC, function (d) { return d.date }))
            .domain(d3.extent(tabPrixBTC, function (d) { return d3.timeParse("%Y-%m-%d")(d.date)}))
            //[new Date(Number(prixStartSepare[0]), Number(prixStartSepare[1]), Number(prixStartSepare[2])), new Date(Number(prixEndSepare[0]), Number(prixEndSepare[1]), Number(prixEndSepare[2]))]
            //.domain([new Date(tabPrixBTC[0].date), new Date(tabPrixBTC[tabPrixBTC.length-1].date)])
            .range([0, width])
        //3 : creation axes

        const axeYDate = d3.axisBottom(echelleDate);
        const axeXPrix = d3.axisLeft(echellePrix);


        //append svg 
        let groupeAAppend = monSVG.select('.gAAppend');

        groupeAAppend.append('g')
            .attr("transform", "translate(0," + height + ")")
            .call(axeYDate)


        groupeAAppend.append('g')
            .call(axeXPrix);

        //ajouter la ligne

        /*         let test = d3.line().x(function (d) { return x(d.date) });
                console.log(test); */
groupeAAppend.append("path")
            .datum(tabPrixBTC)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                //j'aimerais prendre les datas de tabPrixBTC
                .x(function (d) { return echelleDate(d3.timeParse("%Y-%m-%d")(d.date)) })
                .y(function (d) { return echellePrix(d.prix_btc) })
            )

    })
    .catch(function (err) {

    })





