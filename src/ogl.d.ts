declare module 'ogl' {
    export class Renderer {
        gl: any
        constructor(options?: any)
        setSize(width: number, height: number): void
        render(options: { scene: any }): void
    }
    export class Program {
        uniforms: any
        constructor(gl: any, options?: any)
    }
    export class Mesh {
        constructor(gl: any, options?: any)
    }
    export class Color {
        r: number
        g: number
        b: number
        constructor(hex?: string)
    }
    export class Triangle {
        attributes: any
        constructor(gl: any)
    }
}
