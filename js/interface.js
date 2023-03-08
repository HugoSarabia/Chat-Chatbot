const createNewOp = document.getElementById("createNewOp");
const createNewMs = document.getElementById("createNewMs");
const tableContainerOp = document.getElementById("tableContainerOp");
const tableContainerMs = document.getElementById("tableContainerMs");
const tablaOpciones = document.getElementById("tablaOpciones");
const tablaMensajes = document.getElementById("tablaMensajes");
const tableBodyOpciones = document.getElementById("tableBodyOpciones");
const tableBodyMensajes = document.getElementById("tableBodyMensajes");
const tableRow = document.querySelector(".table-row");
const tableRowContent = document.querySelector(".table-row-content");
const rowActions = document.querySelector(".row-actions");
const deleteBtn = document.getElementById("deleteBtn");
const paginationNumbersOptions = document.getElementById("pagination-numbers-options");
const PaginationNumbersMessages = document.getElementById("pagination-numbers-messages");
const nextButtonOption = document.getElementById("next-button-option");
const prevButtonOption = document.getElementById("prev-button-option");
const nextButtonMessage = document.getElementById("next-button-message");
const prevButtonMessage = document.getElementById("prev-button-message");

//Filas de Tabla de opcion
let xhr = new XMLHttpRequest();
xhr.open("GET", "php/getOptionsData.php", false);
xhr.onload = () => {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.response);
			let output = "";
			data.forEach((option) => {
				output += `
				<tr class="table-row">
					<td class="table-row-content">${option.idopcion}</td>
					<td class="table-row-content row-align">${option.opcion}</td>
					<td class="table-row-content row-align">${option.tipo}</td>
					<td class="table-row-content">${option.id_mensaje_respondido}</td>
					<td class="table-row-content">${option.id_mensaje_a_mostrar}</td>
					<td class="table-row-content">
						<div class="row-actions">
							<button id="${option.idopcion}" title="Editar" data-edit="true" class="edit-option">
								<i class="fa fa-pencil" aria-hidden="true"></i>
							</button>
							<button id="${option.idopcion}" title="Eliminar" data-delete="true" class="delete-option"">
								<i class="fa fa-trash-o" aria-hidden="true"></i>
							</button>
						</div>
					</td>
				</tr>
				`;
			});
			tableBodyOpciones.innerHTML = output;
		}
	}
};
xhr.send();

//Filas de Tabla de mensaje
xhr.open("GET", "php/getMenssagesData.php", false);
xhr.onload = () => {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.response);
			let output = "";
			data.forEach((mensaje) => {
				output += `
				<tr class="table-row">
					<td class="table-row-content">${mensaje.idmensaje}</td>
					<td class="table-row-content row-align">${mensaje.mensaje}</td>
					<td class="table-row-content">${mensaje.id_opcion_siguiente}</td>
					<td class="table-row-content">${mensaje.id_opcion_pasada}</td>
					<td class="table-row-content">
						<div class="row-actions">
							<button id="${mensaje.idmensaje}" title="Editar" data-edit="true" class="edit-option">
								<i class="fa fa-pencil" aria-hidden="true"></i>
							</button>
							<button id="${mensaje.idmensaje}" title="Eliminar" data-delete="true" class="delete-option"">
								<i class="fa fa-trash-o" aria-hidden="true"></i>
							</button>
						</div>
					</td>
				</tr>
				`;
			});
			tableBodyMensajes.innerHTML = output;
		}
	}
};
xhr.send();

const rowAlign = document.querySelectorAll(".row-align");
//Cuando el usuario hace clic en el elemento contenedor del mensaje se abre un modal que muestra el texto completo del elemento
rowAlign.forEach((item) => {
	item.addEventListener("click", (e) => {
		Swal.fire({
			title: "Mensaje",
			text: `${item.textContent}`,
		});
	});
});
//Funciones para editar y eliminar opciones
Array.from(tableBodyOpciones.children).forEach((item) => {
	Array.from(item.children).forEach((element) => {
		Array.from(element.children).forEach((el) => {
			Array.from(el.children).forEach((e) => {
				e.addEventListener("click", () => {
					if (e.getAttribute("data-delete")) {
						Swal.fire({
							title: "¿Estás seguro?",
							text: "No podrás revertir esto!",
							icon: "warning",
							showCancelButton: true,
							confirmButtonColor: "#3085d6",
							cancelButtonColor: "#d33",
							confirmButtonText: "Sí, bórralo!",
							cancelButtonText: "Cancelar",
						}).then((result) => {
							if (result.isConfirmed) {
								let xhr = new XMLHttpRequest();
								xhr.open("POST", "php/deleteOption.php", true);
								xhr.onload = () => {
									if (xhr.readyState === XMLHttpRequest.DONE) {
										if (xhr.status == 200) {
											let data = xhr.response;
											if (data == "success") {
												Swal.fire({
													title: "Opción eliminada con éxito!",
													confirmButtonText: "Entendido",
												}).then(() => {
													location.reload();
												});
											} else {
												Swal.fire({
													title: "Error al eliminar opción, intentelo de nuevo",
													text: data,
													confirmButtonText: "Entendido",
												});
											}
										}
									}
								};
								xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
								xhr.send("idopcion=" + e.id);
							}
						});
					} else if (e.getAttribute("data-edit")) {
						let xhr = new XMLHttpRequest();
						xhr.open("POST", "php/getSelectedOptionData.php", true);
						xhr.onload = async () => {
							if (xhr.readyState === XMLHttpRequest.DONE) {
								if (xhr.status == 200) {
									let data = JSON.parse(xhr.response);
									const {value: formValues} = await Swal.fire({
										title: "Multiple inputs",
										html:
											'<label for="swal2-input" class="swal2-input-label">Opción</label>' +
											'<input value="' +
											data.opcion +
											'" id="swal-input1" class="swal2-input">' +
											'<label for="swal2-input" class="swal2-input-label">Tipo de opción</label>' +
											'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input2">' +
											'<option value="liga">liga</option>' +
											'<option value="final">final</option>' +
											"</select>" +
											'<label for="swal2-input" class="swal2-input-label">Mensaje respondido</label>' +
											'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input3">' +
											data.mensaje1 +
											'<option value="NULL">NULL</option>' +
											"</select>" +
											'<label for="swal2-input" class="swal2-input-label">Mensaje a mostrar</label>' +
											'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input4">' +
											data.mensaje2 +
											'<option value="NULL">NULL</option>' +
											"</select>",

										focusConfirm: false,
										preConfirm: () => {
											return [
												document.getElementById("swal-input1").value,
												document.getElementById("swal2-input2").value,
												document.getElementById("swal2-input3").value,
												document.getElementById("swal2-input4").value,
											];
										},
									});
									if (formValues) {
										//reload animation swal
										let xhr = new XMLHttpRequest();
										xhr.open("POST", "php/updateOption.php", false);
										xhr.onload = () => {
											if (xhr.readyState === XMLHttpRequest.DONE) {
												if (xhr.status == 200) {
													let data = xhr.response;
													if (data == "success") {
														Swal.fire({
															title: "Opción actualizada con éxito!",
															confirmButtonText: "Entendido",
														}).then(() => {
															location.reload();
														});
													} else {
														Swal.fire({
															title: "Error al actualizar opción, intentelo de nuevo",
															text: data,
															confirmButtonText: "Entendido",
														});
													}
												}
											}
										};
										xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										xhr.send(
											`idopcion=${e.id}&opcion=${formValues[0]}&tipo=${formValues[1]}&mensajeRespondido=${formValues[2]}&mensajeAMostrar=${formValues[3]}`
										);
									}
								}
							}
						};
						xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xhr.send(`idopcion=${e.id}`);
					}
				});
			});
		});
	});
});
//Funciones para editar y eliminar mensajes
Array.from(tableBodyMensajes.children).forEach((item) => {
	Array.from(item.children).forEach((element) => {
		Array.from(element.children).forEach((el) => {
			Array.from(el.children).forEach((e) => {
				e.addEventListener("click", () => {
					if (e.getAttribute("data-delete")) {
						Swal.fire({
							title: "¿Estás seguro?",
							text: "No podrás revertir esto!",
							icon: "warning",
							showCancelButton: true,
							confirmButtonColor: "#3085d6",
							cancelButtonColor: "#d33",
							confirmButtonText: "Sí, bórralo!",
							cancelButtonText: "Cancelar",
						}).then((result) => {
							if (result.isConfirmed) {
								let xhr = new XMLHttpRequest();
								xhr.open("POST", "php/deleteMessage.php", true);
								xhr.onload = () => {
									if (xhr.readyState === XMLHttpRequest.DONE) {
										if (xhr.status == 200) {
											let data = xhr.response;
											if (data == "success") {
												Swal.fire({
													title: "Mensaje eliminado con éxito!",
													confirmButtonText: "Entendido",
												}).then(() => {
													location.reload();
												});
											} else {
												Swal.fire({
													title: "Error al eliminar mensaje, intentelo de nuevo",
													text: data,
													confirmButtonText: "Entendido",
												});
											}
										}
									}
								};
								xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
								xhr.send(`idmensaje=${e.id}`);
							}
						});
					} else if (e.getAttribute("data-edit")) {
						let xhr = new XMLHttpRequest();
						xhr.open("POST", "php/getSelectedMessageData.php", true);
						xhr.onload = async () => {
							if (xhr.readyState === XMLHttpRequest.DONE) {
								if (xhr.status == 200) {
									let data = JSON.parse(xhr.response);
									const {value: formValues} = await Swal.fire({
										title: "Multiple inputs",
										html:
											'<label for="swal2-input" class="swal2-input-label">Mensaje</label>' +
											'<input value="' +
											data.mensaje +
											'" id="swal-input1" class="swal2-input">' +
											'<label for="swal2-input" class="swal2-input-label">Opción siguiente</label>' +
											'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input2">' +
											data.opcion1 +
											'<option value="NULL">NULL</option>' +
											"</select>" +
											'<label for="swal2-input" class="swal2-input-label">Opción pasada</label>' +
											'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input3">' +
											data.opcion2 +
											'<option value="NULL">NULL</option>' +
											"</select>",

										focusConfirm: false,
										preConfirm: () => {
											return [
												document.getElementById("swal-input1").value,
												document.getElementById("swal2-input2").value,
												document.getElementById("swal2-input3").value,
											];
										},
									});
									if (formValues) {
										//reload animation swal
										let xhr = new XMLHttpRequest();
										xhr.open("POST", "php/updateMessage.php", false);
										xhr.onload = () => {
											if (xhr.readyState === XMLHttpRequest.DONE) {
												if (xhr.status == 200) {
													let data = xhr.response;
													if (data == "success") {
														Swal.fire({
															title: "Mensaje actualizado con éxito!",
															confirmButtonText: "Entendido",
														}).then(() => {
															location.reload();
														});
													} else {
														Swal.fire({
															title: "Error al actualizar mensaje, intentelo de nuevo",
															text: data,
															confirmButtonText: "Entendido",
														});
													}
												}
											}
										};
										xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										xhr.send(
											`idmensaje=${e.id}&mensaje=${formValues[0]}&opcionSiguiente=${formValues[1]}&opcionPasada=${formValues[2]}`
										);
									}
								}
							}
						};
						xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xhr.send(`idmensaje=${e.id}`);
					}
				});
			});
		});
	});
});
//Funciones para crear opciones
createNewOp.addEventListener("click", async function () {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/getMenssagesStringData.php", false);
	xhr.onload = async () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status == 200) {
				let data = xhr.response;
				const {value: formValues} = await Swal.fire({
					title: "Multiple inputs",
					html:
						'<label for="swal2-input" class="swal2-input-label">Opción</label>' +
						'<input id="swal-input1" class="swal2-input">' +
						'<label for="swal2-input" class="swal2-input-label">Tipo de opción</label>' +
						'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input2">' +
						'<option value="liga">liga</option>' +
						'<option value="final">final</option>' +
						"</select>" +
						'<label for="swal2-input" class="swal2-input-label">Mensaje respondido</label>' +
						'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input3">' +
						data +
						'<option value="NULL">NULL</option>' +
						"</select>" +
						'<label for="swal2-input" class="swal2-input-label">Mensaje a mostrar</label>' +
						'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input4">' +
						data +
						'<option value="NULL">NULL</option>' +
						"</select>",

					focusConfirm: false,
					preConfirm: () => {
						return [
							document.getElementById("swal-input1").value,
							document.getElementById("swal2-input2").value,
							document.getElementById("swal2-input3").value,
							document.getElementById("swal2-input4").value,
						];
					},
				});
				if (formValues) {
					let xhr = new XMLHttpRequest();
					xhr.open("POST", "php/createNewOption.php", false);
					xhr.onload = () => {
						if (xhr.readyState === XMLHttpRequest.DONE) {
							if (xhr.status == 200) {
								let data = xhr.response;
								if (data == "success") {
									Swal.fire({
										title: "Opción agregada con éxito!",
										confirmButtonText: "Entendido",
									}).then(() => {
										location.reload();
									});
								} else {
									Swal.fire({
										title: "Error al agregar opción, intentelo de nuevo",
										text: data,
										confirmButtonText: "Entendido",
									});
								}
							}
						}
					};
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(
						`opcion=${formValues[0]}&tipo=${formValues[1]}&mensajeRespondido=${formValues[2]}&mensajeAMostrar=${formValues[3]}`
					);
				}
			}
		}
	};
	xhr.send();
});
//Funciones para crear mensajes
createNewMs.addEventListener("click", async function () {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "php/getOptionsStringData.php", false);
	xhr.onload = async () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status == 200) {
				let data = xhr.response;
				const {value: formValues} = await Swal.fire({
					title: "Multiple inputs",
					html:
						'<label for="swal2-input" class="swal2-input-label">Mensaje</label>' +
						'<input id="swal-input1" class="swal2-input">' +
						'<label for="swal2-input" class="swal2-input-label">Opción siguiente</label>' +
						'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input2">' +
						data +
						'<option value="NULL">NULL</option>' +
						"</select>" +
						'<label for="swal2-input" class="swal2-input-label">Opción pasada</label>' +
						'<select style="width: 80%; text-overflow: ellipsis;" class="swal2-select" id="swal2-input3">' +
						data +
						'<option value="NULL">NULL</option>' +
						"</select>",

					focusConfirm: false,
					preConfirm: () => {
						return [
							document.getElementById("swal-input1").value,
							document.getElementById("swal2-input2").value,
							document.getElementById("swal2-input3").value,
						];
					},
				});
				if (formValues) {
					let xhr = new XMLHttpRequest();
					xhr.open("POST", "php/createNewMessage.php", false);
					xhr.onload = () => {
						if (xhr.readyState === XMLHttpRequest.DONE) {
							if (xhr.status == 200) {
								let data = xhr.response;
								if (data == "success") {
									Swal.fire({
										title: "Mensaje agregado con éxito!",
										confirmButtonText: "Entendido",
									}).then(() => {
										location.reload();
									});
								} else {
									Swal.fire({
										title: "Error al agregar mensaje, intentelo de nuevo",
										text: data,
										confirmButtonText: "Entendido",
									});
								}
							}
						}
					};
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(
						`mensaje=${formValues[0]}&opcionSiguiente=${formValues[1]}&opcionPasada=${formValues[2]}`
					);
				}
			}
		}
	};
	xhr.send();
});

let numberOfRowsOptions = tableBodyOpciones.rows.length;
let numberOfRowsMessages = tableBodyMensajes.rows.length;
let paginationLimit = 4;
let currentPage = 1;
let pageCountOptions = numberOfRowsOptions / paginationLimit;
let pageCountMessages = numberOfRowsMessages / paginationLimit;
pageCountOptions = Math.ceil(pageCountOptions);
pageCountMessages = Math.ceil(pageCountMessages);


function handlePageButtonsStatusOptions() {
	if (currentPage === 1) {
		disableButton(prevButtonOption);
	} else {
		enableButton(prevButtonOption);
	}

	if (pageCountOptions === currentPage) {
		disableButton(nextButtonOption);
	} else {
		enableButton(nextButtonOption);
	}
}
function handlePageButtonsStatusMessages() {
	if (currentPage === 1) {
		disableButton(prevButtonMessage);
	} else {
		enableButton(prevButtonMessage);
	}

	if (pageCountMessages === currentPage) {
		disableButton(nextButtonMessage);
	} else {
		enableButton(nextButtonMessage);
	}
}

function appendPageNumberOptions(index) {
	const pageNumber = document.createElement("button");
	pageNumber.className = "pagination-number";
	pageNumber.innerHTML = index;
	pageNumber.setAttribute("page-index", index);
	pageNumber.setAttribute("aria-label", "Page " + index);
	paginationNumbersOptions.appendChild(pageNumber);
}
function appendPageNumberMessages(index) {
	const pageNumber = document.createElement("button");
	pageNumber.className = "pagination-number";
	pageNumber.innerHTML = index;
	pageNumber.setAttribute("page-index", index);
	pageNumber.setAttribute("aria-label", "Page " + index);
	PaginationNumbersMessages.appendChild(pageNumber);
}
function getPaginationNumbersOptions() {
	for (let i = 1; i <= pageCountOptions; i++) {
		appendPageNumberOptions(i);
	}
}
function getPaginationNumbersMessages() {
	for (let i = 1; i <= pageCountMessages; i++) {
		appendPageNumberMessages(i);
	}
}

function handleActivePageNumberOptions() {
	Array.from(paginationNumbersOptions.children).forEach((button) => {
		button.classList.remove("active");

		const pageIndex = Number(button.getAttribute("page-index"));
		if (pageIndex == currentPage) {
			button.classList.add("active");
		}
	});
}
function handleActivePageNumberMessages() {
	Array.from(PaginationNumbersMessages.children).forEach((button) => {
		button.classList.remove("active");

		const pageIndex = Number(button.getAttribute("page-index"));
		if (pageIndex == currentPage) {
			button.classList.add("active");
		}
	});
}

function setCurrentPageOptions(pageNum) {
	currentPage = pageNum;

	handleActivePageNumberOptions();
	handlePageButtonsStatusOptions();

	const prevRange = (pageNum - 1) * paginationLimit;
	const currRange = pageNum * paginationLimit;

	Array.from(tableBodyOpciones.children).forEach((item, index) => {
		item.classList.add("hidden");
		if (index >= prevRange && index < currRange) {
			item.classList.remove("hidden");
		} else {
			item.classList.add("hidden");
		}
	});
}
function setCurrentPageMessages(pageNum) {
	currentPage = pageNum;

	handleActivePageNumberMessages();
	handlePageButtonsStatusMessages();

	const prevRange = (pageNum - 1) * paginationLimit;
	const currRange = pageNum * paginationLimit;

	Array.from(tableBodyMensajes.children).forEach((item, index) => {
		item.classList.add("hidden");
		if (index >= prevRange && index < currRange) {
			item.classList.remove("hidden");
		} else {
			item.classList.add("hidden");
		}
	});
}

function disableButton(button) {
	button.classList.add("disabled");
	button.setAttribute("disabled", true);
}
function enableButton(button) {
	button.classList.remove("disabled");
	button.removeAttribute("disabled");
}

window.addEventListener("load", () => {
	getPaginationNumbersOptions();
	getPaginationNumbersMessages();
	setCurrentPageOptions(1);
	setCurrentPageMessages(1);

	prevButtonOption.addEventListener("click", () => {
		setCurrentPageOptions(currentPage - 1);
		tableContainerOp.scrollIntoView({
			behavior: "auto",
			block: "center",
			inline: "center",
		});
	});
	prevButtonMessage.addEventListener("click", () => {
		setCurrentPageMessages(currentPage - 1);
		tableContainerMs.scrollIntoView({
			behavior: "auto",
			block: "center",
			inline: "center",
		});
	});

	nextButtonOption.addEventListener("click", () => {
		setCurrentPageOptions(currentPage + 1);
		tableContainerOp.scrollIntoView({
			behavior: "auto",
			block: "center",
			inline: "center",
		});
	});
	nextButtonMessage.addEventListener("click", () => {
		setCurrentPageMessages(currentPage + 1);
		tableContainerMs.scrollIntoView({
			behavior: "auto",
			block: "center",
			inline: "center",
		});
	});

	Array.from(paginationNumbersOptions.children).forEach((button) => {
		const pageIndex1 = Number(button.getAttribute("page-index"));
		if (pageIndex1) {
			button.addEventListener("click", () => {
				setCurrentPageOptions(pageIndex1);
				tableContainerOp.scrollIntoView({
					behavior: "auto",
					block: "center",
					inline: "center",
				});
			});
		}
	});
	Array.from(PaginationNumbersMessages.children).forEach((button) => {
		const pageIndex2 = Number(button.getAttribute("page-index"));
		if (pageIndex2) {
			button.addEventListener("click", () => {
				setCurrentPageMessages(pageIndex2);
				tableContainerMs.scrollIntoView({
					behavior: "auto",
					block: "center",
					inline: "center",
				});
			});
		}
	});
});
