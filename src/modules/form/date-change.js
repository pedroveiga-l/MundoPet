import {schedulesDay} from "../schedules/load.js"

const dateInputs = document.querySelectorAll(".dateInput")

dateInputs.forEach((input) => {
	input.addEventListener("change", async (event) => {
		const selectedDate = event.target.value

		dateInputs.forEach((dateInput) => {
			dateInput.value = selectedDate
		})

		await schedulesDay({ date: selectedDate })
	})
})