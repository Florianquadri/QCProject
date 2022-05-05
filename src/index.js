import * as d3 from 'd3';
import { retourneTabTweet } from './dataTweet.js'
//https://www.youtube.com/watch?v=T1X6qQt9ONg pour le crash
// div sur graphique et non en bas / animation / flèche détectant direction dans graphique / charte devant graphe
d3.select('body').style("background-color", "black")
//api twitter pour embedded tweet
window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

//start



d3.csv('/btc.csv')

    .then(function (data) {

        // Manipulation de données
        const tabPrixBTC = data.map((d, i) => {

            let prixArrondi = Math.round((d.PriceUSD) * 100) / 100;
            if (d.PriceUSD > 100) {
                prixArrondi = Math.round(d.PriceUSD);
            }
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

        document.getElementById('button_start').style.color = 'gold';

        const button = d3.select("#button_start");
        let scrollOuPas = false;

        button
            .style("position", "fixed")
            .style("zIndex", "1")
            .style("opacity", 1)
            .style("background-color", "black")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("border-color", "gold")
            .style("padding", "5px")
            .attr("class", "button")
            .attr("top", "0px")
            .attr("left", "0px")
            .on("mouseover", function (d) {
                d3.select(this).style("background-color", "gold");
                d3.select(this).style("border-color", "black");
                document.getElementById('button_start').style.color = 'black';
            })
            .on("mouseleave", function (d) {
                d3.select(this).style("background-color", "black");
                d3.select(this).style("border-color", "gold");
                document.getElementById('button_start').style.color = 'gold';
            })
            .on("click", (d, event) => {
                console.log("letsgo");
                const xyStart = document.getElementById('0');
                let xStart = parseFloat(xyStart.getAttribute("cx"));
                let yStart = parseFloat(xyStart.getAttribute("cy"));
                console.log("X:", xStart, "Y:", yStart)
                //je positionne le zoom sur le premier cercle (id == 0)

                //je zoom à la valeur de zoom souhaitée
                monSVG
                    .transition()
                    .duration(500)
                    .call(zoom.translateTo, xStart, yStart)
                    .transition()
                    .duration(500)
                    .call(zoom.scaleTo, 5)

                //uniquement après le click, on doit pouvoir détecter le scroll et déclencher un événement
                scrollOuPas = true;
            })

        if (scrollOuPas) {
            d3.select('body').on('scroll', function () {
                /* avancer au prochain point */
            })
        }

        const divTest = d3.select("#testDonnees");
        const monBody = d3.select("body")
        const divBouton = monBody.append("div")
            .style("position", "fixed")
            .attr("top", "0px")
            .attr("left", "50px")
            .attr("width", "500px")
            .attr("height", "30px");


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
            .attr("class", "axeX")
            .style("stroke", "gold")
            .attr("transform", "translate(0," + height + ")")
            .call(axeXDate)

        const y = groupeAAppend.append('g')
            .attr("class", "axeY")
            .style("stroke", "gold")
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
            .attr("stroke", "gold")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                //j'aimerais prendre les datas de tabPrixBTC
                .x(function (d) { return echelleDate(d3.timeParse("%Y-%m-%d")(d.date)) })
                .y(function (d) { return echellePrix(d.prix_btc) })
            )

        //cercles sur la courbe
        let Tooltip = divTest.append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .attr("width", "50px")
            .attr("height", "30px")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        let mouseover = function (event, d, i) {

            let prix = d3.select(this).attr("price")
            let srcTweet = d3.select(this).attr("linkTweet");
            let dateTweet = d3.select(this).attr("date");
            let tweetEmb = d3.select(this).attr("linkTweetEmb");
            console.log(prix)

            /*            let tweet = divTest.append("blockquote")
                       .attr("class" = "twitter-tweet")
                       .append("p")
                       .attr("lang"="en")
                       .attr("dir" = "ltr")
                       .text()
            */

            /*             twttr.widgets.load()
                        twttr.widgets.load(
                            document.getElementById("container")
                          ); */

            /*             Tooltip.attr("transform", "translate(" + d3.select(this).attr("cx") + "," + d3.select(this).attr("cy")); */

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            let dateJolie = new Date(dateTweet);
            let dateJolie2 = dateJolie.toLocaleDateString("fr", options);

            Tooltip.html(d)
                .style("left", event.pageX - 50 + "px")
                .style("top", event.pageY - 80 + "px")
                .style("opacity", 1)
                .html(dateJolie2 + "<br>" + "₿itcoin : " + prix + " Chf" /* + "<br>" + srcTweet + "<br>" + dateTweet + "<br>" + tweetEmb */)
            /* 
                        let mouseX = event.pageX;
                        let mouseY = event.pageY; */
            let mouseX = d3.select(this).attr("cx");
            let mouseY = d3.select(this).attr("cy");

            monSVG.append('g').attr("id", "img")
                .append("svg:image")
                .attr("xlink:href", srcTweet)
                .attr("width", width / 3)
                .attr("height", width / 3)
                .attr("x", whereIsMouseX(mouseX))
                .attr("y", whereIsMouseY(mouseY))
                .on('click', clickit, true);

            function clickit() {
                window.open(tweetEmb);
            }


            function whereIsMouseX(x) {
                console.log("x", x);
                console.log("width", width)
                let x2;
                if (x > (width / 2)) { x2 = parseInt(x - width / 3) }
                else if (x < (width / 2)) { x2 = parseInt(x + width / 2) }
                return x2;
            }

            function whereIsMouseY(y) {
                console.log("y", y)
                console.log("height", height)
                let y2;
                if (y > (height / 2)) { y2 = parseInt(y - height / 2) }
                else if (y < (height / 2)) { y2 = parseInt(y + height / 2) }
                return y2;
            }
        }

        let mousemove = function (event, d, i) {
            let dateTweet = d3.select(this).attr("date");
            let prix = d3.select(this).attr("price")
            let srcTweet = d3.select(this).attr("linkTweet");
            let tweetEmb = d3.select(this).attr("linkTweetEmb");


            Tooltip.html(d)
                .style("left", event.pageX - 50 + "px")
                .style("top", event.pageY - 80 + "px")
                .style("opacity", 1)
                .html("Prix BTC: " + prix + "<br>" + "Date : " + dateTweet /* + "<br>" + srcTweet + "<br>" + dateTweet + "<br>" + tweetEmb */)
        }

        let mouseleave = function (d, i) {
            Tooltip
                /*                 .style("opacity", 0) */
                .transition().duration(800).style("opacity", 0);



            d3.selectAll("#img").transition().duration(500).remove();


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
            //id permettant au zoom de se déplacer au scroll d'un point à un autre
            .attr("id", function (d, i) { return i })
            .attr("cx", function (d) { return echelleDate(d3.timeParse("%Y-%m-%d")(d.date)) })
            .attr("cy", function (d) { return echellePrix(d.prix_btc) })
            .attr("price", function (d) { return d.prix_btc })
            .attr("linkTweet", function (d) { return d.src })
            .attr("linkTweetEmb", function (d) { return d.linkTweet })
            .attr("date", function (d) { return d.date })
            .attr("r", 4)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            .on("mouseover", mouseover)
            /*             .on("mousemove", mousemove) */
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

        // Zoom
        let zoom = d3.zoom()
            .scaleExtent([1, 10])
            .extent([[0, 0], [width, height]])
            .on("zoom", handleZoom);


        /*        const resetZoom = () => {
                   if (key == "q") { monSVG.transition().duration(750).call(zoom.transform, d3.zoomIdentity.scale(1)) }
       
               } */

        const dbclick = () => {
            monSVG.transition().duration(750).call(zoom.transform, d3.zoomIdentity.scale(8));
        }


        // append zoom area and apply zoom functions
        monSVG.call(zoom)
            /* .on("keypress",resetZoom) */
            .on("dbclick.zoom", dbclick)

        d3.select('body').on("keydown", function (e) {
            console.log("keydown");
            console.log(e)
            //return "line_chart.html";

            if (e.key === "q") { // left     
                monSVG.transition().duration(750).call(zoom.transform, d3.zoomIdentity.scale(1));
            }
            else if (e.key === "ArrowRight") { // left     
                //translateTo
                console.log("droite");
                monSVG.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(100, 200));

            }
        });


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
