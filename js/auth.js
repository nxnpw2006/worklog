<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worklog - B&W Border Edition</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        :root {
            --bg-color: #FFFFFF;
            --card-bg-color: #FFFFFF;
            --text-color: #000000;
            --border-color: #000000;
            --shadow-color: rgba(0,0,0,0.1);
            --input-bg: #FFFFFF;
            --sketch-border: 2px solid var(--border-color);
            --sketch-border-thick: 3px solid var(--border-color);
        }

        [data-theme="dark"] {
            --bg-color: #121212;
            --card-bg-color: #1E1E1E;
            --text-color: #E0E0E0;
            --border-color: #E0E0E0;
            --shadow-color: rgba(0,0,0,0.5);
            --input-bg: #2C2C2C;
        }

        * { box-sizing: border-box; font-family: 'IBM Plex Sans Thai', sans-serif; transition: background-color 0.3s, color 0.3s, border-color 0.3s; }
        body { background-color: var(--bg-color); color: var(--text-color); margin: 0; padding: 20px; display: flex; justify-content: center; position: relative; min-height: 100vh; }
        
        .top-nav { position: absolute; top: 20px; right: 20px; display: flex; align-items: center; gap: 15px; z-index: 100; }
        .user-info { font-size: 0.9rem; font-weight: 600; }
        .btn-logout { background: none; border: var(--sketch-border); padding: 5px 12px; cursor: pointer; color: var(--text-color); font-size: 0.8rem; border-radius: 2px; }
        .btn-logout:hover { background: var(--border-color); color: var(--card-bg-color); }
        .theme-switch { cursor: pointer; background: none; border: none; padding: 8px; color: var(--text-color); display: flex; align-items: center; }

        .container { width: 100%; max-width: 950px; margin-top: 60px; }
        h2 { text-align: center; color: var(--border-color); margin-bottom: 30px; font-weight: 600; letter-spacing: 1.5px; }
        .card { background: var(--card-bg-color); padding: 30px; border-radius: 2px; border: var(--sketch-border-thick); margin-bottom: 25px; box-shadow: 10px 10px 0px var(--shadow-color); }
        
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
        .form-group { display: flex; flex-direction: column; }
        label { margin-bottom: 10px; font-weight: 600; font-size: 0.85rem; color: var(--border-color); text-transform: uppercase; }
        input { padding: 14px; border: var(--sketch-border); border-radius: 2px; outline: none; font-size: 0.95rem; background: var(--input-bg); color: var(--text-color); }
        
        .btn-group { display: flex; gap: 4px; border: var(--sketch-border); padding: 4px; border-radius: 2px; background: var(--input-bg); }
        .btn-toggle { flex: 1; padding: 8px; border: none; background: transparent; cursor: pointer; color: var(--text-color); font-size: 0.85rem; }
        .btn-toggle.active { background: var(--border-color); color: var(--card-bg-color); font-weight: 600; }
        
        .btn-main { width: 100%; padding: 18px; background: var(--border-color); color: var(--card-bg-color); border: var(--sketch-border); border-radius: 2px; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 25px; box-shadow: 6px 6px 0px var(--shadow-color); }
        .btn-main:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0px var(--shadow-color); }
        
        .table-container { overflow-x: auto; margin-top: 10px; }
    </style>
</head>
<body>

<div class="top-nav">
    <div id="user" class="user-info">Loading...</div>
    <button class="btn-logout" id="btnLogout">Logout</button>
    <button class="theme-switch" id="themeSwitch">
        <i data-lucide="sun" id="sunIcon"></i>
        <i data-lucide="moon" id="moonIcon" style="display:none"></i>
    </button>
</div>

<div class="container">
    <h2>✦ DAILY WORKLOG ✦</h2>

    <div class="card">
        <div class="form-grid">
            <div class="form-group"><label>วันที่</label><input type="date" id="date"></div>
            <div class="form-group"><label>เวลาเข้า</label><input type="time" id="in"></div>
            <div class="form-group"><label>เวลาออก</label><input type="time" id="out"></div>
            <div class="form-group"><label>พัก (ชม.)</label><input type="number" id="break" value="1"></div>
            
            <div class="form-group">
                <label>OT (2 แรง)</label>
                <div class="btn-group">
                    <input type="checkbox" id="ot" style="display:none">
                    <button type="button" class="btn-toggle" id="btnOtYes">Yes</button>
                    <button type="button" class="btn-toggle active" id="btnOtNo">No</button>
                </div>
            </div>
            
            <div class="form-group">
                <label>ปิดร้าน (+40)</label>
                <div class="btn-group">
                    <input type="checkbox" id="close" style="display:none">
                    <button type="button" class="btn-toggle" id="btnCloseYes">Yes</button>
                    <button type="button" class="btn-toggle active" id="btnCloseNo">No</button>
                </div>
            </div>
        </div>
        <button class="btn-main" id="btnSave">บันทึกข้อมูลวันนี้</button>
    </div>

    <div class="card">
        <div class="table-container" id="table"></div>
    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<script src="firebase-config.js"></script>
<script src="js/auth.js"></script>
<script src="js/db.js"></script>
<script src="js/calc.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        lucide.createIcons();

        // เชื่อมปุ่ม Logout (เรียกจาก auth.js)
        document.getElementById('btnLogout').addEventListener('click', () => {
            if (typeof logout === 'function') logout();
        });

        // เชื่อมปุ่ม Save (เรียกจาก app.js)
        document.getElementById('btnSave').addEventListener('click', () => {
            if (typeof save === 'function') save();
        });

        // ฟังก์ชันจัดการปุ่ม Toggle (OT/Close)
        const setupToggle = (id) => {
            const yesBtn = document.getElementById(`btn${id.charAt(0).toUpperCase() + id.slice(1)}Yes`);
            const noBtn = document.getElementById(`btn${id.charAt(0).toUpperCase() + id.slice(1)}No`);
            const checkbox = document.getElementById(id);

            yesBtn.addEventListener('click', () => {
                checkbox.checked = true;
                yesBtn.classList.add('active');
                noBtn.classList.remove('active');
            });

            noBtn.addEventListener('click', () => {
                checkbox.checked = false;
                yesBtn.classList.remove('active');
                noBtn.classList.add('active');
            });
        };

        setupToggle('ot');
        setupToggle('close');

        // Theme Switch
        const themeSwitch = document.getElementById('themeSwitch');
        themeSwitch.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
            document.getElementById('sunIcon').style.display = isDark ? 'block' : 'none';
            document.getElementById('moonIcon').style.display = isDark ? 'none' : 'block';
        });
    });
</script>

</body>
</html>
