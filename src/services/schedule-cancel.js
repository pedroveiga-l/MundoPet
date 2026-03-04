import { apiConfig } from "./api-config.js"

export async function schedulesCancel({id}) {
    try {
        const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(`Erro ao cancelar agendamento: ${response.status}`)
        }

        alert("Agendamento cancelado com sucesso.")
    } catch (error) {
        console.log(error)
        alert("Ocorreu um erro ao cancelar o agendamento. Por favor, tente novamente mais tarde.")
    }
}