import { atom } from "recoil";
import { calendarEventType } from "types/calendar/calendarEventType";

export const calendarEvent = atom<calendarEventType[]>({
    key: 'calendarEvent',
    default: []
})