import React, { useState, useEffect } from 'react';
import { Student } from '../types';

// Make jsPDF available from the window object loaded via CDN
declare global {
  interface Window {
    jspdf: any;
  }
}

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PrintIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h1v-4a1 1 0 011-1h8a1 1 0 011 1v4h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>);
const PdfIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);
const DocIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);


// Define interfaces for our report data structures
interface StudentPointSummary {
  id: number;
  name: string;
  initialPoints: number;
  totalViolations: number;
  totalAchievements: number;
  finalPoints: number;
}

interface DetailLog {
    id: number;
    date: string;
    description: string;
    points: number;
}

interface IndividualReport {
    type: 'individu';
    student: { name: string; class: string; nisn: string; };
    summary: StudentPointSummary;
    achievements: DetailLog[];
    violations: DetailLog[];
}

interface ClassReport {
    type: 'perkelas';
    className: string;
    students: StudentPointSummary[];
}

type ReportData = IndividualReport | ClassReport | null;
const LOCAL_STORAGE_KEY_SISWA = 'simpogulip_student_list';

const Laporan: React.FC = () => {
  const [reportType, setReportType] = useState<'individu' | 'perkelas'>('perkelas');
  const [reportData, setReportData] = useState<ReportData>(null);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allClasses, setAllClasses] = useState<string[]>([]);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const [filters, setFilters] = useState({
    kelas: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    studentSearch: '',
  });

  useEffect(() => {
    try {
        const studentItems = window.localStorage.getItem(LOCAL_STORAGE_KEY_SISWA);
        if (studentItems) {
            const students: Student[] = JSON.parse(studentItems);
            setAllStudents(students);
            const classes = Array.from(new Set(students.map(s => s.class))).sort((a, b) => 
                a.localeCompare(b, undefined, { numeric: true })
            );
            setAllClasses(classes);
            if (classes.length > 0) {
                setFilters(prev => ({ ...prev, kelas: classes[0] }));
            }
        }
    } catch (error) {
        console.error("Failed to load student data from localStorage", error);
        setNotification({ type: 'error', message: 'Gagal memuat data siswa.' });
    }
  }, []);

  useEffect(() => {
    if (notification) {
        const timer = setTimeout(() => setNotification(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFilters(prev => ({...prev, [id]: value}));
  };
  
  const handleShowReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportData(null); // Clear previous report

    if (reportType === 'individu') {
        if (!filters.studentSearch) {
            setNotification({ type: 'error', message: 'Silakan masukkan nama atau NISN siswa.' });
            return;
        }
        const searchTerm = filters.studentSearch.toLowerCase();
        const foundStudent = allStudents.find(s => 
            s.name.toLowerCase().includes(searchTerm) || 
            s.id.toString().includes(searchTerm)
        );

        if (!foundStudent) {
            setNotification({ type: 'error', message: `Siswa dengan nama/NISN "${filters.studentSearch}" tidak ditemukan.` });
            return;
        }

        // Generate mock data for the found student
        const totalAchievements = 25;
        const totalViolations = -12;
        const generatedData: IndividualReport = {
            type: 'individu',
            student: { name: foundStudent.name, class: foundStudent.class, nisn: foundStudent.id.toString() },
            summary: { id: foundStudent.id, name: foundStudent.name, initialPoints: 100, totalViolations: totalViolations, totalAchievements: totalAchievements, finalPoints: 100 + totalAchievements + totalViolations },
            achievements: [
                { id: 1, date: '2024-05-01', description: 'Juara lomba akademik tingkat sekolah', points: 25 },
            ],
            violations: [
                { id: 1, date: '2024-05-10', description: 'Terlambat masuk sekolah', points: -2 },
                { id: 2, date: '2024-05-12', description: 'Baju putra tidak dimasukan ke dalam celana', points: -5 },
                { id: 3, date: '2024-05-20', description: 'Memakai seragam tidak lengkap', points: -5 },
            ],
        };
        setReportData(generatedData);
    } else { // 'perkelas'
        const studentsInClass = allStudents.filter(s => s.class === filters.kelas);
        
        const reportStudents: StudentPointSummary[] = studentsInClass.map(student => {
            // Generate random but plausible points for demonstration
            const totalAchievements = Math.floor(Math.random() * 4) * 5; // 0, 5, 10, or 15
            const totalViolations = -(Math.floor(Math.random() * 5) * 2); // 0, -2, -4, -6, -8
            return {
                id: student.id,
                name: student.name,
                initialPoints: 100,
                totalAchievements,
                totalViolations,
                finalPoints: 100 + totalAchievements + totalViolations,
            };
        });

        const generatedData: ClassReport = {
            type: 'perkelas',
            className: filters.kelas,
            students: reportStudents,
        };
        setReportData(generatedData);
    }
  };
  
  const handleExportPDF = () => {
    if (!reportData || !window.jspdf) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    let yPos = 15;

    doc.setFontSize(18);
    doc.text("Laporan Poin Siswa - SIMPONI GULIP", 105, yPos, { align: 'center' });
    yPos += 10;
    
    const tableOptions = {
      startY: yPos,
      theme: 'grid',
      headStyles: { fillColor: '#3c8dbc', textColor: 255, fontStyle: 'bold', halign: 'center' },
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'center' },
      }
    };
    
    if (reportData.type === 'individu') {
        doc.setFontSize(14);
        doc.text(`Laporan Individu: ${reportData.student.name}`, 14, yPos);
        yPos += 6;
        doc.setFontSize(10);
        doc.text(`Kelas: ${reportData.student.class} | NISN: ${reportData.student.nisn}`, 14, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.text("Rekap Poin", 14, yPos);
        yPos += 6;
        (doc as any).autoTable({ ...tableOptions, html: '#rekap-individu-table', startY: yPos });
        yPos = (doc as any).lastAutoTable.finalY + 10;
        
        doc.setFontSize(12);
        doc.text("Detail Prestasi", 14, yPos);
        yPos += 6;
        (doc as any).autoTable({ ...tableOptions, html: '#detail-prestasi-table', startY: yPos });
        yPos = (doc as any).lastAutoTable.finalY + 10;
        
        doc.setFontSize(12);
        doc.text("Detail Pelanggaran", 14, yPos);
        yPos += 6;
        (doc as any).autoTable({ ...tableOptions, html: '#detail-pelanggaran-table', startY: yPos });

    } else { // perkelas
        doc.setFontSize(14);
        doc.text(`Laporan Poin Kelas: ${reportData.className}`, 14, yPos);
        yPos += 8;
        (doc as any).autoTable({ ...tableOptions, html: '#rekap-kelas-table', startY: yPos });
    }
    
    const fileName =
      reportData.type === 'individu'
        ? `laporan-individu-${reportData.student.name.replace(/\s/g, '_')}.pdf`
        : `laporan-perkelas-${reportData.className.replace(/\s/g, '_')}.pdf`;
    doc.save(fileName);
  };

  const handleExportDOC = () => {
    if (!reportData) return;

    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Laporan Poin Siswa</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; }
          h1 { text-align: center; color: #333; font-size: 18pt; }
          h2 { color: #444; font-size: 16pt; }
          h3 { color: #555; font-size: 14pt; }
          p { font-size: 12pt; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11pt; }
          th, td { border: 1px solid #999; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .center { text-align: center; }
          .green { color: green; }
          .red { color: red; }
          .bold { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Laporan Poin Siswa - SIMPONI GULIP</h1>
    `;
    
    if (reportData.type === 'individu') {
        htmlContent += `
            <h2>Laporan Individu: ${reportData.student.name}</h2>
            <p>Kelas: ${reportData.student.class} | NISN: ${reportData.student.nisn}</p>

            <h3>Rekap Poin</h3>
            <table>
                <thead>
                    <tr>
                        <th>Poin Awal</th>
                        <th>Total Poin Prestasi</th>
                        <th>Total Poin Pelanggaran</th>
                        <th>Poin Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="center">${reportData.summary.initialPoints}</td>
                        <td class="center green">+${reportData.summary.totalAchievements}</td>
                        <td class="center red">${reportData.summary.totalViolations}</td>
                        <td class="center bold">${reportData.summary.finalPoints}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Detail Prestasi</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Keterangan</th>
                        <th class="center">Poin</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.achievements.length > 0 ? reportData.achievements.map(item => `
                        <tr>
                            <td>${item.date}</td>
                            <td>${item.description}</td>
                            <td class="center green">+${item.points}</td>
                        </tr>
                    `).join('') : '<tr><td colspan="3" class="center">Tidak ada data prestasi.</td></tr>'}
                </tbody>
            </table>
            
            <h3>Detail Pelanggaran</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Keterangan</th>
                        <th class="center">Poin</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.violations.length > 0 ? reportData.violations.map(item => `
                        <tr>
                            <td>${item.date}</td>
                            <td>${item.description}</td>
                            <td class="center red">${item.points}</td>
                        </tr>
                    `).join('') : '<tr><td colspan="3" class="center">Tidak ada data pelanggaran.</td></tr>'}
                </tbody>
            </table>
        `;
    } else { // perkelas
        htmlContent += `
            <h2>Laporan Poin Kelas: ${reportData.className}</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Siswa</th>
                        <th class="center">Poin Awal</th>
                        <th class="center">Poin Prestasi</th>
                        <th class="center">Poin Pelanggaran</th>
                        <th class="center">Poin Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.students.length > 0 ? reportData.students.map((student, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${student.name}</td>
                            <td class="center">${student.initialPoints}</td>
                            <td class="center green">+${student.totalAchievements}</td>
                            <td class="center red">${student.totalViolations}</td>
                            <td class="center bold">${student.finalPoints}</td>
                        </tr>
                    `).join('') : '<tr><td colspan="6" class="center">Tidak ada siswa di kelas ini.</td></tr>'}
                </tbody>
            </table>
        `;
    }

    htmlContent += '</body></html>';

    const fileName =
      reportData.type === 'individu'
        ? `laporan-individu-${reportData.student.name.replace(/\s/g, '_')}.doc`
        : `laporan-perkelas-${reportData.className.replace(/\s/g, '_')}.doc`;

    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #report-content, #report-content * { visibility: visible; }
          #report-content { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
          .no-print { display: none; }
        }
      `}</style>

       {notification && (
        <div className={`fixed top-20 right-5 text-white py-3 px-5 rounded-lg shadow-xl z-50 animate-fade-in-down ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} role="alert">
          <p className="font-bold">{notification.type === 'success' ? 'Sukses!' : 'Error!'}</p>
          <p>{notification.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 no-print">
        <div>
          <h2 className="text-3xl font-light text-gray-700">Laporan</h2>
          <h3 className="text-sm font-light text-gray-500">Cetak Laporan Poin Siswa</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm self-end sm:self-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Laporan</li>
            </ol>
        </div>
      </div>

      <div className="mt-8 no-print">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">Filter Laporan</h3>
          <form onSubmit={handleShowReport}>
             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                  <label className="text-sm font-bold text-gray-600 block mb-2">Jenis Laporan</label>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="reportType" value="perkelas" checked={reportType === 'perkelas'} onChange={(e) => setReportType(e.target.value as any)} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span>Laporan Per Kelas</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="reportType" value="individu" checked={reportType === 'individu'} onChange={(e) => setReportType(e.target.value as any)} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span>Laporan Individu</span>
                    </label>
                  </div>
                </div>

                {reportType === 'perkelas' ? (
                    <div>
                        <label htmlFor="kelas" className="text-sm font-bold text-gray-600 block">Pilih Kelas</label>
                        <select id="kelas" value={filters.kelas} onChange={handleFilterChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                           {allClasses.map(cls => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>
                        <label htmlFor="studentSearch" className="text-sm font-bold text-gray-600 block">Cari Siswa (NISN/Nama)</label>
                        <input id="studentSearch" type="text" value={filters.studentSearch} onChange={handleFilterChange} placeholder="Contoh: Adi Saputra" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    </div>
                )}
                
                <div>
                  <label htmlFor="tanggalMulai" className="text-sm font-bold text-gray-600 block">Tanggal Mulai (Opsional)</label>
                  <input id="tanggalMulai" type="date" value={filters.tanggalMulai} onChange={handleFilterChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="tanggalSelesai" className="text-sm font-bold text-gray-600 block">Tanggal Selesai (Opsional)</label>
                  <input id="tanggalSelesai" type="date" value={filters.tanggalSelesai} onChange={handleFilterChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
             </div>
             <div className="mt-6 flex justify-end space-x-4">
               <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                 Tampilkan Laporan
               </button>
             </div>
          </form>
        </div>
      </div>
      
      {reportData && (
        <div id="report-content" className="mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 no-print">
                    <h3 className="text-xl font-semibold text-gray-700">Hasil Laporan</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button onClick={() => window.print()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"><PrintIcon />Cetak</button>
                        <button onClick={handleExportPDF} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"><PdfIcon />Export PDF</button>
                        <button onClick={handleExportDOC} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center"><DocIcon />Download DOC</button>
                    </div>
                </div>

                {reportData.type === 'individu' && (
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gray-800">Laporan Individu: {reportData.student.name}</h4>
                        <p className="text-sm text-gray-600">Kelas: {reportData.student.class} | NISN: {reportData.student.nisn}</p>

                        <h5 className="font-semibold mt-4 mb-2 text-gray-700">Rekap Poin</h5>
                        <div className="overflow-x-auto">
                            <table id="rekap-individu-table" className="min-w-full bg-white border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Poin Awal</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Total Poin Prestasi</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Total Poin Pelanggaran</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Poin Akhir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border text-center">{reportData.summary.initialPoints}</td>
                                        <td className="py-2 px-4 border text-center text-green-600">+{reportData.summary.totalAchievements}</td>
                                        <td className="py-2 px-4 border text-center text-red-600">{reportData.summary.totalViolations}</td>
                                        <td className="py-2 px-4 border text-center font-bold">{reportData.summary.finalPoints}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h5 className="font-semibold mt-6 mb-2 text-gray-700">Detail Prestasi</h5>
                        <div className="overflow-x-auto">
                            <table id="detail-prestasi-table" className="min-w-full bg-white border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Tanggal</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Keterangan</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Poin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.achievements.length > 0 ? reportData.achievements.map(item => (
                                        <tr key={`ach-${item.id}`}>
                                            <td className="py-2 px-4 border">{item.date}</td>
                                            <td className="py-2 px-4 border">{item.description}</td>
                                            <td className="py-2 px-4 border text-center text-green-600">+{item.points}</td>
                                        </tr>
                                    )) : <tr><td colSpan={3} className="text-center py-4 text-gray-500">Tidak ada data prestasi.</td></tr>}
                                </tbody>
                            </table>
                        </div>

                        <h5 className="font-semibold mt-6 mb-2 text-gray-700">Detail Pelanggaran</h5>
                        <div className="overflow-x-auto">
                            <table id="detail-pelanggaran-table" className="min-w-full bg-white border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Tanggal</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Keterangan</th>
                                        <th className="py-2 px-4 border font-medium text-gray-600">Poin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.violations.length > 0 ? reportData.violations.map(item => (
                                        <tr key={`vio-${item.id}`}>
                                            <td className="py-2 px-4 border">{item.date}</td>
                                            <td className="py-2 px-4 border">{item.description}</td>
                                            <td className="py-2 px-4 border text-center text-red-600">{item.points}</td>
                                        </tr>
                                    )) : <tr><td colSpan={3} className="text-center py-4 text-gray-500">Tidak ada data pelanggaran.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {reportData.type === 'perkelas' && (
                    <div>
                        <h4 className="text-lg font-bold text-gray-800">Laporan Poin Kelas: {reportData.className}</h4>
                         <div className="overflow-x-auto">
                            <table id="rekap-kelas-table" className="min-w-full bg-white mt-4">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Poin Awal</th>
                                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Poin Prestasi</th>
                                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Poin Pelanggaran</th>
                                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Poin Akhir</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {reportData.students.length > 0 ? reportData.students.map((student, index) => (
                                        <tr key={student.id}>
                                            <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                                            <td className="py-4 px-6 text-sm text-gray-900">{student.name}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 text-center">{student.initialPoints}</td>
                                            <td className="py-4 px-6 text-sm text-green-600 text-center">+{student.totalAchievements}</td>
                                            <td className="py-4 px-6 text-sm text-red-600 text-center">{student.totalViolations}</td>
                                            <td className="py-4 px-6 text-sm font-bold text-center">{student.finalPoints}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={6} className="text-center py-4 text-gray-500">Tidak ada siswa di kelas ini.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
       <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Laporan;