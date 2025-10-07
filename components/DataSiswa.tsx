
import React, { useState, useEffect, useMemo } from 'react';
import { Student } from '../types';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);
const ViewIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>);

const LOCAL_STORAGE_KEY = 'simpogulip_student_list';

// Fix: Add type assertion to array literal before calling sort to prevent type widening issue with 'gender' property.
const placeholderSiswa: Student[] = ([
    // X.E1
    { id: 3101366126, name: 'A. FIKRI RADITIA', class: 'X.E1', points: 100, gender: 'male' },
    { id: 104303974, name: 'ADELIA RAHELDA PUTRI', class: 'X.E1', points: 100, gender: 'female' },
    { id: 104298828, name: 'ADI SAPUTRA', class: 'X.E1', points: 100, gender: 'male' },
    { id: 102651158, name: 'AHMAD DAFI ABDILLAH', class: 'X.E1', points: 100, gender: 'male' },
    { id: 106803122, name: 'AJI ALAFANDI', class: 'X.E1', points: 100, gender: 'male' },
    { id: 106567284, name: 'ARGA ALKIYAN SYAH', class: 'X.E1', points: 100, gender: 'male' },
    { id: 101670080, name: 'AYU FANIZA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 106030045, name: 'CLARA SHERIN AZ-ZAHRA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 99805686, name: 'DIFI NAILA ROHMAH', class: 'X.E1', points: 100, gender: 'female' },
    { id: 109837523, name: 'DINARA FARANZHAHY', class: 'X.E1', points: 100, gender: 'female' },
    { id: 3082190811, name: 'FAHRI KA AB', class: 'X.E1', points: 100, gender: 'male' },
    { id: 98068072, name: 'FAREL SYAHPUTRA', class: 'X.E1', points: 100, gender: 'male' },
    { id: 106062533, name: 'FILLOS BERRY AFRA', class: 'X.E1', points: 100, gender: 'male' },
    { id: 105894391, name: 'GITA AULIA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 92674459, name: 'IKBAL HAZMI', class: 'X.E1', points: 100, gender: 'male' },
    { id: 103141346, name: 'INDAH RAMADANI', class: 'X.E1', points: 100, gender: 'female' },
    { id: 103186613, name: 'JELITA AGUSTINA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 104305629, name: 'KHOIRUN NESA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 104561984, name: 'M. AZZAM RAMADHAN', class: 'X.E1', points: 100, gender: 'male' },
    { id: 105225078, name: 'M. FARHAN', class: 'X.E1', points: 100, gender: 'male' },
    { id: 106560971, name: 'MUHAMAD PANJI RAMADH', class: 'X.E1', points: 100, gender: 'male' },
    { id: 101079772, name: 'NAILA RIZKIA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 94424472, name: 'NUR DEKI VIDIANSYAH', class: 'X.E1', points: 100, gender: 'female' },
    { id: 3118946693, name: 'RAHMA AULIA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 108455599, name: 'REGINA NUR AZILA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 103831729, name: 'REIHAN AFRIANSYAH', class: 'X.E1', points: 100, gender: 'male' },
    { id: 102181819, name: 'RIZALDI BABOK', class: 'X.E1', points: 100, gender: 'male' },
    { id: 3106267003, name: 'RIZKI RAMADHAN', class: 'X.E1', points: 100, gender: 'male' },
    { id: 104290665, name: 'SAIPUN NIKMAT', class: 'X.E1', points: 100, gender: 'male' },
    { id: 93451145, name: 'SALSA NABILA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 105794117, name: 'SAPRONI ELSANDI', class: 'X.E1', points: 100, gender: 'male' },
    { id: 93470832, name: 'SEFHA ANDIKA PRATAMA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 94971363, name: 'SENI OKTANIA', class: 'X.E1', points: 100, gender: 'female' },
    { id: 109312295, name: 'SINAR RAHAYU', class: 'X.E1', points: 100, gender: 'female' },
    { id: 108382764, name: 'SOLI AZAM', class: 'X.E1', points: 100, gender: 'male' },
    { id: 103071484, name: 'SYAIFUL AKBAR', class: 'X.E1', points: 100, gender: 'male' },
    // X.E2
    { id: 999999999, name: 'ABI PANGESTU', class: 'X.E2', points: 100, gender: 'male' },
    { id: 109876045, name: 'ADIN IMBA DWI PUTRA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 97772743, name: 'AGUNG HIDAYAT', class: 'X.E2', points: 100, gender: 'male' },
    { id: 3093960294, name: 'AHMAD FATIH ARRIZAKI', class: 'X.E2', points: 100, gender: 'male' },
    { id: 102863023, name: 'ANESA MESI ANGELITA', class: 'X.E2', points: 100, gender: 'female' },
    { id: 95442203, name: 'ANI SAPITRI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 101057685, name: 'AZZIRA BILLIONIA', class: 'X.E2', points: 100, gender: 'female' },
    { id: 104639533, name: 'CLAUDIA RANITA PUTRI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 91473133, name: 'DIMAS SAPUTRA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 101904540, name: 'DINDA MAHARANI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 104094464, name: 'ELIN JUNIANSAH', class: 'X.E2', points: 100, gender: 'female' },
    { id: 109251111, name: 'ELSA AMELIA', class: 'X.E2', points: 100, gender: 'female' },
    { id: 108479577, name: 'EVRIN LOUIZ FRANCISCA', class: 'X.E2', points: 100, gender: 'female' },
    { id: 109821216, name: 'FABIO ARYA TRIASTO', class: 'X.E2', points: 100, gender: 'male' },
    { id: 3106993634, name: 'FREYDI PUTRA PRATAMA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 98420829, name: 'ILHAM FATUR ROHMAN', class: 'X.E2', points: 100, gender: 'male' },
    { id: 104137467, name: 'INDRI YUNITA SARI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 101876223, name: 'JESICA MULYA ANDINI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 3101537437, name: 'KHOMAIROH', class: 'X.E2', points: 100, gender: 'female' },
    { id: 97923980, name: 'M. NANDA PRATAMA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 106073101, name: 'M. RAIHAN SAPUTRA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 79084071, name: 'MUHAMAD SAHRUDIN', class: 'X.E2', points: 100, gender: 'male' },
    { id: 108565329, name: 'MUHAMMAD AZIZ', class: 'X.E2', points: 100, gender: 'male' },
    { id: 101946247, name: 'NAYSA PUTRI UTAMI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 104228825, name: 'NINDYA PUTRI RAMADANI', class: 'X.E2', points: 100, gender: 'female' },
    { id: 3106949862, name: 'RA AFI DWIAN AL GHANI', class: 'X.E2', points: 100, gender: 'male' },
    { id: 101946012, name: 'RAFAFIKA F.S', class: 'X.E2', points: 100, gender: 'male' },
    { id: 103454140, name: 'REDI HUTAMA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 97811049, name: 'REGA STEVEN REYINGGO', class: 'X.E2', points: 100, gender: 'male' },
    { id: 3105353922, name: 'RENDI KURNIAWAN', class: 'X.E2', points: 100, gender: 'male' },
    { id: 107618468, name: 'RENDI SAPUTRA', class: 'X.E2', points: 100, gender: 'male' },
    { id: 92516048, name: 'RIZKI HIDAYAT', class: 'X.E2', points: 100, gender: 'male' },
    { id: 102294544, name: 'SEFA JULIA', class: 'X.E2', points: 100, gender: 'female' },
    { id: 3108103673, name: 'TANJUNG ATIQA SHIVA', class: 'X.E2', points: 100, gender: 'female' },
    { id: 102162309, name: 'WAHYU KUSUMA', class: 'X.E2', points: 100, gender: 'male' },
    // X.E3
    { id: 94166299, name: 'AHMAD REVAL BUDIANSYAH', class: 'X.E3', points: 100, gender: 'male' },
    { id: 96471842, name: 'ALIF NIDA AULIA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 99313959, name: 'ANISA PITRI', class: 'X.E3', points: 100, gender: 'female' },
    { id: 111314603, name: 'ANISA ZULFADINIA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 103259885, name: 'ARIEL INDRA PUTRA', class: 'X.E3', points: 100, gender: 'male' },
    { id: 96107085, name: 'ASARI', class: 'X.E3', points: 100, gender: 'male' },
    { id: 92177586, name: 'AUFA TAMAM', class: 'X.E3', points: 100, gender: 'male' },
    { id: 102532218, name: 'AZRIL IZAM MAHENDRA', class: 'X.E3', points: 100, gender: 'male' },
    { id: 103901453, name: 'CANTIKA CAHYA MALIKA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 84354012, name: 'DELA DWI RAMAWATI P.', class: 'X.E3', points: 100, gender: 'female' },
    { id: 106388795, name: 'DINIYA SILVA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 3101493570, name: 'DINO JAYA SAPUTRA', class: 'X.E3', points: 100, gender: 'male' },
    { id: 97086262, name: 'DIO ADE PUTRA', class: 'X.E3', points: 100, gender: 'male' },
    { id: 3107169686, name: 'ESTIANA RARA SISKA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 3088797469, name: 'FAHRI RAMADAN', class: 'X.E3', points: 100, gender: 'male' },
    { id: 105576227, name: 'FARUQ AL KHALIFI', class: 'X.E3', points: 100, gender: 'male' },
    { id: 95914313, name: 'GILANG QURRATA A YUN', class: 'X.E3', points: 100, gender: 'male' },
    { id: 93181278, name: 'GIO NEGARAWAN', class: 'X.E3', points: 100, gender: 'male' },
    { id: 96298778, name: 'KAMALAT AZIZAH', class: 'X.E3', points: 100, gender: 'female' },
    { id: 3090582756, name: 'KASIH KESYA ANGGRAINI', class: 'X.E3', points: 100, gender: 'female' },
    { id: 108357049, name: 'M. RASYA DWI PUTRA', class: 'X.E3', points: 100, gender: 'male' },
    { id: 106734834, name: 'M. RIFADH', class: 'X.E3', points: 100, gender: 'male' },
    { id: 104322460, name: 'M. SYUKRON DAZALUTHFI', class: 'X.E3', points: 100, gender: 'male' },
    { id: 103847386, name: 'MUHAMMAD FIKIH', class: 'X.E3', points: 100, gender: 'male' },
    { id: 93296393, name: 'MUHAMMAD FIQI ALFINO', class: 'X.E3', points: 100, gender: 'male' },
    { id: 101260057, name: 'NADILA AULIA FISKA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 106183196, name: 'NADIRA HAFIZH RAMADHANI', class: 'X.E3', points: 100, gender: 'female' },
    { id: 107002580, name: 'NOVA RIANTI', class: 'X.E3', points: 100, gender: 'female' },
    { id: 101005245, name: 'RAFFA LAILATUL ALOPA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 106958344, name: 'RAFFI TRI FAHREZA', class: 'X.E3', points: 100, gender: 'male' },
    { id: 3101223220, name: 'REIHAN ANDRIANO', class: 'X.E3', points: 100, gender: 'male' },
    { id: 96158094, name: 'RIZKI FIRMANSYAH', class: 'X.E3', points: 100, gender: 'male' },
    { id: 94504072, name: 'ROMI LARASATI', class: 'X.E3', points: 100, gender: 'female' },
    { id: 114585762, name: 'SALMA ALYA MUKHBITA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 109522114, name: 'SELVI LIYANA', class: 'X.E3', points: 100, gender: 'female' },
    { id: 92177370, name: 'TARITAS MUHAMAD AL AQSO', class: 'X.E3', points: 100, gender: 'male' },
    // X.E4
    { id: 102222551, name: 'AFRI YANSAH', class: 'X.E4', points: 100, gender: 'male' },
    { id: 102052670, name: 'AKBAR BAYU PRASETYO', class: 'X.E4', points: 100, gender: 'male' },
    { id: 102082664, name: 'ALIF MAULANA YUSUP', class: 'X.E4', points: 100, gender: 'male' },
    { id: 104495893, name: 'ANJANI FRADELA TETRA KIRANA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 109226968, name: 'AQUENA AUFA ATIQAH', class: 'X.E4', points: 100, gender: 'female' },
    { id: 101778823, name: 'AURA NUR AYNI', class: 'X.E4', points: 100, gender: 'female' },
    { id: 98017656, name: 'BASIR', class: 'X.E4', points: 100, gender: 'male' },
    { id: 97787629, name: 'CHELSEA OKTALIA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 92526933, name: 'DEDI WALUYO SAPUTRA', class: 'X.E4', points: 100, gender: 'male' },
    { id: 117846085, name: 'DESI PERMATASARI', class: 'X.E4', points: 100, gender: 'female' },
    { id: 108999594, name: 'DIMAS ALFIANSYAH', class: 'X.E4', points: 100, gender: 'male' },
    { id: 98467011, name: 'DWINDA KHAIRUNNISA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 103597769, name: 'EKA NURAIDAH', class: 'X.E4', points: 100, gender: 'female' },
    { id: 3097589351, name: 'FITRA RAHMATULLAH', class: 'X.E4', points: 100, gender: 'female' },
    { id: 3125967358, name: 'HAIKAL ALFAREZI', class: 'X.E4', points: 100, gender: 'male' },
    { id: 91588371, name: 'IHYAN ULUMUDIN', class: 'X.E4', points: 100, gender: 'male' },
    { id: 105120807, name: 'KESYA KAMILA AZZAHRA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 97881764, name: 'LESTIA AMELINA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 88625501, name: 'MAHESA TRI PANCA', class: 'X.E4', points: 100, gender: 'male' },
    { id: 109539795, name: 'MAULI RISKIA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 89551753, name: 'MUHAMAD GUNTUR ADIGUNA', class: 'X.E4', points: 100, gender: 'male' },
    { id: 106799809, name: 'MUHAMMAD KHAIRUL AZAM', class: 'X.E4', points: 100, gender: 'male' },
    { id: 95484829, name: 'NOFAL ADITIA PRATAMA', class: 'X.E4', points: 100, gender: 'male' },
    { id: 106325199, name: 'OKTAVIA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 109312670, name: 'PRIATTA ZERRO WANASARI', class: 'X.E4', points: 100, gender: 'female' },
    { id: 91287201, name: 'RENDI ARDIANSYAH', class: 'X.E4', points: 100, gender: 'male' },
    { id: 99756454, name: 'REZA PRATAMA', class: 'X.E4', points: 100, gender: 'male' },
    { id: 103226670, name: 'RIDHO KUKUH DELFANI', class: 'X.E4', points: 100, gender: 'male' },
    { id: 99131048, name: 'RIFKI ADITIYA', class: 'X.E4', points: 100, gender: 'male' },
    { id: 98770885, name: 'RIZKA NOVIYANTI', class: 'X.E4', points: 100, gender: 'female' },
    { id: 101500918, name: 'RIZKI ARDIANSYAH', class: 'X.E4', points: 100, gender: 'male' },
    { id: 97045294, name: 'SALWA SOFIRA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 93613806, name: 'SULISTIANA', class: 'X.E4', points: 100, gender: 'female' },
    { id: 3115602631, name: 'TRI KURNIAWAN', class: 'X.E4', points: 100, gender: 'male' },
    { id: 108381067, name: 'UMI FADILLAH', class: 'X.E4', points: 100, gender: 'female' },
    { id: 99980917, name: 'WELLY PEBIYANSYAH', class: 'X.E4', points: 100, gender: 'male' },
    // X.E5
    { id: 107444337, name: 'AFRIJA AULIA GIBRAN', class: 'X.E5', points: 100, gender: 'male' },
    { id: 105579091, name: 'ALFAKHREZA ZIDAN F', class: 'X.E5', points: 100, gender: 'male' },
    { id: 98468843, name: 'ARIP SOFYAN', class: 'X.E5', points: 100, gender: 'male' },
    { id: 116391091, name: 'AUREL NUR AYNI', class: 'X.E5', points: 100, gender: 'female' },
    { id: 103733453, name: 'CHIKA JULIA ANANTA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 3093189658, name: 'DESTA AYUREGINA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 103790403, name: 'DIKA AZHARI', class: 'X.E5', points: 100, gender: 'male' },
    { id: 102583955, name: 'DIRGA PUTRA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 102292211, name: 'EKA SELPIA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 109351779, name: 'ERLANGGA PRATAMA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 93117956, name: 'FERLI GUTAWA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 102008344, name: 'FIKRI MAYKAL', class: 'X.E5', points: 100, gender: 'male' },
    { id: 108460833, name: 'GESCHARA RECIE JANEETA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 106375348, name: 'IKBAL ADITIA PUTRA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 108030509, name: 'KEMAS BAGUS SEMPURNA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 104847275, name: 'KHANSA BILQIS KAYLILA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 109038654, name: 'LINGGA AKRAM WIGUNA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 104017078, name: 'M. FAQIH ASSYA BILI', class: 'X.E5', points: 100, gender: 'male' },
    { id: 3101686885, name: 'M. RAFFA APRILIANDO', class: 'X.E5', points: 100, gender: 'male' },
    { id: 3098399843, name: 'M. ZHAKY PRATAMA', class: 'X.E5', points: 100, gender: 'male' },
    { id: 103788687, name: 'MISEL CAHAYA SERLITA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 3104639087, name: 'MITHA AMALIA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 3094412120, name: 'MUHAMAD RAYHAN HARYAN', class: 'X.E5', points: 100, gender: 'male' },
    { id: 92931504, name: 'NAILA SYIFA MAULIDA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 91750859, name: 'NOPIAN', class: 'X.E5', points: 100, gender: 'male' },
    { id: 3105959816, name: 'NURMALA SARI', class: 'X.E5', points: 100, gender: 'female' },
    { id: 103702893, name: 'NURIZAL RHOMADON', class: 'X.E5', points: 100, gender: 'male' },
    { id: 99359381, name: 'OGIN FAHRULI', class: 'X.E5', points: 100, gender: 'male' },
    { id: 104724044, name: 'PUTRI YULIANTI', class: 'X.E5', points: 100, gender: 'female' },
    { id: 102287056, name: 'QUAILLANAYSMITH GIRIAN P.', class: 'X.E5', points: 100, gender: 'female' },
    { id: 105587845, name: 'RASKIA MULIARDA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 108744026, name: 'RATU ZIVANA MIKAILA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 96687199, name: 'SITI ROFI AH', class: 'X.E5', points: 100, gender: 'female' },
    { id: 3101027404, name: 'TUBAGUS ADAM RAMADHAN', class: 'X.E5', points: 100, gender: 'male' },
    { id: 108246778, name: 'VISKA AMELIA', class: 'X.E5', points: 100, gender: 'female' },
    { id: 96982660, name: 'YOUNG KARNO Z.N', class: 'X.E5', points: 100, gender: 'male' },
    // XI.F1
    { id: 73561264, name: 'ALIMUDIN', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 96038946, name: 'ANA TRIONA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 83384245, name: 'ANITA RAHAYU', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 95429189, name: 'ARYA SAPUTRA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 74914565, name: 'ASIH MUSTIKA WATI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 86424496, name: 'CALVIN DWI PERNANDO', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 88612300, name: 'DESWITA MAHARANI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 77124624, name: 'DEVIN ANDREAN TRITAMA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 98250680, name: 'DYO GUSTI ALFAHRI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 95070401, name: 'ENDRA SAPUTRA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 82681964, name: 'FANJI SUHARSONO', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 3101049116, name: 'HAFINZA SANIYA PUTRI', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 93705740, name: 'HERPANDI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 96267515, name: 'INEZKA REYZEN PUTRI WANDITA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 3090434353, name: 'KEYSYA BILA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 102477049, name: 'M. ALIF PRADANA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 87837975, name: 'RAIHAN PRATAMA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 92624031, name: 'MEGA ALFINA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 86909402, name: 'NAFISHA ANGGUN MARINTAN', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 97183865, name: 'NANIA PUTRI LESTARI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 94676789, name: 'NIKEN YOLANDA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 99153509, name: 'NOPAL NURROHMAN', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 95747437, name: 'PRESIL LIA MARISA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 98463560, name: 'RAFIF ALFARIZI', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 94532840, name: 'RAHMA ADELIA PUTRI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 84055196, name: 'RAMADHANI', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 96277554, name: 'RAYA DERI PRATAMA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 89855717, name: 'RELANDO', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 96993679, name: 'RIANA WILLYANI', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 91129386, name: 'RIDHO MAHENDRA', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 92068392, name: 'RIYANDA ALFARIZ', class: 'XI.F1', points: 100, gender: 'male' },
    { id: 87622619, name: 'ROSIYATUN ULFA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 93504654, name: 'SHASA AMELIA', class: 'XI.F1', points: 100, gender: 'female' },
    { id: 81717670, name: 'SUSTIA OKTAVIA', class: 'XI.F1', points: 100, gender: 'female' },
    // XI.F2
    { id: 81022337, name: 'ADE SAPUTRA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 86844782, name: 'ALENDSIA PERMATA DHINY', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 84863003, name: 'ANA RENITA PUTRI', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 95735607, name: 'APRILIANI', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 3096469111, name: 'AULIA RAHMA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 96727582, name: 'BAYU PRAMANA WIJAYA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 97663809, name: 'CALVIN GERY FANAMA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 96050318, name: 'DEPA YUNITA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 92556021, name: 'DWI PUTRI FEBRIANTI', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 99185131, name: 'DZIKRY ALFAHMI', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 3096654104, name: 'EKA RAHAYU', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 3098146177, name: 'ELLENA AYU HANDAYANI', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 98856648, name: 'FAHRI IRAWAN', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 98439878, name: 'FAUZI FIQI SAPUTRA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 85456028, name: 'IMEL', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 99028765, name: 'JAYA MULYA PERWIRA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 95003673, name: 'MUHAMMAD YUSUP', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 93533902, name: 'MARSYA ALIFIA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 96511941, name: 'MEILIA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 98055544, name: 'MONICA OLIVIA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 74825815, name: 'NADI SAPUTRA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 96248972, name: 'NISSA AL-KHATIMUL MUFATI', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 77841234, name: 'NOVAL FERDIAN', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 102096431, name: 'RAYHAN DAFFA ULUL AZMI', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 91511210, name: 'REZA ANDIKA PRATAMA', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 99195205, name: 'RIDHO RAMADHAN', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 91419352, name: 'RIFKI DWI DARMAWAN', class: 'XI.F2', points: 100, gender: 'male' },
    { id: 88722184, name: 'RISKA AMELIA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 92955247, name: 'SASKIA ZALZANATA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 81788165, name: 'TANIA KASENDA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 86844783, name: 'TRI AULIA VEGA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 101944906, name: 'WILDA PRATIWI', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 95661328, name: 'YONA MELIA', class: 'XI.F2', points: 100, gender: 'female' },
    { id: 83085810, name: 'ZAQI ALGI FAHRI', class: 'XI.F2', points: 100, gender: 'male' },
    // XI.F3
    { id: 93820073, name: 'ALISA RAHMA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 81340584, name: 'ANDO YANSAH', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 3095639891, name: 'AULIA OKTA FITRIANA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 3096717471, name: 'DARA FEBRINA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 94082211, name: 'DENI SULISTIO', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 91931512, name: 'DILA MULYANI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 92079001, name: 'FAREL OKTAVIANDO', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 89494888, name: 'FERDI YANSAH', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 97899003, name: 'FINA OKTA FIANA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 97770813, name: 'GALIH KURNIAWAN AMARLY', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 92809548, name: 'HILDA AULIA APRILIANI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 84341009, name: 'IRFAN PERATAMA', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 99062253, name: 'KHESYIKA JESIKA ANASTASYA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 81801339, name: 'KHOIRUL SAPUTRA', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 93292694, name: 'KRISTIN VALLEN OLLYVIA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 91869024, name: 'MEISYA YOZELIKA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 75151454, name: 'NAZARUL IKRAM', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 99597657, name: 'NOLITA CHINTIA BELLA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 91883964, name: 'RAHMA DINI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 97541587, name: 'REGINA DEWI ARLIKA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 88085705, name: 'RIDHO NUGRAHA ANGKASA', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 93001639, name: 'RIDWAN MAULANA IHSAN', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 3092501056, name: 'SAIDAH ALIA PUTRI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 97112998, name: 'SANDI PRATAMA', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 99581374, name: 'SASKYA ADYA ROSPITA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 93667388, name: 'SELFI RANTIKA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 3090691107, name: 'SHINDY AULIA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 98424204, name: 'SINDI IMELDA PUTRI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 82918438, name: 'SULAIMAN', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 82433074, name: 'SYAKILA NUR RAMADHANI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 87770463, name: 'TASYA', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 85309350, name: 'TIYAS LISTA KURNIA DEWI', class: 'XI.F3', points: 100, gender: 'female' },
    { id: 92553155, name: 'YUDHA MAHENDRA', class: 'XI.F3', points: 100, gender: 'male' },
    { id: 83295692, name: 'YULIANA DESMAYANTI', class: 'XI.F3', points: 100, gender: 'female' },
    // XI.F4
    { id: 82574725, name: 'ADEK EKA FADILA', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 94050490, name: 'ARIA SANDI', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 94978704, name: 'BARMA WIJAYA', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 99896847, name: 'BINTANG ADHA PRATAMA', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 3092728043, name: 'DAHLIA SAKINAH', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 87905908, name: 'DEPI LESTARI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 82991536, name: 'DWI VANIA', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 89513835, name: 'ERLIN DWI PRASTICA', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 88505877, name: 'FATIH BAGUS SAYOGA', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 92060187, name: 'GEA SAPITRI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 82437427, name: 'GUNTUR', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 3080908628, name: 'HAFIZ ALGIFARI', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 84565831, name: 'IIS MAURA', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 84331752, name: 'JESICA DWI WARDANI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 93678802, name: 'JIKRI UMAMI', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 94597985, name: 'KHOFIFAH', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 96382424, name: 'LULUIN YUNIA ANGGRAENI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 99388110, name: 'M. AL ARIEF', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 3094146119, name: 'M. ABDI WIRAYUDHA', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 99299282, name: 'MUHAMMAD IQBAL RAMADON', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 94851889, name: 'NADILA PUTRI MAHARANI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 96506026, name: 'NAINA CHALISTA RAMADANI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 97646827, name: 'NENENG ROHMANI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 3093658766, name: 'NUR LAILA', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 91627922, name: 'PUTRI INDAH LESTARI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 98215520, name: 'RAHMAT', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 98271003, name: 'RATNA NURMALA SARI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 93347854, name: 'RIZLA ZILWANA', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 86386869, name: 'SAIFUL ANWAR', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 96839420, name: 'SIFAUT TAMIMI', class: 'XI.F4', points: 100, gender: 'male' },
    { id: 87028409, name: 'SITI NUR RIYAH', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 94231702, name: 'SITI USWATUN HASANAH', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 98310546, name: 'SULASTRI', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 85086285, name: 'ZEYSHA HENDA LESTA', class: 'XI.F4', points: 100, gender: 'female' },
    { id: 92013731, name: 'ZOYA FIDIANATA', class: 'XI.F4', points: 100, gender: 'female' },
    // XII.F5
    { id: 77669128, name: 'A. RIDWAN', class: 'XII.F5', points: 100, gender: 'male' },
    { id: 76243434, name: 'ARTA FIKRIA AL-HANIF', class: 'XII.F5', points: 100, gender: 'male' },
    { id: 75156035, name: 'ADINDA WIDIAN SARI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 87376890, name: 'AGISTA PRANA CITRA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 83431017, name: 'ALISA TRI SETI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 86161142, name: 'AMELDA AGUSTIN', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 88774460, name: 'ARSITI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 85853552, name: 'ASNAH ANDRIYANI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 85386486, name: 'CELVI SABILA GISKA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 78510699, name: 'DESI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 87932988, name: 'EKA SOVIA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 74992099, name: 'EVA FITRIAH', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 83677064, name: 'EVAN ZAKKY ALFARIZI', class: 'XII.F5', points: 100, gender: 'male' },
    { id: 89574261, name: 'FEDRO ARGHA DIGILBRAM', class: 'XII.F5', points: 100, gender: 'male' },
    { id: 3089502702, name: 'FLAVYA ARSYLA K', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 85351352, name: 'HELDA AMELIA PUTRI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 83975904, name: 'IKROM ARRAFI', class: 'XII.F5', points: 100, gender: 'male' },
    { id: 86672027, name: 'JUNISA RISKIA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 85476036, name: 'M. MEIZRIL KAMAL', class: 'XII.F5', points: 100, gender: 'male' },
    { id: 81295462, name: 'MILA FAUZIAH', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 86460641, name: 'NUR WULAN HAKIKI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 83388920, name: 'REZKY AGUSTINA PUTERA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 75346246, name: 'SAILA YUANDIRA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 3070552730, name: 'SAKINAH ADENESYA SALSA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 72121690, name: 'SALSABILA NOVIA SAPUTRI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 82781644, name: 'SASKIA ADIA MECA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 89416695, name: 'SHILEN KORIDAVI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 74493059, name: 'SINDI PUSPITA SARI', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 87954036, name: 'SITI MESTRIA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 78346572, name: 'SULIS TIYANA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 89731905, name: 'TARISA RAHMADIA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 86283289, name: 'TIYAS ANGGARA PUTRA', class: 'XII.F5', points: 100, gender: 'female' },
    { id: 86111387, name: 'ZULYANDA', class: 'XII.F5', points: 100, gender: 'male' },
    // XII.F6
    { id: 82268325, name: 'AFRA NAILLAH ARKANA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 147553480, name: 'AHMAD HERI', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 81773985, name: 'AMELIA NATASYA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 86564082, name: 'ANNAS ARYA DINATA', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 82693649, name: 'AULIA SAPITRI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 83443956, name: 'BELA MARANTIKA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 76495659, name: 'DHAVA RADEANGGA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 86860573, name: 'DILA ANGGRAINI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 77602261, name: 'EKA DEWI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 83942691, name: 'FAREL SAPUTRA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 85494347, name: 'FIRMAN RIZKI ABDILLAI', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 86746787, name: 'GUNTUR ARIS PRADISTI', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 81646062, name: 'ILHAM MUDDIN', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 85184712, name: 'INTAN FEBYANA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 87686461, name: 'JESSICA RAMADANI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 83821734, name: 'MUHAMAD TOMY', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 81713813, name: 'MERTA KOMALA SARI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 71335634, name: 'MERTI YANA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 87688941, name: 'MISNAH', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 75507528, name: 'MUFIDAH', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 73295497, name: 'MUHAMMAD HARUN', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 74781489, name: 'NOVITA SARI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 72120097, name: 'RAHMA AULIA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 85139803, name: 'RIYAN', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 84694488, name: 'RIZIK ALLAZI', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 84574928, name: 'SHEYDA HAURA YASMIN', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 87749148, name: 'SITI PATIMAH', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 864987581, name: 'SITI ZAHRA', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 81749146, name: 'ULANDARI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 74447325, name: 'WAHYU SANDI SATRIO', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 83699794, name: 'WULANDARI', class: 'XII.F6', points: 100, gender: 'female' },
    { id: 86281377, name: 'YUKINO AMIRA AIRANSA', class: 'XII.F6', points: 100, gender: 'male' },
    { id: 88712009, name: 'ZAHRA ALYA MUKHBITA', class: 'XII.F6', points: 100, gender: 'female' },
    // XII.F7
    { id: 71424107, name: 'AFIFA DEA EVENT', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 82377432, name: 'ALIYA TASYA', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 87077829, name: 'ARIFIN DZAKI HIBATULLAH', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 86467781, name: 'BUNGA', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 61290382, name: 'DERI RAWANDA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 82194872, name: 'DEWANGGA PRIYANTHA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 77945940, name: 'DIAZ AIRLANGGA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 85857501, name: 'DINA MARSELA AGUSTIN', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 76514592, name: 'ERLANGGA SAPUTRA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 82933525, name: 'FASHA ALZIQRI', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 77546477, name: 'ICHA AFRINA', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 83675507, name: 'IKA CAHYA WULANDARI', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 88958905, name: 'KAYLA WULANDARI', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 81204778, name: 'KEYSA NADILA', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 78260323, name: 'KHOLID', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 73684859, name: 'KYSYA ALFARO DWI PUTRI', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 85160095, name: 'LAKSO ANDIKO', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 84964560, name: 'LEVI DIANA SARI', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 3073544316, name: 'LIDYA PUTRI MONICHA', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 84512379, name: 'M. IKBAL NOVRIYANSYAH', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 82830655, name: 'MUHAMMAD ARISPAN', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 86306523, name: 'MUHAMAD DWI APRIAN', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 81367058, name: 'NURUL HIDAYATI', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 3079510518, name: 'RADIT RAMADANA PUTRA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 85185399, name: 'RANDI PRAMUDIA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 77354710, name: 'REFKI DENISKA', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 74698392, name: 'RISKI SATRIO KURNIAWAN', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 64437289, name: 'RUSDALI', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 84972254, name: 'SAHRA GINA SANIYA', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 81945878, name: 'SUPRI YANTO', class: 'XII.F7', points: 100, gender: 'male' },
    { id: 84706764, name: 'UMI MAS SRIFAH', class: 'XII.F7', points: 100, gender: 'female' },
    { id: 88712009, name: 'ZAHRA FARISKA ANANTA', class: 'XII.F7', points: 100, gender: 'female' },
    // XII.F8
    { id: 84375144, name: 'ABEL LIA', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 89602766, name: 'ADHYASTA FIRDAUS', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 81924036, name: 'ANDIKA ALPIANSYAH', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 61085567, name: 'ANGGA', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 85213390, name: 'DAFFI ABI RAFLY', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 67359906, name: 'DENDRA', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 83925234, name: 'ELIS SETIAWATI', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 88811769, name: 'FAREL NOVAL SAPUTRA', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 74721157, name: 'FEBRI SAPUTRA', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 74359634, name: 'HARIS FADILAH', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 83512351, name: 'HAYA HAFIZHA', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 78903577, name: 'HIJRAH', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 78478181, name: 'IMRAN RAMADHAN', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 72181299, name: 'IRHAM FADILLAH', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 57925305, name: 'LILIS ARYANTI', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 83197515, name: 'M. AFGHAN ALFAYYED', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 87899157, name: 'NATASYA PUTRI', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 84505461, name: 'NAWAWI', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 83654556, name: 'NENGNGASIH AULIA KA', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 73114557, name: 'REHAN', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 87357090, name: 'RENZI YOHENZA PRATA', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 86858598, name: 'RIFQI HIDAYAT', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 85351143, name: 'RIZKI SETIYAWAN', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 8559286, name: 'SAMSUL PAHRI', class: 'XII.F8', points: 100, gender: 'male' },
    { id: 86080249, name: 'SATRIA', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 7864120, name: 'SEPTI AMELIA FITRI', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 81579741, name: 'SUCI NIA PUTRI', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 87291299, name: 'TALITA ZAHRAH', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 87728725, name: 'VIO CAROLYN SIBURIAN', class: 'XII.F8', points: 100, gender: 'female' },
    { id: 8711122, name: 'ZAHRA AULIA USIFA', class: 'XII.F8', points: 100, gender: 'female' },
    // XII.F9
    { id: 98687326, name: 'AFNI SELVIA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 94401673, name: 'ALAN ISNAN HAFUZA', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 89238311, name: 'ANDIN OLIVIA SAPUTRI', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 78982679, name: 'ATIKA SANIA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 71234203, name: 'BAGAS IRAWAN', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 61633413, name: 'BENZIE MARSHEL', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 3088242590, name: 'DEKA CIPTA ARVINDA', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 82885507, name: 'DIMAS ADITYA SAPUTRA', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 89430262, name: 'DIVA FEBIOLA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 76818575, name: 'FATURROHMAN', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 76716881, name: 'FATUR ROHMAN', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 72101682, name: 'FITRI WULAN SARI', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 89193093, name: 'IQRAM BAYDAWI', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 81690594, name: 'IRFAHAN', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 78371942, name: 'JEFRI YANSYAH', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 3073005440, name: 'M. ALGHIFARI NURWAH', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 3080756523, name: 'MUHAMMAD ZIKRI ALF', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 87570993, name: 'MIKO PERMANA', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 86393478, name: 'MUTIARA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 87715689, name: 'NAILA FARISKA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 68165280, name: 'RIFALDO', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 89085525, name: 'RIFKI RAFI RAMADHANI', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 83012907, name: 'RIKA RIANA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 78237522, name: 'RIPALDI', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 88944182, name: 'RIVAL EMERALDI HANDRI', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 81449529, name: 'SAIZUL FAHRI', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 82903312, name: 'SANG AJI RHENDYANJAS', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 81636182, name: 'VITA OLIVIA', class: 'XII.F9', points: 100, gender: 'female' },
    { id: 73799465, name: 'WAHUSNI KOYUM', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 84228851, name: 'ZABAL AKBAR', class: 'XII.F9', points: 100, gender: 'male' },
    { id: 84227111, name: 'ZENDA IMAM GUTAWA', class: 'XII.F9', points: 100, gender: 'male' },
  ] as Student[]).sort((a, b) => {
    const classCompare = a.class.localeCompare(b.class, undefined, { numeric: true });
    if (classCompare !== 0) return classCompare;
    return a.name.localeCompare(b.name);
  });


interface DataSiswaProps {
  onViewProfile: (student: Student) => void;
}

const DataSiswa: React.FC<DataSiswaProps> = ({ onViewProfile }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const storedStudents: Student[] = items ? JSON.parse(items) : [];
      
      // If localStorage is empty, just use the placeholders.
      if (storedStudents.length === 0) {
        return placeholderSiswa;
      }

      // Create a map of existing student IDs for efficient lookup
      const storedStudentIds = new Set(storedStudents.map(s => s.id));

      // Find students from the placeholder list that are not already in storage
      const newStudentsFromPlaceholder = placeholderSiswa.filter(
        s => !storedStudentIds.has(s.id)
      );

      // Combine the stored students with any new students from the placeholder list
      const combinedList = [...storedStudents, ...newStudentsFromPlaceholder];

      // Sort the final list by class and then by name
      combinedList.sort((a, b) => {
        const classCompare = a.class.localeCompare(b.class, undefined, { numeric: true });
        if (classCompare !== 0) return classCompare;
        return a.name.localeCompare(b.name);
      });

      return combinedList;

    } catch (error) {
      console.error("Error processing students from localStorage", error);
      // Fallback to the full placeholder list in case of any error
      return placeholderSiswa;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ name: '', class: '' });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (notification) {
        const timer = setTimeout(() => setNotification(''), 3000);
        return () => clearTimeout(timer);
    }
  }, [notification]);

  const uniqueClasses = useMemo(() => {
    const classes = new Set(students.map(s => s.class));
    return Array.from(classes).sort((a,b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = classFilter === 'all' || student.class === classFilter;
      return matchesSearch && matchesClass;
    });
  }, [students, searchTerm, classFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleOpenModal = (student: Student | null) => {
    if (student) {
        setEditingStudent(student);
        setFormData({ name: student.name, class: student.class });
        setPhotoPreview(student.photo || null);
    } else {
        setEditingStudent(null);
        setFormData({ name: '', class: ''});
        setPhotoPreview(null);
    }
    setPhotoFile(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalPhotoUrl = editingStudent?.photo || '';

    if (photoFile) {
        finalPhotoUrl = await fileToBase64(photoFile);
    } else if (!photoPreview && editingStudent) {
        finalPhotoUrl = '';
    }
    
    if (editingStudent) {
        setStudents(students.map(s => 
            s.id === editingStudent.id ? { ...s, ...formData, photo: finalPhotoUrl } : s
        ));
        setNotification('Data siswa berhasil diperbarui!');
    } else {
        const newStudent: Student = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            ...formData,
            points: 100,
            photo: finalPhotoUrl
        };
        setStudents([...students, newStudent]);
        setNotification('Siswa baru berhasil ditambahkan!');
    }
    handleCloseModal();
  };

  const handleDelete = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      setNotification(`Siswa "${studentToDelete.name}" berhasil dihapus.`);
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  return (
    <>
      {notification && (
        <div className="fixed top-20 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-xl z-50 animate-fade-in-down" role="alert">
          <p className="font-bold">Sukses!</p>
          <p>{notification}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-3xl font-light text-gray-700">Data Siswa</h2>
          <h3 className="text-sm font-light text-gray-500">Informasi Siswa</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm self-end sm:self-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Siswa</li>
            </ol>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Siswa</h3>
             <div className="flex flex-wrap items-center justify-center gap-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <DownloadIcon />
                    Export Excel
                </button>
                <button onClick={() => handleOpenModal(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <PlusIcon />
                    Tambah Data Siswa
                </button>
            </div>
          </div>

          <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center flex-wrap gap-2">
                <label htmlFor="show-entries" className="text-sm text-gray-600">Show</label>
                <select 
                  id="show-entries" 
                  value={itemsPerPage}
                  onChange={e => setItemsPerPage(Number(e.target.value))}
                  className="p-1 border border-gray-300 rounded-md"
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                 <span className="text-sm text-gray-600">entries</span>
            </div>
             <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <select 
                  id="class-filter"
                  value={classFilter}
                  onChange={e => setClassFilter(e.target.value)}
                  className="p-1.5 border border-gray-300 rounded-md w-full sm:w-auto"
                >
                    <option value="all">Semua Kelas</option>
                    {uniqueClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Cari siswa..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="p-1.5 border border-gray-300 rounded-md w-full sm:w-auto"
                />
            </div>
          </div>
          
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="py-2 px-4">
                            {student.photo ? (
                                <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 font-semibold">{student.name.charAt(0)}</span>
                                </div>
                            )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">{student.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{student.class}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{student.points}</td>
                        <td className="py-4 px-6 text-sm flex space-x-2">
                            <button onClick={() => onViewProfile(student)} className="text-gray-600 hover:text-gray-900" aria-label={`View ${student.name}`}><ViewIcon /></button>
                            <button onClick={() => handleOpenModal(student)} className="text-blue-600 hover:text-blue-900" aria-label={`Edit ${student.name}`}><EditIcon /></button>
                            <button onClick={() => handleDelete(student)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${student.name}`}><DeleteIcon /></button>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredStudents.length)}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of <span className="font-semibold">{filteredStudents.length}</span> results
              </span>
              <nav aria-label="Pagination">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">Previous</button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">Next</button>
                  </li>
                </ul>
              </nav>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold text-gray-800">{editingStudent ? 'Edit Siswa' : 'Tambah Siswa'}</h3>
                <form onSubmit={handleSaveStudent} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nama</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="class" className="text-sm font-bold text-gray-600 block">Kelas</label>
                        <input id="class" name="class" type="text" value={formData.class} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                       <label className="text-sm font-bold text-gray-600 block">Foto Siswa</label>
                       <div className="mt-2 flex items-center space-x-6">
                            <div className="shrink-0">
                                {photoPreview ? (
                                    <img className="h-16 w-16 object-cover rounded-full" src={photoPreview} alt="Current photo" />
                                ) : (
                                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg className="h-10 w-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                    </div>
                                )}
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" onChange={handlePhotoChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                            </label>
                       </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Batal</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                <p className="mt-4 text-gray-600">
                    Apakah Anda yakin ingin menghapus <span className="font-semibold">{studentToDelete.name}</span>? Aksi ini tidak dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Batal</button>
                    <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Hapus</button>
                </div>
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

export default DataSiswa;
