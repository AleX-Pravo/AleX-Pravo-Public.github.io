function creepy()
{
  // Cross-browser support for requestAnimationFrame
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

    // Set-up the canvas
    var canvasContainer = document.getElementById( 'container-canvas' );
    var canvasWidth = canvasContainer.offsetWidth;
    var canvasHeight = canvasContainer.offsetHeight;
    canvasContainer.innerHTML = '<canvas id="canvas" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>';
    var canvas = document.getElementById( 'canvas' );
    var c = canvas.getContext('2d');
    var particles = [];
    var noOfParticles = 500;
    var maxParticleSize = 1;

    // Initial fill
    c.fillStyle = 'rgba( 255, 255, 255, 1 )';
    c.fillRect( 0, 0, canvasWidth, canvasHeight );

    function particle()
    {
      // Create a new particle
      var id = particles.length,
        x = canvasWidth / 2,
        y = canvasHeight / 2,
        vx = Math.random() * 10 - 5,
        vy = Math.random() * 10 - 5,
        size = Math.floor( ( Math.random() * maxParticleSize ) + 1 ),
        life = 0,
        death = Math.random() * 200 - 5;

      particles[particles.length] = { 'id':id, 'x':x, 'y':y, 'vx':vx, 'vy':vy, 'size':size, 'life': life, 'death': death };
    }

    function emitter()
    {
      // Update the particles
      for (i = 0; i < particles.length; i++)
      {
        //console.log( particles[i] );
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].life++;

        // Remove dead particles
        if( particles[i].life > particles[i].death )
        {
          particles.splice(i, 1);
        }
      }

      // Create new particles
      while ( particles.length < noOfParticles )
      {
        particle();
      }
    }

    function renderer()
    {
      c.fillStyle = 'rgba( 255, 255, 255, 0.6 )';

      for (i = 0; i < particles.length; i++)
      {
        c.fillStyle = 'rgba(120,0,255, 1)';
        c.fillRect(particles[i].x,particles[i].y,particles[i].size,particles[i].size);
      }
    }

    function main()
    {
      emitter();
      renderer();
      requestAnimationFrame(main);
    }

    main();
}

creepy();

//window.addEventListener( 'resize', creepy );
