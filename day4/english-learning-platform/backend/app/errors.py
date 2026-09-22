from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("elp.errors")


class AppError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code


async def http_exception_handler(request: Request, exc: AppError):
    logger.error("AppError: %s path=%s", exc.message, request.url.path)
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})


async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception at %s: %s", request.url.path, str(exc))
    return JSONResponse(status_code=500, content={"detail": "internal_server_error"})
