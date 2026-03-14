const folders = [
"childhood",
"youth",
"twenties",
"work",
"second-marriage",
"paintings",
"last-years"
]

const gallery = document.getElementById("gallery")

folders.forEach(folder=>{

for(let i=1;i<=40;i++){

const img=document.createElement("img")

img.src=`images/gallery/${folder}/${folder}-${String(i).padStart(2,"0")}.jpg`

img.onerror=()=>img.remove()

img.onclick=()=>openLightbox(img.src)

gallery.appendChild(img)

}

})

function openLightbox(src){

const box=document.getElementById("lightbox")

const img=document.getElementById("lightbox-img")

img.src=src

box.style.display="flex"

box.onclick=()=>box.style.display="none"

}
