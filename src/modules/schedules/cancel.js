import { schedulesDay } from "./load.js"
import { schedulesCancel } from "../../services/schedule-cancel.js"

const period = document.querySelectorAll('.horario');

// Gera evento click para cada horário
period.forEach((period) => {
    // Captura o evento de click na lista
    period.addEventListener("click", async (event) => {
        const button = event.target.closest(".remove-schedule")
        if(!button) return

        //Obtém a LI pai do elemento clicado
        const item = button.closest("li")

        // Pega o ID
        const {id} = item.dataset
        
        // Confirma se o ID foi selecionado
        if(id) {
            // Confirma se o usuário deseja cancelar o agendamento
            const isConfirm = confirm("Deseja cancelar este agendamento?")
        

        if(isConfirm) {
            await schedulesCancel({id})
            schedulesDay()
        }
    }
    })
})