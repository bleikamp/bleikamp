import React, { useEffect, useRef } from 'react';
import GlslCanvas from 'glslCanvas';

const fragmentShader = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Simplex noise functions
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626, // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec2 x1 = x0.xy + C.xx - i1;
  vec2 x2 = x0.xy + C.zz;

  i = mod289(i);
  vec3 p = permute(permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  m = m*m;
  m = m*m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x1.xy + h.yz * x1.yx;
  g.z  = a0.z  * x2.x  + h.z  * x2.y;

  return 130.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    // Scale the coordinates
    vec2 pos = vec2(st * 1.0);

    // Use the noise function
    float n = snoise(pos - u_time * 0.05);

    // Create a base color
    vec3 color = mix(
      vec3(0.9, mouse.y * 0.5, clamp(mouse.x*0.75, 1., 0.0)),
      vec3(0.5, mouse.y * 1., clamp(mouse.x*0.1, 0.1, 0.5)),
      smoothstep(0.0, 1.0, mouse.x * mouse.y)
    );

    // Blend with white for a watercolor effect
    color = mix(color, vec3(0.2), n * 0.5 + 1.);

    // Add some noise for texture
    float grain = snoise(st * 500.0 + u_time * 1.0);
    color = color + grain * 0.05;

    // Clamp the colors to avoid out-of-range values
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 0.01);
}
`;

const ShaderBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const sandbox = new GlslCanvas(canvas);
        sandbox.load(fragmentShader);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            sandbox.setUniform('u_resolution', [canvas.width, canvas.height]);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return <canvas ref={canvasRef} id="shaderCanvas" className="fixed inset-0 w-full h-full z-0"></canvas>;
};

export default ShaderBackground;