var container, stats;
var camera, scene, renderer;
var group;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = document.getElementById('canvas-container').offsetWidth / 2;
var windowHalfY = document.getElementById('canvas-container').offsetHeight / 2;
var windowX = windowHalfX * 2;
var windowY = windowHalfY * 2;

init();
animate();

function init() {
    container = document.getElementById('canvas-container');
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 150, 500 );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    group = new THREE.Group();
    group.position.y = 50;
    scene.add( group );

    // NURBS curve
    var nurbsControlPoints = [];
    var nurbsKnots = [];
    var nurbsDegree = 3;
    for ( var i = 0; i <= nurbsDegree; i ++ ) {
        nurbsKnots.push( 0 );
    }
    for ( var i = 0, j = 20; i < j; i ++ ) {
        nurbsControlPoints.push(
            new THREE.Vector4(
                Math.random() * 400 - 200,
                Math.random() * 400,
                Math.random() * 400 - 200,
                1 // weight of control point: higher means stronger attraction
            )
        );
        var knot = ( i + 1 ) / ( j - nurbsDegree );
        nurbsKnots.push( THREE.Math.clamp( knot, 0, 1 ) );
    }

    var nurbsCurve = new THREE.NURBSCurve( nurbsDegree, nurbsKnots, nurbsControlPoints );
    var nurbsGeometry = new THREE.BufferGeometry();
    nurbsGeometry.setFromPoints( nurbsCurve.getPoints( 200 ) );
    var nurbsMaterial = new THREE.LineBasicMaterial( { linewidth: 5, color: 0xFFFFFF } );
    var nurbsLine = new THREE.Line( nurbsGeometry, nurbsMaterial );
    nurbsLine.position.set( 0, - 100, 0 );
    group.add( nurbsLine );
    var nurbsControlPointsGeometry = new THREE.BufferGeometry();
    nurbsControlPointsGeometry.setFromPoints( nurbsCurve.controlPoints );
    var nurbsControlPointsMaterial = new THREE.LineBasicMaterial( { linewidth: 2, color: 0x777777, opacity: 0.0 } ); // CONTROL POINTS
    var nurbsControlPointsLine = new THREE.Line( nurbsControlPointsGeometry, nurbsControlPointsMaterial );
    nurbsControlPointsLine.position.copy( nurbsLine.position );
    group.add( nurbsControlPointsLine );

    //
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.setSize( document.getElementById('canvas-container').offsetWidth, document.getElementById('canvas-container').offsetHeight );

    container.appendChild( renderer.domElement );
    stats = new Stats();
    //container.appendChild( stats.dom );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//
function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}

function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }
}

//
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}

function render() {
    group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
    renderer.render( scene, camera );
}
