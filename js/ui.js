function renderTable(data) {
    const tableDiv = document.getElementById("table");
    if (!tableDiv) return;

    if (data.length === 0) {
        tableDiv.innerHTML = "<p style='text-align:center; padding: 20px;'>ยังไม่มีข้อมูลบันทึกในเดือนนี้</p>";
        return;
    }

    // คำนวณผลรวมทั้งหมด
    let totalHours = 0;
    let totalJobIncome = 0;
    let totalExtra = 0;

    let rowsHtml = "";
    data.forEach(item => {
        totalHours += parseFloat(item.workHours || 0);
        totalJobIncome += (item.totalIncome - (item.extraPay || 0));
        totalExtra += parseFloat(item.extraPay || 0);

        rowsHtml += `
            <tr style="border-bottom: 1px solid #eeeeee; font-size: 0.9rem;">
                <td style="padding: 20px 10px;">${item.date.split('-').reverse().slice(0,2).join('/')}</td>
                <td style="padding: 20px 10px; text-align:center;">${item.inTime}-${item.outTime}</td>
                <td style="padding: 20px 10px; text-align:center;">${parseFloat(item.workHours).toFixed(2)}</td>
                <td style="padding: 20px 10px; text-align:center;">${item.ot ? '✓' : '-'}</td>
                <td style="padding: 20px 10px; text-align:center;">${item.close ? '✓' : '-'}</td>
                <td style="padding: 20px 10px; text-align:right; font-weight: 600;">฿${item.totalIncome}</td>
                <td style="padding: 20px 10px; text-align:right;">
                    <button onclick="deleteData('${item.id}')" style="background:none; border:1px solid #000; cursor:pointer; padding:2px 5px; border-radius:2px;">🗑️</button>
                </td>
            </tr>
        `;
    });

    const netIncome = totalJobIncome + totalExtra;
    const tax = netIncome * 0.05;

    tableDiv.innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width:100%; border-collapse: collapse; color: #333;">
                <thead>
                    <tr style="border-bottom: 2px solid #000; font-size: 0.8rem; text-transform: uppercase;">
                        <th style="padding: 10px; text-align:left;">วันที่</th>
                        <th style="padding: 10px;">เวลา</th>
                        <th style="padding: 10px;">ชม.</th>
                        <th style="padding: 10px;">OT</th>
                        <th style="padding: 10px;">ปิดร้าน</th>
                        <th style="padding: 10px; text-align:right;">รายได้</th>
                        <th style="padding: 10px; text-align:right;">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>

        <div style="margin-top: 30px; border: 2px solid #000; padding: 20px; background-color: #fcfcf4; border-radius: 2px;">
            <div style="display: flex; justify-content: space-around; font-size: 0.85rem; margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
                <span>เวลารวม <b>${totalHours.toFixed(2)} ชม.</b></span>
                <span>งาน <b>฿${totalJobIncome}</b></span>
                <span>ปิดร้าน <b>฿${totalExtra}</b></span>
                <span>ภาษี 5% <b>-฿${tax.toFixed(0)}</b></span>
            </div>
            <div style="text-align: center;">
                <span style="font-size: 1.5rem; font-weight: 600;">รวมสุทธิ ฿${(netIncome - tax).toLocaleString()}</span>
            </div>
        </div>
    `;
}

// เพิ่มฟังก์ชันลบข้อมูล (ให้เอาไปใส่ใน js/db.js หรือ js/app.js ก็ได้)
async function deleteData(id) {
    if (confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
        try {
            await dbStore.collection("worklogs").doc(id).delete();
            Swal.fire("ลบสำเร็จ", "", "success");
            loadData(); 
        } catch (e) {
            console.error(e);
        }
    }
}
