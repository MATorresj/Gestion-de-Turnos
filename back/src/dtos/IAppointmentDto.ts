interface IAppointmentDto {
    date: string,
    time: string,
    status: "active" | "canceled",
    userId: number
}

export default IAppointmentDto;