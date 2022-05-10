export {retourneTabTweet}

let dataTweet = [
    { date: '2009-01-11', src: "/runningBitcoin.png", linkTweet :"https://twitter.com/halfin/status/1110302988" },
    { date: '2010-05-22', src: "/pizzaBtc.png", linkTweet:"https://twitter.com/inthepixels/status/1129926927580585989" },
    { date: '2010-07-20', src: "/anyoneusingbtc.png", linkTweet:"https://twitter.com/ehn/status/19004040071" },
    { date: '2011-01-14', src: "/firstArticle.png", linkTweet : "https://twitter.com/hackerkiba/status/25692869159297025" },
    { date: '2011-05-11', src: "/pari.png", linkTweet:"https://twitter.com/liron/status/68432019155197952" },
    { date: '2011-05-16', src: "/hype.png", linkTweet:"https://twitter.com/mikko/status/70092159142993922" },
    { date: '2011-05-17', src: "/wish.png", linkTweet:"https://twitter.com/GregSchoen/status/70261648811761665" },
    { date: '2011-06-08', src: "/probleme1.png", linkTweet:"https://twitter.com/inthepixels/status/1137347647902244865"},
    { date: '2011-06-19', src: "/crash1.png", linkTweet:"https://twitter.com/stacksmasher/status/82650010893824000" },
    { date: '2011-11-20', src: "/interview.png", linkTweet:"https://twitter.com/rogerkver/status/138251345252724737" },
    { date: '2012-01-12', src: "/machinebtc.png", linkTweet:"https://twitter.com/robpegoraro/status/157519227291566081" },
    { date: '2012-03-01', src: "/tedx.png", linkTweet:"https://twitter.com/robpegoraro/status/157519227291566081" },
    { date: '2012-06-30', src: "/btcAccepted.png", linkTweet:"https://twitter.com/auerbach/status/219067740743417857" },
    { date: '2013-01-15', src: "/hope.png", linkTweet:"https://twitter.com/Technom4ge/status/291217784086601729" },
    { date: '2013-04-03', src: "/mining.png", linkTweet:"https://twitter.com/Percival/status/319291205013864448" },
    { date: '2013-05-05', src: "/rarete.png", linkTweet:"https://twitter.com/intelliot/status/330930597671350273"},
    { date: '2013-08-15', src: "/coinbasesms.png", linkTweet:"https://twitter.com/FEhrsam/status/368103936294543361" },
    { date: '2013-10-02', src: "/probleme2.png", linkTweet:"https://twitter.com/Reuters/status/385475279172288512" },
    { date: '2013-12-05', src: "/firstpaiement.png", linkTweet:"https://twitter.com/TheScottRob/status/408706089719312384" },
    { date: '2013-12-13', src: "/everybody1.png", linkTweet:"https://twitter.com/joyce/status/411689429825097728" },
    { date: '2014-04-02', src: "/cake.png", linkTweet:"https://twitter.com/phretor/status/451319596117950465" },
    { date: '2014-04-13', src: "/eth.png", linkTweet:"https://twitter.com/bitcoinmp/status/455434880286216193" },
    { date: '2014-05-14', src: "/donations.png", linkTweet:"https://twitter.com/TheDailyShow/status/465254211379134464" },
    { date: '2015-08-24', src: "/blackmondaychina.png", linkTweet:"https://twitter.com/suttonnick/status/635916398380851200" },
    { date: '2018-01-25', src: "/katyPerry.png", linkTweet:"https://www.instagram.com/p/BeXchJzFkhJ/?utm_source=ig_web_copy_link" },
    { date: '2018-03-25', src: "/risefall.png", linkTweet:"https://twitter.com/TheEconomist/status/977987947948634114" },
    { date: '2018-08-31', src: "/useless.png", linkTweet:"https://twitter.com/TheEconomist/status/1035461520283652096" },
    { date: '2018-12-04', src: "/worthless.png", linkTweet:"https://twitter.com/Nouriel/status/1069780647231873024" },
    { date: '2019-03-29', src: "/flawsbitcoin.png", linkTweet:"https://twitter.com/TheEconomist/status/1111550390456250369" },
    { date: '2020-03-14', src: "/griddy.png", linkTweet:"https://twitter.com/PeterSchiff/status/1238677573619548162" },
    { date: '2020-09-10', src: "/jackDorsey.png", linkTweet:"https://twitter.com/Reuters/status/1304014254035677186" },
    { date: '2021-01-29', src: "/biobitcoin.png", linkTweet:"https://twitter.com/elonmusk/status/1355068728128516101" },
    { date: '2021-02-01', src: "/massAdoption.png", linkTweet:"https://twitter.com/woonomic/status/1356310219215699968" },
    { date: '2021-03-24', src: "/tweetTeslaAcceptBtc.png", linkTweet:"https://twitter.com/elonmusk/status/1374617643446063105" },
    { date: '2021-03-29', src: "/stillDip.png", linkTweet:"https://twitter.com/cz_binance/status/1376551859393949696"},
    { date: '2021-05-13', src: "/teslarefusebtc.png", linkTweet:"https://twitter.com/elonmusk/status/1392602041025843203" },
    //hyper important car il tweet à 10h42 et à 13h crash du 19 mai
    { date: '2021-05-19', src: "/teslaDiamond.png", linkTweet:"https://twitter.com/elonmusk/status/1395027147161489412" },
    { date: '2021-06-13', src: "/hopeElon.png", linkTweet:"https://twitter.com/elonmusk/status/1404132183254523905" },
    { date: '2021-09-07', src: "/salvadorStart.png", linkTweet:"https://twitter.com/nayibbukele/status/1435120030245662722" },
    { date: '2021-10-23', src: "/imagine.png", linkTweet:"https://twitter.com/100trillionUSD/status/1454039384915910656" },
    { date: '2021-10-25', src: "/reserve.png", linkTweet:"https://twitter.com/BitcoinMagazine/status/1452682979902361600" },
    { date: '2021-10-27', src: "/buythedip.png", linkTweet:"https://twitter.com/nayibbukele/status/1453461587948445697"},
    { date: '2021-11-07', src: "/courbe.png", linkTweet:"https://twitter.com/TechDev_52/status/1457404146764627974" },
    { date: '2021-11-08', src: "/mastercard.png", linkTweet:"https://twitter.com/BTC_Archive/status/1457812725732630540"},
    { date: '2021-11-09', src: "/apple.png", linkTweet:"https://twitter.com/APompliano/status/1458093788644188178"},
    { date: '2021-12-21', src: "/replaceDollar.png", linkTweet:"https://twitter.com/iamcardib/status/1473087732486270978" }
];

function retourneTabTweet(){
    return dataTweet;
}

{/* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Running bitcoin</p>&mdash; halfin (@halfin) <a href="https://twitter.com/halfin/status/1110302988?ref_src=twsrc%5Etfw">January 11, 2009</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}