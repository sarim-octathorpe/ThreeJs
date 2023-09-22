import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


const textureloader = new THREE.TextureLoader()
const pic2 = textureloader.load('./tileimage.jpg')

const colourchanger = {
    color: 0xff0000,
}


//change colour of tile
gui
    .addColor(colourchanger,'color')
    .onChange(()=>{
        Material.color.set(colourchanger.color)
    })
    .name('Change Colour')


const canvas = document.querySelector('canvas.webgl')
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (Event) =>{
    cursor.x = Event.clientX / sizes.width - 0.5
    cursor.y = Event.clientY / sizes.height - 0.5
})
    
    
const scene = new THREE.Scene()
    

const Material = new THREE.MeshBasicMaterial({ map: pic2})
Material.side = THREE.DoubleSide
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(4,4),
    Material
)    
scene.add(plane)
    
const sizes ={
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth,
	sizes.height = window.innerHeight

    //camera update
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer 
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick',() =>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }
        else if(canvas.webkitFullscreenElement){
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen){
            document.exitFullscreen()
        }
        
    }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height )

camera.position.x = 0
camera.position.y = 1
camera.position.z = 3
scene.add(camera)


//controls
const controls = new  OrbitControls(camera, canvas)
controls.enableDamping = true

console.log(canvas)
const renderer = new THREE.WebGLRenderer({	
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

const clock = new THREE.Clock()
const tick = () =>{
    const timegone = clock.getElapsedTime()
    plane.rotation.y = 0.1 * timegone
    plane.rotation.x = 0.2 * timegone
    
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()