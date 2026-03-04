import dayjs from 'dayjs'

import {scheduleNew} from "../../services/schedule-new.js"
import {schedulesDay} from "../schedules/load.js"

const form = document.querySelector('form')
const tutor = document.getElementById("tutorName")
const pet = document.getElementById("namePet")
const description = document.getElementById("description-form")
const dateInputs = document.querySelectorAll('.dateInput')
const selectedDate = document.getElementById('dateInput')
const onlyHour = document.getElementById('select')
const phone = document.getElementById("phone")

// Carrega a data atual e define a data mínima em ambos os inputs
dateInputs.forEach(input => {
    input.value = dayjs(new Date()).format('YYYY-MM-DD')
    input.min = dayjs(new Date()).format('YYYY-MM-DD')
})

form.onsubmit = async (event) => {
    // Previne carregamento automático da página
    event.preventDefault()

    try {
        // Recupera dados do cliente
        const tutorName = tutor.value.trim()
        const petName = pet.value.trim()
        const descript = description.value.trim()
        const tel = phone.value.trim()

        if (!descript) {
            return alert("Informe a descrição!")
        }

        // recupera o horário selecionado (ex: "17:00")
        const hourSelected = onlyHour.value

        if(!hourSelected) {
            return alert("Selecione um horário!")
        }

        // Monta o datetime combinando a data do input (YYYY-MM-DD) e o horário (HH:mm)
        const when = dayjs(`${selectedDate.value}T${hourSelected}:00`)
        
        // gera um ID
        const id = String(new Date().getTime())

        // Faz agendamento
        await scheduleNew({
            id,
            tutorName,
            petName,
            descript,
            when
        })

        // Recarrega os agendamentos
        await schedulesDay()

        // Limpa os inputs usando as referências aos elementos, não as strings
        tutor.value = ""
        pet.value = ""
        description.value = ""
        phone.value = ""
    } catch (error) {
        alert("Não foi possível realizar o agendamento")
        console.log(error)
    }
}