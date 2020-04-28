let mobileNet;
let predictionImage;
let dataStr;
let labelP;
let prob;
let inp;

function modelReady() {
    mobileNet.predict(predictionImage, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        labelP.remove();
        dataStr = error;
        labelP = createP(dataStr);
    } else {
        label = cutLongString(results[0].label);
        prob = '~' + Math.floor(results[0].confidence * 100) + '%';
        labelP.remove();
        dataStr = `${label} ${prob}`;
        labelP = createP(dataStr);
        labelP.style('font-size', '18px');
    }
}

function cutLongString(str) {
    let shortStr = str.slice(0, str.indexOf(','));
    return shortStr;
}

function imageReady() {
    image(predictionImage, 0, 0, width, height)
}

function myInputEvent() {
    predictionImage = createImg(this.value(), imageReady);
    predictionImage.hide();
    if (!inp.input.value) {
        if (labelP) {
            labelP.remove();
        }
        dataStr = '';
        labelP = createP(dataStr);
    }

    if (!dataStr) {
        if (labelP) {
            labelP.remove();
        }
        dataStr = 'Please wait a minute';
        labelP = createP(dataStr);
    }

    mobileNet = ml5.imageClassifier('MobileNet', modelReady)
}

function setup() {
    createCanvas(640, 400);
    background(220);
    inp = createInput('').attribute('placeholder', 'Paste image url here');;
    inp.size(width - 4, 20);
    inp.input(myInputEvent);
}