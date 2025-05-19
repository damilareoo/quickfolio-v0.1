"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface ShaderBackgroundProps {
  className?: string
}

export function ShaderBackground({ className }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [programInfo, setProgramInfo] = useState<any>(null)
  const [buffers, setBuffers] = useState<any>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    const isDark = theme === "dark"

    // Resize canvas to match device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1
    const width = canvas.clientWidth * pixelRatio
    const height = canvas.clientHeight * pixelRatio
    canvas.width = width
    canvas.height = height

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `

    // Fragment shader program
    const fsSource = `
      precision mediump float;
      varying highp vec2 vTextureCoord;
      uniform float uTime;
      
      void main(void) {
        vec2 uv = vTextureCoord;
        
        // Create a subtle gradient background
        vec3 bgColor = ${isDark ? "vec3(0.08, 0.08, 0.12)" : "vec3(0.98, 0.98, 0.99)"};
          
        // Add noise pattern
        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233) * uTime * 0.05)) * 43758.5453);
        noise = noise * 0.02;
        
        // Add subtle wave effect
        float wave = sin(uv.x * 10.0 + uTime * 0.2) * sin(uv.y * 10.0 + uTime * 0.2) * 0.01;
        
        // Combine effects
        vec3 color = bgColor + noise + wave;
        
        gl_FragColor = vec4(color, 0.3);
      }
    `

    // Initialize shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    if (!shaderProgram) return

    setProgramInfo({
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniformLocations: {
        time: gl.getUniformLocation(shaderProgram, "uTime"),
      },
    })

    // Create buffers
    const buffers = initBuffers(gl)
    setBuffers(buffers)

    // Initialize shader program
    function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

      if (!vertexShader || !fragmentShader) return null

      // Create the shader program
      const shaderProgram = gl.createProgram()
      if (!shaderProgram) return null

      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragmentShader)
      gl.linkProgram(shaderProgram)

      // Check if creating the shader program succeeded
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram))
        return null
      }

      return shaderProgram
    }

    // Load shader
    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null

      // Send the source to the shader object
      gl.shaderSource(shader, source)

      // Compile the shader program
      gl.compileShader(shader)

      // Check if it compiled successfully
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    // Initialize buffers
    function initBuffers(gl: WebGLRenderingContext) {
      // Create position buffer
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      // Positions for a full-screen quad
      const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

      // Create texture coordinate buffer
      const textureCoordBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer)

      // Texture coordinates for the quad
      const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW)

      return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
      }
    }

    return () => {
      // Cleanup
      if (gl && shaderProgram) {
        gl.deleteProgram(shaderProgram)
      }
    }
  }, [theme]) // Only re-run when theme changes

  const renderRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !programInfo || !buffers) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    let then = 0

    // Render loop
    function render(now: number) {
      now *= 0.001 // Convert to seconds
      const deltaTime = now - then
      then = now

      drawScene(gl, programInfo, buffers, now)

      renderRef.current = requestAnimationFrame(render)
    }

    renderRef.current = requestAnimationFrame(render)

    return () => {
      if (renderRef.current) {
        cancelAnimationFrame(renderRef.current)
      }
    }
  }, [programInfo, buffers])

  // Draw the scene
  function drawScene(gl: WebGLRenderingContext, programInfo: any, buffers: any, time: number) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Set the shader program
    gl.useProgram(programInfo.program)

    // Set the time uniform
    gl.uniform1f(programInfo.uniformLocations.time, time)

    // Set position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      2, // 2 components per vertex
      gl.FLOAT, // the data is 32bit floats
      false, // don't normalize
      0, // stride
      0, // offset
    )
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

    // Set texture coordinate attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord)
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      2, // 2 components per vertex
      gl.FLOAT, // the data is 32bit floats
      false, // don't normalize
      0, // stride
      0, // offset
    )
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord)

    // Draw the quad
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: -1 }}
    />
  )
}
