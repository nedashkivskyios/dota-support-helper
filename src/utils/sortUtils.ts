import { type DotaEvent } from "@/data/events";

export const sortDotaEvents = (events: DotaEvent[]) => {
    events.sort((a, b) => {
        // Якщо past === true, переносимо запис в кінець списку
        if (a.past && !b.past) {
          return 1;
        } else if (!a.past && b.past) {
          return -1;
        }
    
        // Сортування за time в порядку зростання
        if (a.time !== b.time) {
          return a.time - b.time;
        }
    
        // Якщо time і past однакові, порівнюємо eventId (додатковий критерій)
        return a.eventId.localeCompare(b.eventId);
      });
    
      return events;
};