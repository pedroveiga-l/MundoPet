import {apiConfig} from "./api-config.js"

export async function scheduleNew({id, tutorName, petName, descript, when}) {
    try {
        const payload = {
            id,
            tutorName,
            petName,
            descript,
            // if `when` is a dayjs object, send local datetime string (no Z/UTC conversion)
            when: (when && typeof when.format === 'function') ? when.format('YYYY-MM-DDTHH:mm:ss') : ((when && typeof when.toISOString === 'function') ? when.toISOString() : when)
        }

        await fetch(`${apiConfig.baseURL}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        alert("Agendamento realizado com sucesso!")
    } catch (error) {
        console.log(error)
        alert("Não foi possível agendar.")
    }
}