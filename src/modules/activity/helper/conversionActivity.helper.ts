import { ActivitySchema } from "../../../schema/activity-Schema";
import { ActivityResponseDto } from "../dto/updateResponse";

export function ToUpdateActivityResponse(updateActivity: ActivitySchema) {
    const response: ActivityResponseDto = {
        userID: updateActivity.userID,
        action: updateActivity.action,
        description: updateActivity.description,
        previousData:updateActivity.previousData,
        updatedData: updateActivity.updatedData,
    }
    return response
}