const axios = require("axios");

axios
  .get(
    "https://newsdata.io/api/1/news?apikey=pub_90122da7433f5943ee056c3355624c36d6ac&country=us&category=technology&language=en&q=crypto%20OR%20cryptocurrency%20OR%20bitcoin%20OR%20blockchain"
  )
  .then((res) => {
    console.log(res.data.results);
  });

const article = {
  title:
    "Residents Furious When Bill Gates Swoops in to Buy Huge Amounts of Farmland",
  link: "https://futurism.com/residents-furious-bill-gates-farmland",
  keywords: [
    "Earth & Energy",
    "Bill Gates",
    "investing",
    "property",
    "the digest",
  ],
  creator: ["Maggie Harrison"],
  description:
    "Farmer Bill AP reports that last week, billionaire Microsoft founder Bill Gates was cleared to purchase 2,100 acres of rural North Dakota farmland. The acquisition, however, was not without drama — the tech mogul had to fight state law in order to buy it, and a number of locals are less than thrilled with the […]",
  content: `Farmer Bill The Associated Press reports that last week, billionaire Microsoft founder Bill Gates was cleared to purchase 2,100 acres of rural North Dakota farmland. The acquisition, however, wasn't without drama — the tech mogul had to fight state law to buy it, and a number of locals are less than thrilled with the outcome. "I've gotten a big earful on this from clear across the state, it's not even from that neighborhood," said North Dakota’s Agriculture Commissioner Doug Goehring when speaking to local television station KFYR-TV last month. "Those people are upset, but there are others that are just livid about this." Land Laws The North Dakota law in question, enacted during the Depression to protect struggling family farms, bars corporations and some other businesses from owning farmland. Individual trusts, however, are allowed to buy agriculture land if they lease it back to farmers, which according to the AP is what Gates' firm plans to do. Thus, the controversial philanthropist was able to secure the property. New MacDonald Gates has quietly been acquiring farmland for several years now, in a genuinely bizarre twist for his long tech career. The billionaire is already America's top private farmland owner, currently controlling about 270,000 acres of agricultural real estate. It's an interesting shift — ultra-wealthy tech innovator to agricultural overlord — but Gates isn't the only well-known billionaire putting their faith in the resource. Nebraska-enthusiast (and longtime Gates pal) Warren Buffet is a fan of the investment, and recently remarked that he'd hock over $25 billion for a "1 percent interest in all the farmland in the United States." Both figures are notorious for their hatred of Web3 assets like crypto and NFTs, so it's not surprising that they're each fans of this necessary — and tangible — resource. Regardless, land has long equated to wealth, and wealth, of course, is power, all of which Gates has a lot of already. And as property values continue to skyrocket alongside ever-increasing land consolidation, it's definitely worth keeping an eye on who owns what — and just how much of it, exactly, they've managed to scoop up. READ MORE: North Dakota AG clears farmland purchase tied to Bill Gates [The Associated Press] More on (kind of affordable?) landownership: Man Uses Life Savings to Buy Nonexistent Metaverse Land The post Residents Furious When Bill Gates Swoops in to Buy Huge Amounts of Farmland appeared first on Futurism.`,
  pubDate: "2022-07-07 14:29:17",
  image_url: null,
  source_id: "futurism",
  country: ["united states of america"],
  category: ["technology", "science"],
  language: "english",
};
