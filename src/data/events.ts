export type DotaEvent = {
  time: number;
  event: string;
  eventId: string;
  past?: boolean;
};

export const dotaEvents: DotaEvent[] = [
  { time: 120, event: "Water Rune", eventId: "water_rune" }, //2
  { time: 180, event: "Lotus and Bounty Rune", eventId: "lotus_bounty" }, //3
  { time: 240, event: "Water Rune", eventId: "water_rune" }, //4
  { time: 360, event: "Active Rune", eventId: "active_rune" }, //6
  { time: 420, event: "Wisdom Rune", eventId: "wisdom_rune" }, //7
  { time: 480, event: "Active Rune", eventId: "active_rune" }, //8
  { time: 540, event: "Lotus and Bounty Rune", eventId: "lotus_bounty" }, //9
  { time: 600, event: "Active Rune", eventId: "active_rune" }, //10
  { time: 720, event: "Active Rune", eventId: "active_rune" }, //12
  { time: 840, event: "Wisdom Rune", eventId: "wisdom_rune" }, //14
  { time: 900, event: "Lotus and Bounty Rune", eventId: "lotus_bounty" }, //15
  { time: 960, event: "Active Rune", eventId: "active_rune" }, //16
  { time: 1080, event: "Lotus and Bounty Rune", eventId: "lotus_bounty" }, //18
  { time: 1200, event: "Tormentor Respown", eventId: "tormentor" }, //20
  { time: 1260, event: "Wisdom Rune", eventId: "wisdom_rune" }, //21
  { time: 1680, event: "Wisdom Rune", eventId: "wisdom_rune" }, //28
  { time: 2100, event: "Wisdom Rune", eventId: "wisdom_rune" }, //35
  { time: 2520, event: "Wisdom Rune", eventId: "wisdom_rune" }, //42
  { time: 2940, event: "Wisdom Rune", eventId: "wisdom_rune" }, //49
  { time: 3360, event: "Wisdom Rune", eventId: "wisdom_rune" }, //56
];
