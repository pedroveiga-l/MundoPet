import {scheduleFetchByDay} from "../../services/schedule-fetch-by-day.js"
import { hoursLoad } from "../form/hours-load.js"
import {schedulesShow} from "../schedules/show.js"

const dateInputs = document.querySelectorAll(".dateInput")

export async function schedulesDay({ date } = {}) {
    const selectedDate = date ?? dateInputs[0]?.value

    if (!selectedDate) return

    //Busca na API os agendamentos
    const dailySchedules = await scheduleFetchByDay({date: selectedDate})

    if (!dailySchedules) return

    // Exibe os agendamentos
    schedulesShow({dailySchedules})

    // Renderiza as horas disponíveis
    hoursLoad({date: selectedDate, dailySchedules})
}