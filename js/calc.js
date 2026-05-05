function calc(timeIn, timeOut, breakHr, isOT, isClose) {
    const start = new Date(`2000-01-01T${timeIn}`);
    let end = new Date(`2000-01-01T${timeOut}`);
    
    if (end < start) end.setDate(end.getDate() + 1);
    
    let diff = (end - start) / (1000 * 60 * 60);
    const workHours = Math.max(0, diff - breakHr);
    
    const rate = 60;
    const multiplier = isOT ? 2 : 1;
    const income = workHours * rate * multiplier;
    const extra = isClose ? 40 : 0;
    
    return {
        workHours: workHours.toFixed(2),
        totalIncome: income + extra,
        extraPay: extra
    };
}
