
let MyLinks = []
const InputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const TabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("MyLinks"));



if (linksFromLocalStorage){
    MyLinks = linksFromLocalStorage
    Render(MyLinks)
}

  TabBtn.addEventListener("click" , function(){

        chrome.tabs.query({active: true, currentWindow: true} , function(tabs){

            MyLinks.push(tabs[0].url)
            localStorage.setItem("MyLinks", JSON.stringify(MyLinks))
            Render(MyLinks)
            
        })

  })

  

function Render(links) {
    let ListItems = ""
    for (i = 0; i < links.length; i++) {
        ListItems += `
        <li>
            <a href= "${links[i]}" target = "_blank"> 
             ${links[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = ListItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    MyLinks = []
    Render(MyLinks)

})

inputBtn.addEventListener("click", function () {
    MyLinks.push(InputEl.value)
    InputEl.value = ""
    localStorage.setItem("MyLinks", JSON.stringify(MyLinks))
    Render(MyLinks)
})