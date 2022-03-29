export {retourneTabTweet}

let dataTweet = [
    { date: '2009-01-11', src: "/runningBitcoin.png" },
    { date: '2010-05-22', src: "/pizzaBtc.png" },
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

function retourneTabTweet(){
    return dataTweet;
}