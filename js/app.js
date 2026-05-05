async function save() {
    const date = document.getElementById("date").value;
    const inTime = document.getElementById("in").value;
    const outTime = document.getElementById("out").value;
    const breakHr = parseFloat(document.getElementById("break").value) || 0;
    const ot = document.getElementById("ot").checked;
    const close = document.getElementById("close").checked;

    if (!date || !inTime || !outTime) {
        Swal.fire("กรุณากรอกข้อมูลให้ครบ", "", "warning");
        return;
    }

    // เรียกฟังก์ชันคำนวณจาก calc.js
    const c = calc(inTime, outTime, breakHr, ot, close);

    try {
        await saveEntry({ date, inTime, outTime, breakHr, ot, close, ...c });
        Swal.fire("บันทึกสำเร็จ!", "", "success");
        loadData(); // โหลดตารางใหม่
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาด", error.message, "error");
    }
}

async function loadData() {
    try {
        const data = await getEntries(); // เรียกจาก db.js
        if (typeof renderTable === 'function') {
            renderTable(data); // เรียกจาก ui.js
        }
    } catch (error) {
        console.error("LoadData Error:", error);
    }
}
// ในส่วนท้ายของไฟล์ app.js หรือใน DOMContentLoaded
window.onload = () => {
    renderTable([]); // แสดงตารางว่างๆ ทันที
    // จากนั้นค่อยเรียกโหลดข้อมูลจริงจาก Firebase
    loadData(); 
};
