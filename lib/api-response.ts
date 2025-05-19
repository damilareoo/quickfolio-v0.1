import { type NextRequest, NextResponse } from "next/server"

export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = "ApiError"
  }
}

type ApiHandler<T = any> = (req: NextRequest, params?: { [key: string]: string }) => Promise<T>

/**
 * Wrapper for API route handlers to standardize error handling and responses
 */
export function handleApiRoute<T>(handler: ApiHandler<T>) {
  return async (req: NextRequest, { params }: { params?: { [key: string]: string } } = {}) => {
    try {
      const result = await handler(req, params)

      return NextResponse.json({
        success: true,
        data: result,
      })
    } catch (error) {
      console.error("API error:", error)

      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: error.statusCode },
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: "Internal server error",
        },
        { status: 500 },
      )
    }
  }
}
