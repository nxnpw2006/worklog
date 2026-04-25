const RATE = 60;

function calc(inTime, outTime, breakHr, ot, close) {
  let start = new Date(`2000-01-01T${inTime}`);
  let end = new Date(`2000-01-01T${outTime}`);

  let diff = (end - start) / 3600000;
  if (diff < 0) diff += 24;

  let hours = diff - breakHr;
  let income = hours * (ot ? RATE * 2 : RATE);
  let closePay = close ? 40 : 0;

  return {
    hours: hours.toFixed(2),
    total: income + closePay
  };
}
