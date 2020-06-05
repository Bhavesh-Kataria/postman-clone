// hide this initially
let parameterbox=document.getElementById("parameterbox")
parameterbox.style.display="none"
let jsonreqbox=document.getElementById("jsonreqbox");
let index=1;
let parametersradio=document.getElementById("parametersradio");
parametersradio.addEventListener("click",function(){
    jsonreqbox.style.display="none"
    parameterbox.style.display="block"
})

let jsonradio=document.getElementById("jsonradio");
jsonradio.addEventListener("click",function(){
    parameterbox.style.display="none"
    jsonreqbox.style.display="block"
})

addparam=document.getElementById("addparam");
addparam.addEventListener("click",function(e){
    e.preventDefault();
    index++;
    let html=`
                    <div class="form-row my-2">
                        <label class="col-sm-2 col-form-label" for="urlfield">Parameter ${index} : </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="paramkey${index}" placeholder="Enter Parameter ${index} key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="paramvalue${index}" placeholder="Enter Parameter ${index} value">
                        </div>
                        <button class="btn btn-primary remover">-</button>
                    </div>
            `
    params=document.getElementById("params");
    params.innerHTML+=html;
    let deleter=document.getElementsByClassName("remover")
    for(item of deleter){
        console.log(item)
        item.addEventListener("click",function(e){
            e.target.parentElement.remove()
        })
    }
})


submitbtn=document.getElementById("submitbtn")
submitbtn.addEventListener("click",function(e){
    e.preventDefault()
    urlfield=document.getElementById("urlfield").value;
    let reqtype=document.querySelector("input[name='reqtype']:checked").value;
    let contenttype=document.querySelector("input[name='content']:checked").value;
    if(contenttype=="custom"){
        data={};
        for(let i=0;i<index;i++){
            if(document.getElementById(`paramkey${i+1}`)!=undefined){
            let key=document.getElementById(`paramkey${i+1}`).value
                let value=document.getElementById(`paramvalue${i+1}`).value
                data[key]=value
            }
        }
        data=JSON.stringify(data)
    }
    else{
        data=document.getElementById("jsonbox").value
        console.log(data)
    }
    if(reqtype=="GET"){
        fetch(urlfield).then(response =>response.text()).then((text)=>{
            let des=document.getElementById("responsePrism");
            des.innerHTML=text;
            Prism.highlightAll();
        })
    }
    else{
        params={
            method:'POST',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:data
        }
        fetch(urlfield,params).then(response =>response.text()).then((text)=>{
            let des=document.getElementById("responsePrism");
            des.innerHTML=text;
            Prism.highlightAll();
        })
    }

})


