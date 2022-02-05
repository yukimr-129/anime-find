import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Box, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { calendarEvent } from "store/calendar/calendarEvent";

const Calendar = () => {
    const calendarEventList = useRecoilValue(calendarEvent)

    const handleDateClick = useCallback((arg: DateClickArg) => {
        alert(arg.dateStr);
    }, [])

    const schedule = [
        {id: '1', title: "event 1", date: '2022-02-02'},
        {id: '2', title: "event 1", date: '2022-02-02'},
        {id: '3', title: "event 1", date: '2022-02-02'},
        {id: '4', title: "event 1", date: '2022-02-02'},
    ]
    return (
        <Flex align='center'>
            <Box  w={{base: '95%', md: '90%'}} bg='#fff' h='100%' p='20px' m={{base: '110px auto 20px auto', md: '100px auto 20px auto'}} borderRadius='5px'>
                <FullCalendar  
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="ja"
                    dateClick={handleDateClick}
                    contentHeight='auto'
                    events={calendarEventList}
                />
                {console.log(calendarEventList)}
            </Box>
        </Flex>
    )
}

export default Calendar

