# Use a built-in Unicode-friendly font available in this environment (DejaVu)
from pathlib import Path

from fpdf import FPDF

# Check available fonts path
font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
bold_font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

# Try using DejaVu fonts (they support Thai and UTF-8)
pdf = FPDF()
pdf.add_font("DejaVu", "", font_path, uni=True)
pdf.add_font("DejaVu", "B", bold_font_path, uni=True)
pdf.set_font("DejaVu", "", 12)
pdf.add_page()

# Regenerate content
pdf.chapter_title("🔹 CTE คืออะไร (Common Table Expression)")
pdf.chapter_body(
    "CTE (Common Table Expression) คือคำสั่ง SQL ที่ใช้สร้างตารางชั่วคราวเพื่อใช้ในคำสั่ง SQL หลัก "
    "โดยใช้คำสั่ง WITH ตามด้วยชื่อ และโครงสร้าง query ด้านใน\n\n"
    "ข้อดี:\n- อ่านง่าย แยก logic ได้\n- ใช้แทน subquery ซับซ้อนได้ดี\n- สามารถเรียกใช้ซ้ำได้หลายครั้ง (recursive ได้ด้วย)\n\n"
    "โครงสร้างพื้นฐาน:\nWITH ชื่อตารางชั่วคราว AS (\n    SELECT ...\n)\nSELECT * FROM ชื่อตารางชั่วคราว;"
)

pdf.chapter_title("🔸 ตัวอย่าง CTE พื้นฐาน")
pdf.chapter_body(
    "WITH recent_orders AS (\n"
    "    SELECT * FROM orders\n"
    "    WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'\n)\n"
    "SELECT customer_id, COUNT(*) AS order_count\n"
    "FROM recent_orders\n"
    "GROUP BY customer_id;"
)

pdf.chapter_title("📌 เปรียบเทียบ CTE vs Subquery")
pdf.chapter_body(
    "Subquery แบบธรรมดา:\n"
    "SELECT customer_id, COUNT(*)\n"
    "FROM (\n    SELECT * FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'\n) AS recent\n"
    "GROUP BY customer_id;\n\n"
    "CTE แบบเดียวกัน:\n"
    "WITH recent AS (\n    SELECT * FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'\n)\n"
    "SELECT customer_id, COUNT(*) FROM recent GROUP BY customer_id;"
)

pdf.chapter_title("🌀 Recursive CTE (กรณีซับซ้อน)")
pdf.chapter_body(
    "ใช้กรณีที่ต้องคำนวณแบบวนซ้ำ เช่น หาโครงสร้าง tree\n\n"
    "WITH RECURSIVE subordinates AS (\n"
    "  SELECT id, name, manager_id FROM employees WHERE id = 1\n"
    "  UNION ALL\n"
    "  SELECT e.id, e.name, e.manager_id\n"
    "  FROM employees e\n"
    "  INNER JOIN subordinates s ON e.manager_id = s.id\n"
    ")\nSELECT * FROM subordinates;"
)

pdf.chapter_title("✅ สรุป")
pdf.chapter_body(
    "- CTE ทำให้ SQL อ่านง่ายและแบ่งเป็นขั้นตอนได้\n"
    "- ใช้คำสั่ง WITH ก่อน SELECT\n"
    "- เหมาะกับการจัดการ query ที่ซับซ้อน และใช้ร่วมกับ window functions ได้ดี\n"
    "- Recursive CTE ใช้ในกรณีที่ข้อมูลมีความซ้อนกันหลายระดับ เช่น โครงสร้างองค์กร"
)

# Save PDF
output_path = "/mnt/data/CTE_SQL_Tutorial.pdf"
pdf.output(output_path)
output_path
