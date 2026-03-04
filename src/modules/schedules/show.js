import dayjs from "dayjs"

// Seleciona os containers das sessões manhã, tarde e noite
const periodMorningContainer = document.getElementById("morning")
const periodAfternoonContainer = document.getElementById("afternoon")
const periodNightContainer = document.getElementById("night")

function ensureClientsList(container) {
    let list = container.querySelector(".clients")
    if (!list) {
        list = document.createElement("ul")
        list.classList.add("clients")
        container.appendChild(list)
    }
    return list
}

export function schedulesShow({dailySchedules}) {
    try {
        // Obtém (ou cria) as <ul class="clients"> e limpa seu conteúdo
        const periodMorning = ensureClientsList(periodMorningContainer)
        const periodAfternoon = ensureClientsList(periodAfternoonContainer)
        const periodNight = ensureClientsList(periodNightContainer)

        periodMorning.innerHTML = ""
        periodAfternoon.innerHTML = ""
        periodNight.innerHTML = ""

        // Renderiza os agendamentos por período
        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li")
            item.classList.add("li")

            const time = document.createElement("span")
            time.classList.add("hour")

            const petName = document.createElement("span")
            petName.classList.add("petName")

            const tutorName = document.createElement("span")
            tutorName.classList.add("proprietary")

            const descript = document.createElement("span")
            descript.classList.add("description")

            const info = document.createElement("span")
            info.classList.add("info")

            // Adiciona o id do agendamento
            item.setAttribute("data-id", schedule.id)

            time.textContent = dayjs(schedule.when).format("HH:mm")
            petName.textContent = schedule.petName
            tutorName.textContent = schedule.tutorName
            descript.textContent = schedule.descript

            // Cria o botão de cancelamento
            const cancelButton = document.createElement("button")
            cancelButton.classList.add("remove-schedule")
            cancelButton.type = "button"
            cancelButton.textContent = "Remover agendamento"
            cancelButton.setAttribute("aria-label", "Remover agendamento")

            // Adiciona a hora, nome do pet e do tutor dentro de info
            info.append(time, petName, tutorName)

            // Adiciona info, descrição e botão de cancelar dentro de item
            item.append(info, descript, cancelButton)

            // Obtém somente a hora
            const hour = dayjs(schedule.when).hour()

            // Renderiza o agendamento na sessão
            if(hour <= 12) {
                periodMorning.appendChild(item)
            } else if (hour > 12 && hour <= 18) {
                periodAfternoon.appendChild(item)
            } else {
                periodNight.appendChild(item)
            }
        }) 
    } catch (error) {
        console.log(error)
        alert("Não foi possível exibir os agendamentos")
    }
}