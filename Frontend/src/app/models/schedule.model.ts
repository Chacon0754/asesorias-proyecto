export interface DaySchedule {
    [time: string]: boolean;
}

export interface Schedule {
    lunes?: DaySchedule;
    martes?: DaySchedule;
    miercoles?: DaySchedule;
    jueves?: DaySchedule;
    viernes?: DaySchedule;
}