function renderTable(data) {
    const tableDiv = document.getElementById("table");
    if (!tableDiv) return;

    // ส่วนหัวสรุปและหัวตารางโชว์เสมอ
    let totalHours = 0;
    let totalJobIncome = 0;
    let totalExtra = 0;

    let rowsHtml = "";
    
    if (data.length === 0) {
        rowsHtml = `<tr><td colspan="7" style="padding: 40px; text-align:center; color: #999;">ยังไม่มีข้อมูลบันทึกในเดือนนี้</td></tr>`;
    } else {
        data.forEach(item => {
            totalHours += parseFloat(item.workHours || 0);
            totalJobIncome += (item.totalIncome - (item.extraPay || 0));
            totalExtra += parseFloat(item.extraPay || 0);

            // เพิ่มฟังก์ชันดึงไอคอน Lucide มาใช้ในตาราง
rowsHtml += `
    <tr style="border-bottom: 1px solid #eeeeee;">
        <td style="padding: 15px 10px;">${item.date.split('-').reverse().slice(0,2).join('/')}</td>
        <td style="padding: 15px 10px; text-align:center;">${item.inTime}-${item.outTime}</td>
        <td style="padding: 15px 10px; text-align:center;">${parseFloat(item.workHours).toFixed(2)}</td>
        <td style="padding: 15px 10px; text-align:center;">${item.ot ? '✓' : '-'}</td>
        <td style="padding: 15px 10px; text-align:center;">${item.close ? '✓' : '-'}</td>
        <td style="padding: 15px 10px; text-align:right; font-weight: 600;">฿${item.totalIncome}</td>
        <td style="padding: 15px 10px; text-align:right;">
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button onclick="editData('${item.id}', '${item.date}', '${item.inTime}', '${item.outTime}', '${item.breakHr}', ${item.ot}, ${item.close})" 
                        style="background:none; border:2px solid #000; cursor:pointer; padding:6px; border-radius:2px; display:flex; align-items:center;">
                    <i data-lucide="pencil" style="width:16px; height:16px; stroke-width:3px;"></i>
                </button>
                <button onclick="deleteData('${item.id}')" 
                        style="background:none; border:2px solid #000; cursor:pointer; padding:6px; border-radius:2px; display:flex; align-items:center;">
                    <i data-lucide="trash-2" style="width:16px; height:16px; stroke-width:3px;"></i>
                </button>
            </div>
        </td>
    </tr>
`;
        });
    }

    const netIncome = totalJobIncome + totalExtra;
    const tax = netIncome * 0.05;

    tableDiv.innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width:100%; border-collapse: collapse; color: #000;">
                <thead>
                    <tr style="border-bottom: 2px solid #000; font-size: 0.85rem; font-weight: 600;">
                        <th style="padding: 12px 10px; text-align:left;">วันที่</th>
                        <th style="padding: 12px 10px; text-align:center;">เวลา</th>
                        <th style="padding: 12px 10px; text-align:center;">ชม.</th>
                        <th style="padding: 12px 10px; text-align:center;">OT</th>
                        <th style="padding: 12px 10px; text-align:center;">ปิดร้าน</th>
                        <th style="padding: 12px 10px; text-align:right;">รายได้</th>
                        <th style="padding: 12px 10px; text-align:right;">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>

        <div style="margin-top: 30px; border: 3px solid #000; padding: 20px; background-color: #fcfcf4; box-shadow: 6px 6px 0px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-around; font-size: 0.85rem; margin-bottom: 15px; border-bottom: 1px dashed #000; padding-bottom: 15px;">
                <span>เวลารวม <b>${totalHours.toFixed(2)} ชม.</b></span>
                <span>งาน <b>฿${totalJobIncome}</b></span>
                <span>ปิดร้าน <b>฿${totalExtra}</b></span>
                <span>ภาษี 5% <b>-฿${tax.toFixed(0)}</b></span>
            </div>
            <div style="text-align: center;">
                <span style="font-size: 1.6rem; font-weight: 600; letter-spacing: 1px;">รวมสุทธิ ฿${(netIncome - tax).toLocaleString()}</span>
            </div>
        </div>
    `;

    // สั่งให้ Lucide เปลี่ยนไอคอน i เป็นรูปภาพ
    lucide.createIcons();
}
// ฟังก์ชันสำหรับโชว์แจ้งเตือนมุมขวาบน (Toast)
const showToast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: icon,
        title: title
    });
}
