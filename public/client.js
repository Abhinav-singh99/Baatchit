

const socket = io.connect();
var users = [];
var clientid;
socket.on("connect",()=>{
    clientid=socket.id;
})

var form = document.getElementById("form")
var messageInput = document.getElementById("msginp")
var messageContainer = document.querySelector("#msgbody")
var cardbody = document.querySelector("#users")
var cardfooter= document.querySelector(".card-footer")
var emojidiv=document.querySelector(".emojiarea")
var activeUserId;

const append = (message, name, h, m) => {
    const messageElement = document.createElement("div");
    


    messageElement.classList.add("msg_cotainer")
    let markup = ``;
    if (name != null) {
        markup = `
        <h6><strong style="color:red">${name}:</strong></h6>
        <h6>${message}</h6>
        `
    } else {
        markup = `
 
        <h6>${message}</h6>
        `

    }
    messageElement.innerHTML = markup;


    var s = document.createElement('div')
    s.classList.add('d-flex')
    s.classList.add('justify-content-start')
    s.classList.add('mb-4')

    var span = document.createElement("span")
    span.classList.add('msg_time')

    let am = ''
    if (h >= 12) {
        am = "PM"
    }
    else {
        am = "AM"
    }
    var t = h % 12;
    var c = `${t}:${m} ${am}`
    span.innerHTML = c;





    messageContainer.append(s);
    s.append(messageElement)
    messageElement.append(span)
    var chatHistory = document.getElementById("msgbody");
    chatHistory.scrollTop = chatHistory.scrollHeight;

}

const append1 = (message, h, m) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("msg_cotainer_send");
    let markup = `
    <h6><strong style="color:blue">you:</strong></h6>
    <h6>${message}</h6>
    `
    messageElement.innerHTML = markup;

    var s = document.createElement('div')
    s.classList.add('d-flex')
    s.classList.add('justify-content-end')
    s.classList.add('mb-4')

    var span = document.createElement("span")
    span.classList.add('msg_time_send')
    let am = ''
    if (h >= 12) {
        am = "PM"
    }
    else {
        am = "AM"
    }
    var t = h % 12;
    var c = `${t}:${m} ${am}`
    span.innerHTML = c;




    messageContainer.append(s);
    s.append(messageElement)
    messageElement.append(span)
    var chatHistory = document.getElementById("msgbody");
    chatHistory.scrollTop = chatHistory.scrollHeight;

}
var flag1;
const append2 = (name, id,img) => {
    const userElement = document.createElement("div");
    userElement.classList.add('users1');
    userElement.classList.add("user_info")
    let randomid = Math.random()
    let randomclass = Math.random()
    const s = document.createElement("div")
    s.classList.add("bd-highlight");
    s.classList.add("d-flex");
    
    var divid= document.createAttribute("id")
    divid.value= "1"
    s.setAttributeNode(divid);
    


    console.log(randomid)
    let markup=`
    <span id="${id}">${name}</span>
        `;
    
    userElement.innerHTML = markup;

  
    const v = document.createElement("div")
    v.classList.add("img_cont")
    const e = document.createElement("img")
    e.classList.add("rounded-circle")
    e.classList.add("user_img")
    var src = document.createAttribute("src");
    src.value = img
    e.setAttributeNode(src)
   


    s.addEventListener('click', function clickt() {
      
       console.log(s.getAttribute("id")) 
        if (activeUserId == null) {
                
                    s.classList.add("active")
                activeUserId = id
                // flag3 = 0;
                // if (flag3 == 0) {
                    flag = 1;
                    socket.emit('firstprivate', { username: s.innerText, activeUserId })


               
                
            
           
       
        }   
        
         



        console.log(id);


    });
    console.log(activeUserId)
    var flag3;




    cardbody.append(s);
    s.append(v)
    v.append(e)
    s.append(userElement);
    var chatHistory = document.getElementById("users");
    chatHistory.scrollTop = chatHistory.scrollHeight;

}
var sendto;
var arr = [];
console.log(sendto);


function append5(name,id ,img){
    const userElement = document.createElement("div");
    userElement.classList.add('users1');
    userElement.classList.add("user_info")
   



    
    let markup = `
    <span ">${name}</span>
     </h6><strong style="color:red">(you)</strong></h6>
    `
    userElement.innerHTML = markup;

    const s = document.createElement("div");
    s.classList.add("d-flex");
    s.classList.add("bd-highlight");
    const v = document.createElement("div")
    v.classList.add("img_cont")
    const e = document.createElement("img")
    e.classList.add("rounded-circle")
    e.classList.add("user_img")
    var src = document.createAttribute("src");
    src.value = img
    e.setAttributeNode(src)


    cardfooter.append(s)
    s.append(v)
    v.append(e)
    s.append(userElement);

}

const append3 = (message, h, m, username) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("msg_cotainer_send");
    let markup = `
    <h6><strong style="color:blue">you:</strong></h6>
    <h6>${message}</h6>
    <span  style="color:red">(privately to ${username})</span>
    `
    messageElement.innerHTML = markup;

    var s = document.createElement('div')
    s.classList.add('d-flex')
    s.classList.add('justify-content-end')
    s.classList.add('mb-4')

    var span = document.createElement("span")
    span.classList.add('msg_time_send')
    let am = ''
    if (h >= 12) {
        am = "PM"
    }
    else {
        am = "AM"
    }
    var t = h % 12;
    var c = `${t}:${m} ${am}`
    span.innerHTML = c;

    




    messageContainer.append(s);
    s.append(messageElement)
    messageElement.append(span)
    // messageElement.append(private)
    var chatHistory = document.getElementById("msgbody");
    chatHistory.scrollTop = chatHistory.scrollHeight;

}



function handler1(e) {
    if (flag == 0) {
        e.preventDefault();
        const message = messageInput.value;
        var d = new Date()
        var h = d.getHours();
        var m = d.getMinutes();

        append1(` ${message}`, h, m);
        socket.emit('send', message);
        messageInput.value = "";

    }





}
form.addEventListener("submit", handler1)





//leaving room
const signout = document.getElementById("signout");
signout.addEventListener("submit", () => {
    alert("are you sure you want to logout?")
    socket.emit('disconnect', () => {
    })
})

socket.emit("new_user_joined", d => {

})

socket.on("receive", data => {
    var d = new Date()
    var h = d.getHours();
    var m = d.getMinutes();
    append(` ${data.message}`, `${data.name}`, h, m)
});

socket.on('temp',({participants,userid,profile}) => {
    let users = document.getElementById('users');

    while (users.firstChild) {
        users.removeChild(users.lastChild);
    }
    let y= document.getElementById("footer")
    while(y.firstElementChild){
        y.removeChild(y.lastElementChild)
    }
    console.log(participants)
    let ids = Object.keys(participants);
    console.log(ids)
    for (let id of ids) {
       
            
            if(id!==clientid ){
                append2(participants[id], id,profile[participants[id]]);
            }
            
    }
    append5(participants[clientid],clientid,profile[participants[clientid]])
    
})


var flag = 0;
// private messaging 
// executing after socket.emit("private")
socket.on("firstprivatelyto", data => {
    function handler(e) {

        e.preventDefault();
        const message = messageInput.value;
        var d = new Date()
        var h = d.getHours();
        var m = d.getMinutes();
        var u = data.username
        append3(` ${message}`, h, m, u);
        console.log(data.id)
        socket.emit('sendprivately', { message: message, id: data.id });
        messageInput.value = ""
        var y = document.getElementById(`${data.id}`)
        var x = y.parentNode
        x.parentNode.classList.remove("active");
        // arr.pop()

        form.removeEventListener("submit", handler)
        flag = 0;
        activeUserId = null;
    }
    form.addEventListener("submit", handler)

})
socket.on("privatelyto", data => {
    function handler(e) {

        e.preventDefault();
        const message = messageInput.value;
        var d = new Date()
        var h = d.getHours();
        var m = d.getMinutes();
        var u = data.username
        append3(` ${message}`, h, m, u);
        console.log(data.id)
        socket.emit('sendprivately', { message: message, id: data.id });
        messageInput.value = ""
        var y = document.getElementById(`${data.id}`)
        var x = y.parentNode
        x.parentNode.classList.remove("active");
        // arr.pop()

        form.removeEventListener("submit", handler)
        flag = 0;
    }
    form.addEventListener("submit", handler)

})



socket.on("recieveprivately", data => {
    var d = new Date()
    var h = d.getHours();
    var m = d.getMinutes();

    append4(` ${data.message}`, `${data.sendername}`, h, m)

})
const append4 = (message, name, h, m) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;


    messageElement.classList.add("msg_cotainer")
    let markup = ``;
    if (name != null) {
        markup = `
        <h6><strong style="color:red">${name}:</strong></h6>
       <h6>${message}</h6>
        <span style="color:red">(privately)</span>
        `
    } else {
        markup = `
 
         <h6>${message}</h6>
         `

    }
    messageElement.innerHTML = markup;


    var s = document.createElement('div')
    s.classList.add('d-flex')
    s.classList.add('justify-content-start')
    s.classList.add('mb-4')

    var span = document.createElement("span")
    span.classList.add('msg_time')

    let am = ''
    if (h >= 12) {
        am = "PM"
    }
    else {
        am = "AM"
    }
    var t = h % 12;
    var c = `${t}:${m} ${am}`
    span.innerHTML = c;





    messageContainer.append(s);
    s.append(messageElement)
    messageElement.append(span)
    var chatHistory = document.getElementById("msgbody");
    chatHistory.scrollTop = chatHistory.scrollHeight;

}
// search user 
function search(){
    var  input,filter,ul,li,a,i,txtvalue;
    input=document.getElementById("usersearch");
    filter=input.value.toUpperCase();

    ul=document.getElementById("users")
    li=ul.querySelectorAll(".bd-highlight");
    console.log(li)
    for(i=0;i<li.length;i++){
        
        txtvalue= li[i].textcontent||li[i].innerText;
        if(txtvalue.toUpperCase().indexOf(filter)>-1){
            li[i].classList.remove('d-none')
            li[i].classList.add("d-flex") 
            li[i].style.display=""

        }else{
            
            li[i].classList.remove('d-flex')
            li[i].classList.add("d-none")
            li[i].style.display="none";
        }

    }
}

