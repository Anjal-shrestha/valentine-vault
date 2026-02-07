// data/users.ts
export type ValentineDay = {
  id: number;
  title: string;
  emoji: string;
  message: string;
  unlockDate: string; // ISO format: YYYY-MM-DD
};

export const usersData: Record<string, any> = {
  "preeti-2026": {
    name: "Preeti",
    pin: "0920",
    partnerName: "Anjal",
    startDate: "2024-02-07",
    theme: "rose",
    days: [
      { id: 1, title: "Rose Day", emoji: "🌹", message: "Today the world gives roses, but I'm giving you my heart. 730 days of us.", unlockDate: "2026-02-07" },
      { id: 2, title: "Propose Day", emoji: "💍", message: "I don't need a thousand years, just a lifetime with you.", unlockDate: "2026-02-08" },
      { id: 3, title: "Chocolate Day", emoji: "🍫", message: "Sweetness is temporary, but my love for you is eternal.", unlockDate: "2026-02-09" },
      { id: 4, title: "Teddy Day", emoji: "🧸", message: "Something soft to hold when I'm not around.", unlockDate: "2026-02-10" },
      { id: 5, title: "Promise Day", emoji: "🤝", message: "I promise to choose you every single day.", unlockDate: "2026-02-11" },
      { id: 6, title: "Hug Day", emoji: "🫂", message: "The safest place in the world is inside my arms.", unlockDate: "2026-02-12" },
      { id: 7, title: "Kiss Day", emoji: "💋", message: "A kiss to seal our forever.", unlockDate: "2026-02-13" },
      { id: 8, title: "Valentine's Day", emoji: "💝", message: "You are my greatest adventure. Happy Valentine's Day, Preeti!", unlockDate: "2026-02-14" },
    ]
  },
  "gf1": {
    name: "User One",
    partnerName: "Partner One",
    theme: "classic",
    days: [ /* Similar structure here */ ]
  }
};