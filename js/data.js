/* =========================================================================
   Toolbox Tales — Story Library
   Every story is written to be SPOKEN, not read. Short sentences. Plain
   words. Each one carries "bridges" that tie the history to a shop theme,
   and the app pairs those with audience-specific closers.
   ========================================================================= */

const THEMES = {
  safety:     { label: "Safety",             icon: "🦺", blurb: "Watching out for each other, controlling hazards, going home whole." },
  efficiency: { label: "Efficiency",         icon: "⚙️", blurb: "Planning, logistics, removing waste, working smarter." },
  quality:    { label: "Quality & Craft",    icon: "🛠️", blurb: "Doing it right, precision, pride in the work." },
  teamwork:   { label: "Teamwork",           icon: "🤝", blurb: "Trust, communication, pulling in the same direction." },
  growth:     { label: "Training & Growth",  icon: "🌱", blurb: "Learning, practice, getting a little better every week." },
  resilience: { label: "Resilience & Change",icon: "⛰️", blurb: "Grit, adapting, pushing through the hard stretch." },
};

const AUDIENCES = {
  technicians: { label: "Technicians", short: "Techs", blurb: "The shop floor — hands-on, practical, no fluff." },
  office:      { label: "Office & Support Staff", short: "Office", blurb: "Admin, parts, service writers — the people who keep the wheels turning." },
  everyone:    { label: "Whole Team", short: "Everyone", blurb: "The full Wednesday crew, all departments together." },
};

/* Closing calls-to-action: THEME x AUDIENCE.
   {WEEK} is replaced with "this week" phrasing at build time. */
const CLOSERS = {
  safety: {
    technicians: "So here's my ask for this week: before you climb, before you energize, before you crawl under a unit — take the ten extra seconds. Check your gear, check your lockout, check your partner. Nobody on this floor is on their own. The job is never so late that we can't do it safe.",
    office: "Safety isn't only a shop-floor word. This week, if you see something that doesn't look right — a blocked exit, a rushed process, a teammate stretched too thin — say something. Every save starts with one person who spoke up.",
    everyone: "So this week, every one of us — shop and office — owns one thing: if you see it, say it. A hazard, a shortcut, a bad day someone's having. The best rescue is the one we never need, because somebody spoke up early.",
  },
  efficiency: {
    technicians: "This week, I want each of us to find one trip we don't need to make. One walk back to the toolbox, one wait on parts, one job we set up twice. Find it, flag it, and let's fix it together. Small minutes add up to big hours.",
    office: "This week, look at one process you touch every day and ask: is there a step here nobody would miss? One less handoff, one clearer note on a work order — that's how we buy back time for the whole shop.",
    everyone: "So here's the challenge for this week: everybody finds one small piece of friction — one delay, one double-handle, one 'we've always done it that way' — and brings it forward. We don't need a miracle. We need fifty small wins.",
  },
  quality: {
    technicians: "This week, build like your name is stamped on it — because it is. The customer may never know what you did under that boom, but you will. Torque it, test it, sign it proud. Do it once, do it right.",
    office: "Quality lives in the details you handle — the work order that's complete, the part number that's right the first time, the callback that happens when we said it would. This week, sweat one detail harder. That's craftsmanship too.",
    everyone: "This week, whatever crosses your bench or your desk, ask one question before you pass it on: would I put my name on this? If the answer is yes, send it. If it's not — that's the moment that separates good shops from great ones.",
  },
  teamwork: {
    technicians: "This week, look left and right in your bay. If a teammate is buried, grab an end. If you're the one buried, say so — that's not weakness, that's how crews win. Nobody lifts a boom truck alone, and nobody carries a bad week alone either.",
    office: "This week, close one gap between departments. Walk the question to the shop instead of emailing it. Ask a tech what would make their paperwork easier. The strongest teams are the ones where the handoffs are warm, not cold.",
    everyone: "So this week: one team, one scoreboard. Before you say 'that's not my department,' ask 'what does the shop need?' Every rescue in history was a relay — and a relay is only as fast as its handoffs.",
  },
  growth: {
    technicians: "This week, be a student for fifteen minutes. Ask the senior tech to show you the thing you've been faking your way around. Or if you're the senior tech — pull somebody in and pass one skill down. That's how a shop gets smarter every single week.",
    office: "This week, learn one thing outside your lane. Sit with dispatch, shadow a service writer, ask a tech to show you what that part actually does. The more each of us understands the whole machine, the better we all run.",
    everyone: "So here's the deal for this week: everybody learns one thing and teaches one thing. Doesn't have to be big. The shops that win aren't the ones that know the most — they're the ones that learn the fastest.",
  },
  resilience: {
    technicians: "This week is going to throw something at us — a rush job, a backorder, a unit that fights back. When it does, remember: we don't have to like the mountain. We just have to keep climbing it together, one switchback at a time.",
    office: "When the schedule blows up this week — and it will — take a breath and work the problem in front of you. Not the whole avalanche, just the next shovelful. That's how every comeback in history actually happened.",
    everyone: "So when this week gets hard — and some week always does — I want us to remember: hard is not the same as impossible. Hard just means we find out what this team is made of. And I already know the answer.",
  },
};

/* Delivery tips shown in Practice mode. */
const DELIVERY_TIPS = [
  "Slow down. Whatever pace feels right, cut it by 10%. Nervous speakers rush; storytellers stroll.",
  "Pause after your hook. Count 'one-two' in your head. Silence makes people lean in.",
  "Don't memorize sentences — memorize the beats. Know your 4 or 5 story moments and talk your way between them.",
  "Pick three friendly faces around the room and rotate your eye contact between them.",
  "Use your hands to show size, distance, and direction. A story about mountains needs mountains.",
  "Drop your volume for the most important line, don't raise it. A near-whisper is louder than a shout.",
  "If you lose your place, pause and repeat your last point slowly. The audience will never know.",
  "Land the ending and stop. Don't add 'so, yeah, anyway...' — say your last line, hold one beat, then move to business.",
  "Practice standing up, out loud, at real volume. Reading silently is not rehearsal.",
  "Record yourself once. You'll fix more in five minutes of listening than in five run-throughs.",
  "Names and numbers are your anchors — say them slowly and clearly: 33 miners. 69 days. 2,041 feet.",
  "Tie the last line of the story to the first minute of your business agenda. The story is the doorway, not the detour.",
];

/* Rhetorical hooks the AI generator + builder can lean on. */
const OPENING_LINES = [
  "Let me take you somewhere for a minute.",
  "Before we get into the numbers, I want to tell you a quick story.",
  "I found a story this week I can't stop thinking about.",
  "Here's a piece of history that belongs in this shop.",
];

/* =========================================================================
   THE LIBRARY
   ~2–3 minutes each at a comfortable speaking pace (~130 wpm).
   ========================================================================= */
const STORIES = [
  {
    id: "chilean-miners",
    title: "The 33: Sixty-Nine Days Underground",
    region: "Chile",
    year: "2010",
    era: "Modern era",
    tags: ["mining", "rescue", "chile", "latin america", "survival", "leadership", "communication", "underground", "trapped", "hope"],
    hook: "In August 2010, half a mile of rock collapsed on top of thirty-three men — and the world found out what discipline really looks like.",
    story: [
      "The San José copper mine in Chile's Atacama Desert caved in on August 5th, 2010. Thirty-three miners were sealed 2,300 feet underground — deeper than most skyscrapers are tall — with a shelter stocked for two days. Nobody on the surface knew if they were alive. Most experts privately assumed they weren't.",
      "Down in the dark, shift foreman Luis Urzúa did something remarkable: he treated survival like a job. He rationed food to two spoonfuls of tuna every 48 hours. He kept shifts, kept roles, kept routines. One man ran health checks. One kept spirits up. One mapped the tunnels. Every man had a purpose, because Urzúa knew that a man with a job has a reason to get up tomorrow.",
      "For seventeen days, drills bored blind holes through solid rock, hunting for them. On day 17, a drill bit came back to the surface with a note taped to it, written in red marker: 'Estamos bien en el refugio, los 33' — 'We are well in the shelter, the 33.' All of them. Alive. Together.",
      "It took 69 days total, three competing drill plans running at once, and a rescue capsule built with help from NASA. On October 13th, one by one, all thirty-three men rode a 22-minute elevator through half a mile of rock back into the light. Last man out? Luis Urzúa — the captain, off the ship last. Not one man was lost.",
    ],
    bridges: {
      safety: "Here's what stays with me. That rescue was a miracle of engineering — but it should never have been needed. That mine had a record of skipped safety upgrades; the escape ladders in the ventilation shaft were never finished. Two days of shortcuts put thirty-three men under a mountain for sixty-nine days. Every procedure we follow in this shop is somebody's escape ladder. We finish ours.",
      teamwork: "Thirty-three men, two spoonfuls of tuna, total darkness — and not one fistfight, because every man had a role and every man trusted the man next to him. They voted on decisions. They shared everything equally. Under pressure, a real team gets tighter, not looser. That's the standard.",
      resilience: "Seventeen days with no proof anyone was even looking for them. They could have given up on day five and nobody would blame them. Instead they organized, rationed, and acted like rescue was coming — until it did. Hope isn't a feeling. Hope is a routine you keep when you can't see the end yet.",
    },
    funFact: "The rescue capsule, Fénix 2, was painted white, blue, and red — the colors of the Chilean flag — and is now in a museum in Copiapó.",
  },

  {
    id: "golden-gate-net",
    title: "The Halfway-to-Hell Club",
    region: "United States",
    year: "1933–1937",
    era: "Great Depression",
    tags: ["construction", "bridge", "san francisco", "safety net", "innovation", "ppe", "hard hats", "fall protection", "productivity"],
    hook: "In the 1930s, bridge building had a grim rule of thumb: one worker dead for every million dollars spent. One engineer refused to accept the math.",
    story: [
      "When construction started on the Golden Gate Bridge in 1933, the industry had an accepted formula: one man killed for every million dollars of budget. The Golden Gate was a $35 million job. Everyone knew what that was supposed to mean — thirty-five funerals. It was just the cost of doing business.",
      "Chief engineer Joseph Strauss decided the math was wrong. He made hard hats mandatory — one of the first job sites in America to do it. He put men in respirators and tinted goggles against the wind and lead paint fumes. He fired workers for showboating on the steel, no second chances.",
      "Then he did the thing everyone called a waste of money: he spent $130,000 — millions in today's dollars — on a giant trapeze net, slung under the entire bridge deck, from tower to tower. People laughed. Nets were for circuses.",
      "Over four years, that net caught nineteen falling men. They survived, walked away, and formed a club with a name only ironworkers could invent: the Halfway-to-Hell Club. And here's the part nobody predicted — work got faster. Men who weren't terrified of dying moved with confidence. The 'wasted' money paid for itself in speed. Safety didn't slow the job down. Safety was the speed.",
    ],
    bridges: {
      safety: "Every harness, every guard, every lockout tag in this shop is our net. It can look like overhead right up until the day it catches somebody. Nineteen families got their guy home because one engineer treated 'acceptable losses' as unacceptable. In this shop, the acceptable number is zero — same as Strauss's.",
      efficiency: "Everyone assumed the net was money down the drain. Instead, confident workers moved faster and the job beat expectations. That's the lesson for us: the safe way and the fast way are usually the same way, because fear, rework, and injuries are the real time thieves.",
      quality: "Strauss sweated details other builders shrugged at — hats, goggles, nets, discipline on the steel. That same mindset built a bridge that's still standing over the Pacific ninety years later. People who care about the small stuff build things that last. That's true of bridges and it's true of boom trucks.",
    },
    funFact: "The bridge's 'International Orange' color was supposed to be temporary primer — but the architect fought to keep it, and it became one of the most recognized colors in the world.",
  },

  {
    id: "panama-canal",
    title: "The Man Who Beat the Mosquito",
    region: "Panama",
    year: "1904–1914",
    era: "Early 20th century",
    tags: ["panama", "canal", "latin america", "disease", "yellow fever", "malaria", "engineering", "root cause", "prevention", "gorgas"],
    hook: "The French tried to dig the Panama Canal first. They lost twenty thousand workers — not to accidents, but to something nobody could see.",
    story: [
      "In the 1880s, France — fresh off building the Suez Canal — attacked Panama with the best engineers in the world. Nine years later they quit in total collapse. Machines rusted in the jungle, and more than 20,000 workers were dead. The killers were yellow fever and malaria, and at the time, most experts blamed 'bad air' rising from the swamps.",
      "When the Americans took over in 1904, an Army doctor named William Gorgas made a claim most of the leadership thought was nonsense: the killer wasn't the air. It was the mosquito. And if you controlled the mosquito, you could control the deaths. His bosses nearly fired him. One official called the mosquito theory 'the veriest balderdash.'",
      "Gorgas fought for his program and got it. His crews drained standing water, screened every building, fumigated house by house, poured oil on breeding ponds, and built clean water systems so people didn't store rainwater in open barrels. It was unglamorous, repetitive, block-by-block work — thousands of small actions, every single day.",
      "The result: yellow fever was wiped out of the Canal Zone by 1906. Deaths from disease dropped by more than ninety percent. The canal opened in 1914 — one of the greatest construction feats in human history — and it was made possible not by a bigger shovel, but by a doctor who attacked the root cause everyone else couldn't see.",
    ],
    bridges: {
      safety: "The French didn't fail from lack of effort — they failed because they fought the symptom and ignored the cause. That's what a near-miss report is for. That's what a hazard walk is for. The dangers that hurt people in shops are usually the quiet ones we've stopped seeing. Find the mosquito, not the bad air.",
      efficiency: "Twenty thousand deaths versus a finished canal — same jungle, same job. The difference was root cause thinking. When the same problem keeps biting us — a comeback, a parts delay, a bottleneck — we can swat at it forever, or we can drain the pond it breeds in. This week, let's drain a pond.",
      resilience: "Gorgas was mocked, underfunded, and nearly fired for a theory that turned out to save the whole project. He kept methodically doing the work until the results spoke. When you know the right way, patience plus persistence beats being popular.",
    },
    funFact: "Ships crossing Panama are lifted 85 feet above sea level through the locks — essentially a water elevator — and the canal cut the New York–San Francisco voyage by about 8,000 miles.",
  },

  {
    id: "inca-roads",
    title: "The Chasquis: A Message Faster Than a Horse",
    region: "Peru / Inca Empire",
    year: "1400s",
    era: "Inca Empire",
    tags: ["inca", "peru", "latin america", "roads", "runners", "communication", "logistics", "relay", "handoff", "infrastructure", "andes"],
    hook: "Five hundred years ago, with no horses, no wheels, and no writing, the Incas moved messages across the Andes faster than the Roman Empire ever moved them on roads built for armies.",
    story: [
      "At its peak, the Inca Empire ran 2,500 miles down the spine of South America — the biggest empire in the Americas, stitched across some of the most brutal terrain on Earth. Holding it together was the Qhapaq Ñan: nearly 25,000 miles of engineered roads, hung with rope suspension bridges over gorges, cut with stone staircases up cliff faces.",
      "But the roads were only half the system. The other half was human: the chasquis. These were relay runners, trained from youth, stationed in small huts every mile or two along the road. A runner sprinted his short leg at full speed, and as he approached the next station he blew a conch-shell horn — so the next man was already up, already moving, matching pace when the handoff came.",
      "The message — spoken word, or knotted cords called quipus — passed at a dead run, day and night, rain or altitude be damned. The relay could move a message 150 miles in a single day. There are accounts of fresh fish from the Pacific coast reaching the emperor's table in Cusco, high in the mountains, in about two days — hand to hand to hand.",
      "No single runner was fast enough to cross the empire. Nobody had to be. Every man ran his mile perfectly and handed off clean. The genius of the system wasn't speed — it was that it never dropped the baton.",
    ],
    bridges: {
      efficiency: "One runner sprinting his own short leg, then a clean handoff — that's a service shop. Intake to diagnosis, parts to bench, bench to QC, QC to the customer call. We're never slowed down by how fast one person runs. We're slowed down by fumbled handoffs. Smooth handoffs are speed.",
      teamwork: "The chasqui blew his horn before he arrived so the next runner was already at pace. That's what a good teammate does — communicates early, so the next person isn't starting cold. A heads-up call to parts, a note on the work order, a two-minute walk to dispatch: that's your conch shell.",
      quality: "A garbled message at any station poisoned everything down the line, so chasquis were trained relentlessly to pass information exactly. Same with us: the tech's notes, the writer's story on the work order, the parts label. Accuracy at each station is what makes the whole system trustworthy.",
    },
    funFact: "Parts of the Qhapaq Ñan are still walked today, and the road network is now a UNESCO World Heritage Site crossing six countries.",
  },

  {
    id: "chinampas",
    title: "The Floating Gardens of Tenochtitlan",
    region: "Mexico / Aztec Empire",
    year: "1300s–1500s",
    era: "Aztec Empire",
    tags: ["aztec", "mexico", "latin america", "tenochtitlan", "agriculture", "innovation", "engineering", "constraints", "productivity", "lake"],
    hook: "The Aztecs were told the only land left was a swampy island nobody wanted. So they built one of the largest cities on Earth — by farming on the water.",
    story: [
      "In 1325, the Mexica people — the Aztecs — arrived in the Valley of Mexico late. Every piece of good farmland was taken. What was left was a marshy island in the middle of a shallow lake. Most people would call that a dead end. They made it a capital.",
      "Their answer was the chinampa. Crews wove giant rectangular rafts of reeds and branches, staked them to the lake bed, and piled them high with mud dredged from the bottom and rotting vegetation — layer after layer, until a man-made island of black, rich soil rose above the waterline. Willow trees planted at the corners rooted down and anchored the whole thing permanently.",
      "These 'floating gardens' were freakishly productive. The lake watered the crops from below. The dredged muck was constant free fertilizer. The water around each plot held daytime heat overnight and protected against frost. A chinampa could turn out as many as seven harvests a year — some of the most productive farmland per square foot in the ancient world.",
      "By the time the Spanish arrived in 1519, Tenochtitlan held perhaps 200,000 people — bigger than London or Paris at the time — laced with canals and causeways, fed by gardens grown on a swamp nobody else wanted. The conquistadors wrote that they thought they were dreaming.",
    ],
    bridges: {
      efficiency: "The Aztecs didn't get more land — they got more out of the land they had. That's the mindset for a busy shop: before we ask for more bays, more people, more hours, we ask how much waste is hiding in the bays and hours we already own. Constraints don't kill great teams. They focus them.",
      quality: "A chinampa wasn't a quick hack — willow anchors, layered soil, maintained canals. It was built to produce for centuries, and some still produce today in Xochimilco. Quick fixes feed you once; built-right systems feed you forever. Build the fix that lasts.",
      growth: "Nobody handed the Mexica a manual for lake farming. They experimented, failed, adjusted, and stacked improvements generation after generation until 'worthless swamp' became the breadbasket of an empire. Every skill in this shop got built the same way — layer by layer. Keep stacking.",
    },
    funFact: "You can still visit working chinampas in Xochimilco, Mexico City — they've been farmed continuously for around 700 years.",
  },

  {
    id: "bolivar-andes",
    title: "Bolívar's Impossible Road to Boyacá",
    region: "Venezuela / Colombia",
    year: "1819",
    era: "Latin American independence",
    tags: ["bolivar", "colombia", "venezuela", "latin america", "independence", "andes", "military", "surprise", "sacrifice", "liberator"],
    hook: "In 1819, Simón Bolívar looked at the flooded plains, the freezing Andes, and the impossible route — and chose it, precisely because it was impossible.",
    story: [
      "By 1819, Simón Bolívar had been fighting for South American independence for nearly a decade, and Spain still held New Granada — modern Colombia — behind the wall of the Andes. Every sane route was watched. So Bolívar picked the insane one: cross the flooded plains of the Casanare in the rainy season, then go over the Páramo de Pisba — a freezing, 13,000-foot high-altitude pass that the Spanish considered impassable. Which is exactly why they weren't guarding it.",
      "The march was brutal beyond anything the army had imagined. For a week they waded chest-deep through flooded lowlands. Then came the climb — plainsmen and barefoot soldiers from tropical country walking into sleet and thin air with no cold-weather gear. Horses died. Men died. Weapons were lost in rivers. By the time they came down the far side, the army looked like a rumor of itself.",
      "But they were on the wrong side of the wall — the side where no Spanish army was waiting. The local population fed them, clothed them, and reinforced them. Bolívar gave his men a few days to become an army again, then moved fast before word could spread.",
      "On August 7th, 1819, at the bridge of Boyacá, his force shattered the Spanish army in about two hours and took nearly the whole force prisoner. Three days later Bolívar rode into Bogotá. The 'impossible' road turned out to be the door — because the hardest way in was the least defended.",
    ],
    bridges: {
      resilience: "Every man on that march wanted to turn back somewhere in the Pisba pass — and the whole campaign was won in the exact stretch where quitting made the most sense. Some weeks in this shop feel like the páramo: cold, uphill, no end in sight. Those are the weeks that decide everything. Keep walking; the far side is closer than it looks.",
      teamwork: "The army that froze together on that mountain came down the other side welded together — and the local people carried them the rest of the way with food, clothes, and fresh horses. Nobody does the impossible alone. The crew that suffers together and supports each other wins together.",
      efficiency: "Bolívar won at Boyacá before a shot was fired — in the planning. He studied what his opponent assumed and attacked the assumption. When we plan a big job, the question isn't just 'what's the standard route?' It's 'what is everyone assuming that might not be true?' That's where the breakthroughs hide.",
    },
    funFact: "Bolívar is the only person in history to have two countries named after him — Bolivia, and Venezuela's official name, the Bolivarian Republic of Venezuela.",
  },

  {
    id: "san-martin",
    title: "San Martín and the Army Built in a Workshop",
    region: "Argentina / Chile",
    year: "1814–1817",
    era: "Latin American independence",
    tags: ["san martin", "argentina", "chile", "latin america", "independence", "andes", "logistics", "planning", "preparation", "mendoza", "workshop"],
    hook: "José de San Martín spent three years preparing for a march that took twenty-one days. That ratio is the whole story.",
    story: [
      "In 1814, Argentine general José de San Martín took a modest job as governor of Mendoza, a quiet town at the foot of the Andes. It looked like a demotion. It was actually the plan: he had decided that the only way to free Chile — and eventually Peru — from Spanish control was to build an army from scratch and take it over the Andes, over passes higher than anything Hannibal ever touched.",
      "For three years, Mendoza became one giant workshop. San Martín built foundries to cast cannons, powder mills, textile shops where local women wove uniforms and blankets. A brilliant friar-turned-engineer, Luis Beltrán, designed special carriages and rope-and-pulley systems to haul artillery up mountain trails. San Martín counted everything: mules — more than 9,000 of them — horseshoes, jerky, garlic and onion for altitude sickness. He interviewed muleteers about every pass. Nothing was left to 'we'll figure it out.'",
      "In January 1817, the Army of the Andes — around 5,000 soldiers and thousands of support animals — crossed through passes above 12,000 feet, split into columns on six different routes to confuse the Spanish. The crossing took about three weeks. It was hell on men and animals, but the army arrived on the Chilean side intact, armed, supplied — and where the enemy least expected it.",
      "On February 12th, 1817, at Chacabuco, San Martín's fresh-from-the-mountains army routed the royalist force. Chile's independence followed. Historians rank the crossing with the greatest military operations ever staged — and the battle was won in the workshop years before it was won on the field.",
    ],
    bridges: {
      efficiency: "Three years of preparation, three weeks of execution, two hours of battle. The work you don't see — the staging, the checklists, the parts pulled the night before — is where the job actually gets won. A slow hour of setup buys a fast day of wrenching. Plan like San Martín.",
      teamwork: "That army was soldiers, sure — but it was also blacksmiths, weavers, muleteers, and a friar who happened to be a mechanical genius. Every trade mattered. Our shop is the same: the techs turn the wrenches, but parts, dispatch, admin, and the service writers are the supply line. No supply line, no victory.",
      growth: "San Martín interviewed muleteers — the working guys who actually knew the mountain — and treated their knowledge like gold. The best leaders learn from the people closest to the work. If you know something the plan is missing, speak up. And if you're planning, ask the person who's been up the mountain.",
    },
    funFact: "Friar Luis Beltrán, the army's chief engineer, reportedly said that if the cannons needed wings to cross the Andes, wings they would have.",
  },

  {
    id: "puebla",
    title: "Cinco de Mayo: The Day the Underdogs Held the Hill",
    region: "Mexico",
    year: "1862",
    era: "French intervention in Mexico",
    tags: ["mexico", "latin america", "cinco de mayo", "puebla", "zaragoza", "underdog", "defense", "preparation", "morale"],
    hook: "Most people think Cinco de Mayo is Mexican independence day. It's actually the story of a badly outnumbered, badly equipped team that refused to lose.",
    story: [
      "In 1862, the French army was considered the best in the world — it hadn't lost a major battle in fifty years. Napoleon III sent it to Mexico to collect debts and, while he was at it, install an empire. Around 6,000 professional French soldiers marched toward Mexico City. In their path was the city of Puebla, defended by roughly 2,000 Mexicans — many of them farmers with old rifles and machetes — under a 33-year-old general named Ignacio Zaragoza.",
      "The French commander was so confident he reportedly wrote home that Mexicans wouldn't stand and fight. Zaragoza couldn't match the French in equipment or numbers, so he matched them in preparation. He fortified two hilltop positions, Loreto and Guadalupe, studied the ground, and placed his people exactly where their courage would count most.",
      "On May 5th, the French did the arrogant thing: a frontal assault uphill, straight at the forts, three separate times. Zaragoza's line bent and held, bent and held. Rain turned the slopes to mud. By evening, the French army — the best in the world — was retreating, leaving hundreds of casualties on the hillside.",
      "Strategically, it was one battle in a longer war. But the news electrified Mexico: the invincible army wasn't invincible. Zaragoza's report home became legend: 'The national arms have been covered with glory.' Puebla proved that preparation, terrain, and heart can beat reputation, budget, and arrogance.",
    ],
    bridges: {
      teamwork: "Zaragoza's army was regulars, farmers, and townspeople — a patchwork crew that had every excuse to scatter. They held because they held together, and because their leader put every person where their strengths counted. On a tough week, a united shop full of 'ordinary' people beats a divided one full of stars. Every time.",
      resilience: "Three uphill assaults from the best army in the world, and the line bent but never broke. Pressure doesn't ask if you're ready — it just shows up. What Puebla teaches is that you don't have to be bigger than the problem. You have to outlast its third push.",
      quality: "The French lost to overconfidence — they didn't respect the ground, the rain, or the defenders, so they skipped the homework. Reputation doesn't hold a hill, and reputation doesn't torque a bolt. The moment we think we're too experienced to double-check is the moment we become the French at Puebla.",
    },
    funFact: "Cinco de Mayo is actually a bigger celebration in the United States than in most of Mexico — where the real national holiday is September 16th, Independence Day.",
  },

  {
    id: "maya-astronomers",
    title: "The Maya: Measuring the Sky Without a Telescope",
    region: "Mesoamerica",
    year: "~250–900 AD",
    era: "Classic Maya",
    tags: ["maya", "latin america", "astronomy", "mathematics", "data", "measurement", "records", "kpi", "precision", "calendar", "zero"],
    hook: "With no telescopes, no clocks, and no metal tools, Maya astronomers measured the length of a year more accurately than the calendar Europe was using seven hundred years later.",
    story: [
      "Deep in the rainforests of Central America, Maya astronomer-priests spent centuries doing something that sounds simple and is brutally hard: writing down what they saw. Every sunrise. Every appearance of Venus. Every eclipse. Not for one year, or ten — for generations, each observer adding rows to records their grandchildren would keep extending.",
      "They watched from purpose-built observatories, like El Caracol at Chichén Itzá, with windows aligned to catch specific events on the horizon. And they had a secret weapon most ancient civilizations lacked: a true concept of zero, and a place-value number system that let them calculate across millions of days without losing track.",
      "The results are staggering. Their Venus tables, preserved in the Dresden Codex, predict the planet's 584-day cycle with an error of roughly a day per century. Their solar year calculations were more accurate than the Julian calendar that Europe was still using when the Spanish arrived. They predicted eclipses. They scheduled planting, ceremonies, and politics off their data.",
      "Here's the thing: no single Maya observer ever saw the pattern alone. One lifetime of sky-watching is just weather. The power came from small, honest measurements, recorded the same way, stacked up over centuries — until the data revealed truths no genius could have guessed in a single sitting.",
    ],
    bridges: {
      quality: "The Maya records only worked because every entry was honest and consistent — one sloppy scribe could poison a century of data. It's the same with our numbers: hours on the work order, inspection checklists, comeback tracking. Measured honestly, our data tells us the truth about ourselves. And the truth is the only thing we can improve.",
      efficiency: "Why do we track KPIs every single week? Same reason the Maya logged Venus every single night: one data point is a story, a hundred data points are a pattern, and patterns are where the improvements hide. The boring, repeated measurement is the most powerful tool in the building.",
      growth: "Each Maya astronomer inherited the records, added their rows, and passed them on better than they found them. That's a shop's knowledge too — every trick a senior tech writes down or teaches forward is a row in the codex. Leave the records better than you found them.",
    },
    funFact: "The Maya were one of only a handful of civilizations in human history to independently invent the concept of zero.",
  },

  {
    id: "quipu",
    title: "The Quipu: An Empire Run on Knots",
    region: "Peru / Inca Empire",
    year: "1400s–1500s",
    era: "Inca Empire",
    tags: ["inca", "peru", "latin america", "quipu", "records", "accounting", "accuracy", "data", "inventory", "administration", "office"],
    hook: "The Inca Empire ran ten million people, thousands of warehouses, and a continental road system — without a single written word. Their database was made of string.",
    story: [
      "The Inca Empire had no writing. Think about what that should make impossible: no invoices, no inventory sheets, no census, no tax records. And yet the Incas ran one of the most precisely administered states in the ancient world. Their answer was the quipu — a fist-sized bundle of colored cords hanging from a main cord, with information encoded in knots.",
      "The type of knot, its position on the cord, the cord's color and order — all of it meant something, in a base-ten system just like ours. A quipu could record a warehouse's exact contents, a province's population by category, llama herds, cloth production, grain reserves. Specialists called quipucamayocs — 'keepers of the knots' — were trained for years to tie, read, and audit them.",
      "And they were auditors in the full sense. The empire kept duplicate quipus in separate locations and compared them to catch errors — or fraud. Spanish chroniclers were stunned: one wrote that the knots were so exact that a single missing sandal from a storehouse would be noticed. When records disagreed, the discrepancy itself was the alarm bell.",
      "Because the records could be trusted, the whole machine worked: warehouses along the roads stayed stocked, labor taxes were fair and tracked, and when a crop failed in one province, administrators knew exactly which storehouses could cover the gap. An empire of ten million people stood on the accuracy of people most of history never names — the record keepers.",
    ],
    bridges: {
      quality: "One knot tied wrong could mean a village going hungry, so the keepers checked each other's work as a matter of routine. Our work orders, part numbers, and PO lines are our knots. The person who catches the error before it ships doesn't slow the system down — they ARE the system.",
      efficiency: "The Incas could move grain to a starving province fast because they always knew what was where. Accurate records aren't paperwork for its own sake — they're speed stored up for the future. Every clean record we make today is a search we don't have to do at some critical moment later.",
      teamwork: "The quipucamayocs never swung a pick or fought a battle, but no warehouse, army, or city functioned without them. In this shop, the people who keep the records, order the parts, and schedule the work are the keepers of the knots. The wrenches can't win without them.",
    },
    funFact: "Researchers still haven't fully decoded quipus — some may contain narrative history, not just numbers, meaning there could be Inca 'books' we can't read yet.",
  },

  {
    id: "aqueducts",
    title: "Built to Outlive the Builders: Rome's Aqueducts",
    region: "Roman Empire",
    year: "~312 BC – 100 AD",
    era: "Ancient Rome",
    tags: ["rome", "roman", "aqueduct", "engineering", "precision", "craftsmanship", "maintenance", "standards", "pont du gard", "infrastructure"],
    hook: "Roman engineers built water systems so precise that some of them still work — two thousand years after the last builder died.",
    story: [
      "Ancient Rome at its height used more water per person than many modern cities — feeding fountains, baths, homes, and industry. That water traveled dozens of miles from mountain springs, and almost all the way it moved by gravity alone. No pumps. No pressure systems. Just a channel falling a tiny, perfectly controlled amount, mile after mile.",
      "How tiny? The Pont du Gard aqueduct in southern France drops about 12 meters over 50 kilometers — an average grade of roughly one inch per 300 feet. Too steep and the water tears up the channel; too flat and it stagnates. Roman surveyors held that tolerance across valleys, hills, and tunnels using water levels, sighting instruments, and endless careful measurement — no lasers, no GPS.",
      "And they built for the long haul. Inspection shafts every so often so crews could get in and maintain the channel. Waterproof linings. Settling tanks to catch debris. Rome even had a water commissioner — Frontinus — who wrote a technical manual on the system, proudly comparing his 'indispensable' aqueducts to the 'idle' pyramids.",
      "The payoff for all that discipline: the Aqua Virgo, completed in 19 BC, still feeds Rome's Trevi Fountain today. Two thousand years of service, because the people who built it refused to be sloppy about an inch per three hundred feet — on work they knew would mostly be buried underground where no one would ever see it.",
    ],
    bridges: {
      quality: "Most of an aqueduct is invisible — buried channels no citizen would ever admire. The Romans built those hidden miles to the same standard as the famous arches. That's the real definition of craftsmanship: the quality of the work nobody will ever see. The inside of a panel, the underside of a deck — build it all like it's the Trevi Fountain.",
      safety: "The Romans put inspection shafts in from day one, because they knew every system degrades and planned for humans to check it. That's what our PMs and inspections are — designed-in access to catch small problems while they're still small. Skipping an inspection is bricking over the shaft.",
      growth: "Frontinus wrote the manual so the next generation wouldn't have to rediscover what his generation knew. Documenting what you know isn't busywork — it's how a two-thousand-year system gets built. Show the apprentice. Write the note. Pass the water down the line.",
    },
    funFact: "Rome's water commissioner Frontinus used flow measurements to catch people illegally tapping the aqueducts — water theft audits, two thousand years before smart meters.",
  },

  {
    id: "cincinnatus",
    title: "Cincinnatus: The Man Who Gave the Power Back",
    region: "Roman Republic",
    year: "458 BC",
    era: "Ancient Rome",
    tags: ["rome", "roman", "leadership", "humility", "duty", "character", "farmer", "dictator", "washington", "service"],
    hook: "Rome once handed one farmer absolute power over the entire state. Sixteen days later, he handed it back and went home to finish his plowing.",
    story: [
      "In 458 BC, a Roman army was trapped in the mountains, surrounded, days from annihilation. The Republic had an emergency protocol for moments like this: appoint a dictator — one man with total, absolute authority — for up to six months. The Senate knew who they wanted, and the messengers found him not in a palace but behind a plow: Lucius Quinctius Cincinnatus, a former consul who had lost most of his wealth and was working a small farm across the Tiber with his own hands.",
      "The story goes that he wiped off the sweat, put on his toga, heard the news, and took command that day. He drafted every man of fighting age, marched them out, and executed a night maneuver that surrounded the surrounding army. The enemy, trapped between two Roman forces, surrendered. The campaign was over almost before it began.",
      "Here's the part Rome never forgot. Cincinnatus now held absolute power, legally, for months to come — armies, treasury, everything. Kings have started wars to get less. He held it for about sixteen days: long enough to finish the job, settle the army, and thank his people. Then he resigned the dictatorship and walked back to his plow.",
      "For the rest of Roman history, Cincinnatus was the measuring stick for leadership: the man who treated power as a task, not a prize. Two thousand years later, when George Washington shocked the world by resigning his command after winning the Revolution, everyone reached for the same name — and Washington's officers had already founded the Society of the Cincinnati in his honor. There's a city in Ohio named for it.",
    ],
    bridges: {
      teamwork: "Cincinnatus took the lead when the moment demanded it, and stepped back the moment the job was done — no ego on the way in, no ego on the way out. The best crews work like that: whoever's closest to the problem leads, everyone else supports, and nobody keeps score of the title. Step up, finish it, hand it off.",
      growth: "Character is a skill you build before the emergency, not during it. Rome trusted Cincinnatus with everything because of how he'd handled small things for decades. Every unglamorous job done right in this shop is a deposit in that same account — and someday the big moment will make a withdrawal.",
      resilience: "Cincinnatus had lost his fortune and been humbled to a small farm — and he answered the call anyway, without bitterness. Setbacks don't disqualify you from mattering. Some of the most important people in the building are the ones who've been knocked down and still show up ready to serve.",
    },
    funFact: "Washington was called 'the American Cincinnatus.' King George III reportedly said that if Washington truly gave up power voluntarily, he would be 'the greatest man in the world.'",
  },

  {
    id: "hannibal",
    title: "Hannibal: Elephants Over the Alps",
    region: "Carthage / The Alps",
    year: "218 BC",
    era: "Ancient — Punic Wars",
    tags: ["hannibal", "carthage", "alps", "elephants", "military", "audacity", "logistics", "problem solving", "improvisation", "rome"],
    hook: "Rome was certain of one thing: no army could come at them over the Alps. Hannibal built his entire war on the word 'no army.'",
    story: [
      "In 218 BC, Carthage and Rome went to war for the second time, and Rome controlled the sea. Any invasion of Italy by water would be intercepted. So the 29-year-old Carthaginian general Hannibal Barca chose the route his enemy had ruled out completely: overland from Spain, across the Rhône River, and over the Alps — in autumn, as the snows began — with tens of thousands of soldiers, cavalry, pack animals, and thirty-seven war elephants.",
      "Every stage was a problem nobody had solved before. At the Rhône, his engineers built giant earth-covered rafts to ferry elephants across a river — some panicked, swam, and made it anyway. In the mountains: ambushes from hill tribes, trails that crumbled under the column, snow over ice from an earlier fall, animals sliding off precipices.",
      "The famous moment came near the top, where a landslide had erased the trail entirely. The army was stuck, freezing, starving. Hannibal's engineers heated the blocking rock with huge bonfires, then — as the ancient historians tell it — poured sour wine and vinegar over it so the stone cracked and could be pried apart. They rebuilt the path by hand, wide enough for elephants, and the army walked through the mountain rather than over it.",
      "Fifteen days after entering the Alps, Hannibal came down into Italy. He had paid a terrible price in men and animals — but he was standing where Rome had bet everything he could never stand. He then beat Roman armies on their own soil for fifteen years. Whatever else you say about Hannibal, he never met a wall he treated as final.",
    ],
    bridges: {
      resilience: "The landslide didn't care about the plan — the trail was just gone. Hannibal's crew didn't vote on whether the obstacle was fair; they built fires and started cracking rock. Some weeks the trail disappears on us too: a backorder, a failed part, a schedule blown to pieces. The move is always the same. Work the rock in front of you.",
      efficiency: "Hannibal's edge wasn't strength — Rome had more of everything. His edge was attacking assumptions. 'It can't be done' usually means 'nobody has done it yet.' When a job looks impossible under the standard approach, that's not the end of thinking. That's the start of it.",
      teamwork: "Engineers, muleteers, cavalry, local guides — the crossing succeeded because dozens of different skills attacked each obstacle together, and Hannibal was on the trail with them, not behind them. Big obstacles don't get moved by the strongest person. They get moved by the most united crew.",
    },
    funFact: "Historians still argue about exactly which Alpine pass Hannibal used — expeditions have searched for elephant traces for decades — but at least one elephant, Surus ('the Syrian'), survived and became Hannibal's personal mount.",
  },

  {
    id: "shackleton",
    title: "Shackleton: Not One Man Lost",
    region: "Antarctica",
    year: "1914–1916",
    era: "Age of Exploration",
    tags: ["shackleton", "antarctica", "endurance", "leadership", "survival", "morale", "safety", "expedition", "ice", "rescue"],
    hook: "Ernest Shackleton set out to cross Antarctica and failed completely. It became the greatest leadership story ever told — because of what he refused to lose.",
    story: [
      "In 1915, Ernest Shackleton's ship Endurance was gripped by pack ice in the Weddell Sea off Antarctica, crushed slowly over months, and finally swallowed. Twenty-eight men stood on drifting sea ice at the bottom of the world — no ship, no radio contact, no rescue coming, a thousand miles from any outpost. That day, Shackleton quietly changed the mission. Crossing Antarctica was dead. The new mission had one metric: every man home alive.",
      "For almost five months they camped on a drifting ice floe. Shackleton managed morale like a resource — as carefully as food. He kept routines, duties, music nights, exercise. He put the pessimists in his own tent so their doubt couldn't spread. He watched each man for the early signs of breaking, and got there first with a job, a word, or an extra ration.",
      "When the ice broke up, they sailed three small open boats to a barren rock called Elephant Island. From there, Shackleton and five men made one of the most desperate voyages in history: 800 miles across the worst ocean on Earth in a 22-foot lifeboat, navigating by a few seconds of sun sighting between storms. They hit South Georgia Island — then had to cross its unmapped glaciers on foot, with screws from the boat driven through their boot soles for traction, to reach the whaling station.",
      "Shackleton immediately turned around to get his men. Ice turned him back three times. On the fourth attempt, on August 30th, 1916 — 128 days after leaving Elephant Island — he reached them. All twenty-two were alive. Twenty-eight men went into the ice; twenty-eight came home. The expedition failed. The leader didn't.",
    ],
    bridges: {
      safety: "When the ship sank, the goal changed instantly: nothing mattered more than every man home alive. That's the exact sentence this shop runs on. Deadlines, targets, tough customers — all real, and all secondary. Any goal can be rebuilt. The one metric we never sacrifice is everyone going home whole tonight.",
      teamwork: "Shackleton knew morale is contagious in both directions — he kept the doubters close and gave every man a duty, because idle fear eats a crew alive. We're the same. On the hard weeks, check on each other, keep each other busy and included. The crew that guards its spirit survives the ice.",
      resilience: "Three times the ice turned his rescue boat back, and three times he refueled and went again. Persistence isn't dramatic — it's just refusing to make 'no' permanent. Whatever turned you back this week gets another attempt next week. That's the whole secret.",
    },
    funFact: "The wreck of Endurance was found in 2022, two miles deep in the Weddell Sea — nearly perfectly preserved, her name still bright across the stern.",
  },

  {
    id: "apollo13",
    title: "Apollo 13: Working the Problem",
    region: "United States / Space",
    year: "1970",
    era: "Space Race",
    tags: ["nasa", "apollo", "space", "problem solving", "checklists", "procedures", "training", "improvisation", "houston", "crisis"],
    hook: "Two hundred thousand miles from Earth, an oxygen tank exploded — and the most famous repair job in history was done with cardboard, plastic bags, and duct tape.",
    story: [
      "In April 1970, Apollo 13 was 200,000 miles from Earth when an oxygen tank exploded and gutted the spacecraft's power and life support. Jim Lovell's radio call — 'Houston, we've had a problem' — kicked off four days where three astronauts' lives depended entirely on how a team handles a crisis.",
      "Flight director Gene Kranz set the tone in the first minutes, and it's a masterclass. No blame. No panic. His words: 'Work the problem, people. Let's not make things worse by guessing.' Mission control broke the catastrophe into small, solvable pieces: power first, trajectory next, water, air — one problem at a time, decided on data, not fear.",
      "The most famous piece: carbon dioxide was building up in the lunar module, and the square filters from the dead command module didn't fit the round openings. Engineers on the ground dumped a pile of items onto a table — only things the crew actually had on board — and built an adapter out of a cardboard flight-plan cover, plastic bags, a sock, a hose, and duct tape. Then they wrote step-by-step instructions and read them up, line by line, to men exhausted, freezing, and dehydrated. The crew built it. CO2 levels dropped almost immediately.",
      "Four days after the explosion, the capsule splashed down in the Pacific with all three astronauts alive. NASA called it the 'successful failure' — because the mission was lost but the system worked: the training, the procedures, the simulations, and thousands of people on the ground pulling for three men in a broken ship. Nobody froze, because everyone had rehearsed being in trouble.",
    ],
    bridges: {
      teamwork: "The astronauts got the fame, but the fix was built by people in a back room with a cardboard box — and flown by men humble enough to follow instructions read over a radio. Egos would have killed that crew. On a crisis job, the only question that matters is 'what does the problem need?' — never 'whose idea wins?'",
      quality: "The duct-tape fix looks like improvisation, but listen closer: procedures written, checked, and read step-by-step before anyone touched a thing. 'Work the problem' means slow is smooth and smooth is fast — even with lives on the line, they didn't guess. If NASA doesn't skip steps at 200,000 miles, we don't skip them at bay 3.",
      growth: "Kranz's teams had simulated failure after failure for years — so when the real one came, it felt almost familiar. That's what training is: buying calm in advance. Every drill, every cert class, every practice rep feels tedious right up until the day it's the only thing between you and panic.",
    },
    funFact: "The CO2 scrubber fix is known at NASA as 'the mailbox.' The actual duct tape roll is one of the most quietly heroic objects in the Smithsonian's collection.",
  },

  {
    id: "wright-brothers",
    title: "Two Bicycle Mechanics vs. the Best-Funded Lab in America",
    region: "United States",
    year: "1899–1903",
    era: "Dawn of flight",
    tags: ["wright brothers", "aviation", "mechanics", "testing", "iteration", "practice", "wind tunnel", "shop", "underdog", "kitty hawk"],
    hook: "In 1903 the U.S. government spent a fortune on a famous scientist to build the first airplane. He was beaten by two bike mechanics who out-practiced him.",
    story: [
      "At the turn of the century, the smart money on powered flight was on Samuel Langley — head of the Smithsonian, backed by $50,000 of government money and a professional staff. Meanwhile in Dayton, Ohio, two brothers who ran a bicycle repair shop were spending about a thousand dollars of their own bike-shop profits chasing the same dream. Nobody was betting on the bike guys.",
      "The difference was method. Langley's approach was to engineer everything on paper, then launch a complete, expensive machine off a houseboat roof — all-or-nothing. The Wrights worked like mechanics: test small, fail cheap, learn fast. When the published aerodynamic data gave them bad results, they didn't trust it — they built their own wind tunnel out of a wooden box and a fan and re-measured everything themselves, testing over two hundred wing shapes.",
      "And they practiced. This is the part people miss. Wilbur and Orville made about a thousand glider flights at Kitty Hawk before ever bolting on an engine. They believed you couldn't engineer your way past skill — a pilot had to learn wind the way a rider learns balance: reps, falls, adjustments, more reps.",
      "In the fall of 1903, Langley's Aerodrome launched twice and both times dropped straight into the Potomac River. Nine days after his second crash — December 17th, 1903 — the Wright Flyer lifted off the sand at Kitty Hawk and flew. Total program cost: about one-fiftieth of Langley's. The best-funded lab in America lost to a repair shop with a testing habit.",
    ],
    bridges: {
      growth: "A thousand practice glides before one powered flight — the Wrights treated skill like a part you manufacture through reps. Every diagnostic you talk through, every practice run, every cert class is a glide at Kitty Hawk. Talent gets you interested; reps make you dangerous. Get your reps.",
      quality: "When the official data looked wrong, the Wrights didn't shrug and use it anyway — they built a wind tunnel and verified it themselves. 'Trust but verify' is a mechanic's superpower. If the spec, the reading, or the diagnosis doesn't smell right, check it. Bad data crashes airplanes and comebacks alike.",
      efficiency: "Langley spent fifty times the money and got two splashes. The Wrights' edge wasn't budget — it was cheap, fast learning loops: test small, fix, repeat. We don't need the fanciest resources to be the best shop; we need the fastest honest feedback. Small experiments beat big excuses.",
    },
    funFact: "The Wrights flipped a coin to see who'd fly first. Wilbur won — and crashed. Three days of repairs later, it was Orville's turn, and his 12-second flight made history.",
  },

  {
    id: "nightingale",
    title: "Florence Nightingale: The Nurse Who Counted",
    region: "Crimea / Britain",
    year: "1854–1858",
    era: "Victorian era",
    tags: ["nightingale", "data", "statistics", "hygiene", "hospital", "kpi", "charts", "process improvement", "measurement", "sanitation"],
    hook: "The most lethal enemy in the Crimean War wasn't the battlefield — it was the hospital. One nurse proved it with a chart.",
    story: [
      "When Florence Nightingale arrived at the British army hospital in Scutari in 1854, wounded soldiers were surviving the battlefield and then dying in the wards. The hospital sat over broken sewers; the water was contaminated; supplies were chaos. That first winter, the death rate hit a level that's hard to say out loud: roughly forty percent of admitted patients were dying — and almost none of it from their wounds.",
      "Nightingale did two things at once. The visible one: she organized. Cleaning crews, laundry, kitchens, supply lines, night rounds with her famous lamp. After a sanitary commission flushed the sewers and fixed the ventilation, the death rate collapsed from about 42% to around 2% within months.",
      "The invisible thing turned out to matter even more: she counted. Nightingale was a trained mathematician, and she kept meticulous records of who died and why. Back in England, facing generals and politicians who ignored tables of numbers, she invented a new weapon — a visual chart, her 'rose diagram,' that showed preventable deaths as huge wedges dwarfing combat deaths. You didn't need to read a single number to feel it. The men in power looked at that picture and could no longer claim they didn't understand.",
      "Her data drove reforms through the army medical system, hospital design, and public sanitation across the Empire. She became the first woman elected to the Royal Statistical Society. Thousands of soldiers were saved by the lamp — millions since have been saved by the ledger.",
    ],
    bridges: {
      quality: "The hospital didn't feel like the killer — everyone was busy, everyone cared, and men kept dying anyway. It took honest measurement to see the truth past the effort. That's what our metrics are for: not to grade people, but to catch the invisible problem that hard work alone can't see.",
      safety: "Forty percent of those deaths were preventable — bad water, bad air, bad process — and it all felt 'normal' until someone measured it. The most dangerous hazards are the ones we've gotten used to. When we track near-misses and inspections honestly, we're doing exactly what Nightingale did: making the invisible killer visible before it collects.",
      efficiency: "Nightingale didn't just collect data — she made it impossible to ignore, turning columns of numbers into one picture that changed minds in a minute. When we review our KPIs on Wednesdays, that's the goal: not numbers for the wall, but a clear picture that tells us the one thing to fix next.",
    },
    funFact: "Nightingale's 'rose diagram' is considered a founding moment of data visualization — she was making infographics 160 years before the word existed.",
  },

  {
    id: "andon-cord",
    title: "The Cord That Stops the Line",
    region: "Japan",
    year: "1950s–present",
    era: "Post-war manufacturing",
    tags: ["toyota", "andon", "manufacturing", "quality", "empowerment", "stop work", "kaizen", "continuous improvement", "assembly line", "speak up"],
    hook: "Toyota gave every worker on the line the power to stop the entire factory. Competitors thought it was insane. It became the most copied idea in manufacturing.",
    story: [
      "In the 1950s, Toyota was a small player rebuilding in post-war Japan, and it couldn't afford the American way: run the line at all costs, then repair the defects in a giant rework yard at the end. Toyota's production genius, Taiichi Ohno, saw that yard for what it was — a monument to hidden problems. His principle: never pass a defect downstream, because downstream it only gets more expensive.",
      "So Toyota strung a cord — the andon cord — above the assembly line, within reach of every single worker. Anyone who spotted a problem pulled it. Music played, a board lit up showing the station, and the team leader came running. If the problem couldn't be fixed within moments, the line — the whole line — stopped. In most factories on Earth, a new hire stopping production would be a firing offense. At Toyota, it was the job description.",
      "Here's the counterintuitive part: leaders wanted the cord pulled. Thousands of pulls a day across a plant. Every pull was a problem caught at the moment and place it was born — small, cheap, and traceable — instead of buried in a thousand finished trucks. And every pull fed the deeper system: ask why five times, fix the root cause, and the line comes back stronger than it stopped.",
      "The results reshaped the industry. Toyota rose from a struggling upstart to the largest automaker in the world, with quality ratings competitors chased for decades. The great engine of that rise wasn't a machine. It was trust — a company betting that the person standing closest to the work sees the truth first, and building a cord to make sure everyone hears it.",
    ],
    bridges: {
      safety: "The andon cord is exactly what stop-work authority is in our world. If something looks wrong — a lift, a load, a live circuit, a rushed step — any person in this shop can stop the job, and I mean any person, first week or thirtieth year. You will never get in trouble for pulling the cord. The only bad pull is the one that didn't happen.",
      quality: "Never pass a defect downstream. The loose fitting you catch at your bench costs five minutes; the same fitting caught by the customer costs a comeback, a reputation, and maybe someone's safety. Whoever catches a problem where it was born is doing the most valuable work in the building.",
      teamwork: "When the cord got pulled, the team leader came running — not to blame, but to help. That's the culture worth copying: raising your hand about a problem is an act of loyalty to the team, and responding fast without finger-pointing is what keeps hands going up. Pull the cord. Answer the cord.",
    },
    funFact: "In many Toyota plants the andon 'cord' is now a yellow button, and each station triggers its own melody — veterans can tell where a problem is by which tune is playing.",
  },

  {
    id: "juana-azurduy",
    title: "Juana Azurduy: The General They Couldn't Stop",
    region: "Bolivia / Argentina",
    year: "1809–1825",
    era: "Latin American independence",
    tags: ["juana azurduy", "bolivia", "argentina", "latin america", "independence", "courage", "women in history", "guerrilla", "sacrifice", "perseverance"],
    hook: "The Spanish Empire spent sixteen years trying to stop one woman in the highlands of Bolivia. They never managed it.",
    story: [
      "Juana Azurduy was born in 1780 near Chuquisaca, in what's now Bolivia — a mestiza woman in a colonial world that had exactly zero roles available for her ambitions. When the wars of independence broke out in 1809, she and her husband, Manuel Padilla, chose the revolution. Both of them, together, all in.",
      "She didn't organize teas for the cause. She recruited and personally led cavalry — including a famous corps of indigenous women fighters called the Amazonas — in the guerrilla war for the highlands. In 1816, she led an assault on the Cerro Rico of Potosí, the richest silver mountain on Earth, and captured the Spanish standard. The revolutionary government made her a lieutenant colonel, sending her a general's sword. The men she commanded didn't follow her because it was polite. They followed her because she won.",
      "The price she paid is almost unbearable to list. Four of her children died of hunger and disease during campaigns in the wilderness. Her husband was killed rescuing her when she was wounded in battle; the royalists displayed his head on a pike. She fought on — pregnant with her fifth child, she reportedly gave birth on campaign near a riverbank and was fighting again within days.",
      "Bolivia won its independence in 1825 — the country is named for Bolívar, who traveled personally to salute her and reportedly said the new nation should have carried her name instead. Like too many heroes of the ranks, she died poor and nearly forgotten in 1862. Both Bolivia and Argentina have since made her a symbol of what refusing to quit actually looks like: not one glorious day, but sixteen relentless years.",
    ],
    bridges: {
      resilience: "Juana lost more than most of us can imagine and got up every single time — not because it stopped hurting, but because the mission mattered more than the setback. Nobody's asking sixteen years of that from us. But on the week a job goes sideways twice and the schedule collapses, her standard is worth remembering: grief and grit can ride the same horse.",
      teamwork: "The revolution didn't hand Juana a command because of her resume — she earned it in front of people who then followed her anywhere. Respect in a shop works the same way: it doesn't come from a title on the door, it comes from what your teammates watch you do when it's hard. Earn it daily; give it where it's earned.",
      growth: "No academy would train her, so she trained herself into one of the finest cavalry leaders on the continent. The door not being open is not the same as the door being locked. Whatever skill feels 'above your station' — diagnostics, leadership, a new cert — go take it. History belongs to the self-taught.",
    },
    funFact: "In 2015, a statue of Juana Azurduy replaced the Columbus statue behind Argentina's presidential palace — 190 years after Bolívar saluted her in person.",
  },

  {
    id: "ironbridge",
    title: "The Bridge Nobody Knew How to Build",
    region: "England",
    year: "1779",
    era: "Industrial Revolution",
    tags: ["iron bridge", "industrial revolution", "innovation", "first of its kind", "risk", "craftsmanship", "learning", "engineering", "shropshire"],
    hook: "In 1779, a crew of ironworkers built the world's first iron bridge — with no manual, no precedent, and no one alive who had ever done it before.",
    story: [
      "The Severn Gorge in Shropshire, England was the beating heart of the early Industrial Revolution — furnaces, foundries, and factories on both banks of a river that flooded violently and swallowed wooden bridges. The gorge needed a crossing that could survive it. Architect Thomas Pritchard proposed something that had never existed anywhere on Earth: a bridge made of cast iron.",
      "Nobody knew how to engineer an iron bridge, because there had never been one. There were no textbooks, no standards, no experienced crew to hire. So ironmaster Abraham Darby III and his men did the only thing available: they took the joints they knew from carpentry — dovetails, mortise-and-tenon, wedges — and translated them into 378 tons of cast iron, casting enormous one-piece ribs in sand molds and fitting them together like a giant timber frame, because that was the craft language they trusted.",
      "They erected the 100-foot main span over a working river without stopping the boat traffic below — scaffolding from within, floating pieces into place, working through the unknowns one rib at a time. The whole iron structure reportedly went up in about three months without serious injury, at a time when major construction routinely killed workers.",
      "The Iron Bridge opened on New Year's Day 1781, and it became a sensation — artists painted it, engineers pilgrimaged to it, and the town that grew around it is literally named Ironbridge. It still stands today, 240-plus years later: the first of every iron and steel bridge on Earth, built by a crew who started the job not knowing how to do it — and finished it knowing something no one else in the world knew.",
    ],
    bridges: {
      growth: "Every 'first time' job feels like the Iron Bridge — no manual, no one to copy. Darby's crew didn't freeze; they anchored in the fundamentals they'd mastered and extended them one careful step at a time. New model, new system, new tooling: same play. Strong fundamentals plus careful steps beats waiting for a manual that doesn't exist.",
      quality: "They could have slapped together something temporary. Instead, working at the edge of the possible, they over-built with pride — and it's still standing after two and a half centuries. When you're doing something for the first time is exactly when standards matter most, because you're setting the pattern everyone after you will follow.",
      resilience: "Half the town said iron would crack, sink, or bankrupt everybody — and Darby personally shouldered debt from the project for the rest of his life to see it stand. Betting on your own workmanship takes nerve. Sometimes the crew has to believe in the build before the world does.",
    },
    funFact: "With no precedent for iron construction, the builders used woodworking joints — dovetails and wedges — cast in metal. You can still see them on the bridge today.",
  },

  {
    id: "voladores",
    title: "El Tajín and the Flyers: Trust at the Top of the Pole",
    region: "Mexico / Totonac",
    year: "Ancient tradition, still performed",
    era: "Mesoamerica to today",
    tags: ["mexico", "latin america", "voladores", "totonac", "ritual", "trust", "training", "preparation", "heights", "fall protection", "tradition"],
    hook: "In Veracruz, Mexico, men climb a 100-foot pole, tie ropes to their ankles, and dive off backwards — and they've been doing it safely for centuries. The secret isn't courage.",
    story: [
      "The Danza de los Voladores — the Dance of the Flyers — is a ceremony of the Totonac people of Veracruz, Mexico, so old and so treasured that UNESCO lists it as a piece of humanity's cultural heritage. Five men climb a pole around ten stories tall. Four of them tie ropes around their ankles, lean back into open air, and fall — spinning outward in widening circles, upside down, thirteen revolutions each as the ropes unwind, while the fifth man stands on top playing a flute and drum.",
      "Thirteen turns times four flyers is fifty-two — the number of years in the sacred Mesoamerican calendar round. Every detail is deliberate: the selection of the tree, the blessing of the pole hole, the winding of the ropes. It looks like a stunt. It's actually a system, refined over centuries and passed down father to son.",
      "Here's what the crowd doesn't see. Flyers train for years before their first flight — many start as children in ceremonial schools, learning knots, rope care, wind judgment, and the exact discipline of the descent. The ropes are wound onto the pole a precise number of times, checked and re-checked, because the winding IS the machine: it controls the speed of every man's fall. The man on top — the caporal — is the most experienced of all, and he inspects everything before anyone leaves the ground.",
      "Generations of flyers have leaned back off that platform trusting three things completely: their training, their equipment, and the brothers who checked the knots beside them. That trust isn't a feeling — it's built one inspection, one practice, one honest check at a time. That's why the dance is still flying after five hundred years.",
    ],
    bridges: {
      safety: "A volador never leans back until the ropes are checked — his life is literally in the winding, so no one rushes it, no matter how many times they've flown. That's our harness inspection, our lockout, our pre-lift check. Familiarity is exactly when checking matters most. Five hundred years without shortcuts; that's the tradition worth importing.",
      growth: "Nobody's first flight is at a hundred feet — there are years of knots, small poles, and supervised reps first. Skills that look like magic are always stacked practice underneath. Whatever the 'hundred-foot pole' is in your career, the way up is the same: start the reps now, with someone experienced beside you.",
      teamwork: "Each flyer's descent depends on ropes his teammates wound and the caporal inspected — total mutual dependence, performed in public, for centuries. Our shop runs on the same physics: my work rides on your check and yours on mine. Be the teammate whose knots nobody has to worry about.",
    },
    funFact: "In 2009, UNESCO added the Voladores ceremony to its list of the Intangible Cultural Heritage of Humanity. Some troupes today include women flyers — a modern first for the ancient dance.",
  },
];

/* Curated order for the weekly rotation (variety of themes/regions week to week). */
const WEEKLY_ORDER = [
  "chilean-miners", "inca-roads", "golden-gate-net", "chinampas", "apollo13",
  "san-martin", "andon-cord", "puebla", "nightingale", "bolivar-andes",
  "quipu", "wright-brothers", "maya-astronomers", "shackleton", "juana-azurduy",
  "aqueducts", "hannibal", "voladores", "cincinnatus", "ironbridge",
  "panama-canal",
];
