main();

function main() {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onresize = function(){
    
}

window.onresize(); // called to initially set the height.

window.onload = function () {
    document.body.style.height = window.innerHeight - 44 + 'px';
    console.log(document.body.style.height);
};