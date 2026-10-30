// Sources and outcome assignments are documented in docs/result-story-sources.md.
export const resultStories = {
  luke: {
    summary: "Fairtrade-supported training helped Luke improve his tea harvest. Better yields help him support his family and pay school fees.",
    id: "luke", product: "tea", name: "Luke Wahome", role: "Tea farmer · Kenya",
    title: "Meet Luke Wahome.", subtitle: "A little know-how. A lot more tea.",
    photo: "/img/luke-wahome.jpg", alt: "Luke Wahome standing in his tea field, holding a tea shoot", position: "50% 30%",
    paragraphs: [
      "Luke grows tea at Iriaini Tea Factory in central Kenya. Cold seasons and frost make his harvest less predictable. School fees don’t wait for warmer weather.",
      "Through his factory, Luke joined Fairtrade-supported training. He learned practical ways to prune, care for his soil and pick for quality.",
      "After the training and changes on his farm, Luke says his annual green-leaf harvest rose from around 400 to 1,200 kilos. Better yields help him support his family and pay school fees. He now shares what he learned with neighbouring farmers.",
    ],
    source: "Fairtrade producer story, Luke Wahome (2026)",
  },
  sukambizi: {
    summary: "Sukambizi’s tea farmers invested their Fairtrade Premium in hydropower, bringing electricity to more than 2,000 households, a school and a health centre.",
    id: "sukambizi", product: "tea", name: "Sukambizi Association Trust", role: "Tea-growing communities · Malawi",
    title: "Tea that helped turn the lights on.", subtitle: "The river was there. The community made it count.",
    photo: "/img/stories/sukambizi-still.jpg", alt: "Community member featured in Fairtrade Africa’s Sukambizi hydropower video", position: "50% 35%",
    sourceUrl: "https://mailchi.mp/edf306d4f13a/impact-friday",
    source: "Fairtrade Africa, Impact Friday: Sukambizi hydropower",
    paragraphs: [
      "For families in these Malawian tea-growing communities, evenings once depended on kerosene lamps. Businesses relied on diesel or went without refrigeration.",
      "Sukambizi’s farmers chose to invest their Fairtrade Premium in a mini hydropower grid. The project, carried out in 2020–2021, brought electricity to four villages, reaching more than 2,000 households as well as a school and health centre.",
      "The newsletter describes evening study, refrigerated drinks businesses and an electric maize mill. A community decision about tea income helped make everyday life—and earning a living—a little easier.",
    ],
  },
  vivian: {
    summary: "Vivian built Seven Sisters Vineyards around dignity and fairness. Her business supports farm workers through initiatives including a funeral policy for their families.",
    id: "vivian", product: "wine", name: "Vivian Kleynhans", role: "Seven Sisters Vineyards owner · South Africa",
    title: "Meet Vivian Kleynhans.", subtitle: "She built a wine business on her own terms.",
    photo: "/img/stories/vivian-kleynhans.jpg", alt: "Vivian Kleynhans pictured in Fairtrade Africa’s Seven Sisters newsletter", position: "78% 45%",
    sourceUrl: "https://mailchi.mp/0eddd6191dfb/impact-friday", source: "Fairtrade Africa, Impact Friday: Seven Sisters",
    paragraphs: [
      "Vivian entered South Africa’s wine industry without a family wine business behind her. Suppliers let her down; she lost a major contract. She studied the industry and rebuilt.",
      "Today she owns Seven Sisters Vineyards, a Fairtrade-certified producer in the Western Cape. For Vivian, certification fitted the dignity and fairness she wanted at the heart of her business.",
      "She introduced a funeral policy covering more than 100 farm workers, including people outside her own workforce. It helps families facing the cost of bringing a loved one home for burial. This is Vivian’s initiative—not a promise that every Fairtrade farm runs the same scheme.",
    ],
  },
  jessica: {
    summary: "Fairtrade Premium funds helped Jessica and her son get a home of their own—a place with more privacy, security and peace of mind.",
    id: "jessica", product: "wine", name: "Jessica Thomas", role: "Fairview farm worker · Darling, South Africa",
    title: "Meet Jessica Thomas.", subtitle: "A place of their own. A little more peace of mind.",
    photo: "/img/stories/jessica-thomas.jpg", alt: "Jessica Thomas pictured among vines in Fairtrade Africa’s Fairview newsletter", position: "40% 40%",
    sourceUrl: "https://mailchi.mp/fairtradeafrica.net/impact-friday-a6el4eh3m4", source: "Fairtrade Africa, Impact Friday: Jessica Thomas",
    paragraphs: [
      "Jessica and her son were sharing accommodation where they had little privacy or security. She took their situation to the Fairtrade Premium Committee at Fairview, where she works.",
      "The committee agreed to help fund a prefabricated home using Premium money. For Jessica, it meant a door she could lock and a space she and her son could call their own.",
      "The committee also used Premium funds to help a local family repair their home after a fire. These were decisions made by workers in response to needs in their community.",
    ],
  },
  coffee: {
    summary: "Fero Cooperative in Ethiopia belongs to a union that uses Fairtrade Premium funds for clean water, schools, health centres and other community projects.",
    id: "coffee", product: "coffee", name: "Coffee-growing communities", role: "Fairtrade in practice",
    title: "Coffee that gives back.", subtitle: "Coffee that gives back to the community.",
    photo: "/img/stories/coffee-growers.png", alt: "Two people holding freshly picked coffee cherries", position: "50% 0%",
    source: "User-supplied Fero Cooperative / Sidama Coffee Farmers’ Cooperative Union impact information",
    paragraphs: [
      "Fero Cooperative is near Yirgalem in Sidamo, Ethiopia, and belongs to the Sidama Coffee Farmers’ Cooperative Union.",
      "The union has used Fairtrade Premium funds for roads, bridges, clean water, schools, health centres and electricity connections, as well as equipment and supplies for schools and health centres.",
      "Its environmental work includes managing coffee waste, using renewable energy and growing shade-tree seedlings. Replacing old or diseased coffee bushes helps support future harvests.",
      "The Fairtrade Premium is an extra sum paid on Fairtrade sales. Farmers and workers decide collectively how to invest it. These are cooperative and union projects, rather than a verified personal account of the people in this photo.",
    ],
  },
};

export const storyByResult = {
  1: "vivian", 2: "sukambizi", 3: "jessica", 4: "jessica", 5: "coffee", 6: "luke", 7: "vivian",
  9: "jessica", 10: "sukambizi", 11: "coffee", 12: "vivian", 13: "luke", 14: "jessica", 15: "sukambizi",
};

export function getResultStory(resultId, certifiedProducts = []) {
  if (resultId === 8) {
    // Mixed results must follow the products actually marked Fairtrade.
    if (certifiedProducts.some(p => ["White Wine", "Red Wine", "Rosé"].includes(p))) return resultStories.jessica;
    if (certifiedProducts.some(p => ["Black Tea", "Herbal Tea", "Spiced Tea"].includes(p))) return resultStories.luke;
    return resultStories.coffee;
  }
  return resultStories[storyByResult[resultId]] || null;
}
