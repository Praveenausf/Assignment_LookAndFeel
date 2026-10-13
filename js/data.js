/**
 * Tour, streaming and song data for Infusion.
 * Author: Praveena Vemula
 */
var TOUR_DATES = [
  { id: 1, date: "2026-11-07", city: "Tampa, FL",     venue: "Mangrove Hall",        capacity: 1200, sold: 1104, status: "On Sale"   },
  { id: 2, date: "2026-11-14", city: "Orlando, FL",   venue: "Citrus Box Theater",     capacity: 1000, sold: 1000, status: "Sold Out"  },
  { id: 3, date: "2026-11-21", city: "Atlanta, GA",   venue: "Peachline Theater",   capacity: 625,  sold: 540,  status: "On Sale"   },
  { id: 4, date: "2026-12-05", city: "Nashville, TN", venue: "Fiddlehead Stage",     capacity: 500,  sold: 312,  status: "On Sale"   },
  { id: 5, date: "2026-12-12", city: "Austin, TX",    venue: "Bluebonnet Lounge",    capacity: 900,  sold: 455,  status: "On Sale"   },
  { id: 6, date: "2027-01-16", city: "Chicago, IL",   venue: "Windy Pier Ballroom",  capacity: 800,  sold: 0,    status: "Announced" },
];

var MONTHLY_STREAMS = {
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  values: [182000, 214000, 265000, 248000, 310000, 362000],
};

var TOP_SONGS = [
  { title: "Copper Kites",       album: "Glasshouse Weather", plays: 1240000 },
  { title: "Fold the Ocean",  album: "Glasshouse Weather", plays: 980000  },
  { title: "Lantern Parade",   album: "Moth Radio",      plays: 760000  },
  { title: "Static Moth",       album: "Moth Radio",      plays: 545000  },
  { title: "Porchlight Signals", album: "Porchlight",   plays: 410000  },
];

var LISTENERS_BY_REGION = {
  labels: ["Florida", "Georgia", "Texas", "Tennessee", "Illinois", "Other"],
  values: [38, 14, 16, 9, 8, 15],
};
