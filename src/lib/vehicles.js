
export const CATS = {
  kpz:  { label: '★ Kampfpanzer',           short: 'KPz',       color: '#6b2200', light: '#f87171', sub: 'Handout 100', superCat: 'russia', recoType: 'Tanks' },
  spz:  { label: '⚙ Schützenpanzer',        short: 'SPz',       color: '#1e5f3e', light: '#4ade80', sub: 'Handout 200', superCat: 'russia', recoType: 'Infantry-Fighting-Vehicles' },
  tpz:  { label: '▣ Transportpanzer',       short: 'TPz',       color: '#5e2a6e', light: '#c084fc', sub: 'Handout 300', superCat: 'russia', recoType: 'APCs' },
  aufkl:{ label: '◉ Aufklärungsfahrzeuge',  short: 'AufklFz',   color: '#3d4200', light: '#b8cc40', sub: 'Handout 400', superCat: 'russia', recoType: 'Reconnaissance' },
  art:  { label: '⦿ Artillerie & Mörser',  short: 'Art/Mörser',color: '#1a2a4a', light: '#60a0f0', sub: 'Handout 500', superCat: 'russia', recoType: 'Artillery' },
  mlrs: { label: '⟁ Raketenwerfer',         short: 'MLRS',      color: '#4a1a00', light: '#fb923c', sub: 'Handout 600', superCat: 'russia', recoType: 'MLRS' },
  cbrn: { label: '☢ ABC-Spürfahrzeuge',    short: 'CBRN',      color: '#1a3a1a', light: '#86efac', sub: 'Handout 700', superCat: 'russia', recoType: 'CBRN-Defence/CBRN-Reconnaissance' },
  pio:  { label: '⚒ Pioniersysteme',       short: 'Pio',       color: '#3a2a00', light: '#fcd34d', sub: 'Handout 800', superCat: 'russia', recoType: 'Engineer' },
  pzabw:{ label: '🎯 Panzerabwehr',         short: 'PzAbw',     color: '#2a1a4a', light: '#c4b5fd', sub: 'Handout 900', superCat: 'russia', recoType: 'Anti-Tank-Missile-Systems/Self-Propelled' },
}

export const SUPER_CATS = {
  russia: { label: 'Russland / GUS', emoji: '🇷🇺', nations: ['Russland', 'Ukraine'] },
  nato:   { label: 'NATO',           emoji: '🇩🇪', nations: [] },
}

// images: array of direct SmugMug/recomonkey CDN URLs — populated in Phase 2
export const DB = {

kpz: [
  { id:100, nr:100, name:'T-54',     flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-54-1949/Walkaround/i-bBNMkvH/0/K4phCWsJZGWv9MFtBDTL5Qfmn8bNp993FHS3hCS2P/L/Padikovo-T-54-49-004-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-54-1949/Walkaround/i-Svm7Pj4/0/LGXVqcnFjBwK3tZ6K5sSM32HPCmGTH3cmD5vN45SR/L/Padikovo-T-54-49-005-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-54-1949/Walkaround/i-dSkH4QW/0/MdWvF8ZKHrJJhv2LP45XZ4hNdRv2HkjsS9pmRhqF4/L/Padikovo-T-54-49-006-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-54-1949/Walkaround/i-Txx2swS/0/KGXwcS78pQ28mHNQdjt8btnpm2KNj4s8P37TdVGLg/L/Padikovo-T-54-49-007-L.jpg"
    ],
    m:['Halbkugeliger runder Turm – älteste sowjetische Nachkriegsgeneration','Keine Außenpanzerung – schlichte Turmform ohne ERA-Blöcke'],
    s:'RUNDER KUGELTURM – ÄLTESTE GENERATION' },
  { id:101, nr:101, name:'T-55',     flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-55/Walkaround/i-zCBcfSH/0/MLRvdm8MBStwZqjGfBxCbz9KvVkBK66ND3cDRNjPZ/L/Kubinka2018-0534-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-55/Walkaround/i-q6JHX93/0/MXwCpT2tQWBnqVqTMtDJDshSNkr6xBkz9k94nM7gt/L/Kubinka2018-0535-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-54-55/T-55/Walkaround/i-dTBQm46/0/KV567FQbMcPTbVdWc5kG88M85wM9LgbSFj33ZvxXn/L/Kubinka2018-0536-L.jpg"
    ],
    m:['Wie T-54 + ABC-Schutzventilator hinten rechts auf der Wanne','Kein Kommandantenlupf – flacher Drehkranz auf dem Turm'],
    s:'WIE T-54 + ABC-VENTILATOR HINTEN RECHTS' },
  { id:102, nr:102, name:'T-62',     flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-62/T-62/Walkaround/i-7kfzTW4/0/Lj9vCs7tB96VjtcdHZFsn2X8KbK5KjDDGDxzKGvXj/L/T-62-2-092021-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-62/T-62/Walkaround/i-zRhQQGP/0/KLZDnkwbp5kJQbftN42FKMgVPR9BrF48FMsmqnrwW/L/T-62-2-092021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-62/T-62/Walkaround/i-GmQrq3D/0/M8fDkwtQrtWTWWRRTfwSv3mcTHJRwSZbMK7J5p52j/L/T-62-2-092021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-62/T-62/Walkaround/i-VCC7d3L/0/NBGvFvfttwJPRcHK6fzVGML5tFDHHNNWccdPKgSvZ/L/T-62-2-092021-04-L.jpg"
    ],
    m:['Ovaler/elliptischer Turm + langes 115mm-Glattrohr (erster Glattrohr-MBT)','Hülsenauswurfschacht rechts außen am Turm sichtbar'],
    s:'OVALER TURM + 115MM GLATTROHR + HÜLSENAUSWURF RECHTS' },
  { id:103, nr:103, name:'T-64A',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-64/T-64A/Walkaround/i-FqP3t9t/0/KbgjVPs65TvwPw3LGPRMXK2fXdJkPctKDvfsCT4gw/L/T-64A-092021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-64/T-64A/Walkaround/i-tJJR2db/0/MrzVFHvPkftzMNbJrP2j6bfHn7Kj8R5qZFnXtF3cb/L/T-64A-092021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-64/T-64A/Walkaround/i-W2NFjjC/0/Km8BsL5FFMLPDDf8gt36LtPBgxvPdsL3gW3DRr7P8/L/T-64A-092021-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-64/T-64A/Walkaround/i-MTgS687/0/LhcFhqV2fv9D6vZHHkxXLbtSvJTGsRVBWdVHSJSkf/L/T-64A-092021-05-L.jpg"
    ],
    m:['6 kleine eng beieinanderliegende Laufrollen – kein großer Zwischenraum','Kleiner runder Turm + Gummischürzen an der Wanne'],
    s:'6 KLEINE DICHTE LAUFROLLEN + GUMMISCHÜRZEN' },
  { id:104, nr:104, name:'T-72',     flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72-Ural/Walkaround/i-Fcjg33G/0/Lh4X9jnkcjMkjQ2C6JDMbFZD8bMg8RDrrZbKtnd8J/L/T-72-052021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72-Ural/Walkaround/i-5LhpCmF/0/KwWJTmDwpcnZDkM4t64t7sdqrqm5ZB5bmqWcxc2XR/L/T-72-052021-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72-Ural/Walkaround/i-nPkzZ2d/0/M8xVhMZrDwxzkWnS2T5RHtzMnzq5DGk33g7c9R633/L/T-72-052021-05-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72-Ural/Walkaround/i-CPZb4FK/0/KzxPKKRPGLsbhBs97FqQcrgv8dfkhnJs2PkHCfqNX/L/T-72-052021-06-L.jpg"
    ],
    m:['Großer gegossener Pilzturm + 6 Laufrollen','Deutlicher Zwischenraum zwischen 1. und 2. Laufrolle (typisch T-72)'],
    s:'GROSSER PILZTURM + 6 LAUFROLLEN' },
  { id:105, nr:105, name:'T-72A',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72A/Walkaround/i-Kz2cDXn/0/MhGD6Vsb6s3QwMWdzhWj2RpTLnrFLMfTCfJmKTFSw/L/T-72A-092021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72A/Walkaround/i-rjFKb35/0/K6QvWFHB62hGsG8SWLXmQFJ52Q6RCTT7wmJrbgDhJ/L/T-72A-092021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72A/Walkaround/i-zV84ZhV/0/L7t6LcbS8ztH5hTG6Gjp44JXPhN7rJZvBSMs8Vf5t/L/T-72A-092021-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72A/Walkaround/i-DwgxTdQ/0/LKmGGjtSTBzCqVXP5xzcMZzFDkm7CS984xtZKKk23/L/T-72A-092021-05-L.jpg"
    ],
    m:['Wie T-72 + Sandguss-Zusatzpanzerung auf Turmfront + IR-Scheinwerfer links am Turm','Gummischürzen + Zusatzpanzerung seitlich an der Wanne'],
    s:'T-72 + SANDGUSS TURMFRONT + IR-SCHEINWERFER LINKS' },
  { id:106, nr:106, name:'T-72B',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B/Walkaround/i-4z6HxpS/0/LBNTnxhMqdS6RQ7rcVN6vxc4CcDzsNknjpcNmSwBN/L/T-72B_01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B/Walkaround/i-L3S4qgg/0/Kxz2b2xFc22bTTtRvSFJN3Tm9M7DfZfvk3FzVmLQj/L/T-72B_02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B/Walkaround/i-d6fCMq3/0/KDXGGBF2hZf5tLsg2KhPkQ4NZMQ3T8f5NWHsZL8JV/L/T-72B_03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B/Walkaround/i-NrdxGQn/0/MrPFTp9F5LXdVwwvmpHJnNh8ZzMz87W8zFDhc4hSs/L/T-72B_04-L.jpg"
    ],
    m:['NATO: OLCHA / Super Dolly Parton – Kontakt-1 ERA-Blöcke auf Turm und Wanne','Gewölbte Panzerungseinlagen beidseitig der Turmfront (Super Dolly Parton)'],
    s:'ERA KONTAKT-1 + SUPER DOLLY PARTON TURMFRONT' },
  { id:107, nr:107, name:'T-72B3',   flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3/Walkaround/i-97zmbNL/0/M4XCKtt4S9Q32xXCDBJMgwKcckNQpCHqrx3KcGPFJ/L/T-72B3-20152021-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3/Walkaround/i-BQWMs4s/0/NSRXfp54BJZW7HsLMRQLPdDSbsSHLGzGz8WjWNKsf/L/T-72B3-20152021-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3/Walkaround/i-sK9Fh4W/0/LczK65kQGnknZBVkjPgqjhLn2zMNNHqR2CqBfQHZv/L/T-72B3-20152021-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3/Walkaround/i-J5pKz2p/0/M3fXgdrdTzJpWNBrqWLz4BBf2KfZ2XX5LSfk6XVhD/L/T-72B3-20152021-004-L.jpg"
    ],
    m:['Sosna-U Wärmebildoptik (Vierer-Block rechts am Turm) + modernisierte ERA','Neue Seitenschürzen + Sosna-U Optikanlage deutlich erkennbar'],
    s:'SOSNA-U OPTIK (4-BLOCK) + ERA MODERNISIERT' },
  { id:108, nr:108, name:'T-72B3M',  flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3-mod2016/Walkaround/i-z8nMhXr/0/LS85QFBFjt6Rjs3JR326Gr2wHx9qzLSHv8Lts2QQ2/L/T-72B3M-20162022-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3-mod2016/Walkaround/i-mxvFGRr/0/LwGSwP8MCfQmgDZbnCSvNf3GjDSN4L5X8BVgrTWPT/L/T-72B3M-20162022-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3-mod2016/Walkaround/i-gPX9vc5/0/MQdFkmz9BdjJC2C9n6JFm3KqWXKWJkP9VkFgMMhdJ/L/T-72B3M-20162022-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-72/T-72B3-mod2016/Walkaround/i-hrWFcmr/0/Kpn5SnVbwKtSPrS6zKQfLhSsbPvWx9Q9cSvV5MC46/L/T-72B3M-20162022-004-L.jpg"
    ],
    m:['Relikt-ERA (deutlich größere Blöcke als Kontakt-5) auf Turm und Wanne','Verbesserte Seitenverkleidung + Sosna-U 2 Optik'],
    s:'RELIKT-ERA GROSSE BLÖCKE + VERBESSERTE SCHÜRZEN' },
  { id:109, nr:109, name:'T-72BM',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['NATO: SMT M1990 – Kontakt-5 ERA + vollständige Seitenschürzen','Kontakt-5 Blöcke auf dem Wannendach + geändertes Turmheck'],
    s:'KONTAKT-5 ERA + VOLLSTÄNDIGE SEITENSCHÜRZEN' },
  { id:110, nr:110, name:'T-80B',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80B/Walkaround/i-Dpz644M/0/MrLjqp5kJspKPCGMDd5C2L8D2PHMd7h58vzhj2Bzt/L/T-80B-092021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80B/Walkaround/i-MMZvJKW/0/KpT8PtMZzpF9DxCSJqxVxG8CDcB3mpqwFSXRj98jL/L/T-80B-092021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80B/Walkaround/i-3KZSDxg/0/KDdRgR9tgBc7FK2JtkxgzS8rs7xbq3HxLtRxspsqV/L/T-80B-092021-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80B/Walkaround/i-WJkdrCv/0/LtXVdn9f2hS6LjKccsGPXv6wnskdPbX2V5BhnX6RR/L/T-80B-092021-05-L.jpg"
    ],
    m:['Gasturbinen-Antrieb + 6 kleinere Laufrollen (wie T-64, nicht wie T-72)','Breiterer Turm als T-64 + Scheinwerfer links am Turm'],
    s:'GASTURBINE + 6 KLEINE LAUFROLLEN WIE T-64' },
  { id:111, nr:111, name:'T-80U',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80U/Walkaround/i-7ZFNK7C/0/M3xvF7R6T3NDx84Cbz9RWg8VC7LwZmHMtNj8Tr5MS/L/T-80-017-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80U/Walkaround/i-5bdQtz4/0/LF4smn8sqFPz4RWmcHnDjxcbDdT6brR8xt7HCJbpg/L/T-80-018-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80U/Walkaround/i-gKHX3Wx/0/MBhwG7kTzNpjQSsQJXMR5QwfHbzB2xbZvxHfcL3pS/L/T-80-019-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80U/Walkaround/i-gdq7ZbT/0/LGVHGVN3MtK3pqqDPz9RdFfFhbdNGGXdrggGv7g6b/L/T-80-020-L.jpg"
    ],
    m:['Kontakt-5 ERA auf T-80-Rumpf + Wärmebildgerät rechts am Turm','Modernisierter breiterer Turm gegenüber T-80B'],
    s:'KONTAKT-5 AUF T-80-RUMPF + WBG RECHTS' },
  { id:112, nr:112, name:'T-80UD',   flag:'🇺🇦', nation:'Ukraine', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80UD/Walkaround/i-M7c233f/0/LDhCHzVQ2MdhSvRhrQJX5pgznpRrwhMqrZ89gGCmJ/L/TulaPatriot-0243-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80UD/Walkaround/i-ztcZj2R/0/LVzhM48TMwnRJPmCsHPpmdbx9sfWWQqPBXghVTSXt/L/TulaPatriot-0244-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80UD/Walkaround/i-hqNfDw2/0/KbSwJ9tx9F42VDhcGXpPgKZV2HhjM9Vb6HVbRc6gR/L/TulaPatriot-0245-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80UD/Walkaround/i-Hfm2WL3/0/LGH75JgXVt9hKqjCphM7dnKgp6DwSvcvWKMWxLPV7/L/TulaPatriot-0246-L.jpg"
    ],
    m:['Ukrainische Variante: Dieselmotor statt Gasturbine + geänderter Auspuff','Ukrainische Morozov-Konstruktion – kein Turbinenlärm'],
    s:'UKRAINE + DIESEL STATT GASTURBINE' },
  { id:113, nr:113, name:'T-80BVM',  flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80BVM/Walkaround/i-jVdG7Q8/0/MgQtcLzTjN72hhxpRQqXMH4dhwvZcKkGtpBNWgFCj/L/T-80BVM-082020-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80BVM/Walkaround/i-J5knLf5/0/M97P3zfJVCtHfFdKvDzPXnDDrTgRVPQxhtL6tkTbR/L/T-80BVM-082020-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80BVM/Walkaround/i-DdsBk5R/0/KLkM5GsxxhwXgjW2WrMVPtgcVC9jx95kMSsWQhXWQ/L/T-80BVM-082020-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-80/T-80BVM/Walkaround/i-DrGWwxJ/0/MhqDN4Xt5GHprhC72PdngVbVDkKvpVhtff2wZtC2v/L/T-80BVM-082020-005-L.jpg"
    ],
    m:['NATO: BEREZA – Relikt-ERA + neue Sosna-U-Optik auf T-80B-Rumpf','Modernisierter T-80B: neue Schutzausstattung, gleiches Fahrgestell'],
    s:'RELIKT-ERA + SOSNA-U AUF T-80B-RUMPF' },
  { id:115, nr:115, name:'T-90',     flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90-mod1992/Walkaround/i-x6wJXxJ/0/MvQ4rH2RnqkrLpLKGHpkKLgZC5DqL7hF4j59RL72T/L/IMG_8177-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90-mod1992/Walkaround/i-qzpmvBp/0/KsTLFLh47QqWSsQ2wCZpPVXFQFwLcCwZ9B7Sshrgp/L/IMG_8179-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90-mod1992/Walkaround/i-CZx5kTX/0/KQLGhm7LKBMHg7JfLMgDx9stqQZWDRjXqqWbx63B2/L/IMG_8180-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90-mod1992/Walkaround/i-zkN8ZSG/0/LFnqpTT66gKmRcjXG3jf9zvnkRstkrSJtpgPvBvCx/L/IMG_8181-L.jpg"
    ],
    m:['Shtora-1 IR-Störsystem: zwei charakteristische rote „Augen" vorne am Turm','Kontakt-5 ERA + gegossener Turm ähnlich T-72B'],
    s:'ROTE SHTORA-AUGEN AM TURM (IR-STÖRUNG)' },
  { id:116, nr:116, name:'T-90A',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90A/Walkaround/i-mfT9hpv/0/MB6kcvCnWB987GBZCQtLVPgZM9Zz5G6KZxTxpwGC7/L/T-90A-20102019-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90A/Walkaround/i-88LkMTd/0/KVRZXw5m53ZC9GMvCRrC8TJMFj5v74GvH9SDb3d2B/L/T-90A-20102019-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90A/Walkaround/i-Dh3qnNj/0/MftHW6GqzQQ2gmFBwpJGC3zqgqGTp2mKm7dVgmVfk/L/T-90A-20102019-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90A/Walkaround/i-bdTq92B/0/MTKWx8hMc64kgjGsGSvGnTJQQWb6vb6VhxrKFRwz/L/T-90A-20102019-004-L.jpg"
    ],
    m:['NATO: WLADIMIR – geschweißter Turm (statt gegossen) + Shtora-1-Augen sichtbar','Neue Turmform + überarbeitete Wannenpanzerung + Wärmebildgerät'],
    s:'GESCHWEISSTER TURM + SHTORA ROTE AUGEN' },
  { id:117, nr:117, name:'T-90M',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90M/Walkaround/i-GJkmRkW/0/KJ5HR6cFqWGJXBq6S6D4HqJWH6tbnVfZMWDsNBNDb/L/T-90M-082020-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90M/Walkaround/i-MjLNrGv/0/MTd8GcQv3M7qk6JFhMQRnWvSPpgzPZXXxnj2JVdRC/L/T-90M-082020-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90M/Walkaround/i-b8bCQx5/0/KXNKtmDtHDSqmWQ4p9xVwQ8tXFPBpSP37GPmRKKdw/L/T-90M-082020-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/T-90/T-90M/Walkaround/i-BLXv7Tx/0/LjKmWCwfkvgTNdZSJbLj44dkQ7RC2hf6zGS9rttGX/L/T-90M-082020-004-L.jpg"
    ],
    m:['Neuer eckiger geschweißter Turm (Proryv-3) + Relikt-ERA auf Turm und Wanne','Panoramasicht-Kuppel für Kommandant + neue Hauptoptik'],
    s:'NEUER ECKIGER TURM + RELIKT-ERA + PANORAMASICHT' },
],

spz: [
  { id:200, nr:200, name:'BMD-1',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-1/BMD-1/Walkaround/i-pgxRJG6/0/L9Bn7zML59SDCwH9Hn44TGTXbpTqRs68VRMVWjGPn/L/ZadorozhniyMuseum-0835-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-1/BMD-1/Walkaround/i-G8GWdKJ/0/KDxttfQM9vmndHDbRPfL7vpGKggwLrgzDHdv88ZV6/L/ZadorozhniyMuseum-0836-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-1/BMD-1/Walkaround/i-ksjPrSL/0/L2NSXzZvLrtXfr6m97Z5BJ3J2RcCHgvP8Vc9kPhXT/L/ZadorozhniyMuseum-0837-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-1/BMD-1/Walkaround/i-W86WgQW/0/M4qb669j3PCNGt56qD239wSGXXHdvrKCKtK6JFcVf/L/ZadorozhniyMuseum-0838-L.jpg"
    ],
    m:['Schiffsform (geschwungene Wannenfront) + kleines Schwallbrett + Waschbrett vor MKF','5 Laufrollen + Hydrojets unter Abgasschlitzen am Heck + vertiefender Einstieg'],
    s:'SCHIFFSFORM + 5 LAUFROLLEN + HYDROJETS HECK' },
  { id:201, nr:201, name:'BMD-2',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-2/BMD-2/Walkaround/i-88W4GD3/0/KZsNJjXSL4TPKsDBPPTPNc5HWwrkQNpCBZDTP82rF/L/BMD-2-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-2/BMD-2/Walkaround/i-N5hTxRh/0/K6CkrP6jmpwTLJD7ggLpTwkQX7dsg2Fxn3jQNZxFX/L/BMD-2-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-2/BMD-2/Walkaround/i-VwKQq2B/0/MwrSK9NpZbSSmBgw88jQN6k8vqgphHDHQZW8BntFS/L/BMD-2-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-2/BMD-2/Walkaround/i-BcK25Bc/0/NMMWx6NRB34dDt4GdPs7VZdWhRRbfn4SXW8zPJqvv/L/BMD-2-004-L.jpg"
    ],
    m:['Lange schmale Kanone + Zusatzblende rechts neben Kanone','Scheinwerfer rechts oben am Turm + Periskop seitlich links'],
    s:'LANGE SCHMALE KANONE + ZUSATZBLENDE RECHTS' },
  { id:202, nr:202, name:'BMD-3',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-3/BMD-3/Walkaround/i-Mr2M3v6/0/LkggbbqzZxc3GzGwSspWtGxqCxkwfZ3qhKpBKwbVg/L/BMD-3-20182021-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-3/BMD-3/Walkaround/i-Lg9CKcL/0/KzR4z7bfzQxkVBj4rsQWd37cs3L6dDjbQQGwKLSpC/L/BMD-3-20182021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-3/BMD-3/Walkaround/i-RbkT6PB/0/LbWH7hrJqzhwfrx3HVZZwKhDf98FvzQhpCTKMFBHs/L/BMD-3-20182021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-3/BMD-3/Walkaround/i-Ckv45R8/0/Nbnb6rGpqh8FDzr6qLNg8z22WKMSqw2gG2WtBLDZp/L/BMD-3-20182021-04-L.jpg"
    ],
    m:['Kantiger/gerader Front + aufgesetzte MG-Luken + Halterung für Fallschirmpakete links','Hydrojets mit Lamellenklappen am Heck + abgeschrägte Oberkante bis 3. Laufrolle'],
    s:'FALLSCHIRM-HALTERUNG LINKS + HYDROJETS MIT LAMELLEN' },
  { id:203, nr:203, name:'BMD-4',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4/Walkaround/i-N7T93BM/0/KjL3CfxgwhBXdzq45zPz7ngrnBkxXpm5JDJhKKsN7/L/BMD-4-20092020-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4/Walkaround/i-v9CBnXL/0/NcHsNSqxfPtKBFkNdqRhDHhWkbvGvrB8wTF87pMFt/L/BMD-4-20092020-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4/Walkaround/i-QKwdWKv/0/Lt4JZBGnPXbJsJ8jxHNsLhNgZhxCpbzdhx9psMXrR/L/BMD-4-20092020-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4/Walkaround/i-gFhfR2G/0/MwP93CbKmgmsb3wJ4fBgn4vGR76nmQFdk645WS59W/L/BMD-4-20092020-004-L.jpg"
    ],
    m:['Doppelkanone: 30mm + 100mm + MG in kantig geschweißtem Turm mit schräger Front','Keine GMW-Luke in der Wannenfront (nur noch MG-Luke)'],
    s:'DOPPELKANONE 30MM+100MM + KEINE GMW-LUKE' },
  { id:204, nr:204, name:'BMD-4M',   flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4M/Walkaround/i-3fv3cXN/0/Nbr4DN4Qb63SHPWgtkNFz9FjCzH7WrF9KPRRT9BwW/L/BMD-4M-20092022-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4M/Walkaround/i-7v4CHbq/0/LZXn8qZh6pN6LvVJmx3XL3673b83kV8FBGKLm2LRT/L/BMD-4M-20092022-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4M/Walkaround/i-ZV88wG8/0/LgLnLVX87Fd5ND6KnWL4Xx3xcvG5Gxf5wQmTPsr3N/L/BMD-4M-20092022-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BMD-4M/Walkaround/i-HKXWkNh/0/Km9dMVcwWVxCvvzccvzCntKtmQCBQSx433q9GhPKQ/L/BMD-4M-20092022-004-L.jpg"
    ],
    m:['Kein Entenschnabel mehr + 2 kleine MG-Luken + kleines Schwallbrett vorne','Turm mit 2 Optiken + geteilter Abgasschacht auf Höhe letzter Laufrolle'],
    s:'KEIN ENTENSCHNABEL + 2 OPTIKEN IM TURM' },
  { id:205, nr:205, name:'BMP-1',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1/Walkaround/i-QmC9QCN/0/Mcd65PqrQ6jDZpKGbwvFcLZXn9QHrpGssrN3W9Kqc/L/BMP-1-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1/Walkaround/i-3bTZmrK/0/MdhvVdCxgVspwQkSK5DvGR549ZSnXf9XHMGpKBWVc/L/BMP-1-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1/Walkaround/i-WRHdhvX/0/MF5RgJ2Jp6sjtRPPJdGVTznDL7dStSZNj4jVjnDqj/L/BMP-1-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1/Walkaround/i-KptnX7x/0/KD34cqvNgxRxBx3gGFTLqS5mXvLK5xHcxNt8VNWZ6/L/BMP-1-04-L.jpg"
    ],
    m:['Großes Schwallbrett + Scheinwerfer mit Bügel vorne + waffelförmige Kettenblenden','Ein-Mann-Turm (eine Optik, Scheinwerfer rechts) + 4 Schützenluken rechts'],
    s:'GROSSES SCHWALLBRETT + EIN-MANN-TURM' },
  { id:206, nr:206, name:'BMP-1AM',  flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1AM-Basurmanin/Walkaround/i-CTZ3p5f/0/LRXQnKb8rmR5pGRx6NBsKZ8653NGXzCgbj2fs8sBX/L/BMP-1AM-20182020-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1AM-Basurmanin/Walkaround/i-zgjvC7q/0/K9ZZ4DbNhmFC36fKGjhcTbqdsmz5Gdg7w5njVSMKC/L/BMP-1AM-20182020-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1AM-Basurmanin/Walkaround/i-Tvz6Lj7/0/LShWDd8S3f6KkvNN4wW7dDf4JrJRqQjJthtS9FdBQ/L/BMP-1AM-20182020-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-1/BMP-1AM-Basurmanin/Walkaround/i-KRgG3Jd/0/KVktSTSCt4qbtnWhb4JncPGmkWxThR9h9rv6N4kNk/L/BMP-1AM-20182020-04-L.jpg"
    ],
    m:['BTR-Scheitellafette (kein klassischer Turm) auf BMP-1-Wanne + Schutzkragen vorne','Frontpanzerung des Turmersatzes 3-geteilt + eckiges MG rechts'],
    s:'BTR-SCHEITELLAFETTE AUF BMP-1-WANNE' },
  { id:207, nr:207, name:'BMP-2',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2/Walkaround/i-gb84Pgz/0/MdvtzBsnqhm3j4GLV29V7D8RrdNCBjf9GxdgqtXfg/L/BMP-2-20112019-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2/Walkaround/i-DxQzBXW/0/KfqGg5rJNs5CHTWzDHPhhPBrHzjqhH6gkrvmkWWRb/L/BMP-2-20112019-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2/Walkaround/i-5KZS4WK/0/LZntch8qH5d344HKdrkmKGxjFDFWfkkkKFfXZB7wc/L/BMP-2-20112019-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2/Walkaround/i-br7WhBz/0/NQk2d3h9thwp66LtPdk67jjJdSc2bxJtBpNbCgJsh/L/BMP-2-20112019-004-L.jpg"
    ],
    m:['2-Mann-Turm + breite Kettenblenden + 2 Dämpfer vorne rechts','3 Winkelspiegel + 3 Schießluken links + nur 2 Luken hinter Turm'],
    s:'2-MANN-TURM + BREITE KETTENBLENDEN' },
  { id:208, nr:208, name:'BMP-2M',   flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2M-Berezhok/Walkaround/i-cctkqxv/0/MkDkrKtm7nfm7nvxzg4L3pDd6WQjK47VfvzrtxGMX/L/BMP-2M-Berezhok-20122022-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2M-Berezhok/Walkaround/i-tFcj7M6/0/NK7CvcCCHcFtzHzvLL57DQnnds7r7JffWQGzbMMdW/L/BMP-2M-Berezhok-20122022-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2M-Berezhok/Walkaround/i-C3WL3np/0/NWKgB8fSLn45wwRVk8s78mc6vj4XmFSKbk8MBKf7V/L/BMP-2M-Berezhok-20122022-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-2/BMP-2M-Berezhok/Walkaround/i-zLq4Mqq/0/M5d5Wx7MG3MwKjhPpGTNRVLXMN7ZkTbXddmpPx5JZ/L/BMP-2M-Berezhok-20122022-004-L.jpg"
    ],
    m:['NATO: BEREZHOK – AGS-30 Granatmaschinenwaffe mittig auf dem Turm','Panzerabwehrraketen links und rechts am Turm + große Optiktonne'],
    s:'AGS-30 OBEN + AT-RAKETEN LINKS/RECHTS AM TURM' },
  { id:209, nr:209, name:'BMP-3',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3/Walkaround/i-3pLJ2MV/0/M78tWP22VKcsqxMJcL79WKN6Rsnzm3h2P4J4TWGGw/L/BMP-3-20082019-010-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3/Walkaround/i-6BxN6mM/0/NPKdRmnRpvmHW8k2TJhNLM4WPNj7xrGJhM62v535G/L/BMP-3-20082019-011-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3/Walkaround/i-7RPzjck/0/Kf8QTD9vzGcvd7KKLwr67kjDvZkS7ShJ6VPwjnR8W/L/BMP-3-20082019-012-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3/Walkaround/i-BdnnVzj/0/LnG6pTJVwPQw4sQSppwZq69gXFn7dbtSQXRn8DQ5L/L/BMP-3-20082019-013-L.jpg"
    ],
    m:['Zwillingskanone (100mm + 30mm BMK) vorderes Turmbereich + Laserbeam oben auf Kanone','6 Laufrollen + Hydrojet-Antrieb am Heck + Blenden-MG mit Schutzbügel vorne'],
    s:'ZWILLINGSKANONE + 6 LAUFROLLEN + HYDROJET HECK' },
  { id:210, nr:210, name:'BMP-3M',   flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3M-Ataka/Walkaround/i-TZBzNHg/0/LCnSvHRd6RNpQLBFdWMnkPxzDC9ng8g8TwzNDGVZV/L/BMP-3M-Ataka-082017-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3M-Ataka/Walkaround/i-RSMK4d4/0/NfX69NtRBScxMBF94j7Qvd9cpKRVBwVkPWJXMSSPH/L/BMP-3M-Ataka-082017-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3M-Ataka/Walkaround/i-9vg8KgZ/0/Md9qt8fspJknsNrMR6nCSDZZdTjDLQ8HJVkC5zdpV/L/BMP-3M-Ataka-082017-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMP-3/BMP-3M-Ataka/Walkaround/i-KcSmqgg/0/LJ6VRxR955v6JvQCBbdwq6gBM2n7jsPScbwTKQs8s/L/BMP-3M%20Ataka%20003-L.jpg"
    ],
    m:['WBG (Wärmebildgerät) links hoch am Turm + Laser rechts neben der BMK (nicht drauf)','Ansonsten wie BMP-3 – kein Laserbeam auf der Kanone selbst'],
    s:'WBG LINKS HOCH AM TURM + LASER RECHTS NEBEN BMK' },
  { id:211, nr:211, name:'BMP-K17',  flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/VPK-7829-Bumerang/BMP-K-K-17/Walkaround/i-8HwrMPJ/0/K4m3crSQd3WWdVVLbwbh8JzdH9kSb9B4GqHhqdSZc/L/K-17-Bumerang-20152022-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/VPK-7829-Bumerang/BMP-K-K-17/Walkaround/i-j9LCczT/0/M6QP4Kgz7bxFLKGb5m6C87TLmZFKSdWjt4Pzvd7qZ/L/K-17-Bumerang-20152022-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/VPK-7829-Bumerang/BMP-K-K-17/Walkaround/i-FgjkqB7/0/NPGWd7rW3w72R4Zs36qLjMnvfVZL5TghxZZcsQwNv/L/K-17-Bumerang-20152022-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/VPK-7829-Bumerang/BMP-K-K-17/Walkaround/i-Kz95T8C/0/Kh3rmN75QCR7p7SZkn55pnksSxj5k5sJN89xw2LK6/L/K-17-Bumerang-20152022-004-L.jpg"
    ],
    m:['NATO: VPK-7829 BUMERANG – 4 AT-Raketen am Turm + 30mm BMK + Datenlink-Antenne','Hydrojet-Turbine am Heck + T-förmige Aufstiegshilfe + moderne eckige Scheinwerfer'],
    s:'4 AT-RAKETEN + DATENLINK-ANTENNE + HYDROJET' },
  { id:212, nr:212, name:'BMP-1M',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['NATO: SHKVAL – modernisierter BMP-1 mit neuem Turmsystem','Handout-Merkmale eintragen (Seite 14)'],
    s:'SHKVAL – HANDOUT AUSSTEHEND' },
],

tpz: [
  { id:300, nr:300, name:'GAZ-233036 TIGR',    flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/GAZ-233036-SPM-2/Walkaround/i-BmGjKs6/0/NLrqkNnXC5F6nnMxSKTbqhV7bgrb92bM6JhqcrTMW/L/GAZ-233036-SPM-2-20092016-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/GAZ-233036-SPM-2/Walkaround/i-VZnSMs3/0/MZ8qqkCBWBFRvjD66dx8sBQXvDLmTtfS6bjDjhD8r/L/GAZ-233036-SPM-2-20092016-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/GAZ-233036-SPM-2/Walkaround/i-Hk3SZf8/0/K9tMQ6gL5ZkvrDmWRMDkhj3fRSpHp2cQW6SssL9dR/L/GAZ-233036-SPM-2-20092016-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/GAZ-233036-SPM-2/Walkaround/i-nfK954r/0/KRSK8jJZf5Btvq2CsP69VzdCstGTt5FnGg36XfJDs/L/GAZ-233036-SPM-2-20092016-004-L.jpg"
    ],
    m:['Flache Motorhaube (kein Buckel) – Unterschied zu TIGR-M','Nur eine Tür pro Seite'],
    s:'FLACHE HAUBE + NUR 1 TÜR/SEITE' },
  { id:301, nr:301, name:'AMN 233114 TIGR-M',  flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/Tigr-6A/Walkaround/i-gcg6xNm/0/NfhXX7MpgqL3mNXmbTLQLsd2NGCpT5Fw4qpVnbWFq/L/Tigr-6A-20112012-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/Tigr-6A/Walkaround/i-27RhBnh/0/Lm8XJK79qmB77wFMfh2tGV2CPqkkwLzDF6WgLPrCL/L/Tigr-6A-20112012-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/Tigr-6A/Walkaround/i-3Dg6TbF/0/MgBx49kzGtW9jkx5TncrV8spT6nThj2PC5RnJZZR3/L/Tigr-6A-20112012-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/2-Axle-Wheeled/GAZ-Tigr/Tigr-6A/Walkaround/i-Q5drTSg/0/K7KR7zpps7VBkfm56QNTL2Wc5qSs5tPc38CG4w86n/L/Tigr-6A-20112012-04-L.jpg"
    ],
    m:['Motorhaube mit charakteristischem Buckel (Gegenteil zu TIGR)','ABC-Schutzfilter am Heck sichtbar'],
    s:'BUCKELHAUBE + ABC-FILTER HECK' },
  { id:302, nr:302, name:'TYPHOON-K 4x4',      flag:'🇷🇺', nation:'Russland', images:[],
    m:['Haube überlappt Kühlergrill + Seilwinde unter Kühler + 2 Kupplungsmäuler','2 Türen pro Seite (vorderes Fenster größer) + kantig großer Radkasten hinten'],
    s:'HAUBE ÜBERLAPPT KÜHLER + SEILWINDE + 2 KUPPLUNGSMÄULER' },
  { id:303, nr:303, name:'TYPHOON-K 6x6',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-K-KAMAZ-63968/KAMAZ-63968-Typhoon-K/Walkaround/i-x84dkTK/0/KbM588Wf9bB7DBCG6kJcPfBPrxZQ98h8JjZvGBFqW/L/KAMAZ-63968-Typhoon-K-20142017-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-K-KAMAZ-63968/KAMAZ-63968-Typhoon-K/Walkaround/i-6fkSLHV/0/NbQTsNQRR8KKZNMtrrkGsN57gfg2qt2pXg4Rg48wq/L/KAMAZ-63968-Typhoon-K-20142017-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-K-KAMAZ-63968/KAMAZ-63968-Typhoon-K/Walkaround/i-WZnSrVJ/0/NHpDKRx6MhK72ZJPJK27S2bVxQFPLgdxFqfQLxxcB/L/KAMAZ-63968-Typhoon-K-20142017-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-K-KAMAZ-63968/KAMAZ-63968-Typhoon-K/Walkaround/i-xdjngsB/0/Mb9qq85XPgGvhqPVB76P6fnf8KsJWcrg926sbZwMc/L/KAMAZ-63968-Typhoon-K-20142017-004-L.jpg"
    ],
    m:['Dreieck nach unten zeigendes Element an der Front + flache Schnauze','6 Räder + 2 Fenster für Kampfraum + 2 Belüftungsgitter links'],
    s:'DREIECK-FRONT NACH UNTEN + FLACHE SCHNAUZE + 6 RÄDER' },
  { id:304, nr:304, name:'TYPHOON-VDV 4x4',    flag:'🇷🇺', nation:'Russland', images:[],
    m:['4 Scheibenwischer von oben (einzigartiges Merkmal!)','Seil-Steighilfe rechts + Kraftstofftank links + optionaler Turm'],
    s:'4 SCHEIBENWISCHER VON OBEN' },
  { id:305, nr:305, name:'TYPHOON-U 6x6',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-U/Ural-63095-Typhoon-U/Walkaround/i-XfWXPdg/0/MHjsCZx5ksBPJqRjjGCJzkwhPtgv3wgzGTWzJkDcr/L/Ural-63095-Typhoon-U-20152023-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-U/Ural-63095-Typhoon-U/Walkaround/i-gDQMWS4/0/M8rLWjKMgrwHT95jmdtFCz79PgvDKJg4Kh8swrKBg/L/Ural-63095-Typhoon-U-20152023-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-U/Ural-63095-Typhoon-U/Walkaround/i-2GbVhRf/0/NCjKvXnSnM68T4kxhDhLNDGRzKBX6RcQVM5Wbd6kx/L/Ural-63095-Typhoon-U-20152023-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tactical-and-MRAP-vehicles/3-Axle-Wheeled/Typhoon-U/Ural-63095-Typhoon-U/Walkaround/i-kRNRF6D/0/MGjWhnXLRdw9ZvJXPh9sz3PQ48x4BMJQXdWL9RPWW/L/Ural-63095-Typhoon-U-20152023-004-L.jpg"
    ],
    m:['LKW-Haube langgezogen + Doppel-Kupplungsmaul + Wartungsklappe','Kampfraum vom Fahrerhaus entkoppelt + Tritt nach oben abstehend an Heckrampentür'],
    s:'LKW-HAUBE + ENTKOPPELTER KAMPFRAUM' },
  { id:306, nr:306, name:'BTR-60PB',           flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-60/BTR-60PB/Walkaround/i-pdNSj92/0/LmjVb5Q53stqDTvdQvtqfb5tW3r9nBWCdMqs4ZHxL/L/BTR-60PB-072015-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-60/BTR-60PB/Walkaround/i-GPwR3Mw/0/NCBZvQ4psVZLJHLZz7LhT35QcGNVwd8mnCFqB76hh/L/BTR-60PB-072015-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-60/BTR-60PB/Walkaround/i-Nvjh6sc/0/MWmfNPBqRt7QQGJCWZmK3vLNrMBHxSrPGpc67zVCK/L/BTR-60PB-072015-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-60/BTR-60PB/Walkaround/i-KdgSZ4m/0/Kp8FCvMFNcDtqmdZSM4Dh7bhHTrfNBmpHD8xnRVrZ/L/BTR-60PB-072015-04-L.jpg"
    ],
    m:['Winkelspiegel als Krone über den Frontfenstern + langer Bug mit Schwallbrett','Abgas steil schräg nach unten rechts + Hydrojet mit 2 Hecktüren'],
    s:'WINKELSPIEGEL-KRONE ÜBER FRONTFENSTERN' },
  { id:307, nr:307, name:'BTR-70',             flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-70/BTR-70/Walkaround/i-CtG83B5/0/KtcLG6rQVbcmRpWm239tRX4jJBCWXtrDJLrX9svvW/L/BTR-70-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-70/BTR-70/Walkaround/i-xRVWbCS/0/Mn6KLZRnPGsMJpM2LL8VtmDRv4Jw3DgjkXnSzbZmv/L/BTR-70-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-70/BTR-70/Walkaround/i-X4zrP89/0/LhLX3kdCKHkwSdrHV9V2fRkZbWcJFT6jD8gp9D3nb/L/BTR-70-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-70/BTR-70/Walkaround/i-DZbLSNJ/0/MPg6pbJRQJKqFBFTsfbsTMxJHVkPJdhDD6dmxPc3B/L/BTR-70-05-L.jpg"
    ],
    m:['Einstieg/Absitzen zwischen 2. und 3. Achse (Schießluke über Einstiegstür)','Tropfenförmiger Hydrojet mittig am Heck + grade flache Front'],
    s:'EINSTIEG ZWISCHEN ACHSE 2+3 + TROPFEN-HYDROJET' },
  { id:308, nr:308, name:'BTR-80',             flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80/Walkaround/i-QhKgsK5/0/KxXzXm3K9SVL9ZDWxsqR7VJ4DNjvw4n9QFRVL6DB3/L/BTR-80-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80/Walkaround/i-MJGmS5K/0/MrFMPWRMVLmShd45X39RRsLF3svPw4pRPVpmzzB2P/L/BTR-80-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80/Walkaround/i-fmmWqbf/0/L99ctfL6BTswjkK3bvt72n86mLGGpq3PhDNhDX3Dh/L/BTR-80-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80/Walkaround/i-5NBxB8d/0/KgGmKGF2NfG4CtkWz9CNML86BqJSnrrWg8KZx5jvD/L/BTR-80-04-L.jpg"
    ],
    m:['Tür 2-geteilt + Schießluke mit runder Kappe links + Beifahrer-Schießluke mit runder Blende','Abgasrohr liegende Zigarrenform + Prallbleche + Schutzbügel hinter Turmdrehkranz'],
    s:'GETEILTE TÜR + RUNDE SCHIESSLUKE-KAPPE' },
  { id:309, nr:309, name:'BTR-80A',            flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80A/Walkaround/i-33wNdLn/0/L3V9hgtb6Cr9k3G9kBDz7rgtzZXbFdB5WC6QR4DKd/L/IMG_0103-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80A/Walkaround/i-nf7Wm4F/0/KRTFmJZd3Lw29NvRpMTh4h22DNQX9nCQRhS3p2kqS/L/IMG_0104-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80A/Walkaround/i-fm5bJfw/0/Mr2fnSWWFgRhCqRCDmTjmW6nd7ZqrHfzbGrJjGx5C/L/IMG_0105-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-80/BTR-80A/Walkaround/i-7CJpJ7c/0/L5BSGx4kHCTTqvqJ9z5M3j74G3n2ch364tmpK5n9j/L/IMG_0106-L.jpg"
    ],
    m:['Scheitellafette mit rundem Scheinwerfer + schaufelförmiger Zusatzpanzer am Turm','3 Schießluken rechts + keine Halterung über Abgasrohr am Heck'],
    s:'SCHEITELLAFETTE + SCHAUFELFÖRMIGER ZUSATZPANZER' },
  { id:310, nr:310, name:'BTR-82A',            flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-82/BTR-82A/Walkaround/i-hGWsX9S/0/NTZ9wptqGxCXLRVZ3P4ZVx8DwF9NHMrwVjbVK82CM/L/BTR-82A-20122021-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-82/BTR-82A/Walkaround/i-H9xhG3Z/0/NRn2Md5SQncgQvmD5ggGk7R2L4pc3ZzBdTSc3QFG8/L/BTR-82A-20122021-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-82/BTR-82A/Walkaround/i-BfFVLqZ/0/NLw4Vkh3bSCW7n95JZppKFnSf5c3qrWXRR4kCBNsx/L/BTR-82A-20122021-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-82/BTR-82A/Walkaround/i-NFCksjZ/0/KtCqWtqN9QsfCwt9PVb3JGw89cRWFxb5HBWFZfTjh/L/BTR-82A-20122021-004-L.jpg"
    ],
    m:['Laserkasten auf der BMK (Bordmaschinenkanone) + Panzerung unterhalb der BMK','Schnorchel-Aufnahme am Heck sichtbar'],
    s:'LASERKASTEN AUF BMK + SCHNORCHEL-AUFNAHME HECK' },
  { id:311, nr:311, name:'BTR-MDM',            flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BTR-MDM/Walkaround/i-N9rJvj2/0/KmDLVJGLC9Qm276qRxpVftsZ4gqzzgf7fpTWGpkqq/L/BTR-MDM-20152022-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BTR-MDM/Walkaround/i-P5cP6Mr/0/M673vM6Dh93hQpFVJQxwpqP8f6RTbZqK4wwzzNx9g/L/BTR-MDM-20152022-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BTR-MDM/Walkaround/i-qbvVfDx/0/K6Qdd8tCQ3zZRqRpdTrRMMdQZ8hSmkt3N7TRqXmNK/L/BTR-MDM-20152022-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BMD-4/BTR-MDM/Walkaround/i-gHfT6tj/0/M9nKnGVh33qVXb4mcDpKN9GTvWmWN2BwnxDKVdNm5/L/BTR-MDM-20152022-004-L.jpg"
    ],
    m:['Kastenförmiger Aufbau (Kettenfahrzeug!) + 5 Laufrollen + kein klassischer Turm','2× Doppel-Nebelwurfbecher + 1 Blenden-MG vorne + kleines Schwallbrett'],
    s:'KASTENFÖRMIG + 5 LAUFROLLEN (KETTE) + 2× NEBELWURF' },
  { id:312, nr:312, name:'BTR-3',              flag:'🇺🇦', nation:'Ukraine', images:[],
    m:['Ukrainischer Radschützenpanzer auf BTR-80-Basis','Handout-Merkmale eintragen'],
    s:'UKRAINE – HANDOUT AUSSTEHEND' },
  { id:313, nr:313, name:'BTR-4',              flag:'🇺🇦', nation:'Ukraine', images:[],
    m:['Ukrainischer Radschützenpanzer – moderne Variante','Handout-Merkmale eintragen'],
    s:'UKRAINE – HANDOUT AUSSTEHEND' },
  { id:314, nr:314, name:'BTR-D',              flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-D/Walkaround/i-TS2k9wL/0/KvqbPrvghMjZWsf8vvzHffdwrrLTm8FdrHXNj8sz7/L/BTR-D-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-D/Walkaround/i-p6TGHtS/0/MZdgDqXzmnBPFZc9R85Srff532jVKHVQmwqLwVVHx/L/BTR-D-09-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-D/Walkaround/i-sCLmrbM/0/NH7SpVS2fTStvWQM62XT2mfKz3b3fbJPMNkmmHfsn/L/BTR-D-07-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-D/Walkaround/i-Hg5mxSm/0/Kwjr72xTQN2ccpN6CsjxbPpbfBVSzctc6NMnmC8Hz/L/BTR-D-06-L.jpg"
    ],
    m:['Kleiner flacher Buckel ohne Waffe (kein echter Turm) + Handlauf entlang dem Buckel','2 Blenden-MG vorne in der Wanne + 6 Laufrollen (+1 mehr als BMD-1)'],
    s:'FLACHER BUCKEL OHNE WAFFE + 2 BLENDEN-MG VORNE' },
  { id:315, nr:315, name:'MT-LB',              flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LB/Walkaround/i-k86BZLS/0/MzvKMSTfFKXDbtLp84b42H3kwrFTQPzj7LChNRS5H/L/IMG_8249-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LB/Walkaround/i-fLbX8pK/0/KgwZfXZ9mBx4Z2h8F3bzGLDgBrP85jwZBnk6LKDHj/L/IMG_8250-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LB/Walkaround/i-HPWwRpv/0/K3CwbRQzdRC4R2CRvfMq5q7TjMGsCrDSCfvHLSnf2/L/IMG_8251-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LB/Walkaround/i-s4v278c/0/MRTFvJcmm6J5x3SbLrFTg9B7QXFvDFTvkvWZQXX4k/L/IMG_8252-L.jpg"
    ],
    m:['Flache langgezogene Wannenfront mit Klappe + Fenster weit auseinander','6 große Laufrollen OHNE Stützrollen + kleiner Ein-Mann-Turm weit vorne (Beifahrerhöhe!)'],
    s:'6 GROSSE LAUFROLLEN OHNE STÜTZE + EIN-MANN-TURM VORNE' },
  { id:316, nr:316, name:'MT-LB VMK',          flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBVMK/Walkaround/i-hzPN35v/0/L6hFn3PfhrFkFPJ5hKSXGWR4nx8NKQPJXdc7hVJVK/L/MT-LBVMK-2011-2020-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBVMK/Walkaround/i-CTm9S76/0/K6zZfwwBJHbbPcNHDxfXbnxmSqSpdcwbm6KF79KX8/L/MT-LBVMK-2011-2020-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBVMK/Walkaround/i-zLm9rxb/0/NfQc3NcfgD4dX4QhnDFNMJVZjXPmSgB7DV7dBTSQR/L/MT-LBVMK-2011-2020-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBVMK/Walkaround/i-ZWRcFDf/0/L3jsk8NW87QRm3cQd7wDqS77RQxMp792dn7CHKFvM/L/MT-LBVMK-2011-2020-04-L.jpg"
    ],
    m:['Wie MT-LB – identische Wanne und Laufrollen','Kanone vorne auf dem Turm (statt nur MG wie bei MT-LB)'],
    s:'WIE MT-LB + KANONE AUF VORDEREM TURM' },
  { id:317, nr:317, name:'MT-LBu',             flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBM-6MA/Walkaround/i-CVNCjd3/0/MVnWcnKXGhHnBb88MnPvdfxKdzXHm39DWfhBdDLqP/L/MT-LBM-6MA-062011-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBM-6MA/Walkaround/i-bW2HbzN/0/M94cTwxb65BSpHnkXRbwFg6gsDqHLQsZTHrNCDrPj/L/MT-LBM-6MA-062011-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBM-6MA/Walkaround/i-gCZ4zXv/0/M8KCt3QZMFhBC6j9pvxvMVVkmQhbHBXvZr92QD9PJ/L/MT-LBM-6MA-062011-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/MT-LB/MT-LBM-6MA/Walkaround/i-dt5NXsd/0/K4KgDFw49XdvBhTqMVWBBdP2vh23V6f4cRm8KRg7j/L/MT-LBM-6MA-062011-04-L.jpg"
    ],
    m:['Kompletter oberer Wannenteil sargförmig aufgesetzt (markant größer als MT-LB)','Großer Abstand zwischen Laufrollen und Wannenkörper'],
    s:'SARGFÖRMIGER AUFBAU OBEN + GROSSER ROLLEN-ABSTAND' },
],

aufkl: [
  { id:400, nr:400, name:'BRDM-2',     flag:'🇷🇺', nation:'Russland', images:[],
    m:['Bootsförmige Wanne + Stützräder absenkbar','Luke für Hydrojet am Heck (groß) + Seite glatt mit Winkelspiegeln','Zwei Aufstiegshilfen an der Seite'],
    s:'BOOTSFÖRMIG + HYDROJET-LUKE + STÜTZRÄDER' },
  { id:401, nr:401, name:'BRDM-2M',    flag:'🇷🇺', nation:'Russland', images:[],
    m:['Wie BRDM-2 aber mit Tür zusätzlich bekommen','Stützräder entfernt (Unterschied zu BRDM-2)'],
    s:'WIE BRDM-2 + TÜR + KEINE STÜTZRÄDER' },
  { id:402, nr:402, name:'CAYMAN',     flag:'🇷🇺', nation:'Russland', images:[],
    m:['Große Scheibe mit Monobogen + 2 Seitenfenster für MKF','Aufgesetzter Staukasten am Heck + Propellerantrieb','Ergonomische Tür mit Fenster + Aufstiegshilfe'],
    s:'MONOBOGEN-SCHEIBE + PROPELLER + ECKIGE RADKÄSTEN' },
  { id:403, nr:403, name:'BPM-97',     flag:'🇷🇺', nation:'Russland', images:[],
    m:['Gepanzertes Fahrzeug mit charakteristischem Aufbau'],
    s:'BPM-97 – HANDOUT AUSSTEHEND' },
  { id:404, nr:404, name:'BRM-1',      flag:'🇷🇺', nation:'Russland', images:[],
    m:['Funkmast anliegend – sieht aus wie dünner Schnorchel','Luke auf Wanne nach außen aufklappend','Beule am Turmheck: Luke für Radar'],
    s:'FUNKMAST WIE SCHNORCHEL + RADAR-BEULE AM TURM' },
  { id:405, nr:405, name:'BRM-1K',     flag:'🇷🇺', nation:'Russland', images:[],
    m:['Mast über Heck sieht aus wie dünner Schnorchel','Staukästen für Antenne verdecken Schießluken','Winkelspiegel: 1 links – 2 rechts'],
    s:'MASTSCHNORCHEL + ANTENNENSTAUKÄSTEN' },
  { id:406, nr:406, name:'BRM-3K',     flag:'🇷🇺', nation:'Russland', images:[],
    m:['Kleine Luke und 2 Hydrojets unten','Staukästen an der Seite über dem ersten Rad','BMP-3-Wanne + ein Antennenfuß mittig auf Wanne'],
    s:'BMP-3-WANNE + 2 HYDROJETS + ANTENNENFUSS' },
],

art: [
  { id:500, nr:500, name:'2A36',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Teller unterhalb Kanone erkennbar + Schild links und rechts neben Verschluss','3 aufliegende Rohrrückholer mit Dach + Mündungsbremse 5 Kammern schmal','4 Räder + Spreizlafette'],
    s:'TELLER UNTER KANONE + 5-KAMMER-MÜNDUNG + 3 RÜCKHOLER MIT DACH' },
  { id:501, nr:501, name:'2A65',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Ein Stützteller + kleiner Schild + Staukästen hinter Schild','2 Rohrrückholer OHNE Dach + kleines Gitter über Verschluss','3 große Kammern Mündungsbremse + 2 Räder + lange Spreizlafette'],
    s:'KEIN DACH RÜCKHOLER + 3-KAMMER-MÜNDUNG + 2 RÄDER' },
  { id:502, nr:502, name:'D-1',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Schutzschild mit verschiebbarem Mittelteil + Staukasten an Schild außen','Verschluss würfelförmig + kurzes Rohr'],
    s:'VERSCHIEBBARES SCHILD + WÜRFELVERSCHLUSS + KURZES ROHR' },
  { id:503, nr:503, name:'D-20',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Wellige Schildoberkante abklappbar + Reifen leicht schräg in Schussposition','Stützteller unter Kanone + Rückholer schauen knapp vor dem Schild raus'],
    s:'WELLIGE SCHILDKANTE + SCHRÄGE REIFEN + STÜTZTELLER' },
  { id:504, nr:504, name:'D-30',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Zugöse an Mündungsbremse + kleines Schild','Rückholer in einem Kasten auf dem Rohr + 6 Kammern'],
    s:'ZUGÖSE AN MÜNDUNG + RÜCKHOLER IM KASTEN' },
  { id:520, nr:520, name:'2S1',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Motor vorne + MKF rechts mit einer Luke + nur eine Luke mit Schussblende','Eine Optik links vom Rohr'],
    s:'MOTOR VORNE + MKF RECHTS + SCHUSSBLENDE' },
  { id:521, nr:521, name:'2S3',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Räum-/Schiebeschild (entfernbar) + 2 Keile auf der Wanne in Höhe Motor','Turm wirkt fast breiter als Wanne + 3 Halterungen am Turm'],
    s:'RÄUMSCHILD + TURM BREITER ALS WANNE + 3 HALTERUNGEN' },
  { id:522, nr:522, name:'2S5',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Schild für Bediener linke Seite + dreizahniges Gegenlager abklappbar','Abgeschrägte Kanten + offenliegendes Geschütz'],
    s:'BEDIENERSCHILD LINKS + DREIZAHN-GEGENLAGER + OFFEN' },
  { id:523, nr:523, name:'2S7',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Fahrerhaus kantig mit 2 Anschlagpunkten + große Schaufel','Große Hydraulikzylinder + Käfige und keine Schilder'],
    s:'KANTIG FAHRERHAUS + GROSSE SCHAUFEL + HYDRAULIK' },
  { id:524, nr:524, name:'2S9',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['2 Winkelspiegel nach hinten am Turm + kurzes dickes Rohr','Fällt schräg ab + Walzenblende'],
    s:'KURZES DICKES ROHR + WALZENBLENDE + SCHRÄG' },
  { id:525, nr:525, name:'2S19',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Turm doppelt so groß wie Wanne + Ladearm nach oben hochgeklappt mittig','Abluftkanal links und rechts vom Turm'],
    s:'RIESIGER TURM + LADEARM OBEN + ABLUFTKANÄLE' },
  { id:526, nr:526, name:'2S23',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Kellerschacht am Turm links + Kugel mit Optik links am Turm','BTR-70-Wanne + Auspuff vom BTR-80'],
    s:'BTR-70-WANNE + KELLERSCHACHT + KUGELOPTIK' },
  { id:527, nr:527, name:'2S31',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Kurzes Schwallbrett + Blenden-MG in extra Rohr rechts neben Rohr','Ladeluke links nach unten aufklappbar + Ladeschiene am Turm'],
    s:'SCHWALLBRETT + MG NEBEN ROHR + LADELUKE LINKS' },
  { id:528, nr:528, name:'2S34',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Über Wannenkante rausragend + fliegenförmig','MTLB-Wanne'],
    s:'FLIEGENFORM + MTLB-WANNE + RAGT ÜBER KANTE' },
  { id:529, nr:529, name:'2S43',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Fahrerhaus mit zwei Türen links und rechts + Nebelmittel auf dem Dach','2 tellerförmige Bodenplatten + großer Kasten neben dem Rohr'],
    s:'2 TÜREN FAHRERHAUS + TELLERPLATTEN + KASTEN AM ROHR' },
  { id:530, nr:530, name:'2B11',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Lafette abklappbar + Bodenplatte mit 4 Griffen + Krone zur Sicherung'],
    s:'ABKLAPPBARE LAFETTE + 4-GRIFF-PLATTE + KRONE' },
  { id:531, nr:531, name:'2S4',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Große viereckige Bodenplatte mit Sonnenmuster + liegt schräg auf dem Rohr','Kran zum Beladen + reicht bis 2/3 der Fahrzeuglänge'],
    s:'SONNENMUSTER-BODENPLATTE + KRAN + 2/3 LÄNGE' },
  { id:532, nr:532, name:'2B23',  flag:'🇷🇺', nation:'Russland', images:[],
    m:['Zurhaken am Rohr + Doppel-T-Haltegriff am Ende des Rohres','Räder an der Lafette selbst angebracht + werden hochgeklappt'],
    s:'DOPPEL-T-GRIFF + HOCHKLAPPBARE LAFETTENRÄDER' },
  { id:533, nr:533, name:'2B9',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Mit Magazin geladen + 3 Rohrrückholer (einer oben, 2 drauf)','Lafettenstangen mit kleinen Keilen am Ende'],
    s:'MAGAZINGELADEN + 3 RÜCKHOLER + KEILE AN LAFETTE' },
],

mlrs: [
  { id:600, nr:600, name:'BM-21 GRAD',     flag:'🇷🇺', nation:'Russland', images:[],
    m:['Raketenpaket immer schräg mit 40 gleichmäßigen Rohren + 4 Startreihen','Ummantelung um das Paket + Auslösung vom Beifahrer','Halterung für Optik hinten links am Werferpaket'],
    s:'40 ROHRE SCHRÄG + 4 REIHEN + UMMANTELUNG' },
  { id:601, nr:601, name:'BM-27 URAGAN',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Achse 1-2-1 + Fahrerhaus mit Nase + Frontscheibe mit Schutzklappe nach unten abklappbar','Startbehälter in Fahrtrichtung gedreht + großer Kühler hinter Fahrerhaus','2 Stützen am Heck + 4 Raketen oben aufliegend versetzt'],
    s:'ACHSE 1-2-1 + NASE FAHRERHAUS + KÜHLER HINTER HAUS' },
  { id:602, nr:602, name:'BM-30 SMERCH',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['Breiter Kühler mit Doppelkabine (MKF + Beifahrer hintereinander)','Schießkabine hinter Fahrerhaus + 3× 4er Bündel + 4-Achsen-Fahrzeug','Stützen zwischen Achse 3 und 4'],
    s:'DOPPELKABINE + 3×4 BÜNDEL + 4 ACHSEN' },
  { id:604, nr:604, name:'TOS-1 BURATINO', flag:'🇷🇺', nation:'Russland', images:[],
    m:['4 Abschussreihen + oberste Reihe mit weniger Raketen','Auf Panzer-Wanne (T-72-Basis)'],
    s:'4 REIHEN + OBEN WENIGER RAKETEN + PANZERWANNE' },
  { id:605, nr:605, name:'TOS-1A',         flag:'🇷🇺', nation:'Russland', images:[],
    m:['Gleichmäßiges Werferpaket mit 3 Reihen + Stützbeine am Heck','Nachladefzg mit Kran in der Mitte und gleichmäßigem Paket'],
    s:'3 GLEICHMÄSS. REIHEN + STÜTZBEINE HECK' },
  { id:606, nr:606, name:'TOS-2 TOSOCHKA', flag:'🇷🇺', nation:'Russland', images:[],
    m:['Links einen Kranarm an Kasten + Trittbleche werden aufgeklappt','Heckklappe schaufelförmig + Stützbeine hinter letzter Achse'],
    s:'KRANARM LINKS + SCHAUFEL-HECK + AUFKLAPPBAR' },
  { id:607, nr:607, name:'9A54 TORNADO',   flag:'🇷🇺', nation:'Russland', images:[],
    m:['6 Raketen auf 4-Achsen-LKW + umlaufende Windungen am Rohr','2 Stützen am Heck'],
    s:'6 RAKETEN + 4 ACHSEN + WINDUNGEN AM ROHR' },
],

// ── HANDOUT 700 — ABC-Spürfahrzeuge (CBRN) ──────────────────────────────────────────
cbrn: [
  { id:700, nr:700, name:'BRDM-2RKhB',  flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/BRDM-2RKhB/Walkaround/i-KKmJbp6/0/KSCnXkn6mkWV2VHwBLjXTjm5fHGqZ3w5ZhF8HDJzq/L/BRDM-2RKhB-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/BRDM-2RKhB/Walkaround/i-hmdGBKf/0/NH4SSd6cpWgGGCQv2r7DWFFMCD2f7FVCkXvvB7D6v/L/BRDM-2RKhB-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/BRDM-2RKhB/Walkaround/i-ZzzQFbN/0/L8Z2mSDvbC9g7JZ4tQZ5Wk7wfX8NkFTZT9XzHW7bB/L/BRDM-2RKhB-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/BRDM-2RKhB/Walkaround/i-n8JPgRd/0/K8ZfZ5cpRrwN6f2jVdcLwPjHP4QWXwBx9RW6S9tL5/L/BRDM-2RKhB-04-L.jpg"
    ],
    m:['Auf BRDM-2-Radwanne (4×4) — niedrige, geschlossene Silhouette ohne Turm','Vier charakteristische Hilfsstützräder seitlich an der Wanne (Grabenüberschreitung)','Detektions-Antennenausleger und Probenahmesysteme am Wannenheck sichtbar'],
    s:'BRDM-2-RADWANNE + STÜTZRÄDER SEITLICH + KEINE KANONE' },
  { id:701, nr:701, name:'RPM-2',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RPM-2/Walkaround/i-LB5bZM9/0/MPqzFtDRMGB4HP7S8V46JNQdVZCR4dRNpmc24hvWG/L/RPM-2-20112018-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RPM-2/Walkaround/i-RczVC5S/0/L94mXL9crHmv9vBSNbRhvGrx8jBr2wLBRjXQFSPbn/L/RPM-2-20112018-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RPM-2/Walkaround/i-CMsrxBD/0/KzDWCdPQ2grBzf7Z52zB6jzM8Lq55t5xVD8NVfxD6/L/RPM-2-20112018-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RPM-2/Walkaround/i-WHtBjb9/0/NbZ29PSpFVJHNmV8nMxCBKc2ZJ477DkVrdfwS2nXd/L/RPM-2-20112018-04-L.jpg"
    ],
    m:['Auf MT-LBu-Kettenwanne — längliche, niedrige gepanzerte Wanne','Kastenförmiger Aufbau mit verschiedenen Mess-/Detektionsantennen außen','Kein Turm, kein Rohr — reines Spürfahrzeug'],
    s:'MT-LBu-WANNE + KASTENAUFBAU + ANTENNEN OHNE TURM' },
  { id:702, nr:702, name:'RKhM-4',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-4/Walkaround/i-9zQdS3j/0/NLZTdH2HH9PrRTWFQnFxhbS8Mf32tzBw79SWb9Str/L/RKhM-4-20112021-22-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-4/Walkaround/i-cRXNjPQ/0/MHZwGzJ5LXdT8X4kgWnCqPZX7dbZ9MbHjmV62QVZ9/L/RKhM-4-20112021-23-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-4/Walkaround/i-4TbBsBp/0/MXt25fZGPhs9WPcjjQ9qtC9nfr2MgbFTDb2gKcwrb/L/RKhM-4-20112021-24-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-4/Walkaround/i-s65HCbb/0/KRnCh8jD86xPxLTvVvqL6JWsSMBQq4kKhcwpfpdPz/L/RKhM-4-20112021-25-L.jpg"
    ],
    m:['Auf MT-LBu-Kettenwanne mit deutlich höherem, kastenförmigem ABC-Aufbau','Mehrere Antennen-/Sensorausleger am Heck für automatische Probenahme','Großes Fahrzeug — erkennbar breitere und höhere Wanne als BRDM-Varianten'],
    s:'MT-LBu + HOHER KASTEN + SENSORAUSLEGER HECK' },
  { id:703, nr:703, name:'RKhM-5',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-5/Walkaround/i-BxfRKwx/0/KNMBSKKz8kpsL75nkMQMMDM8HPHVG8v7x2LQPmNw9/L/RKhM-5-20162018-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-5/Walkaround/i-6ZcWgMM/0/MhzmmgwGMgtjbdLWXPS6J5njxW55wrLd3L86cNRB3/L/RKhM-5-20162018-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-5/Walkaround/i-6SCkJkq/0/McDBn8xrGhXDNWmTHZCKbNLv9Pk9pKCQ7fj3c3Tgz/L/RKhM-5-20162018-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-5/Walkaround/i-ngcWJNC/0/KLVb9gQ9457CVFpwWWtCMx9fTbKqfj6C4zWt2Xgqc/L/RKhM-5-20162018-04-L.jpg"
    ],
    m:['Auf BMD-3-Luftlandewanne — kompaktere, schmalere Silhouette als MT-LBu-Varianten','Für Luftlandekräfte ausgelegt — airportabler als andere RKhM-Versionen','Erkennbar durch BMD-3-typische Wannenform mit geschwungener Front'],
    s:'BMD-3-LUFTLANDEWANNE + KOMPAKT + SCHMAL' },
  { id:704, nr:704, name:'RKhM-6',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-6/Walkaround/i-FcnnCbP/0/MCzpNLvHBSjQdW8xMk4NpHWRDHDvrNFGCsqvBHbrV/L/RKhM-6-20112019-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-6/Walkaround/i-jMGbhhx/0/L8bFLTnffn46MB9DD5tcvPMdKHmdpCBp8BnqxPxkh/L/RKhM-6-20112019-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-6/Walkaround/i-PTMWpWG/0/NZXMtW5RwFsHJHwcRTdNzdZR4TmpWshN9vwZjkCf7/L/RKhM-6-20112019-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-6/Walkaround/i-vT5Ld6n/0/NcGxMQGTdvnDsSDPPS2jqKXCnBrzBKqD7wn4svDQ7/L/RKhM-6-20112019-04-L.jpg"
    ],
    m:['Auf KAMAZ-63501 (8×8) LKW-Chassis — großes Radfahrzeug mit Allradantrieb','Kubischer Aufbaucontainer auf Ladefläche mit ABC-Labortechnik','Typische LKW-Fahrerhauskabine + Container-Aufbau = kein Kettenfahrzeug'],
    s:'KAMAZ 8×8 LKW + CONTAINER-AUFBAU HINTEN' },
  { id:705, nr:705, name:'RKhM-8',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-8/Walkaround/i-Sdf978V/0/Lbq8Vf3JPvrQ6DCtMsQfsQx8C6sqQmX6WTTssPPrH/L/RKhM-8-20182021-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-8/Walkaround/i-NtBZKwS/0/KmSWXLQmkznHj4QTjPF4fwztXSpmMJHm5hFjd8tdZ/L/RKhM-8-20182021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-8/Walkaround/i-t8Rwbbc/0/Lk73mMrx8Lx2hSxCLqG6ft9dvGqnRN9Dxd85VRpC8/L/RKhM-8-20182021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM-8/Walkaround/i-LvsKhnt/0/KsfwHRRtwhFT6GVkgkGr2jLBWKcGgbMLJHBCxWXpb/L/RKhM-8-20182021-04-L.jpg"
    ],
    m:['Auf Tigr (UAZ-3163) Radfahrzeug — kleinstes Fahrzeug der RKhM-Familie','Kompakte 4×4-Geländewagenbasis mit kleinem ABC-Detektionsaufbau auf dem Dach','Sehr niedrig und schmal — deutlich kleiner als alle anderen RKhM-Versionen'],
    s:'TIGR/UAZ-BASIS + KLEINSTER RKhM + 4×4 GELÄNDEWAGEN' },
  { id:706, nr:706, name:'RKhM',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM/Walkaround/i-QLNh5zM/0/KRN224dq8bpCPJ9JxjDXwd9C942Hn6S2PdfpNHt2P/L/RKhM-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM/Walkaround/i-JX4HmSp/0/MtkGtkBkQXKx73PfC63gMnthQD4TPNPwJpgRV6pSJ/L/RKhM-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM/Walkaround/i-Tn2v4cd/0/MLXgbk9LF8pqv4JT6728z5tnjrFRQk7xhFQR6fZDW/L/RKhM-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/CBRN-Defence/CBRN-Reconnaissance/RKhM/Walkaround/i-vjN4R7W/0/LxqRF3LpGdRK6dz222NL3B2RBZ3DRhV3gZRBDtn5V/L/RKhM-04-L.jpg"
    ],
    m:['Auf BRDM-2-Radwanne (4×4) — frühe Version, ähnlich BRDM-2RKhB aber älter','Abgasrohre und Detektionsgstänge hinter dem Fahrerhaus','Einfachere Sensorausstattung als neuere RKhM-Modelle — weniger Anbauten'],
    s:'BRDM-2-BASIS + FRÜHE VERSION + EINFACHE SENSOREN' },
],

// ── HANDOUT 800 — Pioniersysteme ──────────────────────────────────────────────
pio: [
  { id:800, nr:800, name:'MT-55A',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-55-MT-55/Walkaround/i-pns9D8n/0/KfhKgtMxdWF23hQqf4DpfKvpng4KFgm2St43JgBvd/L/TechMuseumToliatti-2300-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-55-MT-55/Walkaround/i-tsRmZ6j/0/NZMkcRgRW4rd94V6THHvb83pGM2JTPMHRkSgMJgs8/L/TechMuseumToliatti-2301-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-55-MT-55/Walkaround/i-vGj5sfw/0/LQsSFdnhj8GqWd7mjL2HCmJcsVHqxRcDMBFNQ2tZ6/L/TechMuseumToliatti-2302-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-55-MT-55/Walkaround/i-3LpSKfS/0/LzwktRrvMRPPWvb5X4pMjk6J8Bqh9C5zJvfSf8CRB/L/TechMuseumToliatti-2303-L.jpg"
    ],
    m:['Brückenlegepanzer auf T-55-Wanne — breite Scherbrücke im zusammengefalteten Zustand oben','Charakteristisches gefaltetes Brückenpaket überragt Breite und Höhe deutlich','Keine Bewaffnung sichtbar — reines Pioniersystem auf Kampfpanzerwanne'],
    s:'T-55-WANNE + GEFALTETE SCHERBRÜCKE OBEN' },
  { id:801, nr:801, name:'MTU-72',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-72/Walkaround/i-wnzwxCP/0/Ks5LPj8JScrPvC9GfHJFXwN5vZLmfHLvpqrNGRgHp/L/MTU-72-20142021-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-72/Walkaround/i-5qHdNMc/0/KHwx7cSW7GLV3QtjTKjfgk6sw4FGjV6k3BLTdNQ5P/L/MTU-72-20142021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-72/Walkaround/i-NSWk2Cq/0/KvQ5gdzpSKtWCbZr7bbpbHzS4grtMVHGHFV5wn2Lq/L/MTU-72-20142021-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-72/Walkaround/i-BcT9tPt/0/KcM692Qzc6gsvK2V2T7XrddzJtQFGSdKNqCv4rbL7/L/MTU-72-20142021-04-L.jpg"
    ],
    m:['Brückenlegepanzer auf T-72-Wanne — moderne Variante der Scherbrückenfahrzeuge','Kompakteres Brückenpaket als MT-55A durch verbessertes Faltungssystem','T-72-Typisches Fahrgestell mit 6 Laufrollen + deutlich sichtbares Brückenpaket oben'],
    s:'T-72-WANNE + 6 LAUFROLLEN + SCHERBRÜCKE OBEN' },
  { id:802, nr:802, name:'MTU-90M',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-90M/Walkaround/i-bxDLv8L/0/KqLgMsc4pFfzJbxn36rv5Rp7hB22JFQ3k47V6CGDh/L/MTU-90M-082017-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-90M/Walkaround/i-Hb3wQgD/0/LNXpRJ6G4XtZfGTncdQKsFMZWzsSgxV34zg9x5Bp7/L/MTU-90M-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-90M/Walkaround/i-BzsHMrc/0/LsQVH3jTWVvqwkCbkcBJfPCdBR3PgMPwWSDw3mcGf/L/MTU-90M-05-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/MTU-90M/Walkaround/i-MK3K9qR/0/L4W7bTsMzBP7dgmg5tmRJw59HDgXDSWLkCgS37rpf/L/MTU-90M-07-L.jpg"
    ],
    m:['Brückenlegepanzer auf T-90-Wanne — modernste russische Scherbrückenvariante','Brücke wird hydraulisch aufgerichtet und über Hindernis geschoben (kein Faltsystem)','T-90-typisches Fahrgestell erkennbar + breites Brückenpaket vorne aufgestützt'],
    s:'T-90-WANNE + HYDRAULISCH-BRÜCKE + MODERNSTE VERSION' },
  { id:803, nr:803, name:'UR-77',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UR-77/Walkaround/i-LfpKLd7/0/MXhq8Fg5fV5LvD54HtP7KSM86WD5qKf3FhfmMDgqj/L/UR-77-20162017-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UR-77/Walkaround/i-kHhxccS/0/KQxsS53MCzzJ3S4KjL8f9s8qqpwQjKMG3CF4tmsmn/L/UR-77-20162017-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UR-77/Walkaround/i-nz5zCTt/0/MZKxTWwSjRLgc2HLFpdWf4NqTm2pgfhNzSVxvLphp/L/UR-77-20162017-06-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UR-77/Walkaround/i-xmcMtr3/0/L7cpwMm2R2k9bb72RksmjLJvGMvqRdgwsMP3czLk5/L/UR-77-20162017-07-L.jpg"
    ],
    m:['Auf BMP-1-Wanne — langer kastenförmiger Aufbau ohne Turm','Zwei charakteristische Raketenabschussrohre schräg nach oben am Aufbau (für Gassenschnur)','Feuert Sprengschnur per Rakete aus — erkennbar durch die schrägen Rohre seitlich'],
    s:'BMP-1-WANNE + KASTENAUFBAU + 2 SCHRÄGE ABSCHUSSROHRE' },
  { id:804, nr:804, name:'UMZ G/K/T',   flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UMZ-G/Walkaround/i-C7d6g2S/0/Mbbf7dsDHcWZ5dSZ9tXtmV2JgzRfKRBVNBXmzvXMT/L/UMZ-G-062019-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UMZ-G/Walkaround/i-sD9Ttzp/0/M5j3C3CDFgmVP4BDx4qqtrTR8FHh2tRzddF7s2rcj/L/UMZ-G%20002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UMZ-G/Walkaround/i-GBSHVKL/0/Nb2PRwhNCLmxgTc5bghc5wHxXRPwcVX2DRfRr9pkb/L/UMZ-G-062019-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/UMZ-G/Walkaround/i-QcMdxkM/0/McFhMJkGks6JLPqVDpCxgKjcXqtFkKzhhXpMs4CVD/L/UMZ-G%20003-L.jpg"
    ],
    m:['Streuminenwerfer auf verschiedenen Fahrzeugbasen (Ural/KrAZ/T-Chassis)','Charakteristisches breites Werferpaket mit Ausstreuffnungen hinten','Minen werden seitlich und rückwärts ausgestreut — Werferrahmen gut erkennbar'],
    s:'STREUMINENWERFER + BREITES WERFERPAKET + AUSSTREUÖFFNUNG' },
  { id:805, nr:805, name:'GMZ-3',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/GMZ-3/Walkaround/i-ktmpwQv/0/M7pMR7ckhNtwVCzv9D5rLTdTjhWm58Zm4K3rkpDWw/L/GMZ-3-062012-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/GMZ-3/Walkaround/i-DS7r4QK/0/LqZDNb4vxg3dLW9J9PRrrXjNSPdw8J3sv4gMVwb3c/L/GMZ-3-062012-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/GMZ-3/Walkaround/i-4Sk7pfQ/0/MZbV8F9SPfQ6NQsT7RcKzpNvW49sTcc93h4GtqGsC/L/GMZ-3-062012-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/GMZ-3/Walkaround/i-G3VBL4W/0/KgwH5kLPpSwGd75BNbgRHVVcGHczNTqSf3QNFWDC4/L/GMZ-3-062012-04-L.jpg"
    ],
    m:['Gleiskettenminenleger auf MT-LBu-ähnlicher Wanne — niedriges Fahrzeug','Charakteristischer Minenschacht am Heck — Minen werden einzeln in den Boden gelegt','Kein Turm — langer, gestreckter Wannenkörper mit Verlegevorrichtung hinten'],
    s:'KETTENWANNE + MINENSCHACHT HECK + KEIN TURM' },
  { id:806, nr:806, name:'TMM-6',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/TMM-7/Walkaround/i-kHsvfXg/0/NDxNMj8srdfjjfT7vNP5r6w366L5NMs5JHnzDLwm6/L/TMM-7-20172020-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/TMM-7/Walkaround/i-9bn6dcB/0/KcRJWTW9pCpXLRH3BJkn53p9kW722T7NzfcbPJn3r/L/TMM-7-20172020-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/TMM-7/Walkaround/i-mPN9n2h/0/KxQcPN3M9Js5cGqqJf6zQWM6DrT2dfwkxN2xN4hLg/L/TMM-7-20172020-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/TMM-7/Walkaround/i-5RgBXHs/0/L6RB5BHT8VHstBF8s5gKM5fvRCjxQqRGCQjT476zT/L/TMM-7-20172020-04-L.jpg"
    ],
    m:['Schwerlasttragbrücke auf KrAZ-260 LKW-Chassis — 6-achsiges Radfahrzeug','Enormes gefaltetes Brückenpaket auf der Ladefläche (je zwei Brückenelemente)','LKW-Fahrerhaus gut erkennbar — kein Kettenfahrzeug, sondern schwerer Militär-LKW'],
    s:'KRAZ 6-ACHSEN-LKW + RIESIGES BRÜCKENPAKET LADEFLÄCHE' },
  { id:807, nr:807, name:'PTS-2',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-2/Walkaround/i-Z44mMR4/0/MZ8SVBhZWfjLnFVc4WKf9r5kk5KfqXzBx3f98K6M8/L/TechMuseumToliatti-2597-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-2/Walkaround/i-VjJXqWf/0/M4nBQGcd5tbsmzn36KsLWM7d9zFcgJ5rCNcHWn8sZ/L/TechMuseumToliatti-2598-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-2/Walkaround/i-Csk2gjw/0/Lfs7zwxCznSBTH8c8jkp8NkwZPmmV4sfQVMdKcvRz/L/TechMuseumToliatti-2599-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-2/Walkaround/i-tG2vPks/0/MWVmGFN84KCS2FKkvhNfNDbDQCJzx3zsH25BnXPnj/L/TechMuseumToliatti-2600-L.jpg"
    ],
    m:['Schwerer gepanzerter Schwimmtransporter auf Kettenbasis — große kastenförmige Wanne','Charakteristisch große breite Wanne ohne Turm + Propeller am Heck für Schwimmantrieb','Heckrampe für Be- und Entladen + Wellenbrecher vorne am Bug gut erkennbar'],
    s:'GROSSER SCHWIMMTRANSPORTER + KASTENFÖRMIG + HECKRAMPE' },
  { id:808, nr:808, name:'PTS-4',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-4/Walkaround/i-nt5p3d6/0/LkkJjDQtrHcD55d2XtGZLwTncDF4rwfjfpsmxpXZ8/L/IMG_0372-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-4/Walkaround/i-Nw2SdD6/0/M5fF9gLrGt6cxRMrRtsjtnqbRvt9GPqKsttxf5t7S/L/PTS-4-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-4/Walkaround/i-PHLHNQx/0/MGH48X3QKRzPVdgcmKLZgp4WPMD2NRH22jwhKBTSq/L/PTS-4-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PTS-4/Walkaround/i-jTsSPwP/0/MJbjvR5TmLH32t2D225PhtD6FSKfDC7V7k8xQTDJg/L/IMG_0373-L.jpg"
    ],
    m:['Modernisierter Schwimmtransporter — breitere und höhere Wanne als PTS-2','Verbesserte Antriebsanlage + erhöhte Nutzlast gegenüber PTS-2','Ähnliche Grundform wie PTS-2, aber moderneres Erscheinungsbild + neue Kette'],
    s:'MODERNISIERTER SCHWIMMTRANSPORTER + BREITER ALS PTS-2' },
  { id:809, nr:809, name:'PMM-2M',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMM-2M/Walkaround/i-cqDwGn9/0/M663tVcsb95Pj5bwwrgvm9bff72XXpvs2fVM33XKN/L/PMM-2M-20172021-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMM-2M/Walkaround/i-fkNVMrv/0/LBDHXLwMKWvx3kJN2mLMdgLGGGmZcSHJSZpKbgcmF/L/PMM-2M%20002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMM-2M/Walkaround/i-dZnXHm7/0/Kzj8sLgVx77t5p8h2k4DWrD85wSpjddtxHhjrrN4N/L/PMM-2M-20172021-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMM-2M/Walkaround/i-jrqqjm4/0/Kk5ZHK6kSKvng9Pj3csdXbDcbj9Q2jZFkQ7VC7xk5/L/PMM-2M-20172021-03-L.jpg"
    ],
    m:['Motorisiertes Pontonferienboot — selbstfahrende Fähre auf Schwimmkörper-Basis','Zwei breite Schwimmkörper links und rechts + Fahrbahntrgr in der Mitte','Im Wasser: koppelt mit anderen Einheiten zu Brücke/Fähre zusammen'],
    s:'PONTONFAHRZEUG + ZWEI SCHWIMMKÖRPER + SELBSTFAHREND' },
  { id:810, nr:810, name:'PMP/M',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMP-M/Walkaround/i-7NknnqC/0/MPLwcprhRBJbW6rRp4kWPJvQfnRhnVjttZtXQFS6m/L/PMP-M-082017-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMP-M/Walkaround/i-sxVpnWv/0/KmfCfnrWLkVZT76XLxB5n9dbK4vNQGDvq7QQGkKhz/L/PMP-M-082017-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Bridge-laying-ferry--and-pontoon/PMP-M/Walkaround/i-MQ2FGbQ/0/MpDhMqx3sNCt44xm3P94kV9N83qgmL3MvZ7R4qtZd/L/PMP-M-082017-03-L.jpg"
    ],
    m:['Pontonbrückenatz auf Ural/KrAZ LKW — Pontonelemente zusammengefaltet auf Ladefläche','Im Einsatz: Einzelelemente werden entfaltet und zu Schwimmbrücke zusammengekoppelt','LKW mit charakteristisch breitem gefalteten Schwimmelement auf der Ladefläche'],
    s:'LKW + GEFALTETE PONTONELEMENTE AUF LADEFLÄCHE' },
  { id:811, nr:811, name:'IRM-ZHUK',     flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IRM-Zhuk/Walkaround/i-C6NtH5s/0/LcT5RWhDzdDn978WNFtbhTCptDj9ZhMhjcTkL2jr9/L/IRM-Zhuk-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IRM-Zhuk/Walkaround/i-JbJJ7Qq/0/MnW3GsJS6nFMs96Nn7GjmG9TQ4zKWjx2rwJM7S5Q8/L/IRM-Zhuk-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IRM-Zhuk/Walkaround/i-9mhFbBw/0/NjMG5cfqcZzdxVNsZ5N9WbVW7QCVtsTpxPh5hKmjM/L/IRM-Zhuk-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IRM-Zhuk/Walkaround/i-3mgHJ9b/0/KQVKNkfWJ8dPTbCcdPBhH6CdZXB3hG4nkzwnFwthf/L/IRM-Zhuk-05-L.jpg"
    ],
    m:['Ingenieur-Aufklrungsfahrzeug auf BMP-Wanne — Spezialausrüstung außen erkennbar','Zwei charakteristische ausfahrbare Schilder/Sonden an der Wannenfront für Grunduntersuchung','Periskopsensoren und Echolot-Ausrüstung + BMP-1-typisches Fahrgestell'],
    s:'BMP-WANNE + SONDEN AN WANNENFRONT + BODENUNTERSUCHUNG' },
  { id:812, nr:812, name:'BAT-2',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Field-engineering-Fortification-and-Construction/BAT-2/BAT-2/Action/i-pG5hNB2/0/LJjmB4FXwfJh7sx4Q8zMQCpD6BQG2TBnF3jXS3Wf5/L/BAT-2-062017-08-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Field-engineering-Fortification-and-Construction/BAT-2/BAT-2M/Walkaround/i-GDrc4xg/0/LjNtTKFKzvWNm4f2P8ffkXchGbsm6JRP8N4LcrjRP/L/BAT-2M-082021-08-L.jpg"
    ],
    m:['Schwere Planierraupe auf T-72-Chassis — breite hydraulische Planierschaufel vorne','Keine Turmöffnung — abgeflachter gepanzerter Führerstand über der Wanne','Charakteristisch breite Schaufel + 6 Laufrollen T-72 + keine Bewaffnung'],
    s:'T-72-CHASSIS + BREITE PLANIERSCHAUFEL + KEIN TURM' },
  { id:813, nr:813, name:'IMR-3M',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IMR-3M/Walkaround/i-FBKhGMB/0/LhfpK5mZnPKg5gcmM7CdBP7mtBvJjJ6Ws8tvBmM76/L/IMR-3M-20102021-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IMR-3M/Walkaround/i-KPftMBM/0/MNCmfJ2RT42xtmW66s8gwjzV5g3Tdxv9Shs7JxGMg/L/IMR-3M-20102021-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IMR-3M/Walkaround/i-jm32jVz/0/MhdntCbB5KwD4n2Gzzwm3K3N44tPfWdpFKDZvZPRD/L/IMR-3M-20102021-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Obstacle-Clearing-Other/IMR-3M/Walkaround/i-vS86Ctx/0/LPNvKWsJh7KFc7d7k6spHMGH8DpBvNJqxkBtLwXRw/L/IMR-3M-20102021-004-L.jpg"
    ],
    m:['Kampfingenieurmaschine auf T-90-Wanne — Greifarm oben + Planierschild vorne','Teleskopausleger mit Greifzange oben auf dem Fahrzeug deutlich erkennbar','Kombinationsgert: Schild vorne fr Trümmer + Arm oben für Greifen/Heben'],
    s:'T-90-WANNE + GREIFARM OBEN + SCHILD VORNE' },
  { id:814, nr:814, name:'MDK-3',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Field-engineering-Fortification-and-Construction/MDK-3/Walkaround/i-pP6JgMN/0/MrrGbphRtL7QZPBnWhNDH7HfML7qJ6wCT6LwmwWT9/L/MDK-3-082014-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Field-engineering-Fortification-and-Construction/MDK-3/Walkaround/i-Krx75ZH/0/M88tj55RMCRkS8RKDDmRjm2n2L5fffnckJh8LjG7C/L/MDK-3-082014-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Field-engineering-Fortification-and-Construction/MDK-3/Walkaround/i-MxQtR7h/0/KW9hzkCcgnKVKwRZQM82sVfpxNBSZRHvkMvTh8Q2x/L/MDK-3-082014-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Field-engineering-Fortification-and-Construction/MDK-3/Walkaround/i-pXhXqBL/0/McVC7VTsSpL4SmSZQDVmzrPSCrMx3r8dQxnM3qxx6/L/MDK-3-082014-04-L.jpg"
    ],
    m:['Grabenziehmaschine auf T-80-Fahrgestell — charakteristisches Schneidrad hinten','Rotierende Fräse/Schneidkette am Heck, die senkrecht in den Boden eintaucht','Kein Turm + Schneidrotor am Heck = eindeutiges Erkennungsmerkmal'],
    s:'T-80-CHASSIS + SCHNEIDROTOR HECK + GRABEN ZIEHEN' },
  { id:815, nr:815, name:'BMR-3M',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/BMR-3M/Walkaround/i-w5gPfCq/0/LQdjpxPB5skKzpmMn8B7756wmv26jdpTD7cpbWMDN/L/BMR-3M-062012-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/BMR-3M/Walkaround/i-JpMhrzM/0/KQQj7JzZM2QRJZ2gsTfBkmNK3ZRHWbSWnqtSBvpLd/L/BMR-3M-062012-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/BMR-3M/Walkaround/i-JNrH68h/0/LRzWjHsnRkvJXkd2XHSCKSHCskP8vb5BnkG8m9GSW/L/BMR-3M-062012-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Engineer/Mine-laying-and-clearing/BMR-3M/Walkaround/i-2zXMPnK/0/MMc6zzzzZV2qrNZkFsbF4sW27vbx4D8NL8dqNsGgs/L/BMR-3M-062012-04-L.jpg"
    ],
    m:['Minenräumfahrzeug auf T-90-Wanne — immer in Verbindung mit KMT-Rollensystem','Charakteristische Minenräumrollen vorne (KMT-7/-8) + Pflugräumer','T-90-Basis erkennbar + massive Rollenräumanlage vor der Wanne = typisch BMR-3M'],
    s:'T-90-WANNE + KMT-ROLLEN VORNE + MINENRÄUMSYSTEM' },
],

// ── HANDOUT 900 — Panzerabwehrsysteme ──────────────────────────────────────────
pzabw: [
  { id:900, nr:900, name:'9P133',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P133-Malyutka-P-AT-3C-Sagger-C/Walkaround/i-KtLTNCh/0/Kh3cb5gvTb38C5J8G89v9DjpD3zLKMM4dHb2ST6dr/L/TechMuseumToliatti-1256-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P133-Malyutka-P-AT-3C-Sagger-C/Walkaround/i-qzhRzcX/0/LpM4GWK3VjGbXmq8rXRzBkRFw4kGmrNQPZ8KNWRKb/L/TechMuseumToliatti-1257-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P133-Malyutka-P-AT-3C-Sagger-C/Walkaround/i-Tz3bmfc/0/NHpxqRFFmZmkJg4cskj4n389jzN289WBkSqv2ztFm/L/TechMuseumToliatti-1258-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P133-Malyutka-P-AT-3C-Sagger-C/Walkaround/i-CwnZT7j/0/KsfnB4TM24jMSh94vknSGZqFXbVvs36K54RB623LL/L/TechMuseumToliatti-1259-L.jpg"
    ],
    m:['Auf BRDM-2-Radwanne (4×4) — versenkbarer Startbehälter in der Wannenmitte','Im Kampf: Turm öffnet sich und 6 Malyutka-Lenkraketen (AT-3 Sagger) werden aufgerichtet','Im Marsch: Startbehälter vollständig in die Wanne versenkt — flache Silhouette'],
    s:'BRDM-2 + VERSENKBARER 6-FACH MALYUTKA-STARTER' },
  { id:901, nr:901, name:'9P148',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P148-Konkurs-AT-5-Spandrel/Walkaround/i-WKDz7FF/0/LnLVcVfvfJrgxSsRx83v348tnW8G5DxddJ7tzhMxd/L/9P149-02_1-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P148-Konkurs-AT-5-Spandrel/Walkaround/i-tST6HDx/0/Lz9Vvd4FSJKhmsLrmvBPLf3mZGsvnTgC7bPxN8thf/L/9P149-03_1-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P148-Konkurs-AT-5-Spandrel/Walkaround/i-TmCHKG3/0/KLZsqV4RTx4tGKdt64kKGSvqZGtc8cNCN2RMS3FBh/L/9P149-04_1-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P148-Konkurs-AT-5-Spandrel/Walkaround/i-q385S84/0/NMssdFWMZQJq7n8qHxMXzg95Vk54Wb4QvRpTQwZ3j/L/9P149-05_1-L.jpg"
    ],
    m:['Auf BRDM-2-Radwanne — 5 Konkurs-Lenkraketen (AT-5 Spandrel) im aufgerichteten Behälter','Fünfrohriger fächerförmiger Raketenträger oben auf der Wanne — kein klassischer Turm','Deutlich anderes Aussehen als 9P133: Träger breiter + 5 statt 6 Rohre'],
    s:'BRDM-2 + 5-FACH KONKURS-FÄCHER OBEN' },
  { id:902, nr:902, name:'9P149',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P149-Shturm-S-AT-6-Spiral/Walkaround/i-RWz56xw/0/LvbNmdgbJ4Tvf6C8N4Lkmwhb4zs6BT8hNrvktSzdH/L/9P149-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P149-Shturm-S-AT-6-Spiral/Walkaround/i-DwSMnWV/0/Lh9qcWFVrWGSt9QRQCRvG6Xp33xLnpzwCN9h35Mqm/L/9P149-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P149-Shturm-S-AT-6-Spiral/Walkaround/i-sQnd2qQ/0/MV2Kn6WxS3CX2BZ462Ck27XfbbDhj5hgzf4pHc2Vw/L/9P149-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P149-Shturm-S-AT-6-Spiral/Walkaround/i-5S2vZDL/0/KQNj8VjrTnZ7dZQWJJqKcSBp5mLH9tsjRHZVvXXVq/L/9P149-05-L.jpg"
    ],
    m:['Auf MT-LBu-Kettenwanne — Shturm-S (AT-6 Spiral) Hubschacht mittig oben','Rakete wird aus Schacht senkrecht hochgefahren und dann seitlich ausgerichtet','Niedrige Wannensilhouette + charakteristischer Hubschacht in Wannenmitte'],
    s:'MT-LBu-KETTE + SENKRECHTER HUBSCHACHT MITTE' },
  { id:903, nr:903, name:'9P157-2',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P157-2-Khrizantema-S-AT-15-Springer/Walkaround/i-mmMxgmc/0/NVm2x8c7PpsNMKXDM8rfLFt4W7GPkmb8RpdJVt7SP/L/9P157-2-Khrizantema-S-20142019-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P157-2-Khrizantema-S-AT-15-Springer/Walkaround/i-rqrNzqr/0/LrrbgGQLftmWhx3JQ6F4fd38nVG8nRKb3N7jjj4VD/L/9P157-2-Khrizantema-S-20142019-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P157-2-Khrizantema-S-AT-15-Springer/Walkaround/i-Mrd7HJd/0/LS5SksDgXfXhKxwzB3m36K8qQhMCdsNGCLRGBPZrx/L/9P157-2-Khrizantema-S-20142019-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P157-2-Khrizantema-S-AT-15-Springer/Walkaround/i-wgtrB6V/0/LbK5L4fZFKtFXpCcJJmNzZSkM8VKnRcHm336wJhdc/L/9P157-2-Khrizantema-S-20142019-004-L.jpg"
    ],
    m:['Auf BMP-3-ähnlicher Wanne — Khrizantema-S mit zwei eingeklappten Radarstarter-Armen','Zwei Doppelstarter-Arme beidseitig am Turm — im Marsch eingeklappt, im Einsatz ausgefahren','Radar-gelenkte Rakete: charakteristische Antenne auf dem Turm sichtbar'],
    s:'BMP-3-WANNE + 2 AUSGEKLAPPTE RAKETENSTARTER + RADAR' },
  { id:904, nr:904, name:'9P162',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162-Kornet-T-AT-14-Spriggan/Walkaround/i-DGcG3fb/0/KPXZwrqghz4k2sfw5TrRSX4N77MP9hPqKFNJprJK4/L/9P162-082014-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162-Kornet-T-AT-14-Spriggan/Walkaround/i-5Fn32SJ/0/LDkC4cgZ9gDMN84ZW75zc87CBDgjdTshCqLtphwHH/L/9P162-082014-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162-Kornet-T-AT-14-Spriggan/Walkaround/i-bKRzF8r/0/MjjJLv76XBKXP9BBWtjnRfWMc34d7D3NZZvR9gx3s/L/9P162-082014-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162-Kornet-T-AT-14-Spriggan/Walkaround/i-rjsZFbq/0/LW5xF42hgX7sbr6NmtXHwDnSWvggP5ZZ2JLfg8XRF/L/9P162-082014-04-L.jpg"
    ],
    m:['Auf BMP-3-Wanne — Kornet-T mit zwei Doppelstarter-Paketen beidseitig am Turm','Vier Kornet-Raketen (AT-14 Spriggan) in zwei Zweiergruppen auf dem Turm','Laserlenkung: kein Radar — Unterschied zu 9P157-2 durch andere Turmform'],
    s:'BMP-3-WANNE + 4 KORNET-RAKETEN BEIDSEITIG AM TURM' },
  { id:905, nr:905, name:'BMPT-72 Terminator-2', flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Tanks/BMPT/BMPT-72-Object-183/Walkaround/i-ffQw88V/0/NLf8Xw9vMH6cnN3xQSPgfdbQVnSnm9pw6TLFz2XBJ/L/BMPT-72-2018-2022-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/BMPT/BMPT-72-Object-183/Walkaround/i-M3p9MwG/0/Kkzb8nFFLPKXDGDCT7gJMz9hgP2qjR2k7HJZB9DwN/L/BMPT-72-2018-2022-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Tanks/BMPT/BMPT-72-Object-183/Walkaround/i-vz2X5Qm/0/Ln6wDfgGqxnfxzFLk2fxQckkDdTKRBX4ZtVM6Q6Ps/L/BMPT-72-2018-2022-03-L.jpg"
    ],
    m:['Auf T-72-Wanne — stark bewaffnete Kampfunterstützungsmaschine ohne Hauptkanone','Vier Ataka-Raketenstarter + zwei 30mm-Automatikkanone + AG-17D Granatenwerfer','Sehr breiter, flacher Turm mit viel Bewaffnung — deutlich anderes Aussehen als T-72'],
    s:'T-72-WANNE + FLACHER BREITER TURM + KEINE HAUPTKANONE' },
  { id:906, nr:906, name:'BTR-RD',       flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-RD/Walkaround/i-Qt9pg5x/0/NNDCSgwSxCwNtj6KcJT7tWBM6JCJCLMJBTQXKgDLB/L/BTR-RD-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-RD/Walkaround/i-89fgdXN/0/NHhbLRQTXsPTrff6j8LSPT7KvWQf6jZzZTQ6vVmqd/L/BTR-RD-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/IFV-APC/BTR-D/BTR-RD/Walkaround/i-kk4b97R/0/LxqSbgchGMNQ8JMkdpF8bqcXRqp4xgSChPkmksT9j/L/BTR-RD-03-L.jpg"
    ],
    m:['Auf BTR-D-Luftlandewanne (Kettenpanzer, kürzer als BMP) — gepanzerter PzAbw-Träger','Konkurs-Raketenträger über dem Fahrersitz — aufklappbar aus dem vorderen Bereich','Schmale, leichte Kettenwanne für Luftlandekräfte — deutlich kleiner als BMP-Fahrzeuge'],
    s:'BTR-D-LUFTLANDEWANNE + KONKURS-TRÄGER VORNE OBEN' },
  { id:907, nr:907, name:'9P163-3 Kornet-EM', flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-D1-VPK-233116/Walkaround/i-x8rckJF/0/Mbps3jbhCpXNxGqQ7BvHM6hS2P43frP2dpR2JGs53/L/9P163-3%20Kornet-D1-VPK-233116-20152019-008-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-EM-GAZ-233036-Tigr/Walkaround/i-snCrjMP/0/MDbhVk8nWCCGtC6CxXHbpMtxDRfq6vB9BKqg6jrHM/L/9P163-3%20Kornet-D1-GAZ-233036-20112018-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-EM-VPK-233136/Walkaround/i-tjWMz5r/0/Kmd5vSJHtLHr832H84HtgLcs2gzzBrzkVdR4FFvNq/L/9P163-3%20Kornet-EM-VPK-233136-20182021-06-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-EM-K-53949-Typhoon-K/Walkaround/i-rgVG42j/0/LzfdVDWxbDm6SWVW4tfTKgfp7WxkSpKSrP4NtTmdD/L/9P163-3%20Kornet-D1-K-53949-20192023-09-L.jpg"
    ],
    m:['Auf Tigr-Radfahrzeug (UAZ-Basis) — leichtes 4×4-Geländefahrzeug','Vier Kornet-Drehstarter oben auf dem Fahrzeug (Salve aus 4 Raketen möglich)','Sehr kompakt und leicht — größter Kontrast zu gepanzerten ATGM-Systemen'],
    s:'TIGR-RADFAHRZEUG + 4 KORNET-STARTER OBEN' },
  { id:908, nr:908, name:'9P163-3 Kornet-D1', flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-D1-VPK-233116/Walkaround/i-x8rckJF/0/Mbps3jbhCpXNxGqQ7BvHM6hS2P43frP2dpR2JGs53/L/9P163-3%20Kornet-D1-VPK-233116-20152019-008-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-EM-GAZ-233036-Tigr/Walkaround/i-snCrjMP/0/MDbhVk8nWCCGtC6CxXHbpMtxDRfq6vB9BKqg6jrHM/L/9P163-3%20Kornet-D1-GAZ-233036-20112018-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-EM-VPK-233136/Walkaround/i-tjWMz5r/0/Kmd5vSJHtLHr832H84HtgLcs2gzzBrzkVdR4FFvNq/L/9P163-3%20Kornet-EM-VPK-233136-20182021-06-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P163-3-Kornet-D1/Kornet-EM-K-53949-Typhoon-K/Walkaround/i-rgVG42j/0/LzfdVDWxbDm6SWVW4tfTKgfp7WxkSpKSrP4NtTmdD/L/9P163-3%20Kornet-D1-K-53949-20192023-09-L.jpg"
    ],
    m:['Auf Tigr-Radfahrzeug — ähnlich Kornet-EM, aber mit anderem Starteraufbau','Doppelstarter-Einheit für gleichzeitigen Abschuss zweier Kornet-Raketen','Kompaktere Startereinheit als beim EM-Modell — Unterschied liegt im Starterpaket'],
    s:'TIGR-BASIS + DOPPELSTARTER KORNET + KOMPAKTERER AUFBAU' },
  { id:909, nr:909, name:'MT-12',        flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Artillery/Towed/2A29-MT-12-100mm/2A29-MT-12/Walkaround/i-QRg7Wdj/0/NjNqVqN5BtFLN3qJ3T6QwFv8GDbgSK4v5c6V2mSV2/L/100mm-MT-12-03-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Artillery/Towed/2A29-MT-12-100mm/2A29-MT-12/Walkaround/i-RMrGfHb/0/NJqh6zdRHpNFDJKN5Vnqd8rg8BLM9T9mQn5xNkdMd/L/100mm-MT-12-04-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Artillery/Towed/2A29-MT-12-100mm/2A29-MT-12/Walkaround/i-dZ4nLKz/0/M4bD2p5GH9c8tzKLC5FdzmX84GC7Gs99wBPzQNn5B/L/100mm-MT-12-05-L.jpg"
    ],
    m:['Geschleppte 100mm-Panzerabwehrkanone — kein Fahrzeug, sondern gezogene Waffe','Charakteristisches langes Glattrohr + Spreizschwanzlafette (zwei Holme)','Scheibenräder + niedriger Schwerpunkt — im Schlepp hinter LKW oder Zugmittel'],
    s:'100MM GLATTROHR + SPREIZSCHWANZLAFETTE + GESCHLEPPT' },
  { id:910, nr:910, name:'9P157-4',      flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Command-Signal-ArtilleryRecce/Command-Control/9P157-4-Khrizantema-S/Details/i-dvKKMQR/0/M4CsXj5KJ96fTFDDtR4F8LxZbK3wK9qXxCCk8rCd6/L/9P157-4-062012-13-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Command-Signal-ArtilleryRecce/Command-Control/9P157-4-Khrizantema-S/Details/i-sVHM9SQ/0/L95Dxvdr6XsBHDZgNB4L9jMmXvmGMrKm6QzRNNmMV/L/9P157-4-062012-14-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Command-Signal-ArtilleryRecce/Command-Control/9P157-4-Khrizantema-S/Details/i-5mQTJHC/0/KxJgggxg8pGs6wjMJgqNrp937ZWq5935kN6d94kww/L/9P157-4-062012-15-L.jpg"
    ],
    m:['Modernisierte Khrizantema-S Variante auf aktualisierter Wanne','Verbesserte Starter-Konfiguration gegenüber 9P157-2 — mehr Raketen mitführbar','Ähnliche Grundform wie 9P157-2, erkennbar durch modernere Wannenversion'],
    s:'MODERNISIERTE KHRIZANTEMA + MEHR RAKETEN' },
  { id:911, nr:911, name:'9P162M Kornet-D1', flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162M-Kornet-D1/Walkaround/i-jkvntkv/0/MwvX5VRFNqSngcT8sxQ9P86n2kqgn7Tb5hhVWnNzX/L/9P162M%20Kornet-D1-082023-001-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162M-Kornet-D1/Walkaround/i-352mTw6/0/L3BsSxjKdQVfrQCvBzVbP3N75z9K48PNLfjr6FrWr/L/9P162M%20Kornet-D1-082023-002-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162M-Kornet-D1/Walkaround/i-8QSpgHM/0/KQvCVMR54gnpFq8FHNwWc4tVRW3FVzhQ6Wx9nXkmv/L/9P162M%20Kornet-D1-082023-003-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Anti-Tank-Missile-Systems/Self-Propelled/9P162M-Kornet-D1/Walkaround/i-DfSFHkH/0/L5znjR7MtDw2pnz5NdP74jGz8qFxnJCcHhtGTzjMf/L/9P162M%20Kornet-D1-082023-004-L.jpg"
    ],
    m:['Aufgewertete Version des 9P162 auf BMP-3-Wanne — gleiche Grundform wie Vorgänger','Verbesserte Elektronik und Starter-Konfiguration für Kornet-D1-Munition','Turm ähnlich 9P162, erkennbar durch Detail-Änderungen an den Starter-Paketen'],
    s:'BMP-3-WANNE + VERBESSERTE KORNET-STARTER + MODERNISIERT' },
  { id:912, nr:912, name:'2S25 Sprut-SD', flag:'🇷🇺', nation:'Russland', images:[
      "https://photos.smugmug.com/Land-Platforms/Artillery/Self-Propelled/2S25-Sprut-SD/2S25-Sprut-SD/Walkaround/i-SD6Kqhp/0/Nh9ZfGt58CQ8c6qHcVKPvVt9HsKQQZgntL7hvgR4P/L/2S25-082016-01-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Artillery/Self-Propelled/2S25-Sprut-SD/2S25-Sprut-SD/Walkaround/i-cBMVZ9K/0/Kvr2Q94wbVSbjmpjG9Bh7gRTBFjGTnGdtRXt5G9f5/L/2S25-082016-02-L.jpg",
      "https://photos.smugmug.com/Land-Platforms/Artillery/Self-Propelled/2S25-Sprut-SD/2S25-Sprut-SD/Walkaround/i-4szRmqC/0/LRddKjSzfp2GwgrtTvsDn9gzKBk42zgVtrfb7scPk/L/2S25-082016-03-L.jpg"
    ],
    m:['Schwimmfähiger Panzerabwehr-Jagdpanzer auf BMD-ähnlicher Luftlandewanne','125mm-Glattrohr (wie T-72/T-80) auf kompakter Luftlandewanne — sehr niedriges Fahrzeug','Für Luftlandekräfte: schmal, leicht, schwimmfähig — auffälliges Missverhältnis Rohr zu Wanne'],
    s:'LUFTLANDEWANNE + 125MM GLATTROHR + KLEIN UND SCHMAL' },
],
}

export function getFilteredVehicles(catKey, superCat) {
  const cat = CATS[catKey]
  if (!cat) return []
  const sc = SUPER_CATS[superCat]
  if (!sc || sc.nations.length === 0) return []
  return DB[catKey].filter(v => sc.nations.includes(v.nation))
}

export function getRecomonkeyUrl(vehicle, catKey) {
  const type = CATS[catKey]?.recoType || 'Vehicles'
  const name = encodeURIComponent(vehicle.name)
  return `https://www.recomonkey.com/Land-Platforms/${type}/${name}`
}
