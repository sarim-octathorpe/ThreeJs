import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

const parameters = {
    color: 0xff0000,
    tiletype: 0xffffff,
    paint: 0xffffff,
    paint2: 0xffffff,
    spin: () =>{
        gsap.to(cube1.rotation, {duration: 1, x: cube1.rotation.x+5, y: cube1.rotation.y+10})
    }
}

//cube UI
gui
    .addColor(parameters,'color')
    .onChange(()=>{
        Material.color.set(parameters.color)
    })
    .name('Cube Colour')


//Wall UI
gui
    .addColor(parameters, 'paint2')
    .onChange(()=>{
        wallpaint2.color.set(parameters.paint2)

    })
    .name('2nd paint')

gui 
    .addColor(parameters,'paint')
    .onChange(()=>{
        wallpaint.color.set(parameters.paint)
    })
    .name('Wall Colour')

gui
    .add(parameters, 'spin')



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


// const buildings = new THREE.Group()
// const celestials = new THREE.Group()
// buildings.scale.y=1
// buildings.rotation.y=1
// scene.add(buildings)
// scene.add(celestials)


//Setting Floor
// const FloorLayout = new THREE.PlaneBufferGeometry(5,5)
// const Tile = new THREE.MeshBasicMaterial({color: parameters.tiletype})
// const Floor = new THREE.Mesh(FloorLayout,Tile)
// Walls.add(Floor)
var layout = new THREE.PlaneBufferGeometry(5, 5, 8, 8)
var wallpaint = new THREE.MeshBasicMaterial({ color: parameters.paint})
var wallpaint2 = new THREE.MeshBasicMaterial({ color: parameters.paint2})
var wall1 = new THREE.Mesh(layout, wallpaint)
var wall2 = new THREE.Mesh(layout,wallpaint2)
wall1.position.set(2,2,4)
wall2.position.set(0,0,0)
scene.add(wall1)
scene.add(wall2)
wall2.rotateX( - Math.PI / 2);

const geometry = new THREE.BoxBufferGeometry(1,1,1)
const Material = new THREE.MeshBasicMaterial({ color: parameters.color })
const cube1 = new THREE.Mesh(geometry, Material)
cube1.position.y = 1
scene.add(cube1)
// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 'red'})
// )
// scene.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 'silver'})
// )
// cube2.position.x=-2
// // buildings.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({ color: 'grey'})
// )
// cube3.position.x=2
// buildings.add(cube3)

// const moon = new THREE.Mesh(
//     new THREE.CircleGeometry(1,32),
//     new THREE.MeshBasicMaterial({color: 'white'})
// )
// moon.position.y = 3
// moon.position.x = 4
// scene.add(moon)

// const sun = new THREE.Mesh(
//     new THREE.CircleGeometry(1,32),
//     new THREE.MeshBasicMaterial({color: 'cyan'})
// )
// sun.position.y = 3
// sun.position.x = -4
// celestials.add(sun)

// const MyCube = new THREE.BoxGeometry(1, 1, 1)
// const CubeType = new THREE.MeshBasicMaterial({color: 'red'})
// const Mesh = new THREE.Mesh(MyCube, CubeType)
// scene.add(Mesh)

//Wall Position
gui
    .add(wall1.position, 'y')
        .min(-2)
        .max(3)
        .step(0.1)
        .name('wall 1 position')
        

gui
    .add(wall1.position,'x')
    .min(-2)
    .max(2)
    .step(0.1)
    .name('wall 1 also')


//gui 
////position cube
gui
    .add(cube1.position, 'y')
        .min(-2)
        .max(2)
        .step(0.1)
        .name('elevation')
        

gui
    .add(cube1.position,'x')
    .min(-2)
    .max(2)
    .step(0.1)
    .name('path')    



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

// const camera = new THREE.OrthographicCamera(1,-1,-1,1,0.1,100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 3
// camera.lookAt(moon.position)
camera.lookAt(cube1.position)
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
// gsap.to(celestials.position,  {duration:4, delay: 1, y:-6})
// gsap.to(celestials.position,  {duration:4, delay: 5, y:0})

renderer.render(scene, camera)

// const clock = new THREE.Clock()

// let time = Date.now()

const tick = () =>{
    // const currtime = Date.now()
    // const timechange = currtime-time
    // time=currtime
    // const timegone = clock.getElapsedTime()
    // celestials.position.x = Math.sin(1) 
    // buildings.rotation.x+=0.1
    // buildings.rotation.y+=0.01
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}

tick()