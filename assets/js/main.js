main();

window.onresize = function(){
    document.body.height = window.innerHeight;
    console.log("onresize");
}
window.onresize(); // called to initially set the height.

window.onload = function () {
    
};

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

  document.body.height = window.innerHeight;
  console.log("resized");
}