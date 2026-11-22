const places = [
  {
    id: "bhangarh-fort",
    name: "Bhangarh Fort",
    location: "Alwar, Rajasthan, India",
    category: "FORT",
    description:
      "A 17th-century fort surrounded by ancient temples, ruined palaces and stories of mysterious curses.",

    image: "/images/haunted-places/bhangarh-fort.webp",

    about:
      "Bhangarh Fort was built in the 17th century for Madho Singh I. Located among the Aravalli hills, the complex once contained royal palaces, temples, havelis, marketplaces and several fortified gates. Its ruins offer a glimpse into the architecture and town planning of that period.",

    legend:
      "One famous legend tells of the ascetic Baba Balau Nath, who permitted construction only on the condition that no building's shadow would reach his home. Another tale concerns Princess Ratnavati and a sorcerer whose failed attempt to enchant her supposedly led to a curse on the town. These are local legends, not established historical explanations.",

    reportedActivity:
      "Visitors and local folklore describe an eerie atmosphere and mysterious experiences around the ruins. There is no reliable scientific evidence confirming paranormal activity. The fort is restricted to visitors outside permitted daylight hours.",

    quickFacts: {
      country: "India",
      state: "Rajasthan",
      district: "Alwar",
      built: "17th century",
      associatedWith: "Madho Singh I",
      category: "Historic Fort",
    },
  },

  {
    id: "dow-hill",
    name: "Dow Hill",
    location: "Kurseong, Darjeeling, West Bengal, India",
    category: "FOREST",
    description:
      "A mist-covered hill region known for its dense forests, colonial-era surroundings and eerie local stories.",

    image: "/images/haunted-places/dow-hill.webp",

    about:
      "Dow Hill is a forested area in Kurseong, in the Darjeeling hills of West Bengal. The region is known for its wooded walking routes and colonial-era buildings. Victoria Boys' School, established in 1879, is one of the historic institutions associated with the area.",

    legend:
      "Local folklore speaks of a mysterious headless figure said to appear along a forest path. Stories also describe strange footsteps and unsettling experiences near the wooded roads. These accounts form part of local folklore and are not verified events.",

    reportedActivity:
      "Some visitors and local stories describe hearing unexplained footsteps or feeling watched while walking through the forest. No reliable evidence establishes that these experiences are paranormal. Visitors should respect school grounds and stay on public routes.",

    quickFacts: {
      country: "India",
      state: "West Bengal",
      district: "Darjeeling",
      town: "Kurseong",
      knownFor: "Forests and local folklore",
      category: "Hill Forest",
    },
  },

  {
    id: "dumas-beach",
    name: "Dumas Beach",
    location: "Surat, Gujarat, India",
    category: "BEACH",
    description:
      "A popular Arabian Sea beach near Surat, famous for its dark sand, coastal atmosphere and local ghost stories.",

    image: "/images/haunted-places/dumas-beach.webp",

    about:
      "Dumas Beach is located approximately 21 kilometres southwest of Surat city. It is a popular local destination for evening visits, coastal views and traditional Gujarati snacks.",

    legend:
      "A popular local story claims that the beach was once used as a cremation ground and that spirits can be heard near the shore at night. Stories of strange voices and unusual experiences have helped create its haunted reputation. These claims remain folklore.",

    reportedActivity:
      "Some visitors have shared stories about hearing unusual sounds or feeling uneasy near the beach after dark. Such accounts have not been scientifically verified. The beach is also a real coastal environment, so visitors should follow local safety guidance.",

    quickFacts: {
      country: "India",
      state: "Gujarat",
      city: "Surat",
      distanceFromCity: "About 21 km",
      coastline: "Arabian Sea",
      category: "Beach",
    },
  },

  {
    id: "kuldhara-village",
    name: "Kuldhara Village",
    location: "Near Jaisalmer, Rajasthan, India",
    category: "ABANDONED VILLAGE",
    description:
      "An abandoned desert settlement whose empty houses and mysterious past have inspired generations of stories.",

    image: "/images/haunted-places/kuldhara-village.webp",

    about:
      "Kuldhara is an abandoned historic village near Jaisalmer. It was established by the Paliwal Brahmins and was once a prosperous settlement supported by agriculture and traditional water-management techniques. Its remaining houses, lanes and structures preserve traces of its past.",

    legend:
      "According to a famous local legend, a powerful minister named Salim Singh wanted to marry the village headman's daughter. The villagers supposedly left their homes overnight rather than accept his demand, placing a curse on the settlement so that nobody could live there again. The exact reasons for the village's abandonment remain debated.",

    reportedActivity:
      "Stories describe strange feelings and unexplained experiences among the abandoned buildings. The village's empty streets and ruined homes contribute to its mysterious atmosphere, but supernatural claims have not been verified.",

    quickFacts: {
      country: "India",
      state: "Rajasthan",
      district: "Jaisalmer",
      established: "1291 (traditional account)",
      abandoned: "19th century",
      knownFor: "Paliwal heritage",
      category: "Abandoned Village",
    },
  },

  {
    id: "edinburgh-castle",
    name: "Edinburgh Castle",
    location: "Edinburgh, Scotland, United Kingdom",
    category: "CASTLE",
    description:
      "An ancient fortress standing on Castle Rock, famous for its royal history, dramatic architecture and ghost legends.",

    image: "/images/haunted-places/edinburgh-castle.webp",

    about:
      "Edinburgh Castle stands on Castle Rock, a volcanic rock formation in the heart of Scotland's capital. The site has ancient origins and served as a royal residence, military stronghold and prison. It played an important role in Scotland's history and experienced several major sieges.",

    legend:
      "Castle folklore includes tales of a ghostly piper who supposedly disappeared after entering underground passages, as well as stories of a headless drummer seen near the castle walls. These are traditional ghost stories rather than verified historical events.",

    reportedActivity:
      "Some visitors have reported unusual sounds, cold sensations and mysterious figures around the castle. These experiences are personal accounts and have not established the existence of paranormal activity.",

    quickFacts: {
      country: "United Kingdom",
      region: "Scotland",
      city: "Edinburgh",
      landmark: "Castle Rock",
      historicalRole: "Royal residence and fortress",
      category: "Historic Castle",
    },
  },

  {
    id: "alcatraz-island",
    name: "Alcatraz Island",
    location: "San Francisco Bay, California, USA",
    category: "PRISON",
    description:
      "A small island once home to a maximum-security federal prison, surrounded by cold waters and stories from its past.",

    image: "/images/haunted-places/alcatraz-island.webp",

    about:
      "Alcatraz Island has served several roles, including a military fortification, military prison and federal penitentiary. The famous federal prison operated from 1934 until 1963. The island later became an important site in the American Indian occupation of 1969–1971 and is now part of a national recreation area.",

    legend:
      "Stories associated with Alcatraz include tales of unexplained noises in former cell blocks, mysterious footsteps and ghostly figures. Its isolation and prison history have helped inspire these stories.",

    reportedActivity:
      "Visitors and former accounts sometimes describe strange sounds or unsettling feelings inside the old prison buildings. These reports are anecdotal and do not prove paranormal activity.",

    quickFacts: {
      country: "USA",
      state: "California",
      location: "San Francisco Bay",
      federalPrison: "1934–1963",
      earlierUse: "Military fortress and prison",
      category: "Former Prison",
    },
  },

  {
    id: "stanley-hotel",
    name: "The Stanley Hotel",
    location: "Estes Park, Colorado, USA",
    category: "HOTEL",
    description:
      "A historic mountain hotel famous for its architecture, ghost stories and connection to Stephen King's The Shining.",

    image: "/images/haunted-places/stanley-hotel.webp",

    about:
      "The Stanley Hotel opened in 1909 and was founded by F. O. Stanley. Located in Estes Park, Colorado, the hotel became known for its grand architecture and mountain setting. Author Stephen King stayed there in 1974, and the experience helped inspire his novel The Shining.",

    legend:
      "One famous hotel legend concerns Room 217 and a housekeeper named Elizabeth Wilson. Stories claim that her spirit continues to appear in the room. Other tales describe unexplained piano music and mysterious activity in the hallways. These stories are part of the hotel's haunted reputation, not proven facts.",

    reportedActivity:
      "Guests and staff have shared stories of unexplained sounds, piano music and unusual experiences in different parts of the hotel. The reports are anecdotal and have not scientifically established paranormal activity.",

    quickFacts: {
      country: "USA",
      state: "Colorado",
      town: "Estes Park",
      opened: "1909",
      founder: "F. O. Stanley",
      famousConnection: "The Shining",
      category: "Historic Hotel",
    },
  },

  {
    id: "aokigahara-forest",
    name: "Aokigahara Forest",
    location: "Yamanashi, Japan",
    category: "FOREST",
    description:
      "A dense forest at the base of Mount Fuji, known for its volcanic landscape, quiet trails and traditional folklore.",

    image: "/images/haunted-places/aokigahara-forest.webp",

    about:
      "Aokigahara is a large forest located near Mount Fuji in Yamanashi Prefecture, Japan. It grew over volcanic lava formed during an eruption of Mount Fuji in the 9th century. The forest covers approximately 30 square kilometres and is known for its dense vegetation, caves and distinctive volcanic terrain.",

    legend:
      "Japanese folklore has long included stories about spirits known as yurei. Some modern stories connect these spirits with the forest's quiet and isolated atmosphere. These are cultural beliefs and stories, not evidence of supernatural activity.",

    reportedActivity:
      "Visitors sometimes describe the forest as unusually quiet and disorienting. The volcanic terrain, dense trees and sound-absorbing ground can contribute to this impression. There is no verified evidence of paranormal activity. Visitors should remain on marked trails and follow local guidance.",

    quickFacts: {
      country: "Japan",
      prefecture: "Yamanashi",
      nearbyLandmark: "Mount Fuji",
      area: "About 30 km²",
      terrain: "Volcanic lava forest",
      formed: "After a 9th-century eruption",
      category: "Forest",
    },
  },

  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    location: "Pune, Maharashtra, India",
    category: "HAUNTED FORT",
    description:
      "An ancient Peshwa palace surrounded by dark legends, mysterious cries, and stories of a tragic royal murder.",
    image: "/images/haunted-places/shaniwar-wada.webp",
    about:
      "Built in the 18th century, Shaniwar Wada was once the seat of the Peshwa rulers. A devastating fire in 1828 destroyed much of the palace, leaving behind its historic walls and imposing gates.",
    legend:
      "Local folklore tells of the ghost of young Peshwa Narayanrao, who was murdered in the palace. According to the legend, his cries for help can still be heard around the fort on certain nights.",
    reportedActivity:
      "Visitors and local stories describe mysterious cries and an eerie atmosphere around the historic ruins. These accounts remain folklore rather than verified paranormal evidence.",
    quickFacts: {
      built: "18th century",
      location: "Pune, Maharashtra",
      famousFor: "Peshwa history and ghost legend",
      mystery: "The legend of Narayanrao",
    },
  },
  {
    id: "agrasen-ki-baoli",
    name: "Agrasen ki Baoli",
    location: "New Delhi, India",
    category: "HAUNTED STEPWELL",
    description:
      "A centuries-old stepwell hidden among Delhi's busy streets, famous for its deep silence and mysterious legends.",
    image: "/images/haunted-places/agrasen-ki-baoli.webp",
    about:
      "Agrasen ki Baoli is a historic stepwell measuring approximately 60 metres long and 15 metres wide. Its architecture includes 108 steps leading down through multiple levels. It is protected by the Archaeological Survey of India.",
    legend:
      "A popular legend claims that the stepwell once contained mysterious black water that could hypnotise people and draw them towards it. The story has contributed to its haunted reputation.",
    reportedActivity:
      "People often describe the lower levels as unusually quiet and eerie. The hypnotic-water story is folklore, with no established evidence of paranormal activity.",
    quickFacts: {
      built: "Believed to date to the medieval period",
      location: "New Delhi",
      famousFor: "108 steps and haunted-water legend",
      mystery: "The legend of black water",
    },
  },
  {
    id: "brij-raj-bhavan",
    name: "Brij Raj Bhavan Palace",
    location: "Kota, Rajasthan, India",
    category: "HAUNTED PALACE",
    description:
      "A historic riverside palace associated with the ghost story of a British officer killed during the 1857 uprising.",
    image: "/images/haunted-places/brij-raj-bhavan.webp",
    about:
      "Brij Raj Bhavan is a 19th-century palace situated beside the Chambal River in Kota. It was built to house a British political agent and later became a royal guest residence.",
    legend:
      "The palace is associated with Major Charles Burton, who was killed along with his sons during the Indian Rebellion of 1857. According to local accounts, his spirit is said to wander through the palace.",
    reportedActivity:
      "Popular stories describe unexplained footsteps and sightings associated with Major Burton. These remain local ghost stories rather than verified events.",
    quickFacts: {
      built: "1830",
      location: "Kota, Rajasthan",
      famousFor: "Major Charles Burton legend",
      mystery: "The ghost of a British officer",
    },
  },
  {
    id: "gp-block-meerut",
    name: "GP Block",
    location: "Meerut, Uttar Pradesh, India",
    category: "HAUNTED BUILDING",
    description:
      "An abandoned compound surrounded by stories of mysterious figures, strange sightings, and unexplained appearances.",
    image: "/images/haunted-places/gp-block.webp",
    about:
      "GP Block in Meerut is known for its abandoned buildings and overgrown surroundings. Its reputation as a haunted location grew through local stories and media reports.",
    legend:
      "One famous local story describes four men sitting together around a candle inside an empty building. Another tells of a woman dressed in red appearing near the abandoned structures before suddenly disappearing.",
    reportedActivity:
      "Local folklore includes reports of strange figures and unexplained sightings. The stories are not scientifically verified. The abandoned structures should not be entered because of potential safety hazards.",
    quickFacts: {
      location: "Meerut, Uttar Pradesh",
      famousFor: "Four men and the woman in red",
      setting: "Abandoned buildings",
      mystery: "The figures inside GP Block",
    },
  },
];

export default places;
