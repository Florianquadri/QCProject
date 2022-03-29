import * as d3 from 'd3';
//https://www.youtube.com/watch?v=T1X6qQt9ONg pour le crash

/* import * as d4 from "https://d3js.org/d3.v4.js"; */

//24 mars 2021 tweet tesla accepte btc

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
            top: 50, right: 50, bottom: 50, left: 50
        },
            width = window.innerWidth - margin.left - margin.right,
            height = window.innerHeight - margin.top - margin.bottom;


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
            .domain(d3.extent(tabPrixBTC, function (d) { return d3.timeParse("%Y-%m-%d")(d.date) }))
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

        //cercles sur la courbe

        let Tooltip = divTest.append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .attr("width", "50px")
            .attr("height", "30px")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        let mouseover = function (d, i) {

            let prix = d3.select(this).attr("price")
            let srcTweet = d3.select(this).attr("linkTweet");
            let dateTweet = d3.select(this).attr("date");
            console.log(prix)

            Tooltip.html(d)
                .style("left", d3.select(this).attr("cx") + "px")
                .style("top", d3.select(this).attr("cy") + "px")
                .style("opacity", 1)
                .html("Prix bitcoin: " + prix + "<br>" + srcTweet + "<br>" + dateTweet)

            monSVG.append('g').attr("id", "img")
                .append("svg:image")
                .attr("xlink:href", srcTweet)
                .attr("width", 300)
                .attr("height", 300)
                .attr("x", d3.select(this).attr("cx") - 300)
                .attr("y", d3.select(this).attr("cy") - 150);
        }

        let mousemove = function (d, i) {
            let dateTweet = d3.select(this).attr("date");
            let prix = d3.select(this).attr("price")
            let srcTweet = d3.select(this).attr("linkTweet");


            Tooltip
                .html("Prix bitcoin: " + prix + "<br>" + srcTweet + "<br>" + dateTweet)
                .style("left", (d3.pointer(this)[0] + 70) + "px")
                .style("top", (d3.pointer(this)[1]) + "px")
        }

        let mouseleave = function (d, i) {
            Tooltip
                .style("opacity", 0)

            d3.select("#img").remove();
        }

        //test avec tableau de tweet --> il faudra que ce soit dans doc CSV à appeler
        let dataTweet = [
            { date: '2009-01-11', src: "/runningBitcoin.png" },
            { date: '2010-05-22', src: "/pizzaBtc.png" },
            { date: '2010-12-14', src: "/bitcoinWikipedia.png" },
            { date: '2010-07-20', src: "/anyoneusingbtc.png" },
            { date: '2011-01-14', src: "/firstArticle.png" },
            { date: '2011-05-11', src: "/pari.png" },
            { date: '2011-05-16', src: "/hype.png" },
            { date: '2011-05-17', src: "/wish.png" },
            { date: '2011-06-08', src: "/probleme1.png" },
            { date: '2011-06-19', src: "/crash1.png" },
            { date: '2011-11-20', src: "/interview.png" },
            { date: '2012-01-12', src: "/machinebtc.png" },
            { date: '2013-01-15', src: "/hope.png" },
            { date: '2013-04-03', src: "/mining.png" },
            { date: '2013-05-05', src: "/rarete.png" },
            { date: '2013-08-15', src: "/coinbasesms.png" },
            { date: '2013-10-02', src: "/probleme2.png" },
            { date: '2013-12-05', src: "/firstpaiement.png" },
            { date: '2013-12-13', src: "/everybody1.png" },
            { date: '2014-04-02', src: "/cake.png" },
            { date: '2014-04-13', src: "/eth.png" },
            { date: '2018-01-25', src: "/katyPerry.png" },//
            { date: '2018-01-25', src: "/katyPerry.png" },
            { date: '2020-09-10', src: "/jackDorsey.png" },
            { date: '2021-01-29', src: "/biobitcoin.png" },
            { date: '2021-02-01', src: "/massAdoption.png" },
            { date: '2021-03-24', src: "/tweetTeslaAcceptBtc.png" },
            { date: '2021-03-29', src: "/stillDip.png" },
            { date: '2021-05-13', src: "/teslarefusebtc.png" },
            //hyper important car il tweet à 10h42 et à 13h crash du 19 mai
            { date: '2021-05-19', src: "/teslaDiamond.png" },
            { date: '2021-09-07', src: "/salvadorStart.png" }
        ];
        //tableau de données des tweets final, créé en cherchant les dates identiques aux données du tabPrixBTC et du tab des tweets

        let datasTweetFinal = matcherDatesTabPrixBtcEtTabTweet(dataTweet, tabPrixBTC)
        console.log(datasTweetFinal)


        groupeAAppend.append("g")
            .selectAll("dot")
            .data(datasTweetFinal)
            .enter()
            .append("circle")
            .attr("class", "myCircle")
            .attr("cx", function (d) { return echelleDate(d3.timeParse("%Y-%m-%d")(d.date)) })
            .attr("cy", function (d) { return echellePrix(d.prix_btc) })
            .attr("price", function (d) { return d.prix_btc })
            .attr("linkTweet", function (d) { return d.src })
            .attr("date", function (d) { return d.date })
            .attr("r", 8)
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill", "white")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

    })
    .catch(function (err) {

    })

function matcherDatesTabPrixBtcEtTabTweet(dataTweet, tabPrixBTC) {
    let tabCroise = [];
    dataTweet.forEach((e) => {

        let found = tabPrixBTC.find(el => el.date == e.date);
        tabCroise.push({ date: found.date, prix_btc: found.prix_btc, marketCap: found.marketCap, src: e.src });

    })
    return tabCroise;

}


//faire zoom pour voir + détaillé (date + proche) et faire scroll pour avancer puis faire apparaître tweet

