import {openingHours} from "../../utils/opening-hours"
import dayjs from "dayjs"

const select = document.getElementById("select")

export function hoursLoad({date, dailySchedules}) {
    if (!select) return

    // limpa opções anteriores para evitar duplicação
    select.innerHTML = ""

    // Recupera horários indisponíveis
    const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

    const opening = openingHours.map((hour) => {
        const [scheduleHour] = hour.split(":")

        // garante que scheduleHour seja número
        const hourNumber = parseInt(scheduleHour, 10)

        // cria datetime para a hora e verifica se está no futuro
        const scheduledDate = dayjs(date).add(hourNumber, "hour")
        const isAvailable = scheduledDate.isAfter(dayjs())

        const available = !unavailableHours.includes(hour) && isAvailable

        return {
            hour,
            available
        }
    })

    // Renderiza os horários (9:00–21:00 vem de `openingHours`)
    opening.forEach(({hour, available}) => {
        const option = document.createElement("option")
        option.classList.add(available ? "hour-available" : "hour-unavailable")
        option.textContent = hour
        select.append(option)
    })
}