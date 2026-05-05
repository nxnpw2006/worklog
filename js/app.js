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

    const c = calc(inTime, outTime, breakHr, ot, close);

    try {
        await saveEntry({ date, inTime, outTime, breakHr, ot, close, ...c });
        Swal.fire("บันทึกสำเร็จ!", "", "success");
        loadData(); 
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาด", error.message, "error");
    }
}

// แก้ไขจุดที่ปีกกาเกินตรงนี้ครับ
async function loadData() {
    try {
        const data = await getEntries(); 
        console.log("Data retrieved:", data);
        renderTable(data); // เพิ่มบรรทัดนี้เพื่อให้ข้อมูลแสดงในตาราง
    } catch (error) {
        console.error("LoadData Error:", error);
    }
}

window.onload = () => {
    renderTable([]); 
    loadData(); 
};

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
            await deleteEntry(id); 
            Swal.fire('ลบแล้ว!', '', 'success');
            loadData(); 
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', error.message, 'error');
        }
    }
}

let currentEditId = null; 

function editData(id, date, inTime, outTime, breakHr, ot, close) {
    document.getElementById("date").value = date;
    document.getElementById("in").value = inTime;
    document.getElementById("out").value = outTime;
    document.getElementById("break").value = breakHr;
    
    // แปลงสถานะเพื่อให้ปุ่ม Toggle ทำงานถูกต้อง
    const otBtn = document.querySelector(`[onclick*="setToggle('ot', ${ot}"]`);
    const closeBtn = document.querySelector(`[onclick*="setToggle('close', ${close}"]`);
    if(otBtn) otBtn.click();
    if(closeBtn) closeBtn.click();

    currentEditId = id;
    const mainBtn = document.querySelector(".btn-main");
    mainBtn.innerText = "ยืนยันการแก้ไขข้อมูล";
    mainBtn.style.backgroundColor = "#2ecc71"; 
    mainBtn.onclick = confirmUpdate;
    
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
