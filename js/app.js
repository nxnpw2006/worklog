// --- ส่วนการบันทึกข้อมูล ---
async function save() {
    const date = document.getElementById("date").value;
    const inTime = document.getElementById("in").value;
    const outTime = document.getElementById("out").value;
    const breakHr = parseFloat(document.getElementById("break").value) || 0;
    const ot = document.getElementById("ot").checked;
    const close = document.getElementById("close").checked;

    if (!date || !inTime || !outTime) {
        // ใช้ Swal แบบ Popup สำหรับเตือนให้กรอกข้อมูล (ตามรูป image_042ed2.png)
        Swal.fire({
            title: 'ลืมกรอกข้อมูลหรือเปล่า?',
            text: "เช็ควันที่และเวลาอีกทีนะ!",
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#7066e0'
        });
        return;
    }

    const c = calc(inTime, outTime, breakHr, ot, close);

    try {
        await saveEntry({ date, inTime, outTime, breakHr, ot, close, ...c });
        showToast("บันทึกข้อมูลสำเร็จแล้วจ้า!"); // แจ้งเตือนแบบ Toast
        loadData();
    } catch (error) {
        console.error(error);
        showToast("เกิดข้อผิดพลาด", "error");
    }
}

// --- ส่วนการลบข้อมูล ---
async function deleteData(id) {
    const result = await Swal.fire({
        title: 'จะลบจริงๆ เหรอ?',
        text: "ลบแล้วกู้คืนไม่ได้น้า!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#000',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'ลบเลย',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        try {
            await deleteEntry(id);
            showToast("ลบข้อมูลเรียบร้อยแล้ว!"); // แจ้งเตือนแบบ Toast
            loadData();
        } catch (error) {
            showToast("ลบไม่สำเร็จ", "error");
        }
    }
}

// --- ส่วนการแก้ไขข้อมูล (ยืนยัน) ---
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
        
        // คืนค่าปุ่ม
        const mainBtn = document.querySelector(".btn-main");
        mainBtn.innerText = "บันทึกข้อมูลวันนี้";
        mainBtn.style.backgroundColor = ""; 
        mainBtn.onclick = save;
        currentEditId = null;

        showToast("อัปเดตข้อมูลให้แล้วนะ!"); // แจ้งเตือนแบบ Toast
        loadData();
    } catch (error) {
        showToast("แก้ไขไม่สำเร็จ", "error");
    }
}
