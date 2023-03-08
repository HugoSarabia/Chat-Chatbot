//Función para las primeras opciones
function consulta() {
	try {
		const data = fetch("php/consulta.php")
			.then((response) => response.json())
			.then((res) => {
				let padre = document.querySelector("#chat-content");
				let jefe = padre.childNodes;
				res.forEach((item) => {
					if (item.id_respuestade === null) {
						let opcion = "";
						let id = 0;
						let option = document.createElement("div");
						option.classList.add("chat-option-button-div");
						let btn1 = document.createElement("button");
						btn1.classList.add("chat-option-button");
						opcion = item.opcion;
						id = item.idopcion;
						btn1.innerHTML = opcion;
						btn1.id = id;
						option.appendChild(btn1);
						padre.appendChild(option);
						jefe.forEach((element) => {
							//Dependiendo la opción seleccionada las demas se eliminan
							element.addEventListener("click", () => {
								while (element.nextSibling) {
									if (element.nextSibling.nodeName != "DIV") {
										break;
									} else {
										element.nextSibling.remove();
									}
								}
								while (element.previousSibling) {
									if (element.previousSibling.nodeName != "DIV") {
										break;
									} else {
										element.previousSibling.remove();
									}
								}
							});
						});
					}
				});
				botMessages();
				return fetch("php/mensaje.php");
			})
			
	} catch (err) {
		return console.log(err);
	}
}
//Función para mostrar las opciones y mensajes
function botMessages() {
	let mensajes = [];
	let opciones = [];
	let padre = document.querySelector("#chat-content");
	let footer = document.querySelector("#chat-footer");
	const form = document.querySelector(".form-chat"),
		inputChat = form.querySelector(".input-chat"),
		chatBtn = form.querySelector("button");
	let chatContainer = document.querySelector("#chat-container");
	let jefe = padre.childNodes;
	fetch("php/consulta.php")
		.then((data) => data.json())
		.then((data) => {
			data.forEach((item) => {
				opciones.push(item);
			});
			return fetch("php/mensaje.php");
		})
		.then((data) => {
			data.json().then((data) => {
				data.forEach((item) => {
					mensajes.push(item);
				});
			});
		});
	jefe.forEach((item) => {
		item.addEventListener("click", () => {
			const btn = item.childNodes;
			btn.forEach((child) => {
				mensajes.forEach((mensaje) => {
					opciones.forEach((opcion) => {
						//Comprueba que los id de mensajes y opciones coincidan
						if (child.id == opcion.idopcion) {
							if (mensaje.idmensaje == opcion.id_respuestapara) {
								if (child.nodeName == "BUTTON") {
									if (opcion.id_respuestade != null) {
										while (item.nextSibling != null) {
											if (item.nextSibling.nodeName != "DIV") {
												break;
											} else {
												item.nextSibling.remove();
											}
										}
										while (item.previousSibling.firstChild.nodeName == "BUTTON") {
											if (item.previousSibling.nodeName != "DIV") {
												break;
											} else {
												item.previousSibling.remove();
											}
										}
									}
									let chat_bubble_container = document.createElement("div");
									chat_bubble_container.classList.add("bubble-chat-container");
									let hour_info = document.createElement("div");
									hour_info.classList.add("hour-info");
									hour_info.textContent = getTime();
									let newBubble = document.createElement("div");
									let newBubbleText = document.createElement("p");
									let typing = document.createElement("div");
									let dot_loading = document.createElement("div");
									newBubble.classList.add("chat-bubble-bot");
									newBubbleText.classList.add("chat-bubble-text");
									typing.classList.add("dot-container");
									newBubble.appendChild(newBubbleText);
									dot_loading.classList.add("dot");
									typing.appendChild(dot_loading);
									chat_bubble_container.appendChild(newBubble);
									chat_bubble_container.appendChild(hour_info);
									child.disabled = "true";
									if (child.disabled) {
										child.parentElement.style.backgroundColor = "#588895";
										child.style.color = "#F8F7F7";
										child.style.cursor = "default";
									}
									child.parentElement.style.marginBottom = "0em";
									//Animación de escritura del chatbot
									setTimeout(() => {
										if (padre.lastElementChild.isEqualNode(typing)) {
											typing.remove();
										} else {
											padre.appendChild(typing);
										}
									}, 0);
									//Animación de respuesta del chatbot
									setTimeout(() => {
										typing.remove();
										padre.appendChild(chat_bubble_container);
										newBubble.style.scrollMargin = "20px";
										let id = mensaje.idmensaje;
										let respuesta = mensaje.idmensaje;
										if (respuesta == opcion.id_respuestapara) {
											data = mensaje.mensaje;
											newBubbleText.textContent = data;
											newBubble.id = id;
											verificar(mensajes, opciones, chat_bubble_container);
											if (opcion.tipo == "final") {
												iniciarChat(padre);
												footer.style.display = "inherit";
												inputChat.disabled = true;
												inputChat.style.cursor = "not-allowed";
												chatBtn.disabled = true;
												chatBtn.style.cursor = "not-allowed";
												chatContainer.style.height = "0em";
												chatContainer.style.minHeight = "41em";
												padre.style.borderBottomLeftRadius = "0em";
												padre.style.borderBottomRightRadius = "0em";
											}
										}
										padre.scrollTo(0, padre.scrollHeight);
									}, 3000);
								}
							}
						}
					});
				});
			});
			//Función para reiniciar el chatbot
			window.onbeforeunload = function () {
				return "¿Estás seguro de que quieres salir?";
			};
		});
	});
}
//Función para desplegar la opción correspondiente previa a la seleccionada
function verificar(mensajes, opciones, elemento) {
	let padre = document.querySelector("#chat-content");
	mensajes.forEach((mensaje) => {
		opciones.forEach((opcion) => {
			if (elemento.previousSibling.firstChild.isEqualNode(elemento.firstChild)) {
				elemento.previousSibling.remove();
			}
			if (elemento.firstChild.id == mensaje.idmensaje) {
				if (elemento.firstChild.id == opcion.id_respuestade) {
					let str = "";
					let id = 0;
					let option = document.createElement("div");
					option.classList.add("chat-option-button-div");
					let btn = document.createElement("button");
					btn.classList.add("chat-option-button");
					str = opcion.opcion;
					id = opcion.idopcion;
					btn.innerHTML = str;
					btn.id = id;
					option.appendChild(btn);
					option.scrollIntoView(true);
					return padre.appendChild(option);
				}
			}
		});
	});
	return botMessages();
}

let chatbtn = document.querySelector("#btn-chat");
let btnExit = document.querySelector("#btn-exit");
let hide = document.querySelector(".hide");
let chat_container = document.querySelector(".chat-container");
let chat_content = document.querySelector(".chat-content");
let btnChatContainer = document.querySelector(".btn-chat-container");
let chatFirsttimeOpen = true;
let btn1 = document.querySelector("#btn1");
let btn = document.querySelector("#btn");
let openChatMessage = document.createElement("div");
let openChatMessageText = document.createElement("p");
let openChatMessageButton = document.createElement("button");
let openChatMessageButtonIcon = document.createElement("i");

//Mensaje del bot antes de abrir el chat button
if (chatFirsttimeOpen) {
	openChatMessage.classList.add("open-chat-message");
	openChatMessageText.classList.add("open-chat-message-text");
	openChatMessageButton.classList.add("open-chat-message-button");
	openChatMessageButtonIcon.classList.add("fa");
	openChatMessageButtonIcon.classList.add("fa-times");
	openChatMessageButtonIcon.classList.add("fa-2x");
	openChatMessageText.textContent =
		"Hola, soy Toronja-Bot, tu asistente virtual, ¿en qué te puedo ayudar?";
	openChatMessageButton.appendChild(openChatMessageButtonIcon);
	openChatMessage.appendChild(openChatMessageText);
	btnChatContainer.appendChild(openChatMessage);
	btnChatContainer.appendChild(openChatMessageButton);
	setTimeout(() => {
		openChatMessage.classList.toggle("fade");
		openChatMessageButton.classList.toggle("fade");
	}, 1500);
	openChatMessageButton.addEventListener("click", () => {
		openChatMessage.classList.toggle("fade");
		openChatMessageButton.classList.toggle("fade");
		chatFirsttimeOpen = false;
	});
}
//Evento al abrir el chat button
chatbtn.addEventListener("click", function () {
	if (chat_container.classList.contains("hide")) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/update-read-message.php", true);
		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					let data = xhr.response;
					document.title = "CHAT BOT";
				}
			}
		};
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send();
	}
	let removeNoti = document.querySelector(".notification-icon");
	removeNoti?.remove();
	document.title = "CHAT BOT";
	if (chatFirsttimeOpen) {
		openChatMessage.classList.toggle("fade");
		openChatMessageButton.classList.toggle("fade");
		setTimeout(() => {
			openChatMessage.remove();
			openChatMessageButton.remove();
		}, 500);
		chatFirsttimeOpen = false;
	}
	if (chat_container.classList.contains("hide")) {
		chat_container.classList.toggle("hide");
	} else {
		chat_container.classList.toggle("hide");
	}
});

btnExit.addEventListener("click", function () {
	chat_container.classList.toggle("hide");
});
//Función para conseguir la hora actual
const getTime = function () {
	let fecha = new Date();
	let tiempo = undefined;
	horas = fecha.getHours();
	minutos = fecha.getMinutes();
	if (horas < 10) {
		horas = "0" + horas;
	}
	if (minutos < 10) {
		minutos = "0" + minutos;
	}
	tiempo = horas + ":" + minutos;
	return tiempo;
};
//Función del primer mensaje del bot
function initialMessage() {
	let message = "Gracias por comunicarte con Toronja Lab. ¿En qué te podemos ayudar?";
	let main_div = document.querySelector(".chat-bubble-bot");
	let chat_bubble_container = document.querySelector(".bubble-chat-container");
	let hour_info = document.createElement("div");
	let chat_bubble_bot = document.createElement("p");
	hour_info.classList.add("hour-info");
	hour_info.textContent = getTime();
	chat_bubble_bot.classList.add("chat-bubble-text");
	chat_bubble_bot.textContent = message;
	main_div.append(chat_bubble_bot);
	chat_bubble_container.append(main_div);
	chat_bubble_container.append(hour_info);
	let hora = document.querySelector(".time-display");
	let time = getTime();
	hora.append(time);
	document.querySelector(".form-chat").scrollIntoView(false);
}
//Se despliega el mensaje iniciar
initialMessage();

async function initialOptionsMessage() {
	consulta();
}
//Función que despliega la lista de opciones
initialOptionsMessage();

//Correo y contraseña declaradas manualmente, en ausencia de un login, simula al cliente dentro del sistema
let correo = "correo@example.com";
let contraseña = "123";
let form = new FormData();
form.append("correo", correo);
form.append("contraseña", contraseña);

//Función para iniciar sesión en el sistema y conectarse con soporte
function iniciarChat(padre) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/login.php", true);
	xhr.onload = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = xhr.response;
				if (data == "success") {
					firstMessage("php/conectarLogout.php").then(function (result) {});
					showChat(padre);
				}
			}
		}
	};
	xhr.send(form);
}
//Función para enviar el primer mensaje al soporte
function showChat(padre) {
	let adminID = 1234321;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/first-message-send.php", true);
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = xhr.response;
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("emisor_msj_id=" + adminID);

	const form = document.querySelector(".form-chat"),
		emisor_msj_id = form.querySelector(".emisor_msj_id").value,
		mensaje = form.querySelector(".input-chat"),
		sendBtn = form.querySelector("button");
	form.onsubmit = (e) => {
		e.preventDefault();
	};
	sendBtn.onclick = () => {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/chat-insert.php", true);
		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					mensaje.value = "";
				}
			}
		};
		let formData = new FormData(form);
		xhr.send(formData);
	};
	intervalo(adminID, padre);
}
let cont = undefined;
//Función para verificar el estado del soporte
function intervalo(adminID, padre) {
	let inter;
	let interval = setInterval(() => {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/checkAdminStatus.php", true);
		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					let data = xhr.response;
					if (data == "offline") {
						firstMessage("php/sendEmail.php").then(function (result) {
							if (result == "success") {
								clearInterval(interval);
							}
						});
					} else {
						clearInterval(interval);
					}
				}
			}
		};
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("adminID=" + adminID);
	}, 5000);
	firstMessage("php/verify-first-message.php", adminID).then(function (result) {
		if (result == "fail") {
			let hora = new Date();
			if (
				hora.getHours() == "23" ||
				hora.getHours() == "0" ||
				hora.getHours() <= "1" ||
				hora.getHours() <= "2" ||
				hora.getHours() <= "3" ||
				hora.getHours() <= "4" ||
				hora.getHours() <= "5" ||
				hora.getHours() <= "6" ||
				hora.getHours() <= "7"
			) {
				setTimeout(() => {
					let chat_bubble_container = document.createElement("div");
					chat_bubble_container.classList.add("bubble-chat-container");
					let hour_info = document.createElement("div");
					hour_info.classList.add("hour-info");
					hour_info.textContent = getTime();
					let newBubble = document.createElement("div");
					let newBubbleText = document.createElement("p");
					newBubble.classList.add("chat-bubble-bot");
					newBubbleText.classList.add("chat-bubble-text");
					newBubble.appendChild(newBubbleText);
					chat_bubble_container.appendChild(newBubble);
					chat_bubble_container.appendChild(hour_info);
					newBubble.style.scrollMargin = "20px";
					newBubbleText.textContent =
						"Es posible que soporte no se encuentre disponible debido al horario, el horario de soporte de Toronja Lab es entre las 8am y 11pm. Zona horaria: GMT-7";
					padre.appendChild(chat_bubble_container);
					chat_bubble_container.scrollIntoView(true);
				}, 1000);
			} else {
				inter = setInterval(() => {
					let chat_bubble_container = document.createElement("div");
					chat_bubble_container.classList.add("bubble-chat-container");
					let hour_info = document.createElement("div");
					hour_info.classList.add("hour-info");
					hour_info.textContent = getTime();
					let newBubble = document.createElement("div");
					let newBubbleText = document.createElement("p");
					newBubble.classList.add("chat-bubble-bot");
					newBubbleText.classList.add("chat-bubble-text");
					newBubble.appendChild(newBubbleText);
					chat_bubble_container.appendChild(newBubble);
					chat_bubble_container.appendChild(hour_info);
					newBubble.style.scrollMargin = "20px";
					newBubbleText.textContent =
						"Por favor, espere un momento, su consulta es importante para nosotros.";
					padre.appendChild(chat_bubble_container);
					chat_bubble_container.scrollIntoView(true);
				}, 180000);
			}
		} else {
			clearInterval(inter);
		}
	});
	//Función de chateo
	const intervalo = setInterval(() => {
		const form = document.querySelector(".form-chat"),
			inputChat = form.querySelector(".input-chat"),
			chatBtn = form.querySelector("button");
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/update-client-chats.php", true);
		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					let data = xhr.response;
					if (cont < data) {
						firstMessage("php/verify-first-message.php", adminID)
							.then(function (result) {
								if (result == "success") {
									clearInterval(inter);
									inputChat.disabled = false;
									inputChat.style.cursor = "default";
									chatBtn.disabled = false;
									chatBtn.style.cursor = "pointer";
									xhr.open("POST", "php/chat.php", true);
									xhr.onload = () => {
										if (xhr.readyState === XMLHttpRequest.DONE) {
											if (xhr.status === 200) {
												let data = xhr.response;
												if (data.match("bubble-chat-container-right")) {
													let chat_bubble_container = document.createElement("div");
													chat_bubble_container.classList.add("bubble-chat-container");
													let divCont = document.createElement("div");
													let hour_info = document.createElement("div");
													hour_info.classList.add("hour-info");
													hour_info.textContent = getTime();
													divCont.classList.add("div");
													chat_bubble_container.appendChild(hour_info);
													chat_bubble_container.insertAdjacentHTML("beforeend", data);
													divCont.innerHTML = data;
													padre.appendChild(chat_bubble_container);
													chat_bubble_container.scrollIntoView(true);
												} else {
													let chat_bubble_container = document.createElement("div");
													chat_bubble_container.classList.add("bubble-chat-container");
													let divCont = document.createElement("div");
													let hour_info = document.createElement("div");
													hour_info.classList.add("hour-info");
													hour_info.textContent = getTime();
													divCont.classList.add("div");
													chat_bubble_container.appendChild(hour_info);
													chat_bubble_container.insertAdjacentHTML("afterbegin", data);
													divCont.innerHTML = data;
													padre.appendChild(chat_bubble_container);
													chat_bubble_container.scrollIntoView(true);
												}
												//Notificacion
												let contador = 0;
												xhr.open("POST", "php/checkNewMessagesNotificationClient.php", true);
												xhr.onload = () => {
													if (xhr.readyState === XMLHttpRequest.DONE) {
														if (xhr.status === 200) {
															let newMessageCount = xhr.response;
															if (contador < newMessageCount) {
																xhr.open("POST", "php/getLastMessageClient.php", true);
																xhr.onload = () => {
																	if (xhr.readyState === XMLHttpRequest.DONE) {
																		if (xhr.status === 200) {
																			let data = JSON.parse(xhr.response);
																			data.forEach((item) => {
																				//Notificacion API
																				//AVISO: PARA QUE SUENE LA NOTIFICACIÓN DEBE EXISTIR PRIMERAMENTE UNA "INTERACCIÓN DENTRO DE LA VENTANA"
																				function playSound(url) {
																					const audio = new Audio(url);
																					audio.play();
																				}
																				let notificacion;
																				let chatContainer =
																					document.querySelector("#chat-container");
																				let notificationIcon = document.createElement("div");
																				notificationIcon.classList.add("notification-icon");

																				if (document.visibilityState === "hidden") {
																					notificacion = new Notification(item.username, {
																						body: item.msj,
																						icon: "img/logo.png",
																						silent: true,
																						muted: true,
																						tag: "Mensaje",
																						onclick() {
																							notificacion.close();
																						},
																					});
																					playSound("audio/notificacion.mp3");
																					if (chatContainer.classList.contains("hide")) {
																						chatbtn.appendChild(notificationIcon);
																					}
																					document.title =
																						"CHAT BOT " + "(" + newMessageCount + ")";
																				}
																			});
																		}
																	}
																};
																xhr.setRequestHeader(
																	"Content-type",
																	"application/x-www-form-urlencoded"
																);
																xhr.send();
															}
															contador = newMessageCount;
														}
													}
												};
												xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
												xhr.send();
												document.addEventListener("visibilitychange", function () {
													if (document.visibilityState == "visible") {
														let xhr = new XMLHttpRequest();
														xhr.open("POST", "php/update-read-message.php", true);
														xhr.onload = () => {
															if (xhr.readyState === XMLHttpRequest.DONE) {
																if (xhr.status === 200) {
																	removeNoti?.remove();
																}
															}
														};
														xhr.setRequestHeader(
															"Content-type",
															"application/x-www-form-urlencoded"
														);
														xhr.send();
													}
												});
											}
										}
									};
									xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									xhr.send("emisor_msj_id=" + adminID);
								} else {
									clearInterval(inter);
								}
							})
							.catch(function (error) {
								console.log(error);
							});
					} else {
						console.log("no hay nuevos mensajes");
						firstMessage("php/consultarLogoutCliente.php").then(function (result) {
							if (result == "Desconectado") {
								padre.lastElementChild.remove();
								const footer = document.querySelector("#chat-footer");
								const divAlert = document.createElement("div");
								divAlert.classList.add("div-alert");
								divAlert.textContent =
								"Ha finalizado la conversación con nueopciono equipo de soporte, si desea volver a iniciar una conversación o checar nueopcionas opciones, por favor vuelva a refrescar la página.";
								padre.appendChild(divAlert);
								divAlert.scrollIntoView(true);
								footer.style.display = "none";
								clearInterval(intervalo);
								return true;
							}
						});
					}
					cont = data;
				}
			}
		};
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("emisor_msj_id=" + adminID);
	}, 500);
}
//Función de promesa para obtener los mensajes(usado de manera opcional)
function firstMessage(url, id) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(this.responseText);
		};
		xhr.onerror = reject;
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("emisor_msj_id=" + id);
	});
}
//Función para cada refrescación de la página se desconecte del chat con soporte
const pageAccessedByReload =
	(window.PerformanceNavigationTiming && window.PerformanceNavigationTiming.type === 1) ||
	window.performance
		.getEntriesByType("navigation")
		.map((nav) => nav.type)
		.includes("reload");

if (pageAccessedByReload) {
	firstMessage("php/desconectarLogoutCliente.php").then(function (result) {});
}
