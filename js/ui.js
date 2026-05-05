function renderTable(data) {
    const tableDiv = document.getElementById("table");
    if (!tableDiv) return;

    if (data.length === 0) {
        tableDiv.innerHTML = "<p style='text-align:center;'>ยังไม่มีข้อมูลบันทึก</p>";
        return;
    }

    let html = `
        <table style="width:100%; border-collapse: collapse; margin-top:10px;">
            <thead>
                <tr style="border-bottom: 2px solid var(--border-color);">
                    <th style="padding:10px; text-align:left;">วันที่</th>
                    <th style="padding:10px; text-align:center;">เข้า-ออก</th>
                    <th style="padding:10px; text-align:right;">ชั่วโมงงาน</th>
                    <th style="padding:10px; text-align:right;">รายได้</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(item => {
        html += `
            <tr style="border-bottom: 1px solid var(--shadow-color);">
                <td style="padding:10px;">${item.date}</td>
                <td style="padding:10px; text-align:center;">${item.inTime} - ${item.outTime}</td>
                <td style="padding:10px; text-align:right;">${item.workHours} ชม.</td>
                <td style="padding:10px; text-align:right; font-weight:600;">${item.totalIncome} .-</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    tableDiv.innerHTML = html;
}
