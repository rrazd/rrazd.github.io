function initThree() {
  var container,
    scene,
    camera,
    renderer,
    centerX,
    centerY,
    sepHypot,
    width,
    height,
    sepX = 100,
    sepY = 100,
    cameraZMinInitial = 750,
    cameraZMin = cameraZMinInitial,
    cameraZRangeMinInitial = 550,
    cameraZRangeMin = cameraZMinInitial,
    cameraZRangeInitial = 400,
    cameraZRange = cameraZRangeInitial,
    cameraXYMax = 800,
    maxPoints = 100;

  function init() {
    container = document.getElementById('three-js-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    resize();
    createObjects();

    container.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x0000ff);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    render();
  }

  function createObjects(geometry) {
    var lineMaterial = new THREE.LineBasicMaterial({ color: 16777215, opacity: 0.5 }),
      geometry = new THREE.BufferGeometry();

    addVertices(geometry);
    scene.add(new THREE.Line(geometry, lineMaterial));
  }

  function addVertices(geometry) {
    var canvasMaterial = new THREE.SpriteCanvasMaterial({
      color: new THREE.Color(0xffffff),
      program: function(a) {
        a.beginPath();
        a.arc(0, 0, .5, 0, 2 * Math.PI, true);
        a.fill();
      }
    }),
      positions = new Float32Array(maxPoints * 3); // 3 vertices per point

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    for (var i = 0, l = maxPoints * 3; i < l;) {
        var vertex = createVertex(),
          sprite = new THREE.Sprite(canvasMaterial);

        positions[i++] = sprite.position.x = vertex.x;
        positions[i++] = sprite.position.y = vertex.y;
        positions[i++] = sprite.position.z = vertex.z;
        sprite.scale.x = sprite.scale.y = 5;

        scene.add(sprite);
    }
  }

  function createVertex() {
    var r = 450 + Math.random() * 10,
      theta = Math.random() * Math.PI,
      phi = Math.random() * 2 * Math.PI;

    return convertToCartesian(r, theta, phi);
  }

  function convertToCartesian(r, theta, phi) {
    return {
      x: r * Math.sin(theta) * Math.cos(phi),
      y: r * Math.sin(theta) * Math.sin(phi),
      z: r * Math.cos(theta)
    };
  }

  function render() {
    requestAnimationFrame(render);

    camera.position.x += .05 * (cameraXYMax * sepX / width - camera.position.x);
    camera.position.y += .05 * (-(cameraXYMax * sepY / height) - camera.position.y);

    var cameraZ = cameraZRangeMin + (hyp(sepX, sepY) / sepHypot) * cameraZRange;
    camera.position.z = Math.max(cameraZ, cameraZMin);

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function onMouseMove(event) {
    if (window.innerHeight < 560) return;

    sepX = event.clientX - centerX;
    sepY = event.clientY - centerY;
  }

  function resize() {
    var boundingRect = container.getBoundingClientRect();

    height = boundingRect.height;
    width = boundingRect.width;
    centerX = width / 2;
    centerY = height / 2;

    var scalingFactor = Math.min(height, width) / 800;

    if (Math.min(height, width) > 1200) {
      scalingFactor *= 0.5;
    }

    cameraZMin = cameraZMinInitial / scalingFactor;
    cameraZRangeMin = cameraZRangeMinInitial / scalingFactor;
    sepHypot = hyp(centerX, centerY);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function hyp(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  init();
}