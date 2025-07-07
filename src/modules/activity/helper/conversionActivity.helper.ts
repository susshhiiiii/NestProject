import { UpdatedActivitySchema } from "../activity-Schema";
import { UpdateActivityDto } from "../dto/update.dto";
import { UpdateActivityResponseDto } from "../dto/updateResponse";

export function ToUpdateActivityResponse(updateActivity:UpdatedActivitySchema) {
    const response: UpdateActivityResponseDto = {
        userID: updateActivity.userID,
        action: updateActivity.action,
        description: updateActivity.description,
        previousData:updateActivity.previousData,
        updatedData: updateActivity.updatedData,
        updatedAt:updateActivity.updatedAt
    }
    return response
}