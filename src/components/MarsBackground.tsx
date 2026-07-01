'use client'

import { useEffect, useRef } from 'react'
import { useGraphics } from './GraphicsContext'

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `#version 300 es
precision highp float;
out vec4 frag;
uniform vec2 u_res;
uniform float u_time;

float hash(vec3 p){
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 x){
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 6; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }

float stars(vec2 uv){
  vec2 g = floor(uv * 240.0);
  float h = fract(sin(dot(g, vec2(127.1, 311.7))) * 43758.5453);
  return step(0.9965, h);
}

void main(){
  vec2 res = u_res;
  vec2 uv = (gl_FragCoord.xy * 2.0 - res) / res.y;

  vec2 center = vec2(0.74, 0.46);
  float R = 0.66;
  vec2 pc = uv - center;
  float d = length(pc);

  vec3 space = mix(vec3(0.04, 0.014, 0.01), vec3(0.10, 0.03, 0.018),
    1.0 - smoothstep(-0.7, 1.3, uv.y));
  space += vec3(0.20, 0.06, 0.03) *
    pow(max(0.0, 1.0 - length(uv - vec2(-0.7, 0.55)) / 1.7), 3.0) * 0.55;
  vec3 col = space;

  float tw = 0.6 + 0.4 * sin(u_time * 2.0 + uv.x * 40.0);
  col += stars(uv) * vec3(1.0, 0.86, 0.72) * tw *
    smoothstep(R * 1.02, R * 1.5, d);

  if(d < R){
    float z = sqrt(R * R - d * d);
    vec3 normal = normalize(vec3(pc, z));
    vec3 sp = rotX(0.28) * rotY(u_time * 0.028) * normal;

    float n = fbm(sp * 2.3);
    float detail = fbm(sp * 6.5);
    float craters = fbm(sp * 11.0);

    vec3 dark = vec3(0.30, 0.10, 0.05);
    vec3 mid = vec3(0.70, 0.27, 0.12);
    vec3 light = vec3(0.93, 0.52, 0.30);
    vec3 surf = mix(dark, mid, smoothstep(0.34, 0.58, n));
    surf = mix(surf, light, smoothstep(0.60, 0.82, n));
    surf *= 0.78 + 0.42 * detail;
    surf *= 0.85 + 0.30 * craters;

    float lat = abs(sp.y);
    surf = mix(surf, vec3(0.96, 0.92, 0.88), smoothstep(0.84, 0.97, lat) * 0.85);

    vec3 L = normalize(vec3(-0.55, 0.40, 0.72));
    float diff = clamp(dot(normal, L), 0.0, 1.0);
    vec3 planet = surf * (0.07 + diff * 1.2);
    planet += surf * pow(1.0 - diff, 3.0) * vec3(0.16, 0.04, 0.0);

    float rim = pow(1.0 - z / R, 2.2);
    planet += rim * vec3(1.0, 0.46, 0.2) * 0.7 * (0.4 + diff);

    float edge = smoothstep(R, R - 0.004, d);
    col = mix(col, planet, edge);
  }

  float halo = exp(-max(0.0, d - R) * 6.0) * 0.55;
  col += halo * vec3(1.0, 0.42, 0.18);

  col *= 1.0 - 0.32 * smoothstep(0.5, 1.7, length(uv));
  col = pow(max(col, 0.0), vec3(0.95));
  frag = vec4(col, 1.0);
}
`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  return sh
}

export default function MarsBackground() {
  const { mode } = useGraphics()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const glRef = useRef<WebGL2RenderingContext | null>(null)
  const uTimeRef = useRef<WebGLUniformLocation | null>(null)
  const startRef = useRef(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || initializedRef.current) return

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return

    initializedRef.current = true
    glRef.current = gl

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    uTimeRef.current = gl.getUniformLocation(prog, 'u_time')

    const pr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = Math.floor(window.innerWidth * pr)
      const h = Math.floor(window.innerHeight * pr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    startRef.current = performance.now()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  useEffect(() => {
    const gl = glRef.current
    if (!gl) return

    cancelAnimationFrame(rafRef.current)

    if (mode === 'quality') {
      const render = () => {
        gl.uniform1f(uTimeRef.current, (performance.now() - startRef.current) / 1000)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        rafRef.current = requestAnimationFrame(render)
      }
      rafRef.current = requestAnimationFrame(render)
    }
  }, [mode])

  const isQuality = mode === 'quality'

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden bg-[#0a0605]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ opacity: isQuality ? 1 : 0, transition: 'opacity 0.6s ease' }}
      />
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          opacity: isQuality ? 0 : 1,
          transition: 'opacity 0.6s ease',
          background: 'radial-gradient(ellipse 80% 70% at 65% 20%, #5c2417 0%, #2a0e07 45%, #0a0605 75%)',
        }}
      />
      <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(10,6,5,0.15),transparent_30%,rgba(10,6,5,0.35)_78%,#0a0605)]" />
    </div>
  )
}
