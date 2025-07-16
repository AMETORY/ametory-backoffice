export const LOCAL_STORAGE_KEY = "projects";
export const LOCAL_STORAGE_TOKEN = "token";
export const LOCAL_STORAGE_COMPANIES = "companies";
export const LOCAL_STORAGE_COMPANY = "company";
export const LOCAL_STORAGE_COMPANY_ID = "companyID";
export const LOCAL_STORAGE_SUB_DISTRICT_ID = "subDistrictID";
export const LOCAL_STORAGE_ORGANIZER_ID = "organizerID";
export const LOCAL_STORAGE_COLLAPSED = "collapsed";
export const LOCAL_STORAGE_DEFAULT_CHANNEL = "defaultChannel";
export const LOCAL_STORAGE_DEFAULT_WHATSAPP_SESSION = "defaultWhatsappSession";
export const LOCAL_STORAGE_DEFAULT_TELEGRAM_SESSION = "defaultTelegramSession";
export const LOCAL_STORAGE_DEFAULT_INSTAGRAM_SESSION = "defaultInstagramSession";


export const severityOptions = [
    { value: "LOW", label: "Low", color: "#8BC34A" },
    { value: "MEDIUM", label: "Medium", color: "#F7DC6F" },
    { value: "HIGH", label: "High", color: "#FFC107" },
    { value: "CRITICAL", label: "Critical", color: "#F44336" },
];

export const priorityOptions = [
    { value: "LOW", label: "Low", color: "#8BC34A" },
    { value: "MEDIUM", label: "Medium", color: "#F7DC6F" },
    { value: "HIGH", label: "High", color: "#FFC107" },
    { value: "URGENT", label: "Urgent", color: "#F44336" },
];


export let NON_TAXABLE_CODES = [
    { value: "-", label: "Non Pajak" },
    { value: "TK/0", label: "Tidak Kawin Tanpa Tanggungan" },
    { value: "TK/1", label: "Tidak Kawin 1 Orang Tanggungan" },
    { value: "TK/2", label: "Tidak Kawin 2 Orang Tanggungan" },
    { value: "TK/3", label: "Tidak Kawin 3 Orang Tanggungan" },
    { value: "K/0", label: "Kawin Tanpa Tanggungan" },
    { value: "K/1", label: "Kawin 1 Orang Tanggungan" },
    { value: "K/2", label: "Kawin 2 Orang Tanggungan" },
    { value: "K/3", label: "Kawin 3 Orang Tanggungan" },
    { value: "K/1/0", label: "Kawin Penghasilan Istri Digabung Dengan Suami Tanpa Tanggungan" },
    { value: "K/1/1", label: "Kawin Penghasilan Istri Digabung Dengan Suami 1 Orang Tanggungan" },
    { value: "K/1/2", label: "Kawin Penghasilan Istri Digabung Dengan Suami 2 Orang Tanggungan" },
    { value: "K/1/3", label: "Kawin Penghasilan Istri Digabung Dengan Suami 3 Orang Tanggungan" }
]
export let EMPLOYEE_STATUS = [
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Paruh Waktu" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "FLEXIBLE", label: "Flexible" },
    { value: "SHIFT", label: "Shift" },
    { value: "SEASONAL", label: "Pekerja Musiman" },
]

export let SALARY_TYPE = [
    { value: "DAILY", label: "Harian" },
    { value: "MONTRHLY", label: "Bulanan" },
]
export let EMPLOYEE_ACTIVE_STATUS = [
    { value: "ACTIVE", label: "Aktif" },
    { value: "PENDING", label: "Pending" },
    { value: "RESIGNED", label: "Resigned" },
]

export let WEEKLY = "WEEKLY"
export let DATERANGE = "DATERANGE"
export let SINGLE_DATE = "SINGLE_DATE"
export let SHIFT = "SHIFT"

export let SCHEDULE_TYPE = [
    { value: WEEKLY, label: "Mingguan" },
    { value: SHIFT, label: "Shift" },
    { value: DATERANGE, label: "Rentang Hari" },
    { value: SINGLE_DATE, label: "Harian" },
]
export let AUTO_NUMERIC_FORMAL = [
    "{month-roman}",
    "{month-mm}",
    "{month-mmm}",
    "{month-mmmm}",
    "{year-yyyy}",
    "{year-yy}",
    "{auto-numeric}",
    "{random-numeric}",
    "{random-character}",
    "{static-character}",
]

export let ATTENDANCE_PROBLEM = [
    { value: "FACE", label: "Deteksi Wajah" },
    { value: "EARLY_IN", label: "Clock In Lebih Awal" },
    { value: "LATE_OUT", label: "Clock Out melebihi toleransi" },
    { value: "LATE_IN", label: "Keterlambatan" },
    { value: "EARLY_OUT", label: "Pulang Cepat" },
    { value: "LOCATION", label: "Lokasi" },
    { value: "SCHEDULE", label: "Jadwal" },
    { value: "CUSTOM", label: "Lainnya" },
    { value: "FAKE_LOCATION_PROBABILITY", label: "Sistem kami mendeteksi Fake Location" },

]

export let RISK_LEVELS = [
    { value: "very_low", label: "Sangat Rendah" },
    { value: "low", label: "Rendah" },
    { value: "middle", label: "Sedang" },
    { value: "high", label: "Tinggi" },
    { value: "very_high", label: "Sangat Tinggi" },
];

export let DEDUCTION_SETTINGS = [
    { value: "LATE", label: "Terlambat" },
    { value: "NOT_PRESENCE", label: "Tidak Hadir" },
]

