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
        console.log("Data retrieved:", data);// เรียกจาก ui.js
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
// --- ระบบลบข้อมูล ---
async function deleteData(id) {
    const result = await Swal.fire({
        title: 'ยืนยันการลบ?',
        text: "ข้อมูลนี้จะหายไปถาวรนะ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ลบเลย',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        try {
            await deleteEntry(id); // เรียกจาก db.js
            Swal.fire('ลบแล้ว!', '', 'success');
            loadData(); // โหลดตารางใหม่
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', error.message, 'error');
        }
    }
}

// --- ระบบแก้ไขข้อมูล ---
let currentEditId = null; // เก็บ ID ที่กำลังแก้ไข

function editData(id, date, inTime, outTime, breakHr, ot, close) {
    // 1. ดึงข้อมูลจากตารางขึ้นไปใส่ใน Form ด้านบน
    document.getElementById("date").value = date;
    document.getElementById("in").value = inTime;
    document.getElementById("out").value = outTime;
    document.getElementById("break").value = breakHr;
    
    // 2. ปรับปุ่ม Toggle OT และ ปิดร้าน
    // (ฟังก์ชัน setToggle ต้องมีอยู่ในหน้า HTML ตามที่เคยเขียนให้)
    const otBtn = document.querySelector(`[onclick*="setToggle('ot', ${ot}"]`);
    const closeBtn = document.querySelector(`[onclick*="setToggle('close', ${close}"]`);
    if(otBtn) otBtn.click();
    if(closeBtn) closeBtn.click();

    // 3. เปลี่ยนปุ่ม "บันทึก" เป็น "ยืนยันการแก้ไข"
    currentEditId = id;
    const mainBtn = document.querySelector(".btn-main");
    mainBtn.innerText = "ยืนยันการแก้ไขข้อมูล";
    mainBtn.style.backgroundColor = "#2ecc71"; // เปลี่ยนเป็นสีเขียวชั่วคราว
    mainBtn.onclick = confirmUpdate;
    
    // เลื่อนหน้าจอขึ้นไปที่ฟอร์ม
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function confirmUpdate() {
    const date = document.getElementById("date").value;
    const inTime = document.getElementById("in").value;
    const outTime = document.getElementById("out").value;
    const breakHr = parseFloat(document.getElementById("break").value) || 0;
    const ot = document.getElementById("ot").checked;
    const close = document.getElementById("close").checked;

    const c = calc(inTime, outTime, breakHr, ot, close);

    try {
        await updateEntry(currentEditId, { date, inTime, outTime, breakHr, ot, close, ...c });
        
        // คืนค่าปุ่มบันทึกกลับเป็นปกติ
        const mainBtn = document.querySelector(".btn-main");
        mainBtn.innerText = "บันทึกข้อมูลวันนี้";
        mainBtn.style.backgroundColor = ""; 
        mainBtn.onclick = save;
        currentEditId = null;

        Swal.fire("แก้ไขสำเร็จ!", "", "success");
        loadData();
    } catch (error) {
        Swal.fire("ผิดพลาด", error.message, "error");
    }
}
