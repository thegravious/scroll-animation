const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 100
};

let imageLoaded = 0;
const images = [];

preloader = () => {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./img/ezgif-frame-${i.toString().padStart("3" , "0")}.jpg`;  //edit the img name to change the img squence// 
        console.log(imageUrl)
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imageLoaded++;
            if (imageLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        };
        images.push(img);
    }
};

loadImage = (index) => {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);  // Fix here: use newWidth and newHeight
        frames.currentIndex = index;
    }
};

function startAnimation() {
    gsap.registerPlugin(ScrollTrigger);
    
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
            end: "bottom bottom",

        }
    });

    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
        }
    });
}

preloader();
