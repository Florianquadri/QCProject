export {retourneTabTweet}

let dataTweet = [
    { date: '2009-01-11', src: "/runningBitcoin.png", linkTweet :"https://twitter.com/halfin/status/1110302988?s=20&t=QKQ2P1DHgF-ydzfBeFck3A" },
    { date: '2010-05-22', src: "/pizzaBtc.png", linkTweet:"https://twitter.com/inthepixels/status/1129926927580585989?s=20&t=aS1JKJb5-x3hyccC9TiF_A" },
    { date: '2010-07-20', src: "/anyoneusingbtc.png", linkTweet:"https://twitter.com/ehn/status/19004040071?s=20&t=HwDsTTqeuEbQL5oqWHg6Eg" },
    { date: '2011-01-14', src: "/firstArticle.png", linkTweet : "https://twitter.com/hackerkiba/status/25692869159297025?s=20&t=ewqZ8-Cuz0XmXSsF7gu4WQ" },
    { date: '2011-05-11', src: "/pari.png", linkTweet:"https://twitter.com/liron/status/68432019155197952?s=20&t=l3fRoWP7D_5V1IPleMde5w" },
    { date: '2011-05-16', src: "/hype.png", linkTweet:"https://twitter.com/mikko/status/70092159142993922?s=20&t=5-LQTSEWlP3Dh9kIrG1ttA" },
    { date: '2011-05-17', src: "/wish.png", linkTweet:"https://twitter.com/GregSchoen/status/70261648811761665?s=20&t=s1tVBF6bmwXh9-aJNicchQ" },
    { date: '2011-06-08', src: "/probleme1.png", linkTweet:"https://twitter.com/inthepixels/status/1137347647902244865?s=20&t=puDm6cav1JD0mxYgGUdwig"},
    { date: '2011-06-19', src: "/crash1.png", linkTweet:"https://twitter.com/stacksmasher/status/82650010893824000?s=20&t=Z1gGf8SFYtEm95sNYm3u-w" },
    { date: '2011-11-20', src: "/interview.png", linkTweet:"https://twitter.com/rogerkver/status/138251345252724737?s=20&t=_5bjcvFfT5N615acxf-i_g" },
    { date: '2012-01-12', src: "/machinebtc.png", linkTweet:"https://twitter.com/robpegoraro/status/157519227291566081?s=20&t=rHmxC0asxfiryW28el0Kbg" },
    { date: '2012-03-01', src: "/tedx.png", linkTweet:"https://twitter.com/robpegoraro/status/157519227291566081?s=20&t=rHmxC0asxfiryW28el0Kbg" },
    { date: '2012-06-30', src: "/btcAccepted.png", linkTweet:"https://twitter.com/auerbach/status/219067740743417857?s=20&t=7XwnRY1Df25QhC1iP6-Skw" },
    { date: '2013-01-15', src: "/hope.png", linkTweet:"https://twitter.com/Technom4ge/status/291217784086601729?s=20&t=D6z7rf3i1jX8WsQJIhspDQ" },
    { date: '2013-04-03', src: "/mining.png", linkTweet:"https://twitter.com/Percival/status/319291205013864448?s=20&t=F3sBtSPovUQfZWn7LQwO0g" },
    { date: '2013-05-05', src: "/rarete.png", linkTweet:"https://twitter.com/intelliot/status/330930597671350273?s=20&t=Pph8foeaGV--baJob6LmGA"},
    { date: '2013-08-15', src: "/coinbasesms.png", linkTweet:"https://twitter.com/FEhrsam/status/368103936294543361?s=20&t=WSNT93tdVK3s9_KEGAJSRA" },
    { date: '2013-10-02', src: "/probleme2.png", linkTweet:"https://twitter.com/Reuters/status/385475279172288512?s=20&t=Tf5CMYQENYi2YbM0vxm3ZQ" },
    { date: '2013-12-05', src: "/firstpaiement.png", linkTweet:"https://twitter.com/TheScottRob/status/408706089719312384?s=20&t=SWadMMgvmpthE7QhwQyPlQ" },
    { date: '2013-12-13', src: "/everybody1.png", linkTweet:"https://twitter.com/joyce/status/411689429825097728?s=20&t=crgagA3SzX5c9DwtqvYnoQ" },
    { date: '2014-04-02', src: "/cake.png", linkTweet:"https://twitter.com/phretor/status/451319596117950465?s=20&t=yDMr5LeJp1jUjOIgXpd-Rg" },
    { date: '2014-04-13', src: "/eth.png", linkTweet:"https://twitter.com/bitcoinmp/status/455434880286216193?s=20&t=GCXQIEgjHEP2AJghg-7ywg" },
    { date: '2018-01-25', src: "/katyPerry.png", linkTweet:"https://www.instagram.com/p/BeXchJzFkhJ/?utm_source=ig_web_copy_link" },
    { date: '2020-09-10', src: "/jackDorsey.png", linkTweet:"https://twitter.com/Reuters/status/1304014254035677186?s=20&t=uDwAlrzrYh0SVMC_3lf_RQ" },
    { date: '2021-01-29', src: "/biobitcoin.png", linkTweet:"https://twitter.com/elonmusk/status/1355068728128516101?s=20&t=RcTMi6kngt0flFSVe7-oIA" },
    { date: '2021-02-01', src: "/massAdoption.png", linkTweet:"https://twitter.com/woonomic/status/1356310219215699968?s=20&t=9Mcz3WHz7zp3HCk7J9-HeA" },
    { date: '2021-03-24', src: "/tweetTeslaAcceptBtc.png", linkTweet:"https://twitter.com/elonmusk/status/1374617643446063105?s=20&t=QaA_gKiH7x21IECycXZO3A" },
    { date: '2021-03-29', src: "/stillDip.png", linkTweet:"https://twitter.com/cz_binance/status/1376551859393949696?s=20&t=TeT7d53oeemgGW6QMWL4FQ"},
    { date: '2021-05-13', src: "/teslarefusebtc.png", linkTweet:"https://twitter.com/elonmusk/status/1392602041025843203?s=20&t=ArkThuqyqTpC09hzxEthGA" },
    //hyper important car il tweet à 10h42 et à 13h crash du 19 mai
    { date: '2021-05-19', src: "/teslaDiamond.png", linkTweet:"https://twitter.com/elonmusk/status/1395027147161489412?s=20&t=w3yTGmBq8O8SNdlgSz3Z1Q" },
    { date: '2021-06-13', src: "/hopeElon.png", linkTweet:"https://twitter.com/elonmusk/status/1404132183254523905?s=20&t=24OFMQsTaI8rHufVnRLikQ" },
    { date: '2021-09-07', src: "/salvadorStart.png", linkTweet:"https://twitter.com/nayibbukele/status/1435120030245662722?s=20&t=IDisU_E0ATXzhV5Gl7r-tw" },
    { date: '2021-12-21', src: "/replaceDollar.png", linkTweet:"https://twitter.com/iamcardib/status/1473087732486270978?s=20&t=v1844LtXLAF5HrZVSgL5bw" }
];

function retourneTabTweet(){
    return dataTweet;
}