//id del admin
const btnLogout = document.querySelector(".prueba"),
//Div de lista de usuarios
chatList = document.querySelector(".chats-container"),
//Div de chatBar de lista de usuarios
searchBar = document.querySelector(".search-bar-input");
//Div de la vista del Chat
const chatView = document.querySelector(".chat-container");

const uniqueid = document.querySelector(".admin-id");

const modal = document.getElementById("userDropdown");

const mensajeNoLeido = document.getElementById("noLeido");

const filterBtn = document.querySelector(".filter");


document.cookie = "adminID=" + uniqueid.textContent;
//document.cookie = "prueba=" + 1234321;

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}


//terminar el logout
btnLogout.addEventListener("click", () => {
	//let adminid = getCookie("prueba");
	let adminid = uniqueid.textContent;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/logout.php", true);
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = xhr.response;
				if (data == "success") {
					location.href = "login.php";
				}
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("logout_id=" + adminid);
});

//Evento cuando se desee filtrar chats
let filterOp = 1;
filterBtn.addEventListener("click", (evt)=>{
	evt.preventDefault();
	filterBtn.classList.add("active");
	if(filterOp >= 1 && filterOp <= 2){
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/filter.php", true);
		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					let data = xhr.response;
					if(data == "Error1"){
						chatList.innerHTML = '<div class="chatList-output">No se ha encontrado ningún usuario con mensajes no leidos.</div>';
						filterOp++
					}else if(data == "Error2"){
						chatList.innerHTML = '<div class="chatList-output">No se ha encontrado ningún usuario con un color asignado.</div>';
						filterOp++
					}else{
						searchBar.classList.remove("active");
						chatList.innerHTML = data;
						showChat(chatList);
						filterOp++
					}
				}
			}
		};
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("filter=" + filterOp);
	}else if(filterOp == 3){
		filterBtn.classList.remove("active");
		iniciarChat();
		filterOp = 1;
	}
},)

//Evento cuando se seleccione la barra de buscar
searchBar.addEventListener("click", function () {
	searchBar.classList.toggle("active");
	searchBar.focus();
	if (searchBar.classList.contains("active")) {
		searchBar.value = "";
		searchBar.classList.remove("active");
		iniciarChat();
	} else {
		searchBar.classList.add("active");
	}
});

//Evento cuando se realice una busqueda de algun chat
searchBar.addEventListener("keyup", function (evt) {
	let searchTerm = searchBar.value;
	if (searchTerm != "") {
		searchBar.classList.add("active");
	} else {
		searchBar.classList.remove("active");
		iniciarChat();
	}
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/search.php", true);
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = xhr.response;
				if(data=="Error"){
					chatList.innerHTML = '<div class="chatList-output">No se ha encontrado ningún usuario relacionado con tu búsqueda.</div>';
				}else{
					chatList.innerHTML = data;
					showChat(chatList);
				}
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("searchTerm=" + searchTerm);
});

//Función para cargar la lista de chats
function iniciarChat() {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/admin.php", true);
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = xhr.response;
				if (!searchBar.classList.contains("active") && !filterBtn.classList.contains("active")) {
					if(data=="Error"){
						chatList.innerHTML = '<div class="chatList-output">No hay usuarios disponibles para chatear.</div>';
					}else{
						chatList.innerHTML = data;
						showChat(chatList);
					}
				}
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
}
//Despliega los chats por primera vez
iniciarChat();

//Función para mostrar notificaciones del chat
let contador = 0;
let intervaloNotificaciones = setInterval(()=>{
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/checkNewMessagesNotification.php", true);
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let newMessageCount = xhr.response;
				if (contador < newMessageCount) {
					xhr.open("POST", "php/getLastMessage.php", true);
					xhr.onload = () => {
						if (xhr.readyState === XMLHttpRequest.DONE) {
							if (xhr.status === 200) {
								let data = JSON.parse(xhr.response);
								data.forEach((item)=>{
									/*Notificaciones
									*AVISO: PARA QUE SUENE LA NOTIFICACIÓN DEBE EXISTIR PRIMERAMENTE UNA 
									*"INTERACCIÓN DENTRO DE LA VENTANA"*/
									function playSound(url) {
										const audio = new Audio(url);
										audio.play();
										}
									let notificacion
									if(document.visibilityState === "hidden"){
										notificacion = new Notification(item.username,{
											body: item.msj,
											icon: "img/logo.png",
											silent: true,
											muted: true,
											tag: "Mensaje",
											onclick(){
												notificacion.close();
											}
										})
										playSound("audio/notificacion.mp3");
										document.title = "Toronja Chat " + "("+newMessageCount+")";
										iniciarChat();
									}
								})
							}
						}
					}
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send();
				}
				contador = newMessageCount;
			}
		}
	}
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
},500)

setInterval(()=> {
	//Consulta que me devuelva el iduser del mensaje entrante
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "php/getLastMessage.php", true);
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.response);
				data.forEach((item)=>{
					if (item.uniqueid == getCookie("userID")) {
						let xhr = new XMLHttpRequest();
						xhr.open("POST", "php/updateLastMessageChat.php", true);
						xhr.onload = () => {
							if (xhr.readyState === XMLHttpRequest.DONE) {
								if (xhr.status === 200) {
									let data = xhr.response;
									document.title = "Toronja Chat";
									iniciarChat();
								}
							}
						}
						xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xhr.send("receptor_msj_id=" +  getCookie("userID"));
					}
				})
			}
		}
	}
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();

}, 500);

//Mantiene actualizada la lista de chats
setInterval(()=> {
	iniciarChat();
}, 7000);

//Función para mostrar la conversación del chat una vez seleccione dicho chat
let number;
let interval;
function showChat(chatList) {
	chatList.childNodes.forEach((el) => {
		// Set up an event handler for the documnt right click
		el.addEventListener("contextmenu", function (e){
			contextMenuFunction(e,el)
		});
		//Se obtiene el id del usuario seleccionado
		el.addEventListener("click", function () {
			filterBtn.classList.remove("active");
			searchBar.classList.remove("active");
			clearInterval(interval);
			let userId = el.id;
			let flag = false;
			//Se guardan las id del admin y del usuario seleccionado como cookies
			document.cookie = "userID=" + userId;
			//1234321 es el uniqueid de un admin y se usa para realizar la conexion entre el admin y el chat de clientes
			number = el.id;
			//Se genera la vista de la converssación
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "php/chatView.php", true);
			xhr.onload = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						let data = xhr.response;
						chatView.innerHTML = data;
						document.title = "Toronja Chat"
						iniciarChat();
						const leftHeaderContent = document.querySelector(".left-header-content");
						const userProfileContainer = document.querySelector(".user-profile-container");
						const closeUserProfile = document.querySelector(".close-user-profile-button");
						const searchMessageButton = document.querySelector(".search-message-button");
						const searchMessageContainer = document.querySelector(".search-message-container");
						const searchMessageInput = document.querySelector(".search-message-input");
						const closeSearchContainer = document.querySelector(".close-search-container");
						const closeSearchButtton = document.querySelector(".close-search-button");
						const searchResults = document.querySelector(".search-results");
						const nextMessageSearched = document.querySelector(".next-message-searched");
						const previousMessageSearched = document.querySelector(".previous-message-searched");
						const chatBoxx = document.querySelector(".bubble-chat-container");
						const optionBtn = document.querySelector(".option-icon-header");
						const dropdown = document.querySelector(".dropdown-content");
						const desconectar = document.querySelector("#desconectar");
						const editar = document.querySelector("#editar");
						const updateForm = document.querySelector(".update-form");
						const btnCloseUpdateForm = document.querySelector(".btn-close-update-form");
						const btnUpdateFormImg = document.querySelector(".btn-update-form-img");
						const inputSelectFile = document.querySelector(".input-select-file");
						const userImgForm = document.querySelector(".user-img-form");
						const inputFormClass = document.querySelector(".input-form-class");
						const btnUpdateForm = document.querySelector(".btn-update-form");
						const divScrollBottom = document.querySelector(".div-scroll-bottom");

						searchMessageButton.addEventListener("click", (e) => {
							if (
								!searchMessageContainer.classList.contains("hide2") &&
								!searchMessageButton.classList.contains("active") &&
								e.target.parentNode !== closeSearchButtton
							) {
								searchMessageContainer.classList.add("hide2");
								searchMessageButton.classList.add("active");
								searchMessageInput.focus();
							}
						});

						let elementsArray = new Array();
						let wordCounter = 0;
						searchMessageInput.addEventListener("keyup", (e) => {
							wordCounter = 0;
							elementsArray = [];
							let searchTerm = e.target.value;
							searchTerm = searchTerm.toLowerCase();
							if (searchTerm != "") {
								chatBoxx.childNodes.forEach((el) => {
									el.childNodes.forEach((child) => {
										if (child.className != "emisor-name" && el.className != "div-alert") {
											let word = child.textContent.toLowerCase();
											if (word.indexOf(searchTerm) != -1) {
												wordCounter++;
												elementsArray.push(child);
												searchResults.textContent = "1 de " + wordCounter;
											} else if (word.indexOf(searchTerm) == -1 && wordCounter == 0) {
												searchResults.textContent = "0 de 0";
											}
										}
									});
								});
								elementsArray.reverse();
							} else {
								searchResults.textContent = "";
							}
						});
						//Definir el index del array y su display en la pantalla
						let index = -1;
						let display = 0;
						//Siguiente mensaje
						nextMessageSearched.addEventListener("click", () => {
							display++;
							index++;
							if(index > elementsArray.length-1){
								index = elementsArray.length-1;
								display = elementsArray.length;
							}
							let deleteEffects = document.querySelectorAll(".effect")
							if(deleteEffects.length > 0){
								deleteEffects.forEach((e)=>{
									if(e.classList.contains("effect")){
										e.classList.remove("effect")
										for (const child of e.children) {
											if(child.className == "chat-bubble-emisor-text"){
												child.style.backgroundColor = "transparent";	
											}
										}
									}
								})
							}
							elementsArray[index].scrollIntoView({
								behavior: "auto",
								block: "center",
								inline: "center",
							});
							searchResults.textContent = display + " de " + wordCounter;
							elementsArray[index].style.backgroundColor = "#426D67";
							elementsArray[index].parentNode.classList.add("effect");

						});
						//Mensaje anterior
						previousMessageSearched.addEventListener("click", () => {
							display--;
							index--;
							if(index < 0){
								index = 0;
								display = 1;
							}
							let deleteEffects = document.querySelectorAll(".effect")
							if(deleteEffects.length > 0){
								deleteEffects.forEach((e)=>{
									if(e.classList.contains("effect")){
										e.classList.remove("effect")
										for (const child of e.children) {
											if(child.className == "chat-bubble-emisor-text"){
												child.style.backgroundColor = "transparent";	
											}
										}
									}
								})
							}
							elementsArray[index].scrollIntoView({
								behavior: "auto",
								block: "center",
								inline: "center",
							});
							searchResults.textContent = display + " de " + wordCounter;
							elementsArray[index].style.backgroundColor = "#426D67";
							elementsArray[index].parentNode.classList.add("effect");

						});
						//Cerrar buscador
						closeSearchContainer.addEventListener("click", (e) => {
							if (
								searchMessageContainer.classList.contains("hide2") &&
								searchMessageButton.classList.contains("active") &&
								e.target.parentNode == closeSearchButtton
							) {
								searchMessageContainer.classList.toggle("hide2");
								searchMessageButton.classList.toggle("active");
								searchMessageInput.value = "";
								searchResults.textContent = "";
								index = 0;
								display = 0;
								elementsArray = [];
								wordCounter = 0;
								document.querySelectorAll('.effect').forEach(el => el.lastElementChild.style.backgroundColor = "transparent");
								document.querySelectorAll('.effect').forEach(el => el.classList.remove('effect'));
							}
						});

						//Despliegue de la info del usuario
						leftHeaderContent.addEventListener("click", (e) => {
							console.log(e.target.parentNode)
							if (!userProfileContainer.classList.contains("hide") &&!closeUserProfile.classList.contains("added") && e.target.parentNode !== closeUserProfile) {
								userProfileContainer.classList.toggle("hide");
								leftHeaderContent.classList.add("active");
								closeUserProfile.classList.add("added");
							}
						});

						closeUserProfile.addEventListener("click", (e) => {
							if (
								userProfileContainer.classList.contains("hide") &&
								closeUserProfile.classList.contains("added") &&
								e.target.parentNode == closeUserProfile
							) {
								userProfileContainer.classList.toggle("hide");
								closeUserProfile.classList.toggle("added");
							}
						});

						btnCloseUpdateForm.addEventListener("click", () => {
							updateForm.style.display = "none";
						});
						btnUpdateFormImg.addEventListener("click", () => {
							inputSelectFile.click();
						});
						inputSelectFile.addEventListener("change", (event) => {
							let src = URL.createObjectURL(event.target.files[0]);
							userImgForm.src = src;
						});
						btnUpdateForm.addEventListener("click", () => {
							let formData = new FormData();
							let file = inputSelectFile.files[0];
							let name = inputFormClass.value;
							formData.append("file", file);
							formData.append("name", name);
							formData.append("emisor_msj_id", userId);
							let xhr = new XMLHttpRequest();
							xhr.open("POST", "php/upload-update-form.php", true);
							xhr.onload = () => {
								if (xhr.readyState === XMLHttpRequest.DONE) {
									if (xhr.status === 200) {
										let data = xhr.response;
										console.log(data);
										if (data == "success") {
											updateForm.style.display = "none";
											userImgForm.value = "";
											el.click();
											Swal.fire(
												"Usuario actualizado!",
												"Se ha actualizado la información del usuario con éxito.",
												"success"
											);
										}
									}
								}
							};
							xhr.send(formData);
						});

						divScrollBottom.addEventListener("click", () => {
							chatBoxx.scrollTop = chatBoxx.scrollHeight;
						});

						desconectar.style.cursor = "pointer";
						editar.style.cursor = "pointer";
						optionBtn.addEventListener("click", function () {
							if (dropdown.style.display == "flex") {
								dropdown.style.display = "none";
							} else {
								dropdown.style.display = "flex";
							}
						});
						// Close the dropdown if the user clicks outside of it
						window.onclick = function (event) {
							if (!event.target.matches(".fa-ellipsis-h")) {
								dropdown.style.display = "none";
							}
						}

						const btnUpload = document.querySelector(".files-icon");
						const imgPreview = document.querySelector(".image-preview");
						btnUpload.addEventListener("click", () => {
							document.querySelector(".fileid").click();
						});
						document.querySelector(".fileid").addEventListener("change", (event) => {
							imgPreview.style.display = "flex";
							let src = URL.createObjectURL(event.target.files[0]);
							let preview = document.querySelector(".file-preview");
							preview.src = src;
							preview.style.display = "block";
						});
						const btnSendImg = document.querySelector(".btn-send-img");
						btnSendImg.addEventListener("click", () => {
							let formData = new FormData();
							let file = document.querySelector(".fileid").files[0];
							formData.append("file", file);
							formData.append("emisor_msj_id", userId);
							let xhr = new XMLHttpRequest();
							xhr.open("POST", "php/uploadImg.php", true);
							xhr.onload = () => {
								if (xhr.readyState === XMLHttpRequest.DONE) {
									if (xhr.status === 200) {
										let data = xhr.response;
										if (data == "success") {
											imgPreview.style.display = "none";
											document.querySelector(".file-preview").value = "";
											el.click();
										}
									}
								}
							};
							xhr.send(formData);
						});

						const btnClosePreview = document.querySelector(".btn-close-img-preview");
						btnClosePreview.addEventListener("click", () => {
							imgPreview.style.display = "none";
							document.querySelector(".file-preview").value = "";
						});
						//Función para editar datos del usuario
						editar.addEventListener("click", () => {
							updateForm.style.display = "flex";
						});

						//Función para desconectar al usuario
						desconectar.addEventListener("click", () => {
							let xhr = new XMLHttpRequest();
							xhr.open("POST", "php/desconectarLogout.php", true);
							xhr.onload = () => {
								if (xhr.readyState === XMLHttpRequest.DONE) {
									if (xhr.status === 200) {
										let mensaje = "Ha finalizado la conversación con el usuario.";
										xhr.open("POST", "php/insertSpecialMessage.php", true);
										xhr.onload = () => {
											if (xhr.readyState === XMLHttpRequest.DONE) {
												if (xhr.status === 200) {
													let data = xhr.response;
													//iniciarChat();
													el.click();
													desconectar.disabled = "true";
													desconectar.style.cursor = "not-allowed";
													desconectar.style.pointerEvents = "none";
													desconectar.style.color = "gray";
												}
											}
										};
										xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										xhr.send("emisor_msj_id=" + userId + "&mensaje=" + mensaje);
										ajax("php/deleteColor.php",userId)
										.then(function(result){
											console.log(result);
										})
									}
								}
							};
							xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xhr.send("emisor_msj_id=" + userId);
						});
						
						let cont = 0;
						//Intervalo para mantener actualizados los mensajes proximos
						interval = setInterval(() => {
							let xhr = new XMLHttpRequest();
							xhr.open("POST", "php/update-chats.php", true);
							xhr.onload = () => {
								if (xhr.readyState === XMLHttpRequest.DONE) {
									if (xhr.status === 200) {
										let data = xhr.response;
										if (cont < data) {
											xhr.open("POST", "php/get-chat.php", true);
											xhr.onload = () => {
												if (xhr.readyState === XMLHttpRequest.DONE) {
													if (xhr.status === 200) {
														let data = xhr.response;
														chatBoxx.innerHTML = data;

														function getLastMessage(){
															let lastMessage = "";
															for (const child of chatBoxx.lastElementChild.children) {
																if(child.className == "chat-bubble-receptor-text"){
																	lastMessage = child.textContent;	
																}
															}
															return lastMessage;
														}

														if (
															chatBoxx.scrollHeight - chatBoxx.scrollTop.toFixed() <
															chatBoxx.clientHeight + 100
														) {
															scrollToBottom(chatBoxx);
														}
														//Manda al usuario una sola vez(al abrir el chat) al final de la conversación
														if (!flag) {
															scrollToBottom(chatBoxx);
															flag = true;
														}
														//Consulta si el usuario está conectado o desconectado
														firstMessage("php/consultarLogout.php", userId).then(function (result) {
															if (result == "Desconectado") {
																desconectar.disabled = "true";
																desconectar.style.cursor = "not-allowed";
																desconectar.style.pointerEvents = "none";
																desconectar.style.color = "gray";
															} else if (result == "Conectado") {
																desconectar.disabled = "false";
																desconectar.style.pointerEvents = "initial";
																desconectar.style.cursor = "pointer";
																desconectar.style.color = "white";
															}
														});
														const imgSelect = document.getElementsByClassName("chat-bubble-img");
														for (let i = 0; i < imgSelect.length; i++) {
															imgSelect[i].addEventListener("click", () => {
																const imageMessageOpen =
																	document.querySelector(".image-message-open");
																const imgOpenPreview = document.querySelector(".img-open-preview");
																const btnDownload = document.querySelector(".btn-download");
																imgOpenPreview.setAttribute(
																	"src",
																	imgSelect[i].getAttribute("src")
																);
																imageMessageOpen.style.display = "flex";
																btnDownload.addEventListener("click", () => {
																	btnDownload.setAttribute(
																		"href",
																		imgSelect[i].getAttribute("src")
																	);
																});
																window.onclick = function (event) {
																	if (
																		!event.target.matches(".chat-bubble-img") &&
																		!event.target.matches(".image-message-open-content") &&
																		!event.target.matches(".img-open-preview")
																	) {
																		imageMessageOpen.style.display = "none";
																	}
																	if (!event.target.matches(".fa-ellipsis-h")) {
																		dropdown.style.display = "none";
																	}
																}
																if (imageMessageOpen.style.display == "flex") {
																	window.addEventListener("keydown", (evt) => {
																		//Cerrar modal con la tecla "esc"
																		evt = evt || window.event;
																		if (evt.keyCode == 27) {
																			const isNotCombinedKey = !(
																				event.ctrlKey ||
																				event.altKey ||
																				event.shiftKey
																			);
																			if (isNotCombinedKey) {
																				imageMessageOpen.style.display = "none";
																			}
																		}
																	});
																}
															});
														}
													}
												}
											};
											xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
											xhr.send("emisor_msj_id=" + userId);
										}
										cont = data;
									}
								}
							};
							xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xhr.send("emisor_msj_id=" + userId);
							//Si el usuario scrollea en el chat le aparecerá un botón para bajar hasta el final
							if (
								!(
									chatBoxx.scrollHeight - chatBoxx.scrollTop.toFixed() <
									chatBoxx.clientHeight + 100
								)
							) {
								divScrollBottom.style.display = "flex";
							} else {
								divScrollBottom.style.display = "none";
							}
						}, 500);

						const form = document.querySelector(".form-chat"),
							emisor_msj_id = form.querySelector(".emisor_msj_id").value,
							mensaje = form.querySelector(".input-chat"),
							sendBtn = form.querySelector("button");
						form.onsubmit = (e) => {
							e.preventDefault();
						};
						//Evento cuando se mande un mensaje
						sendBtn.onclick = () => {
							let xhr = new XMLHttpRequest();
							//Insertar el mensaje en la BD
							xhr.open("POST", "php/chat-insert.php", true);
							xhr.onload = () => {
								if (xhr.readyState === XMLHttpRequest.DONE) {
									if (xhr.status === 200) {
										let chatBoxx = document.querySelector(".bubble-chat-container");
										mensaje.value = "";
										let xhr = new XMLHttpRequest();
										//Cargar la lista de chats para vizualizar el mensaje
										xhr.open("POST", "php/admin.php", true);
										xhr.onload = () => {
											if (xhr.readyState === XMLHttpRequest.DONE) {
												if (xhr.status === 200) {
													let data = xhr.response;
													if (!searchBar.classList.contains("active")) {
														chatList.innerHTML = data;
													}
												}
											}
										};
										xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										xhr.send();
										//Insertar el chat en la conversación
										xhr.open("POST", "php/get-chat.php", true);
										xhr.onload = () => {
											if (xhr.readyState === XMLHttpRequest.DONE) {
												if (xhr.status === 200) {
													let data = xhr.response;
													chatBoxx.innerHTML = data;
													iniciarChat();
													scrollToBottom(chatBoxx);
												}
											}
										};
										xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										xhr.send("emisor_msj_id=" + userId);
										scrollToBottom(chatBoxx);
									}
								}
								ajax("php/updateColorAdmin.php",userId)
								.then(function(result){
								})
							};
							let formData = new FormData(form);
							xhr.send(formData);
						};
					}
				}
		};
			xhr.send();
		});
	});
}

//Función para mandar al usuario al final del contenedor.
function scrollToBottom(chatBoxx) {
	chatBoxx.scrollTop = chatBoxx.scrollHeight;
}

function firstMessage(url, userId) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(this.responseText);
		};
		xhr.onerror = reject;
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("emisor_msj_id=" + userId);
	});
}
function requestXMLHTTP(url, variable1, variable2, param1, param2) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(this.responseText);
		};
		xhr.onerror = reject;
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(`${variable1}=` + param1 + `&${variable2}=` + param2);
	});
}
function ajax(url, userId) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(this.responseText);
		};
		xhr.onerror = reject;
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("uniqueid=" + userId);
	});
}

function contextMenuFunction(e,el){
	// Evitar que aparezca el menú contextual por defecto
	let target = e.target.className;
	e.preventDefault();
	getEventTargetClass(target);
	let posX = e.x || e.clientX || e.layerX || e.offsetX || e.pageX; //gets the event position X
	let posY = e.y || e.clientY || e.layerY || e.offsetY || e.pageY; //gets the event position Y
	modal.style.top = posY + "px";
	modal.style.left = posX + "px";
	modal.style.display = "flex";
	let xhr = new XMLHttpRequest();
	//Verificar si el mensaje ya esta marcado como "no leído" o "leido"
	ajax("php/checkMessageRead.php", el.id)
	.then(function (result) {
		let option;
		if(result == "desactivado"){
			mensajeNoLeido.disabled = true;
			mensajeNoLeido.style.pointerEvents = "none";
			mensajeNoLeido.style.cursor = "default";
			mensajeNoLeido.style.color = "gray";
		}else{
			if (result == "no leido") {
				mensajeNoLeido.textContent = "Marcar como no leído";
				option = 1;
			}else if(result == "leido"){
				mensajeNoLeido.textContent = "Marcar como leído";
				option = 0;
			}
			mensajeNoLeido.disabled = false;
			mensajeNoLeido.style.pointerEvents = "initial";
			mensajeNoLeido.style.cursor = "pointer";
			mensajeNoLeido.style.color = "white";
			mensajeNoLeido.addEventListener("click", (e)=>{
			//Actualizar BD para fijar usuario como leido o no leido
			requestXMLHTTP("php/updateMessageReadOption.php", "uniqueid", "option", el.id, option)
			.then(function (result) {
				iniciarChat();
			})
			},{once:true});
		}
	});

}
// Cerrar el menú al hacer clic izquierdo en cualquier lugar
function getEventTargetClass(target) {
	document.addEventListener("click", function (event) {
		if (!event.target.matches(target)) {
			modal.style.display = "none";
		}
	});
}

const pageAccessedByReload = (
    (window.PerformanceNavigationTiming && window.PerformanceNavigationTiming.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
);

if(pageAccessedByReload){
    document.cookie = "userID=;";
}