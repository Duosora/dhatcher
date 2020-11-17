export const globalState = {
  breeds: [
    { name: 'Fae', 			 weight: 1, scryID: 1, searchID: 1 },
    { name: 'Guardian',  weight: 1, scryID: 2, searchID: 2 },
    { name: 'Mirror', 	 weight: 1, scryID: 3, searchID: 3 },
    { name: 'Tundra', 	 weight: 1, scryID: 6, searchID: 6 },
    // Special cases: breeds for specific eggs; weight=0.
    { name: 'Nocturne',  weight: 0, scryID: 11, searchID: 11 },
    { name: 'Bogsneak',	 weight: 0, scryID: 14, searchID: 14 },
    { name: 'Banescale', weight: 0, scryID: 6, 	searchID: 18 }
  ],
  genders: [
    { name: 'Male', 	weight: 1, scryID: 0, searchID: 0 },
    { name: 'Female', weight: 1, scryID: 1, searchID: 1 }
  ],
  elements: [
    { name: 'Earth',		 weight: 1, scryID: 1, 	searchID: 1  },
    { name: 'Plague', 	 weight: 1, scryID: 2, 	searchID: 2  },
    { name: 'Wind', 		 weight: 1, scryID: 3, 	searchID: 3  },
    { name: 'Water', 		 weight: 1, scryID: 4, 	searchID: 4  },
    { name: 'Lightning', weight: 1, scryID: 5, 	searchID: 5  },
    { name: 'Ice', 			 weight: 1, scryID: 6, 	searchID: 6  },
    { name: 'Shadow',		 weight: 1, scryID: 7, 	searchID: 7  },
    { name: 'Light', 		 weight: 1, scryID: 8, 	searchID: 8  },
    { name: 'Arcane', 	 weight: 1, scryID: 9, 	searchID: 9  },
    { name: 'Nature', 	 weight: 1, scryID: 10, searchID: 10 },
    { name: 'Fire', 		 weight: 1, scryID: 11, searchID: 11 }
  ],
  eyeTypes: [
    { name: 'Common', 		weight: 4778, scryID: 0, searchID: 0 },
    { name: 'Uncommon',		weight: 2600, scryID: 1, searchID: 1 },
    { name: 'Unusual', 		weight: 1433, scryID: 2, searchID: 2 },
    { name: 'Rare', 			weight: 867, 	scryID: 3, searchID: 3 },
    { name: 'Faceted', 		weight: 111, 	scryID: 4, searchID: 4 },
    { name: 'Multi-Gaze', weight: 44, 	scryID: 5, searchID: 5 },
    { name: 'Primal', 		weight: 67, 	scryID: 6, searchID: 6 },
    { name: 'Goat', 			weight: 100,	scryID: 9, searchID: 9 }
  ],
  hatchedDragons: [

  ]
};
