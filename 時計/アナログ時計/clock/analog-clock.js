// アナログ時計の針を回転させるスクリプト
function updateAnalogClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    // 角度計算
    const hourAngle = ((h % 12) + m / 60) * 30; // 360/12
    const minuteAngle = (m + s / 60) * 6; // 360/60
    const secondAngle = s * 6; // 360/60

    document.getElementById('hour-hand').style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    document.getElementById('minute-hand').style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    document.getElementById('second-hand').style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
}

setInterval(updateAnalogClock, 1000);
window.addEventListener('DOMContentLoaded', updateAnalogClock);
