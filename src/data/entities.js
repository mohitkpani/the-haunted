const entities = [
  // ========================================
  // GHOSTS & SPIRITS
  // ========================================

  {
    id: "banshee",
    name: "Banshee",
    location: "Ireland",
    category: "GHOSTS & SPIRITS",
    description:
      "A supernatural female spirit in Irish folklore, traditionally known for a haunting cry said to warn of an approaching death.",
    image: "/images/paranormal/banshee.webp",

    about:
      "The Banshee is a legendary female spirit from Irish folklore. Her appearance and behaviour vary across traditional stories.",

    legend:
      "According to Irish legends, the Banshee's mournful cry is associated with the death of a member of certain families.",

    reportedActivity:
      "Traditional accounts describe hearing a distant wail or seeing a mysterious woman near a home before a death. These are folklore accounts, not verified paranormal events.",

    quickFacts: {
      origin: "Ireland",
      type: "Female spirit",
      folklore: "Irish",
      associatedWith: "Death omens",
    },
  },

  {
    id: "headless-ghost",
    name: "Headless Ghost",
    location: "Folklore Around the World",
    category: "GHOSTS & SPIRITS",
    description:
      "A ghostly figure without a head, appearing in legends, traditional ghost stories and mysterious sightings.",
    image: "/images/paranormal/headless-ghost.webp",

    about:
      "The Headless Ghost is a recurring figure in supernatural folklore. Stories about headless apparitions appear in different cultures.",

    legend:
      "Many legends describe spirits of people who died through violence or execution returning as headless figures.",

    reportedActivity:
      "Folklore and anecdotal accounts describe headless figures appearing near roads, castles, forests and historic buildings. These reports are unverified.",

    quickFacts: {
      type: "Apparition",
      appearance: "Human figure without a head",
      folklore: "Multiple cultures",
    },
  },

  {
    id: "shadow-people",
    name: "Shadow People",
    location: "Modern Paranormal Folklore",
    category: "GHOSTS & SPIRITS",
    description:
      "Dark human-shaped figures reportedly seen briefly in peripheral vision or moving through dimly lit spaces.",
    image: "/images/paranormal/shadow-people.webp",

    about:
      "Shadow People are figures described in modern paranormal accounts as dark silhouettes resembling human beings.",

    legend:
      "Some paranormal stories interpret these figures as spirits or mysterious entities, although explanations differ widely.",

    reportedActivity:
      "People have reported seeing dark silhouettes, especially in dim surroundings or at the edge of their vision. Such experiences do not establish supernatural activity.",

    quickFacts: {
      type: "Shadow apparition",
      appearance: "Dark human silhouette",
      folklore: "Modern paranormal accounts",
    },
  },

  // ========================================
  // HAUNTED OBJECTS
  // ========================================

  {
    id: "haunted-doll",
    name: "Haunted Doll",
    location: "Worldwide Folklore",
    category: "HAUNTED OBJECTS",
    description:
      "A doll believed in paranormal stories to be connected with unexplained movements, mysterious sounds or supernatural presence.",
    image: "/images/paranormal/haunted-doll.webp",

    about:
      "Haunted dolls appear frequently in supernatural stories. They are often associated with unusual incidents reported by their owners.",

    legend:
      "Traditional and modern stories describe dolls that supposedly move, change position or appear to behave strangely without explanation.",

    reportedActivity:
      "Owners and paranormal enthusiasts have shared anecdotal accounts of unusual sounds, movements and experiences involving dolls. These claims are not scientifically verified.",

    quickFacts: {
      type: "Allegedly haunted object",
      material: "Cloth, porcelain or plastic",
      folklore: "Worldwide",
    },
  },

  {
    id: "haunted-mirror",
    name: "Haunted Mirror",
    location: "Worldwide Folklore",
    category: "HAUNTED OBJECTS",
    description:
      "A mirror associated with legends of mysterious reflections, spirits and unexplained appearances.",
    image: "/images/paranormal/haunted-mirror.webp",

    about:
      "Mirrors have appeared in supernatural folklore for centuries. Many traditions associate reflections with the soul or the boundary between worlds.",

    legend:
      "Stories describe mirrors acting as gateways to spirits or showing unusual reflections. These beliefs vary between cultures.",

    reportedActivity:
      "Paranormal stories sometimes describe strange reflections and shadowy figures appearing in mirrors. Such accounts remain unverified.",

    quickFacts: {
      type: "Allegedly haunted object",
      material: "Glass and reflective backing",
      folklore: "Multiple cultures",
    },
  },

  {
    id: "petni",
    name: "Petni",
    location: "Bengal, India",
    category: "GHOSTS & SPIRITS",
    description:
      "A terrifying female spirit from Bengali folklore, believed to haunt lonely roads, ponds, and quiet villages.",
    image: "/images/paranormal/petni.webp",
    about:
      "Petni is a female ghost in Bengali folklore, traditionally associated with a woman who died unmarried or under tragic circumstances.",
    legend:
      "Stories describe Petni appearing near ponds and deserted village paths, sometimes disguising herself as an ordinary woman before revealing her supernatural form.",
    reportedActivity:
      "Bengali folklore describes mysterious female figures, strange voices, and unexplained appearances near water bodies.",
    quickFacts: {
      origin: "Bengali folklore",
      type: "Female spirit",
      knownFor: "Haunting ponds and lonely roads",
      mystery: "The wandering woman",
    },
  },
  {
    id: "shakchunni",
    name: "Shakchunni",
    location: "West Bengal, India",
    category: "GHOSTS & SPIRITS",
    description:
      "A married woman's spirit from Bengali folklore, recognised by her traditional red and white bangles.",
    image: "/images/paranormal/shakchunni.webp",
    about:
      "Shakchunni is traditionally believed to be the spirit of a married woman. Her name is associated with shakha and pola, the traditional bangles worn by married Bengali women.",
    legend:
      "Folklore describes her appearing as a beautiful woman wearing a red-bordered sari and traditional bangles. Some stories say she possesses women or wanders through trees and villages.",
    reportedActivity:
      "Local tales describe mysterious women appearing near trees, ponds, and deserted village areas.",
    quickFacts: {
      origin: "Bengali folklore",
      type: "Married woman's spirit",
      knownFor: "Shakha and pola bangles",
      mystery: "The woman in the red-bordered sari",
    },
  },
  {
    id: "brahmadaitya",
    name: "Brahmadaitya",
    location: "Bengal, India",
    category: "GHOSTS & SPIRITS",
    description:
      "A powerful spirit in Bengali folklore, believed to dwell in ancient trees and deserted places.",
    image: "/images/paranormal/brahmadaitya.webp",
    about:
      "Brahmadaitya is traditionally described as the spirit of a deceased Brahmin. Unlike many frightening ghosts, some folk stories portray him as protective or helpful.",
    legend:
      "Stories often place Brahmadaitya inside old banyan or peepal trees. Some legends describe a mysterious figure wearing traditional clothing and appearing at night.",
    reportedActivity:
      "Folklore associates unusual sounds and mysterious appearances near old trees with this spirit.",
    quickFacts: {
      origin: "Bengali folklore",
      type: "Spirit of a Brahmin",
      knownFor: "Ancient banyan trees",
      mystery: "The guardian spirit of the tree",
    },
  },
  {
    id: "nishi",
    name: "Nishi",
    location: "Bengal, India",
    category: "GHOSTS & SPIRITS",
    description:
      "A mysterious night spirit said to call people by their names, drawing them away into darkness.",
    image: "/images/paranormal/nishi.webp",
    about:
      "Nishi is a frightening figure in Bengali folklore. The word is associated with night, and the spirit is believed to use familiar voices to lure unsuspecting people outside.",
    legend:
      "According to the legend, Nishi calls a person's name in the voice of someone they know. Those who follow the mysterious call may become lost.",
    reportedActivity:
      "Traditional stories warn against answering unexplained voices calling from outside during the night.",
    quickFacts: {
      origin: "Bengali folklore",
      type: "Night spirit",
      knownFor: "Calling people by name",
      mystery: "The voice in the darkness",
    },
  },
  {
    id: "haunted-wedding-sari",
    name: "The Haunted Wedding Sari",
    location: "Bengal, India",
    category: "HAUNTED OBJECTS",
    description:
      "A traditional red bridal sari surrounded by stories of a bride whose wedding never reached its ending.",
    image: "/images/paranormal/haunted-wedding-sari.webp",
    about:
      "In this fictional paranormal legend, an old red bridal sari is kept locked inside an abandoned ancestral home. Family members believe it carries the sorrow of a bride who died before her wedding.",
    legend:
      "The legend says that anyone who opens the locked trunk hears the sound of wedding music and sees a mysterious red figure reflected in nearby mirrors.",
    reportedActivity:
      "The story describes unexplained music, strange reflections, and the feeling of being watched near the trunk.",
    quickFacts: {
      object: "Red bridal sari",
      origin: "Bengal-inspired folklore",
      knownFor: "Mysterious wedding music",
      mystery: "The bride who never arrived",
    },
  },
  {
    id: "cursed-antique-mirror",
    name: "The Cursed Antique Mirror",
    location: "Ancestral Mansion, India",
    category: "HAUNTED OBJECTS",
    description:
      "An antique mirror said to reveal a shadowy figure standing behind anyone who looks into it after midnight.",
    image: "/images/paranormal/cursed-antique-mirror.webp",
    about:
      "This fictional cursed object is an old mirror discovered inside a deserted ancestral mansion. Its dark wooden frame is covered with unusual carvings.",
    legend:
      "According to the story, the mirror does not always reflect the room correctly. Sometimes a mysterious figure appears in the reflection even when nobody is standing nearby.",
    reportedActivity:
      "The legend describes distorted reflections, unexplained shadows, and mysterious appearances.",
    quickFacts: {
      object: "Antique mirror",
      origin: "Fictional paranormal legend",
      knownFor: "Unusual reflections",
      mystery: "The figure behind the reflection",
    },
  },
  {
    id: "haunted-music-box",
    name: "The Haunted Music Box",
    location: "Abandoned Mansion, India",
    category: "HAUNTED OBJECTS",
    description:
      "An old music box that plays a haunting melody even when nobody touches its winding key.",
    image: "/images/paranormal/haunted-music-box.webp",
    about:
      "This fictional haunted object is an antique wooden music box decorated with faded carvings. It was reportedly discovered in a locked room of an abandoned mansion.",
    legend:
      "The story says the box plays the same melody every night at midnight. Anyone who hears the complete tune is said to dream about a mysterious child standing beside the box.",
    reportedActivity:
      "The legend describes unexplained melodies, strange ticking sounds, and mysterious dreams.",
    quickFacts: {
      object: "Antique music box",
      origin: "Fictional paranormal legend",
      knownFor: "Playing without being touched",
      mystery: "The midnight melody",
    },
  },
];

export default entities;
