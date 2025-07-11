
## 🧠 Purpose

To provide a centralized and consistent way of capturing runtime exceptions throughout the application — whether they are user-facing or internal — and persist them for debugging, monitoring, or auditing purposes.

This helps:
- Track down issues quickly by analyzing logs.
- Monitor error frequency and trends.
- Debug unhandled or edge-case bugs.


## How to use it

-- Copy error-log folder and paste in module section

-- Add ErrorLog Module to the Imports array of app.module.ts

import { ErrorLog } from './error-log/entities/error-log.schema';
@Module({
  imports: [
    ErrorLogModule


-- Add this code to main.ts

import { ErrorLogService } from './error-log/error-log.service';
import { ErrorLogFilter } from './error-log/error-log.filter';
const errorLogsService = app.get(ErrorLogService);
app.useGlobalFilters(new ErrorLogFilter(errorLogsService)); 