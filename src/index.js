import * as d3 from 'd3';
import { retourneTabTweet } from './dataTweet.js'
//https://www.youtube.com/watch?v=T1X6qQt9ONg pour le crash


d3.csv('/btc.csv')

    .then(function (data) {

        // Manipulation de données
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
            .domain(d3.extent(tabPrixBTC, function (d) { return d3.timeParse("%Y-%m-%d")(d.date) }))
            .range([0, width])


        //3 : creation axes
        const axeXDate = d3.axisBottom(echelleDate);
        const axeYPrix = d3.axisLeft(echellePrix);


        //append svg 
        const groupeAAppend = monSVG.select('.gAAppend');

        const x = groupeAAppend.append('g')
            .attr("transform", "translate(0," + height + ")")
            .call(axeXDate)

        const y = groupeAAppend.append('g')
            .call(axeYPrix);

        // let brush = d3.brush()
        //     .on('brush', handleBrush);
        //
        // let brushExtent;
        //
        // function handleBrush(e) {
        //
        //     brushExtent = e.selection();
        // }
        //
        // monSVG.call(brush);

        // var clip = monSVG.append("defs").append("svg:clipPath")
        //     .attr("id", "clip")
        //     .append("svg:rect")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .attr("x", 0)
        //     .attr("y", 0);

        //ajouter la ligne
        const groupePath = groupeAAppend.append("g").attr("class", "chart")


        groupePath.append("defs")
            .append("svg:clipPath")
            .attr("id", "mask")
            .append("svg:rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", height)
            .attr("width", width)


        let masked = groupePath
            .append("g")
            .attr("clip-path", "url(#mask)")
            .append("g")
            .attr("class", "line");


        masked.append("path")
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
            let tweetEmb = d3.select(this).attr("linkTweetEmb");
            console.log(prix)

            Tooltip.html(d)
                .style("left", d3.select(this).attr("cx") + "px")
                .style("top", d3.select(this).attr("cy") + "px")
                .style("opacity", 1)
                .html("Prix bitcoin: " + prix + "<br>" + srcTweet + "<br>" + dateTweet + "<br>" + tweetEmb)

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
            let tweetEmb = d3.select(this).attr("linkTweetEmb");


            Tooltip
                .html("Prix bitcoin: " + prix + "<br>" + srcTweet + "<br>" + dateTweet + "<br>" + tweetEmb)
                .style("left", (d3.pointer(this)[0] + 70) + "px")
                .style("top", (d3.pointer(this)[1]) + "px")
        }

        let mouseleave = function (d, i) {
            Tooltip
                .style("opacity", 0)

            d3.select("#img").remove();
        }

        //test avec tableau de tweet --> il faudra que ce soit dans doc CSV à appeler
        let dataTweet = retourneTabTweet();
        //tableau de données des tweets final, créé en cherchant les dates identiques aux données du tabPrixBTC et du tab des tweets

        let datasTweetFinal = matcherDatesTabPrixBtcEtTabTweet(dataTweet, tabPrixBTC)
        console.log(datasTweetFinal)


        masked.append("g")
            .selectAll("dot")
            .data(datasTweetFinal)
            .enter()
            .append("circle")
            .attr("class", "myCircle")
            .attr("cx", function (d) { return echelleDate(d3.timeParse("%Y-%m-%d")(d.date)) })
            .attr("cy", function (d) { return echellePrix(d.prix_btc) })
            .attr("price", function (d) { return d.prix_btc })
            .attr("linkTweet", function (d) { return d.src })
            .attr("linkTweetEmb", function (d) { return d.linkTweet })
            .attr("date", function (d) { return d.date })
            .attr("r", 8)
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill", "white")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)


        // Zoom
        const handleZoom = (e) => {
            // Régénerer un axe à chaque fois qu'on zoom
            let newX = e.transform.rescaleX(echelleDate);
            let newY = e.transform.rescaleY(echellePrix);

            // Appeler le nouveau zoom
            x.call(axeXDate.scale(newX));
            y.call(axeYPrix.scale(newY));

            // Zoom de la ligne + cercles
            masked.attr('transform', e.transform);
        }


        const resetZoom = () => {
            monSVG.transition().duration(750).call(zoom.transform, d3.zoomIdentity.scale(1))
        }


        // Zoom
        const zoom = d3.zoom()
            .scaleExtent([1, 10])
            .extent([[0, 0], [width, height]])
            .on("zoom", handleZoom);


        // append zoom area and apply zoom functions
        monSVG.call(zoom)
            .on("click.zoom",resetZoom)


    })
    .catch(function (err) {

    })

function matcherDatesTabPrixBtcEtTabTweet(dataTweet, tabPrixBTC) {
    let tabCroise = [];
    dataTweet.forEach((e) => {

        let found = tabPrixBTC.find(el => el.date == e.date);
        tabCroise.push({ date: found.date, prix_btc: found.prix_btc, marketCap: found.marketCap, src: e.src, linkTweet: e.linkTweet });

    })
    return tabCroise;

}

//faire zoom pour voir + détaillé (date + proche) et faire scroll pour avancer puis faire apparaître tweet
