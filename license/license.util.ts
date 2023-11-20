export const getStatusFromEndDate = (endDate?: Date) => !endDate || new Date() <= new Date(endDate)
