const form = document.querySelector(".login form"),
btn = form.querySelector(".button input"),
error = form.querySelector(".error-text");

form.onsubmit = (e) => {
    e.preventDefault();
}

btn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login_admin.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              if(data === "success"){
                console.log("success");
                location.href = "admin.php";
              }else{
                error.style.display = "block";
                error.textContent = data;
              }
          }
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}