function initTopnav() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) {
    console.log('Canvas not found');
    return;
  }
  
  console.log('Initializing topnav animation');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    console.log('Canvas size:', canvas.width, canvas.height);
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const nodeCount = 12;
  const nodes = [];
  const edges = [];
  
  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });
  }
  
  // Create edges
  for (let i = 0; i < nodeCount; i++) {
    const connections = Math.floor(Math.random() * 3) + 2;
    for (let j = 0; j < connections; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i) {
        edges.push([i, target]);
      }
    }
  }
  
  function animate() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    });
    
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
    ctx.lineWidth = 1;
    edges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    });
    
    ctx.fillStyle = 'rgba(100, 150, 255, 0.6)';
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Try to initialize on load, or wait for manual call
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTopnav);
} else {
  // If DOM already loaded, check if canvas exists, otherwise wait a bit
  setTimeout(initTopnav, 100);
}
