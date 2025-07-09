import { ErrorLog } from "../entities/error-log.schema"
import { ErrorDto } from "./error-log.dto"

export function ToLogResponse(logerror: ErrorLog): ErrorDto  {
    const response: ErrorDto = {
        message: logerror.message,
        statusCode: logerror.statusCode,
        path: logerror.path,
        method: logerror.method,
        stack: logerror.stack,
        reason: logerror.reason,    
        createdAt: logerror.createdAt,
        updatedAt:logerror.updatedAt
    }
    return response
}